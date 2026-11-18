using Dotexe.Api;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = FunctionsApplication.CreateBuilder(args);
builder.ConfigureFunctionsWebApplication();
builder.Services.AddHttpClient("airtable", client => client.Timeout = TimeSpan.FromSeconds(30))
    .RemoveAllLoggers()
    .ConfigurePrimaryHttpMessageHandler(SafeHandler);
builder.Services.AddSingleton<AirtableClient>();
builder.Services.AddSingleton<LeadService>();
await builder.Build().RunAsync();

static HttpMessageHandler SafeHandler() => new HttpClientHandler { AllowAutoRedirect = false, UseCookies = false, UseDefaultCredentials = false };
