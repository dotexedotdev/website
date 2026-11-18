using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;

namespace Dotexe.Api;

/// <summary>
/// Single catch-all entry point, mirroring the Norgard API's dispatch shape.
/// Routes: GET health, POST leads, GET blog, GET blog/{slug}.
/// </summary>
public sealed class ApiFunction(LeadService leads, BlogService blog)
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
            if (request.Method == HttpMethods.Get && route == "blog")
                return new OkObjectResult(new { posts = BlogListJson(await blog.GetPostsAsync(cancellationToken)) });
            if (request.Method == HttpMethods.Get && route.StartsWith("blog/", StringComparison.Ordinal))
            {
                var slug = Uri.UnescapeDataString(route["blog/".Length..]);
                if (slug.Length == 0 || slug.Contains('/'))
                    throw new ApiException(404, "not_found", "Not found.");
                var post = await blog.GetPostAsync(slug, cancellationToken)
                    ?? throw new ApiException(404, "not_found", "That article doesn't exist.");
                return new OkObjectResult(new { post = BlogPostJson(post) });
            }
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

    /// <summary>List shape: summaries only — the list page never needs bodies.</summary>
    private static JsonArray BlogListJson(IReadOnlyList<BlogPost> posts)
    {
        var array = new JsonArray();
        foreach (var post in posts)
        {
            var item = new JsonObject
            {
                ["slug"] = post.Slug,
                ["title"] = post.Title,
                ["date"] = post.Date,
                ["excerpt"] = post.Excerpt,
            };
            if (post.Image is not null) item["image"] = post.Image;
            array.Add(item);
        }
        return array;
    }

    /// <summary>Single-post shape: the full article, as the article page renders it.</summary>
    private static JsonObject BlogPostJson(BlogPost post)
    {
        var json = new JsonObject
        {
            ["slug"] = post.Slug,
            ["title"] = post.Title,
            ["date"] = post.Date,
            ["excerpt"] = post.Excerpt,
            ["body"] = new JsonArray(post.Body.Select(paragraph => (JsonNode?)paragraph).ToArray()),
        };
        if (post.Image is not null) json["image"] = post.Image;
        if (post.Sources.Count > 0)
        {
            var sources = new JsonArray();
            foreach (var source in post.Sources)
            {
                var item = new JsonObject { ["label"] = source.Label };
                if (source.Url is not null) item["url"] = source.Url;
                sources.Add(item);
            }
            json["sources"] = sources;
        }
        return json;
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
