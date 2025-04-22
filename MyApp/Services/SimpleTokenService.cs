using MyApp.Infra.Constants.Enums;
using MyApp.Services.Interfaces;

namespace MyApp.Services
{
    public class SimpleTokenService : ITokenService
    {
        public string GenerateToken(int userId, UserRole role)
        {
            return $"jwt-token-for-user-{userId}-{Guid.NewGuid()}-{role}";
        }
    }
}
