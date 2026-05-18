using Microsoft.AspNetCore.Mvc;
using tatva_ai_backend.Models;
using tatva_ai_backend.Services;

namespace tatva_ai_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService auth) : ControllerBase
{
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
            return BadRequest("All fields are required.");

        var (success, error) = auth.Register(request.Name, request.Email, request.Password);
        return success ? Ok("Registered successfully.") : BadRequest(error);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var (success, response) = auth.Login(request.Email, request.Password);
        return success ? Ok(response) : Unauthorized("Invalid email or password.");
    }
}
