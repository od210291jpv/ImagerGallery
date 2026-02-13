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
using static System.Net.Mime.MediaTypeNames;

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

        public class PaginatedResult<T>
        {
            public List<T> Items { get; set; }
            public int TotalCount { get; set; }
        }

        [HttpGet("images")]
        public async Task<IActionResult> GetAllimages(bool doNotShowHidden = false, int page = 0, int pageSize = 0, string query = null) 
        {
            var imageQuery = this.database.Posts.AsQueryable();

            if (!string.IsNullOrEmpty(query))
            {
                imageQuery = imageQuery.Where(i => i.Description.Contains(query) || i.Alt.Contains(query));
            }

            var totalCount = imageQuery.Count();
            var items = imageQuery.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            var result = new PaginatedResult<PublicationDto>
            {
                Items = items.Where(i => i.Hidden == doNotShowHidden).Select(i => new PublicationDto
                {
                    Id = i.Id,
                    Alt = i.Alt,
                    Description = i.Description,
                    Hidden = i.Hidden,
                    Likes = i.Likes,
                    Source = i.Source,
                    UserId = i.UserId,
                    Username = this.database.Users.Single(u => u.Id == i.UserId).Login
                }).ToList(),
                TotalCount = totalCount
            };
            return Ok(result);
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
