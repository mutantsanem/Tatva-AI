using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using tatva_ai_backend.Models;

namespace tatva_ai_backend.Services;

public class AuthService
{
    private readonly Dictionary<string, User> _users = [];
    private readonly IConfiguration _config;

    public AuthService(IConfiguration config) => _config = config;

    public (bool Success, string Error) Register(string name, string email, string password)
    {
        if (_users.Values.Any(u => u.Email == email))
            return (false, "Email already registered.");

        var user = new User
        {
            Name = name,
            Email = email,
            PasswordHash = HashPassword(password)
        };
        _users[user.Id] = user;
        return (true, string.Empty);
    }

    public (bool Success, AuthResponse? Response) Login(string email, string password)
    {
        var user = _users.Values.FirstOrDefault(u => u.Email == email);
        if (user is null || !VerifyPassword(password, user.PasswordHash))
            return (false, null);

        var token = GenerateToken(user);
        return (true, new AuthResponse(token, user.Name, user.Email));
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100_000, HashAlgorithmName.SHA256, 32);
        return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    private static bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split(':');
        var salt = Convert.FromBase64String(parts[0]);
        var hash = Convert.FromBase64String(parts[1]);
        var inputHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100_000, HashAlgorithmName.SHA256, 32);
        return CryptographicOperations.FixedTimeEquals(hash, inputHash);
    }
}
