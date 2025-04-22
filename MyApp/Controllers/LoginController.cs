using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers
{
    [Route("[controller]")]
    public class LoginController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpGet("/register")]
        public IActionResult Register()
        {
            return View();
        }
    }
}
