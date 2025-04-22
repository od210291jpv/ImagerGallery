using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Constants.Enums;
using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;
using MyApp.Infra.DTO.Login.User;
using MyApp.Services.Interfaces;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private ApplicationContext database;
        private IAuthService authService;
        private ITokenService tokenService;

        public HomeController(ApplicationContext db, IAuthService authService, ITokenService tokenService)
        {
            this.database = db;
            this.authService = authService;
            this.tokenService = tokenService;
        }

        [HttpGet("default")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("search")]
        public async Task<ContentModel[]> Search(string keyword)
        {
            ContentModel[] results = await this.database.Posts.Where(p => p.Description.Contains(keyword) && p.Hidden == false).ToArrayAsync();
            return results;
        }

        [HttpGet("images")]
        public async Task<ContentModel[]> GetAllimages(bool showHidden = false) 
        {
            ContentModel[] allImages = Array.Empty<ContentModel>();
            if (!showHidden)
            {
                allImages = await this.database.Posts.OrderByDescending(i => i.Id).Where(p => p.Hidden == false).ToArrayAsync();
            }
            else 
            {
                allImages = await this.database.Posts.OrderByDescending(i => i.Id).ToArrayAsync();
            }

            return allImages;
        }

        [HttpPost("feedback")]
        public async Task<string> Feedback(string feedback) 
        {
            await Task.Delay(1);
            return feedback;
        }

        [HttpPost("userLogin")]
        public async Task<UserLoginResponseDto> UserLogin(UserLoginRequestModel loginRequest) 
        {
            int? id = await this.authService.AuthenticateAsync(loginRequest.Login, loginRequest.Password);

            if (id is null) 
            {
                return new UserLoginResponseDto { Success = false, Token = "", UserId = 0 };
            }

            string token = this.tokenService.GenerateToken(id.Value, UserRole.User);
            return new UserLoginResponseDto { Success = true, Token = token, UserId =id.Value };
        }
    }
}
