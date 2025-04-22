namespace MyApp.Infra.DTO.Login.Admin
{
    public class AdminLoginResponseDto
    {
        public bool Success { get; set; }

        public string? Token { get; set; }

        public int? UserId { get; set; }
    }
}
