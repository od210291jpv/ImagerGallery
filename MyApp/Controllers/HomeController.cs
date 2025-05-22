using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;

using MyApp.Infra.Constants.Enums;

using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;

using MyApp.Infra.DTO.Login.User;
using MyApp.Infra.DTO.Publication;
using MyApp.Infra.DTO.Users;

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
        public async Task<ContentModel[]> Search(string keyword, bool withHidden = false)
        {
            ContentModel[] results = await this.database.Posts.Where(p => p.Description.ToLower().Contains(keyword.ToLower()) && p.Hidden == withHidden).ToArrayAsync();
            return results;
        }

        [HttpGet("/userByid")]
        public async Task<GetUsersResponseModel> GetPublisherById(int id) 
        {
            var user = await this.database.Users.SingleOrDefaultAsync(u => u.Id == id);

            if (user is null) {
                return new GetUsersResponseModel();
            }

            return new GetUsersResponseModel 
            {
                Id = id,
                Login = user.Login,
                Password = "hidden",
                Role = user.UserRole
            };
        }

        [HttpGet("images")]
        public async Task<PublicationDto[]> GetAllimages(bool showHidden = false, int page = 0, int pageSize = 0) 
        {
            List<PublicationDto> allImages = new();
            ContentModel[] results = Array.Empty<ContentModel>();

            //var all = this.database.Posts;
            //foreach (var p in all) 
            //{
            //    p.Source = new Uri(p.Source.ToString().Replace("192.168.88.33", "192.168.88.39"));
            //}

            //await this.database.SaveChangesAsync();

            if (!showHidden)
            {
                results = await this.database.Posts.OrderByDescending(i => i.Id).Where(p => p.Hidden == false).ToArrayAsync();
            }
            else 
            {
                results = await this.database.Posts.OrderByDescending(i => i.Id).ToArrayAsync();
            }

            foreach (var item in results) 
            {
                allImages.Add(new PublicationDto 
                {
                    Id = item.Id,
                    Alt = item.Alt,
                    Description = item.Description,
                    Hidden = item.Hidden,
                    Likes = item.Likes,
                    Source = item.Source,
                    UserId = item.UserId,
                    Username = this.database.Users.Single(u => u.Id == item.UserId).Login
                });
            }

            return [.. allImages];
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
