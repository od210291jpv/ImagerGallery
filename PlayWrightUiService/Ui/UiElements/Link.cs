using Microsoft.Playwright;

namespace PlayWrightUiService.Ui.UiElements
{
    public class Link : BaseUiElement
    {
        public Link(IPage page, string locator) : base(page, locator)
        {
        }

        public async Task ClickAsync() 
        {
            await this.Page.ClickAsync(this.Locator);
        }
    }
}
