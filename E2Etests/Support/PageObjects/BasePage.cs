using Microsoft.Playwright;

namespace E2Etests.Support.PageObjects
{
    public class BasePage
    {
        public IPage page;

        public BasePage(IPage initialPage)
        {
            this.page = initialPage;
        }

        public virtual async Task InitAsync(string initialUrl) 
        {
            //Type currType = this.GetType();

            //if (currType == typeof(BasePage))
            //{
            //    await this.page.GotoAsync(initialUrl);
            //}

            await this.page.GotoAsync(initialUrl);

            // log something
        }
    }
}
