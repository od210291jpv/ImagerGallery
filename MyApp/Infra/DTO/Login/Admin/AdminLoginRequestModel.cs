using System.ComponentModel.DataAnnotations;
using MyApp.Infra.Constants.Enums;

namespace MyApp.Infra.DTO.Login.Admin
{
    public class AdminLoginRequestModel
    {
        [Required(ErrorMessage = "Username is required field")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required field")]
        [MinLength(6, ErrorMessage = "Password should have ate least 6 symbols")] // Пример валидации
        public string Password { get; set; } = string.Empty;
    }
}
