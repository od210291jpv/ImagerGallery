using Microsoft.Playwright;

namespace PlayWrightUiService.Ui.UiElements
{
    public class Button : BaseUiElement
    {
        public Button(IPage page, string locator) : base(page, locator)
        {
        }

        public async Task ClickAsync() 
        {
            await this.Page.ClickAsync(this.Locator);
        }
    }
}
