using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using PlayWrightUiService.Configuration;

using UiService = PlayWrightUiService.PlayWrightUiService;

namespace E2Etests
{
    public class BaseTest
    {

        protected ServiceProvider ServiceProvider { get; set; }

        public BaseTest()
        {
            IConfigurationRoot configurationRoot = new ConfigurationBuilder()
                .SetBasePath(TestContext.CurrentContext.TestDirectory)
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var services = new ServiceCollection()
                .Configure<UiServiceSettings>(configurationRoot.GetSection(nameof(UiServiceSettings)))
                .AddSingleton<UiService>();

            this.ServiceProvider = services.BuildServiceProvider();
        }
    }
}
