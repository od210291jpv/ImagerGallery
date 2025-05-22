namespace MyApp.Infra.DTO.Publication
{
    public class PublicationDto
    {
        public int Id { get; set; }

        public Uri Source { get; set; } = default!;

        public string Description { get; set; } = string.Empty;

        public bool Hidden { get; set; } = false;

        public string? Alt { get; set; }

        public int Likes { get; set; }

        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;
    }
}
