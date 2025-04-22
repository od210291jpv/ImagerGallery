using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Database.Models;

namespace MyApp.Infra.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }

        public DbSet<ContentModel> Posts { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
