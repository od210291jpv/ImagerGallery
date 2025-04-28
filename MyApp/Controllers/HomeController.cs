using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
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
        private IMemoryCache memCache;

        public HomeController(ApplicationContext db, IAuthService authService, ITokenService tokenService, IMemoryCache memoryCache)
        {
            this.database = db;
            this.authService = authService;
            this.tokenService = tokenService;
            this.memCache = memoryCache;
        }

        [HttpGet("default")]
        public IActionResult Index(string? userId)
        {
            StringValues token;
            HttpContext.Request.Headers.TryGetValue("authToken", out token);


            var tokenValue = token.FirstOrDefault();

            if (tokenValue is null && userId == null) 
            {
                return Redirect("/Login");
            }

            if (tokenValue is null && userId is not null && userId != "") 
            {
                var chachedToken = this.memCache.Get(int.Parse(userId));
                if (chachedToken is not null) 
                {
                    HttpContext.Response.Headers.Append("authToken", token);
                    return View($"/index?userId={userId}");
                }
            }


            return Redirect($"/index?userId={userId}");
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

            var cacheEntryOptions = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromHours(1));

            this.memCache.Set(id, token, cacheEntryOptions);

            return new UserLoginResponseDto { Success = true, Token = token, UserId =id.Value };
        }
    }
}
