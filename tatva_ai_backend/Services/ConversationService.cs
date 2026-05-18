using tatva_ai_backend.Models;

namespace tatva_ai_backend.Services;

public class ConversationService
{
    private readonly Dictionary<string, Conversation> _store = [];

    public List<Conversation> GetAll() =>
        [.. _store.Values.OrderByDescending(c => c.CreatedAt)];

    public Conversation? GetById(string id) =>
        _store.TryGetValue(id, out var c) ? c : null;

    public Conversation Create(string? title = null)
    {
        var conversation = new Conversation
        {
            Title = string.IsNullOrWhiteSpace(title) ? "New Chat" : title
        };
        _store[conversation.Id] = conversation;
        return conversation;
    }

    public Message? AddMessage(string conversationId, string role, string content)
    {
        if (!_store.TryGetValue(conversationId, out var conversation))
            return null;

        var message = new Message { Role = role, Content = content };
        conversation.Messages.Add(message);

        if (conversation.Messages.Count == 1 && role == "user")
            conversation.Title = content.Length > 40 ? content[..40] : content;

        return message;
    }

    public bool Delete(string id) => _store.Remove(id);
}
