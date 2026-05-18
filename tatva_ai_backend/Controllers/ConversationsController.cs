using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tatva_ai_backend.Models;
using tatva_ai_backend.Services;

namespace tatva_ai_backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")] 
public class ConversationsController(ConversationService conversations, GroqService groq) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(conversations.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var conversation = conversations.GetById(id);
        return conversation is null ? NotFound() : Ok(conversation);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateConversationRequest request)
    {
        var conversation = conversations.Create(request.Title);
        return CreatedAtAction(nameof(GetById), new { id = conversation.Id }, conversation);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var deleted = conversations.Delete(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPost("{id}/messages")]
    public async Task<IActionResult> SendMessage(string id, [FromBody] SendMessageRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Content))
            return BadRequest("Content cannot be empty.");

        var conversation = conversations.GetById(id);
        if (conversation is null)
            return NotFound("Conversation not found.");

        var userMessage = conversations.AddMessage(id, "user", request.Content)!;

        var aiReply = await groq.ChatAsync(conversation.Messages, request.Content);  
        var botReply = conversations.AddMessage(id, "assistant", aiReply)!;

        return Ok(new { userMessage, botReply });
    }
}
