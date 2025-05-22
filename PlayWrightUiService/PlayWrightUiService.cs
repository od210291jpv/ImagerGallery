using Microsoft.Extensions.Options;
using Microsoft.Playwright;

using PlayWrightUiService.Configuration;
using PlayWrightUiService.Constants.Enums;

namespace PlayWrightUiService
{
    public class PlayWrightUiService
    {
        private UiBrowser browser;

        public UiBrowser Browser 
        { 
            get => browser;
            private set => browser = value; 
        }

        public bool IsHeadless { get; private set; } = true;

        public PlayWrightUiService(IOptionsMonitor<UiServiceSettings> serviceSettings)
        {
            this.Browser = serviceSettings.CurrentValue.Browser;
            this.IsHeadless = serviceSettings.CurrentValue.Headless;
        }

        public async Task<IBrowser> GetBrowserAsync()
        {
            IPlaywright playwright = await Playwright.CreateAsync();

            string browserChannel = Enum.GetName(this.Browser)?.ToLower() ?? "chromium";

            BrowserTypeLaunchOptions browserOption = new BrowserTypeLaunchOptions()
            {
                Channel = browserChannel,
                Headless = this.IsHeadless,
                Args = ["--start-maximized", "--window-size=1920,1080"]
            };

            return await playwright["chromium"].LaunchAsync(browserOption);
        }
    }
}
