using E2Etests.Support.Helpers.DataGenerators.FakeData;
using E2Etests.Support.PageObjects;

using FluentAssertions;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Playwright;

using UiService = PlayWrightUiService.PlayWrightUiService;

namespace E2Etests
{
    [Parallelizable(ParallelScope.Self)]
    [TestFixture]
    public class Tests : BaseTest
    {
        private const string StartUrl = "http://192.168.88.39:5198/Login";
        private IBrowser browser;

        [OneTimeSetUp]
        public async Task OneTimeSetupAsync() 
        {
            UiService uiService = this.ServiceProvider.GetRequiredService<UiService>();
            this.browser = await uiService.GetBrowserAsync();
        }

        [OneTimeTearDown]
        public async Task OnetimeTeardownAsync() 
        {
            await this.browser.DisposeAsync();
        }

        [Test]
        public async Task HomepageHasPlaywrightInTitleAndGetStartedLinkLinkingtoTheIntroPage()
        {
            IPage page = await this.browser.NewPageAsync();

            var loginPage = new LoginPage(page);
            await loginPage.InitAsync(StartUrl);

            FeedPage feed = await loginPage.LoginAsync("Paul01", "Password");

            ILocator navbar = feed.page.Locator(".navbar-brand");

            string? navbarHeader = await navbar.TextContentAsync();
            navbarHeader.Should().Be("Imager.Web");
        }

        [Test]
        public async Task UserSignupFlowTest() 
        {
            IPage page = await this.browser.NewPageAsync();
            
            FakeDataHelper faker = new();
            var login = faker.Username;
            var password = faker.Password;

            var loginPage = new LoginPage(page);
            await loginPage.InitAsync(StartUrl);

            SignupPage signupPage = await loginPage.GoToSignupPageAsync();
            loginPage = await signupPage.SignupUserAsync(login, password, password);

            var feed = await loginPage.LoginAsync(login, password);
        }

        [Test]
        [Ignore("")]
        public async Task AdminloginFlowTest() 
        { }

        [Test]
        [Ignore("")]
        public async Task LoginFlowTest() 
        { }
    }
    
}
