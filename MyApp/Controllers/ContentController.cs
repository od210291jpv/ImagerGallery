using CanvasFlow.Api.Services.CmsApi;
using CanvasFlow.Api.Services.CmsApi.Models;
using Flurl.Http;
using Flurl.Http.Content;
using FpzParser.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Database;
using MyApp.Infra.Database.Models;
using MyApp.Infra.DTO.Publication;
using Newtonsoft.Json;
using StackExchange.Redis;
using ContentModel = MyApp.Infra.Database.Models.ContentModel;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentController : Controller
    {
        //private ApplicationContext database;
        private IContentParser parser;
        private IDatabase redisDb;
        private ApplicationContext database;
        private CmsApiClient _cmsApiClient = new CmsApiClient(new HttpClient(), "http://192.168.88.68:8085");
        private const string CmsUsername = "SaverMaui";
        private const string CmsPassword = "password";

        public ContentController(ApplicationContext db, IContentParser parser)
        {
            //this.database = db;
            this.parser = parser;
            var redis = ConnectionMultiplexer.Connect("192.168.88.252:6379");
            this.redisDb = redis.GetDatabase(2);
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> UpdatePost(EditPublicationrequestDto requestData) 
        {
            ContentModel? expectedPost = this.database.Posts.SingleOrDefault(post => post.Id == requestData.PostId);

            if (expectedPost is null)             
            {
                return NotFound(requestData.PostId);
            }

            if (requestData.File != null) {
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

                string fileUrl = $"{HttpContext.Request.Scheme}://{host}/img/{requestData.File.FileName}";
                expectedPost.Source = new Uri(fileUrl);                
            }

            if (requestData.Description != null) 
            {
                expectedPost.Description = requestData.Description;
            }

            if (requestData.Alt != null) 
            {
                expectedPost.Alt = requestData.Alt;
            }
            if (requestData.Hidden != null) 
            {
                expectedPost.Hidden = requestData.Hidden.Value;
            }
            if (requestData.PublisherId != null) 
            {
                expectedPost.UserId = requestData.PublisherId.Value;
            }

            await this.database.SaveChangesAsync();
            return Ok(expectedPost);
        }

        [HttpGet("PushAllContentToRedis")]
        public async Task<IActionResult> PushAllContentToRedis(int take) 
        {
            var redis = ConnectionMultiplexer.Connect("192.168.88.252:6379");// fix, get from config
            var redisDb = redis.GetDatabase(2);

            CmsLoginResponseDto cmsUser;
            try
            {
                cmsUser = await _cmsApiClient.LoginAsync(CmsUsername, CmsPassword);

            }
            catch (HttpRequestException e)
            {
                return Unauthorized(new { error = $"Failed to login to CMS API: {e.Message}" });
            }

            ContentObjectDtoPagedResult newDbContent = await _cmsApiClient.GetContentsByUserIdAsync(cmsUser.User.Id, 0, take);

            foreach (ContentObjectDto rl in newDbContent.Items) 
            {
                await redisDb.StringSetAsync($"{Guid.NewGuid().ToString()}:fapeza", rl.Path.ToString());
            }

            return Ok("All content pushed to Redis successfully.");
        }

        [HttpPost]
        public async Task<IActionResult> Upload(UploadPublicationRequestDto requestData)
        {
            var host = HttpContext.Request.Host.ToUriComponent();

            if (requestData.File == null || requestData.File.Length == 0)
                return NotFound("file not selected");

            CmsLoginResponseDto cmsUser;
            try
            {
                cmsUser = await _cmsApiClient.LoginAsync(CmsUsername, CmsPassword);

            }
            catch (HttpRequestException e)
            {
                return Unauthorized(new { error = $"Failed to login to CMS API: {e.Message}" });
            }


            string path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/img",
                        requestData.File.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await requestData.File.CopyToAsync(stream);

                stream.Position = 0;

                var fileContent = new StreamContent(stream);
                var cmsContentSubmitted = await _cmsApiClient.CreateContentAsync(fileContent, requestData.File.FileName, cmsUser.User.Id, true, requestData.Description, true, false);

                if (cmsContentSubmitted is null)
                {
                    return BadRequest(new { error = "Failed to create content in CMS." });
                }
            }

            string prefix = Guid.NewGuid().ToString().Replace("-", "");
            string fileUrl = $"{HttpContext.Request.Scheme}://{host}/img/{prefix}{requestData.File.FileName}";

            

            return Accepted();
        }

        [HttpGet("ParseByLink")]
        public async Task<IActionResult> ParseByLink(string contentLink)
        {
            var url = contentLink;
            if (string.IsNullOrEmpty(url))
                return BadRequest("The content link is not valid or the content cannot be parsed.");

            CmsLoginResponseDto cmsUser;
            try
            {
                cmsUser = await _cmsApiClient.LoginAsync(CmsUsername, CmsPassword);
            }
            catch (HttpRequestException e)
            {
                return Unauthorized(new { error = $"Failed to login to CMS API: {e.Message}" });
            }

            var host = HttpContext.Request.Host.ToUriComponent();
            var targetDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");

            string downloadedFilePath = await url
                .WithHeader("User-Agent", "MyApp")
                .DownloadFileAsync(targetDirectory);

            using (var stream = new FileStream(downloadedFilePath, FileMode.Open, FileAccess.Read))
            {

                var fileContent = new StreamContent(stream);

                string actualFileName = Path.GetFileName(downloadedFilePath);

                var cmsContentSubmitted = await _cmsApiClient.CreateContentAsync(
                    fileContent,
                    actualFileName,
                    cmsUser.User.Id,
                    true,
                    "Nod",
                    true,
                    false);

                if (cmsContentSubmitted is null)
                {
                    return BadRequest(new { error = "Failed to create content in CMS." });
                }
            }

            // 3. Формуємо URL для відповіді, використовуючи фактичне ім'я файлу
            string fileUrl = $"{HttpContext.Request.Scheme}://{host}/img/{Path.GetFileName(downloadedFilePath)}";

            ContentModel model = new ContentModel
            {
                Alt = "parsed",
                Description = "parsed",
                Source = new Uri(fileUrl),
                UserId = 1, // Можливо, тут теж варто використати cmsUser.User.Id?
                Hidden = false,
            };

            string serialized = JsonConvert.SerializeObject(model);

            await this.redisDb.StringSetAsync($"{Guid.NewGuid().ToString()}:fapeza", fileUrl);

            return Ok(url);
        }
    }
}
