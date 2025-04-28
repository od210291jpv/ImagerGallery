using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;
using MyApp.Services.Interfaces;

namespace MyApp.Services
{
    public class SimpleAuthService : IAuthService
    {
        private ApplicationContext databaseContext;

        public SimpleAuthService(ApplicationContext db)
        {
            this.databaseContext = db;
        }

        public async Task<int?> AuthenticateAsync(string username, string password)
        {
            UserModel? user = await this.databaseContext.Users.SingleOrDefaultAsync(u => u.Login == username && u.Password == password);
            
            if (user is null) 
            {
                return null;
            }
            return user.Id;
        }
    }
}
