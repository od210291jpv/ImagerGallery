using Microsoft.Playwright;

using PlayWrightUiService.Ui.Interfaces;

namespace PlayWrightUiService.Ui.UiElements
{
    public class BaseUiElement : IUielement
    {
        protected IPage Page { get; }

        public string Locator { get; init; }

        public BaseUiElement(IPage page, string locator)
        {
            this.Page = page;
            this.Locator = locator;
        }

        public virtual IUielement Get()
        {
            return this;
        }
    }
}
