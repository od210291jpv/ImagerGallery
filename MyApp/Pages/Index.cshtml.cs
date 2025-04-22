using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Pages;

public class IndexModel : PageModel
{
    public string[] Images { get; set; }
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
        //var imgs  = Directory.GetFiles("../MyApp/wwwroot/Img");
        ////Path.GetFileName
        //this.Images = imgs.Select(i => Path.GetFileName(i)).ToArray();
    }

    public void OnGet()
    {

    }
}
