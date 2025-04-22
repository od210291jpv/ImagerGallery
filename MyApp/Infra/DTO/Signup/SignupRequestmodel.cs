using MyApp.Infra.Constants.Enums;

namespace MyApp.Infra.DTO.Signup
{
    public class SignupRequestmodel
    {
        public string Login { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public UserRole Role { get; set; }
    }
}
