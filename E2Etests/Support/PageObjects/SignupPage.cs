using Microsoft.Playwright;

using PlayWrightUiService.Ui.UiElements;

namespace E2Etests.Support.PageObjects
{
    public class SignupPage : BasePage
    {
        public TextInput Logininput 
        {
            get => new TextInput(this.page, "#registerLogin");
        }

        public TextInput PasswordInput
        {
            get => new TextInput(this.page, "#registerPassword");
        }

        public TextInput RepeatPasswordInput
        {
            get => new TextInput(this.page, "#repeatPassword");
        }

        public Button SubmitButton 
        {
            get => new Button(this.page, "button");
        }

        public SignupPage(IPage initialPage) : base(initialPage)
        {
        }

        public async Task<LoginPage> SignupUserAsync(string login, string password, string repeatPassword) 
        {
            await this.Logininput.FillAsync(login);
            await this.PasswordInput.FillAsync(password);
            await this.RepeatPasswordInput.FillAsync(repeatPassword);
            await this.SubmitButton.ClickAsync();

            return new LoginPage(this.page);
        }
    }
}