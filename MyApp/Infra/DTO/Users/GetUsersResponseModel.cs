using MyApp.Infra.Constants.Enums;

namespace MyApp.Infra.DTO.Users
{
    public class GetUsersResponseModel
    {
        public int Id { get; set; }

        public string Login { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public UserRole Role { get; set; }
    }
}
