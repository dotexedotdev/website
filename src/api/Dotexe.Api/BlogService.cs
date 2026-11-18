using System.Text.Json;
using System.Text.Json.Nodes;

namespace Dotexe.Api;

/// <summary>
/// Blog posts, read from the Airtable Posts table and cached in memory.
///
/// Airtable is on the Free plan (1,000 API calls/month for the whole base,
/// shared with the lead flow, after the trial ends 2026-11-21), so reads are
/// cached in memory for 30 minutes: a cold start or an expired cache costs
/// one Airtable list call, and every page view after that is free until the
/// cache expires. The cache only refreshes when a visitor arrives after it
/// expired, so at current traffic this is a handful of calls a day — but the
/// 30-minute TTL caps refreshes at 48/day, so if the site ever gets steady
/// round-the-clock traffic, raise CacheTtl (one line below) before the blog
/// alone eats the quota. If a refresh fails but a previous copy exists, the
/// stale copy is served rather than erroring, so the blog never goes blank
/// because Airtable had a bad minute.
/// </summary>
public sealed class BlogService(AirtableClient airtable)
{
    private static readonly TimeSpan CacheTtl = TimeSpan.FromMinutes(30);

    private readonly SemaphoreSlim gate = new(1);
    private IReadOnlyList<BlogPost>? cached;
    private DateTimeOffset cachedAt;

    public async Task<IReadOnlyList<BlogPost>> GetPostsAsync(CancellationToken ct) =>
        await GetCachedAsync(ct);

    public async Task<BlogPost?> GetPostAsync(string slug, CancellationToken ct)
    {
        var posts = await GetCachedAsync(ct);
        return posts.FirstOrDefault(p => string.Equals(p.Slug, slug, StringComparison.OrdinalIgnoreCase));
    }

    private async Task<IReadOnlyList<BlogPost>> GetCachedAsync(CancellationToken ct)
    {
        if (cached is not null && DateTimeOffset.UtcNow - cachedAt < CacheTtl) return cached;
        await gate.WaitAsync(ct);
        try
        {
            if (cached is not null && DateTimeOffset.UtcNow - cachedAt < CacheTtl) return cached;
            try
            {
                var fresh = await LoadAsync(ct);
                cached = fresh;
                cachedAt = DateTimeOffset.UtcNow;
                return fresh;
            }
            catch (ApiException) when (cached is not null)
            {
                // Airtable is unreachable, but we have a previous copy — serve
                // it stale instead of failing the page.
                return cached;
            }
        }
        finally
        {
            gate.Release();
        }
    }

    private async Task<IReadOnlyList<BlogPost>> LoadAsync(CancellationToken ct)
    {
        var page = await airtable.ListPostsAsync(ct);
        var posts = new List<BlogPost>();
        if (page["records"] is not JsonArray records) return posts;
        foreach (var record in records)
        {
            if (record is not JsonObject rec) continue;
            if (rec["fields"] is not JsonObject fields) continue;
            var post = Parse(fields);
            if (post is not null) posts.Add(post);
        }
        // Newest first; slug breaks ties so the order is stable.
        posts.Sort(static (a, b) =>
        {
            var byDate = string.CompareOrdinal(b.Date, a.Date);
            return byDate != 0 ? byDate : string.CompareOrdinal(a.Slug, b.Slug);
        });
        return posts;
    }

    /// <summary>
    /// Maps one Airtable record to a post. Returns null for rows that are
    /// not published or are missing a required field — a bad row never takes
    /// the whole blog down.
    /// </summary>
    private static BlogPost? Parse(JsonObject fields)
    {
        if (!string.Equals(Text(fields, "Status").Trim(), "Published", StringComparison.OrdinalIgnoreCase)) return null;
        var slug = Text(fields, "Slug").Trim().ToLowerInvariant();
        var title = Text(fields, "Title").Trim();
        var date = Text(fields, "Date").Trim();
        var excerpt = Text(fields, "Excerpt").Trim();
        if (slug.Length == 0 || title.Length == 0 || excerpt.Length == 0) return null;
        if (!DateOnly.TryParse(date, out var parsed)) return null;

        // Body is paragraphs separated by blank lines in the long-text field.
        var body = Text(fields, "Body")
            .Split(["\r\n\r\n", "\n\n"], StringSplitOptions.RemoveEmptyEntries)
            .Select(p => p.Trim())
            .Where(p => p.Length > 0)
            .ToArray();
        if (body.Length == 0) return null;

        var image = Text(fields, "Image").Trim();
        return new BlogPost(
            slug,
            title,
            parsed.ToString("yyyy-MM-dd"),
            excerpt,
            body,
            image.Length > 0 ? image : null,
            ParseSources(Text(fields, "Sources")));
    }

    /// <summary>
    /// Sources is a JSON array in a long-text field, e.g.
    /// [{"label":"Town of Oakville — …","url":"https://…"}]. A malformed
    /// value yields no sources rather than failing the post.
    /// </summary>
    private static IReadOnlyList<BlogSource> ParseSources(string raw)
    {
        if (raw.Trim().Length == 0) return [];
        try
        {
            using var doc = JsonDocument.Parse(raw);
            if (doc.RootElement.ValueKind != JsonValueKind.Array) return [];
            var sources = new List<BlogSource>();
            foreach (var item in doc.RootElement.EnumerateArray())
            {
                if (item.ValueKind != JsonValueKind.Object) continue;
                var label = item.TryGetProperty("label", out var l) && l.ValueKind == JsonValueKind.String
                    ? l.GetString()?.Trim() ?? string.Empty
                    : string.Empty;
                if (label.Length == 0) continue;
                var url = item.TryGetProperty("url", out var u) && u.ValueKind == JsonValueKind.String
                    ? u.GetString()?.Trim()
                    : null;
                sources.Add(new BlogSource(label, string.IsNullOrEmpty(url) ? null : url));
            }
            return sources;
        }
        catch (JsonException)
        {
            return [];
        }
    }

    private static string Text(JsonObject fields, string key) =>
        fields[key] is JsonValue value && value.TryGetValue<string>(out var text) ? text : string.Empty;
}

/// <summary>A published blog post, as served by GET /api/blog and /api/blog/{slug}.</summary>
public sealed record BlogPost(
    string Slug,
    string Title,
    string Date,
    string Excerpt,
    string[] Body,
    string? Image,
    IReadOnlyList<BlogSource> Sources);

public sealed record BlogSource(string Label, string? Url);
