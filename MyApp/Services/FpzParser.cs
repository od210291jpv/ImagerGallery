using RestSharp;
using HtmlAgilityPack;

namespace FpzParser
{
    public class FpzParser : Interfaces.IContentParser
    {
        public string Parse(string contentLink)
        {
            RestClient client = new RestClient();



            var content = client.ExecuteGet(new RestRequest(contentLink, Method.Get));

            HtmlDocument htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(content.Content ?? "");
            var debuig = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='flex-1']");
            var debug2 = debuig.SelectSingleNode("a");
            string? stringCont = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='flex-1']")?.SelectSingleNode("a").GetAttributeValue("href", string.Empty);

            return stringCont ?? string.Empty;
        }
    }
}
