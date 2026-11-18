using System.Text.Json.Nodes;

namespace Dotexe.Api;

/// <summary>
/// Validates a contact-form submission and stores it as a lead in Airtable.
/// Mirrors Norgard's LeadService.SubmitAsync, adapted to the .EXE form fields.
/// </summary>
public sealed class LeadService(AirtableClient airtable)
{
    public async Task<JsonObject> SubmitAsync(JsonObject input, CancellationToken ct)
    {
        Require(input.All(x => x.Key is "name" or "business" or "email" or "phone" or "message" or "website"), "Invalid contact form.");
        Require(Text(input, "website").Length == 0, "The contact form could not be accepted.");

        var name = Text(input, "name").Trim();
        var business = Text(input, "business").Trim();
        var email = Text(input, "email").Trim();
        var phone = Text(input, "phone").Trim();
        var message = Text(input, "message").Trim();

        Require(name.Length is > 0 and <= 200, "Enter your name (up to 200 characters).");
        Require(business.Length <= 200, "Keep the business name under 200 characters.");
        Require(IsEmail(email), "Enter a valid email address.");
        Require(phone.Length == 0 || (phone.Length is >= 7 and <= 50 && phone.Count(char.IsDigit) >= 7), "Enter a phone number with at least 7 digits.");
        Require(message.Length is > 0 and <= 5000, "Tell us what's slowing you down (up to 5000 characters).");

        var id = await airtable.CreateLeadAsync(name, business, email, phone, message, ct);
        return new JsonObject { ["id"] = id };
    }

    private static string Text(JsonObject input, string key) =>
        input[key] is JsonValue value && value.TryGetValue<string>(out var text) ? text : string.Empty;

    private static bool IsEmail(string email)
    {
        if (email.Length is 0 or > 320) return false;
        var at = email.IndexOf('@');
        if (at <= 0 || at != email.LastIndexOf('@')) return false;
        var domain = email[(at + 1)..];
        return domain.Contains('.') && !domain.StartsWith('.') && !domain.EndsWith('.') && !email.Contains(' ');
    }

    private static void Require(bool condition, string message)
    {
        if (!condition) throw new ApiException(400, "validation_error", message);
    }
}
