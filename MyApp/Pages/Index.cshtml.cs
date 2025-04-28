using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;

namespace MyApp.Pages;

public class IndexModel : PageModel
{
    private readonly IMemoryCache cache;
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger, IMemoryCache memoryCache)
    {
        this.cache = memoryCache;
        _logger = logger;
    }

    public IActionResult OnGet(string? userId)
    {

        if (userId == null) 
        {
            return Redirect("/home/default");
        }

        var tokenValue = this.cache.Get(int.Parse(userId));



        if (tokenValue != null) 
        {
            return Redirect("/Feed");
        }

        return Redirect("/home/default");
    }
}
