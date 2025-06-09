using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Pages
{

    public class mainModel : PageModel
    {
        public string[] Images { get; set; }

        public mainModel()
        {
            var imgs = Directory.GetFiles("../MyApp/wwwroot/img");
            this.Images = imgs.Select(i => Path.GetFileName(i)).ToArray();
        }

        public void OnGet()
        {
        }
    }
}
