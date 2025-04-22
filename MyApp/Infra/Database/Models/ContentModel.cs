using Microsoft.EntityFrameworkCore;

namespace MyApp.Infra.Database.Models
{
    [PrimaryKey(nameof(Id))]
    public class ContentModel
    {
        public int Id { get; set; }

        public Uri Source { get; set; } = default!;

        public string Description { get; set; } = string.Empty;

        public bool Hidden { get; set; } = false;

        public string? Alt { get; set; }

        public int Likes { get; set; }

        public int UserId { get; set; }

        public UserModel User { get; set; } = default!;
    }
}
