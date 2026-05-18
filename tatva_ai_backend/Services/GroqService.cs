using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using tatva_ai_backend.Models;

namespace tatva_ai_backend.Services;

public class GroqService
{
    private readonly HttpClient _http;
    private readonly string _model;

    public GroqService(IConfiguration config)
    {
        var apiKey = config["Groq:ApiKey"]!;
        _model = config["Groq:Model"] ?? "llama-3.3-70b-versatile";

        _http = new HttpClient { BaseAddress = new Uri("https://api.groq.com") };
        _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    }

    public async Task<string> ChatAsync(List<Message> history, string userMessage)
    {
        var messages = history
            .Select(m => new { role = m.Role, content = m.Content })
            .Append(new { role = "user", content = userMessage })
            .ToList<object>();

        var payload = new
        {
            model = _model,
            messages,
            temperature = 0.7,
            max_tokens = 1024,
        };

        var json = JsonSerializer.Serialize(payload);
        var response = await _http.PostAsync(
            "/openai/v1/chat/completions",
            new StringContent(json, Encoding.UTF8, "application/json")
        );

        response.EnsureSuccessStatusCode();

        using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        return doc.RootElement
            .GetProperty("choices")[0]  
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "No response.";
    }
}
