﻿namespace MyApp.Infra.DTO.Publication
{
    public class EditPublicationrequestDto
    {
        public int PostId { get; set; }

        public IFormFile? File { get; set; } = default!;

        public string? Description { get; set; } = string.Empty;


        public int? PublisherId { get; set; }

        public bool? Hidden { get; set; } = false;

        public string? Alt { get; set; }
    }
}
