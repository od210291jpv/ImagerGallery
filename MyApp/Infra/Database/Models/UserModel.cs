using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Constants.Enums;

namespace MyApp.Infra.Database.Models
{
    [PrimaryKey(nameof(Id))]
    public class UserModel
    {
        public int Id { get; set; }

        public string Login { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public UserRole UserRole { get; set; }

        public ICollection<ContentModel> Publications { get; set; } = default!;
    }
}
    