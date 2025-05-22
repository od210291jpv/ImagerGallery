using Microsoft.Playwright;

using PlayWrightUiService.Ui.UiElements;

namespace E2Etests.Support.PageObjects
{
    public class LoginPage : BasePage
    {
        public TextInput LoginInput 
        {
            get => new TextInput(this.page, "#login");
        }


        public TextInput PasswordInput 
        {
            get => new TextInput(this.page, "#password");
        }

        public Button LoginButton 
        {
            get => new Button(this.page, "[type='submit']");
        }

        public Link SignupLink 
        {
            get => new Link(this.page, "[href='/register']");
        }

        public LoginPage(IPage initialPage) : base(initialPage)
        {
        }

        public async Task<FeedPage> LoginAsync(string login, string password) 
        {
            await this.LoginInput.FillAsync(login);
            await this.PasswordInput.FillAsync(password);            
            await page.Locator("[type='submit']").ClickAsync();

            return new FeedPage(this.page);
        }

        public async Task<SignupPage> GoToSignupPageAsync() 
        {
            await this.SignupLink.ClickAsync();
            return new SignupPage(this.page);
        }
    }
}
