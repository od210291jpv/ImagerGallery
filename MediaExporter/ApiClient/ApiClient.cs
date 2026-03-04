using RestSharp;
using RestSharp.Serializers.NewtonsoftJson;
using System.Net;

namespace MediaExporter.ApiClient
{
    public class ApiClient
    {
        public async Task<HttpStatusCode[]> ExportMedia(string[] path) 
        {
            RestSharp.RestClient client = new RestSharp.RestClient(configureSerialization: s => s.UseNewtonsoftJson());
            List< HttpStatusCode > responses = new List<HttpStatusCode>();

            int i = 0;

            foreach (var med in path) 
            {
                i++;
                Console.WriteLine($"Exporting: {i}/{path.Length} {med} to server...");
                await Task.Delay(100);
                RestSharp.RestRequest request = new RestSharp.RestRequest(UriHelper.SendMedia(med.Split("/").Last(), hidden: false), RestSharp.Method.Post);
                request.AddFile("File", med, "image/jpeg");

                RestResponse response = await client.ExecuteAsync(request);
                Console.WriteLine($"{med} export, status is :{response.StatusCode}");
                responses.Add(response.StatusCode);
            }

            return responses.ToArray();
        }

        public async Task<HttpStatusCode[]> ExportPersistanceMedia(string[] path)
        {
            RestSharp.RestClient client = new RestSharp.RestClient(configureSerialization: s => s.UseNewtonsoftJson());
            List<HttpStatusCode> responses = new List<HttpStatusCode>();

            int i = 0;

            foreach (var med in path)
            {
                i++;
                Console.WriteLine($"Exporting: {i}/{path.Length} {med} to server...");
                await Task.Delay(100);
                RestSharp.RestRequest request = new RestSharp.RestRequest(UriHelper.SendMediaToPersistence(), RestSharp.Method.Post);
                request.AddFile("File", med, "image/jpeg");

                RestResponse response = await client.ExecuteAsync(request);
                Console.WriteLine($"{med} export, status is :{response.StatusCode}");
                responses.Add(response.StatusCode);
            }

            return responses.ToArray();
        }

        public async Task<HttpStatusCode> PushToRedis(int limit) 
        {
            RestSharp.RestClient client = new RestSharp.RestClient(configureSerialization: s => s.UseNewtonsoftJson());
            RestSharp.RestRequest request = new RestSharp.RestRequest(UriHelper.PushToRedis(limit), Method.Get);
            RestResponse response = await client.ExecuteAsync(request);
            return response.StatusCode;
        }
    }
}
