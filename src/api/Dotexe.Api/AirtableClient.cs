using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Configuration;

namespace Dotexe.Api;

/// <summary>
/// Minimal Airtable client: creates lead records via the Airtable REST API.
/// Config comes from environment variables only — never from the repo.
/// Mirrors Norgard's AirtableStore send/throttle shape, cut down to one call.
/// </summary>
public sealed class AirtableClient(IHttpClientFactory factory, IConfiguration configuration)
{
    private readonly HttpClient http = factory.CreateClient("airtable");
    private readonly SemaphoreSlim gate = new(1);
    private DateTimeOffset nextRequest;

    private string ApiKey => Required("AIRTABLE_API_KEY");
    private string BaseId => Required("AIRTABLE_BASE_ID");
    private string Table => configuration["AIRTABLE_LEADS_TABLE"] is { Length: > 0 } value ? value : "Leads";

    private string Required(string key) => configuration[key] is { Length: > 0 } value
        ? value
        : throw new ApiException(503, "not_configured", "The service is not configured. Contact the administrator.");

    public async Task<string> CreateLeadAsync(string name, string business, string email, string phone, string message, CancellationToken ct)
    {
        var fields = new JsonObject
        {
            ["Name"] = name,
            ["Email"] = email,
            ["Message"] = message,
        };
        if (business.Length > 0) fields["Business"] = business;
        if (phone.Length > 0) fields["Phone"] = phone;

        var url = $"https://api.airtable.com/v0/{Uri.EscapeDataString(BaseId)}/{Uri.EscapeDataString(Table)}";
        var body = await SendAsync(HttpMethod.Post, url, new JsonObject { ["fields"] = fields }, ct);
        var id = body["id"] is JsonValue value && value.TryGetValue<string>(out var recordId) ? recordId : string.Empty;
        if (id.Length == 0) throw new ApiException(502, "storage_error", "Storage could not confirm the request. Contact the administrator if retrying does not resolve it.");
        return id;
    }

    private async Task<JsonObject> SendAsync(HttpMethod method, string url, JsonObject payload, CancellationToken ct)
    {
        await gate.WaitAsync(ct);
        try
        {
            // Airtable allows 5 requests/second per base; keep a small gap between calls.
            var wait = nextRequest - DateTimeOffset.UtcNow;
            if (wait > TimeSpan.Zero) await Task.Delay(wait, ct);
            nextRequest = DateTimeOffset.UtcNow.AddMilliseconds(220);

            using var request = new HttpRequestMessage(method, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", ApiKey);
            request.Content = JsonContent.Create(payload);
            using var response = await http.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, ct);
            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                nextRequest = DateTimeOffset.UtcNow.AddSeconds(30);
                throw new ApiException(503, "airtable_throttled", "Storage is busy or its quota is exhausted. Wait at least 30 seconds, then retry.");
            }
            if (response.StatusCode == HttpStatusCode.NotFound)
                throw new ApiException(404, "not_found", "The record or configured table was not found.");
            if (!response.IsSuccessStatusCode)
                throw new ApiException(502, "storage_error", "Storage could not confirm the request. Contact the administrator if retrying does not resolve it.");
            return await response.Content.ReadFromJsonAsync<JsonObject>(ct)
                ?? throw new ApiException(502, "storage_error", "Storage returned an empty response.");
        }
        catch (HttpRequestException)
        {
            throw new ApiException(503, "storage_unavailable", "Storage is unavailable. The outcome may need reconciliation before retrying.");
        }
        finally
        {
            gate.Release();
        }
    }
}
