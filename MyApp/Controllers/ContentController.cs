using Microsoft.AspNetCore.Mvc;
using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;
using MyApp.Infra.DTO.Publication;
using Newtonsoft.Json;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentController : Controller
    {
        private ApplicationContext database;

        public ContentController(ApplicationContext db)
        {
            this.database = db;
        }

        [HttpGet("like")]
        public async Task<IActionResult> LikePost(int postId) 
        {
            ContentModel? post = this.database.Posts.SingleOrDefault(p => p.Id == postId);


            if (post is null) 
            {
                return NotFound($"The post with id {postId} not found");
            }

            post.Likes += 1;
            await this.database.SaveChangesAsync();
            return Ok(post);
        }

        [HttpPost]
        //public async Task<IActionResult> Upload(IFormFile file, string description, int publisherId, bool hidden, string? alt)
        public async Task<IActionResult> Upload(UploadPublicationRequestDto requestData)
        {
            var host = HttpContext.Request.Host.ToUriComponent();

            if (requestData.File == null || requestData.File.Length == 0)
                return NotFound("file not selected");

            if (this.database.Users.SingleOrDefault(u => u.Id == requestData.PublisherId) is null)
            {
                return NotFound($"{requestData.PublisherId} user not found");
            }

            var path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/img",
                        requestData.File.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await requestData.File.CopyToAsync(stream);
            }

            string fileUrl = $"{HttpContext.Request.Scheme}://{host}/Img/{requestData.File.FileName}";

            ContentModel model = new ContentModel
            {
                Alt = requestData.Alt,
                Description = requestData.Description,
                Source = new Uri(fileUrl),
                UserId = requestData.PublisherId,
                Hidden = requestData.Hidden,
            };
            
            string serialized = JsonConvert.SerializeObject(model);
            await this.database.Posts.AddAsync(model);

            if (await this.database.SaveChangesAsync() > 0)
            {
                return Ok(serialized);
            }

            return Accepted(serialized);
        }
    }
}
