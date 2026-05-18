namespace tatva_ai_backend.Models;

public class Message
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Role { get; set; } = "user";
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Conversation
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = "New Chat";
    public List<Message> Messages { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public record SendMessageRequest(string Content);
public record CreateConversationRequest(string? Title);
