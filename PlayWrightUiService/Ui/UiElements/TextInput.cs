using Microsoft.Playwright;

namespace PlayWrightUiService.Ui.UiElements
{
    public class TextInput : BaseUiElement
    {
        public TextInput(IPage page, string locator) : base(page, locator)
        {
        }

        public async Task<TextInput> FillAsync(string inputText) 
        {
            await this.Page.Locator(this.Locator).ClearAsync();
            await this.Page.Locator(this.Locator).FillAsync(inputText);
            return this;
        }
    }
}
