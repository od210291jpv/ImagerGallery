using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Constants.Enums;
using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;
using MyApp.Infra.DTO.Login.Admin;
using MyApp.Infra.DTO.Signup;
using MyApp.Infra.DTO.Users;
using MyApp.Services.Interfaces;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private ApplicationContext database { get; set; }
        
        private readonly IAuthService authService;
        private readonly ITokenService tokenService;

        public AdminController(ApplicationContext db, IAuthService authService, ITokenService tokenService)
        {
            this.authService = authService;
            this.tokenService = tokenService;
            this.database = db;
        }

        [HttpGet()]
        public IActionResult Admin()
        {
            return View();
        }

        [HttpGet("Dashboard")]
        public IActionResult Dashboard()
        {
            return View("Dashboard");
        }

        [HttpGet("users")]
        public async Task<GetUsersResponseModel[]> GetUsers() 
        {
            GetUsersResponseModel[] allUsers = await this.database.Users
                .Select(u => 
                new GetUsersResponseModel 
                { 
                    Id = u.Id,
                    Login = u.Login,
                    Password = u.Password,
                    Role = u.UserRole
                }).ToArrayAsync();

            return allUsers;
        }

        [HttpPost("AdminLogin")]
        [AllowAnonymous] // Важно: разрешаем доступ к этому эндпоинту без аутентификации
        [ProducesResponseType(typeof(AdminLoginResponseDto), StatusCodes.Status200OK)] // Что возвращается при успехе
        [ProducesResponseType(StatusCodes.Status400BadRequest)] // Ошибка валидации модели
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> AdminLogin(AdminLoginRequestModel requestModel) 
        {
            var id = await this.authService.AuthenticateAsync(requestModel.Username, requestModel.Password);

            if (id is null) { 
                return Unauthorized(new AdminLoginResponseDto { Success = false, Token = null });
            }

            var token = this.tokenService.GenerateToken(id.Value, UserRole.Administrator);
            return Ok(new AdminLoginResponseDto { Success = true, Token = token, UserId = id.Value});
        }

        [HttpPost("adminSignup")]
        public async Task<IActionResult> RegisterAdmin(SignupRequestmodel signupRequest) 
        {
            if (this.database.Users.SingleOrDefault(u => u.Login == signupRequest.Login && u.Password == signupRequest.Password) != null) 
            {
                return Accepted("Such user already registered");
            }

            await this.database.Users.AddAsync(new UserModel
            {
                Login = signupRequest.Login,
                Password = signupRequest.Password,
                UserRole = signupRequest.Role
            });

            int affectedRows = await this.database.SaveChangesAsync();

            if (affectedRows <= 0) 
            {
                return Accepted();
            }

            return Ok(true);
        }
    }
}
