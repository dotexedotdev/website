namespace Dotexe.Api;

/// <summary>An error the API can report to the caller as a JSON envelope.</summary>
public sealed class ApiException(int status, string code, string message) : Exception(message)
{
    public int Status { get; } = status;
    public string Code { get; } = code;
}
