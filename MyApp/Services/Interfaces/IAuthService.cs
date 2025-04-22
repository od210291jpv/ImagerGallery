namespace MyApp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<int?> AuthenticateAsync(string username, string password);
    }
}
