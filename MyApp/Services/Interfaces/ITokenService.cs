using MyApp.Infra.Constants.Enums;

namespace MyApp.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(int userId, UserRole role);
    }
}
