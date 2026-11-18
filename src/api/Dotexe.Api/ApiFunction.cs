using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;

namespace Dotexe.Api;

/// <summary>
/// Single catch-all entry point, mirroring the Norgard API's dispatch shape.
/// Only two routes exist: GET health and POST leads.
/// </summary>
public sealed class ApiFunction(LeadService leads)
{
    [Function("Api")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "{*path}")] HttpRequest request,
        string? path,
        CancellationToken cancellationToken)
    {
        try
        {
            var route = (path ?? string.Empty).Trim('/').ToLowerInvariant();
            if (request.Method == HttpMethods.Get && route == "health")
                return new OkObjectResult(new { status = "ok" });
            if (request.Method == HttpMethods.Post && route == "leads")
                return new OkObjectResult(await leads.SubmitAsync(await BodyAsync(request, cancellationToken), cancellationToken));
            throw new ApiException(404, "not_found", "Not found.");
        }
        catch (ApiException ex)
        {
            return new ObjectResult(new { code = ex.Code, message = ex.Message }) { StatusCode = ex.Status };
        }
        catch (Exception)
        {
            return new ObjectResult(new { code = "service_error", message = "The request could not be confirmed. Retry the same operation or contact the administrator." }) { StatusCode = 503 };
        }
    }

    private static async Task<JsonObject> BodyAsync(HttpRequest request, CancellationToken ct)
    {
        try
        {
            return await request.ReadFromJsonAsync<JsonObject>(ct)
                ?? throw new ApiException(400, "validation_error", "Send the form as JSON.");
        }
        catch (ApiException)
        {
            throw;
        }
        catch (Exception)
        {
            throw new ApiException(400, "validation_error", "Send the form as JSON.");
        }
    }
}
