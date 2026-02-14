using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace MyApp.Pages
{
    public class pasrerModel : PageModel
    {
        [BindProperty]
        public string UrlInput { get; set; }

        [BindProperty]
        public string SelectedParser { get; set; }

        // This list populates your dropdown
        public List<SelectListItem> ParserOptions { get; set; }

        public void OnGet()
        {
            LoadParsers();
        }

        public void OnPost()
        {
            // Logic for when the "Parse" button is clicked
            // You can access UrlInput and SelectedParser here
            LoadParsers();
        }

        private void LoadParsers()
        {
            ParserOptions = new List<SelectListItem>
            {
                new SelectListItem { Value = "generic", Text = "Generic HTML Parser" },
                new SelectListItem { Value = "xpath", Text = "XPath Selector" },
                new SelectListItem { Value = "regex", Text = "Regex Pattern Matcher" },
                new SelectListItem { Value = "deep", Text = "Deep Crawler (V2)" }
            };
        }
    }
}
