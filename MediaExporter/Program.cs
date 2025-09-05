// See https://aka.ms/new-console-template for more information
using MediaExporter.ApiClient;

Console.WriteLine("Hello, World!");

string[] files = Directory.GetFiles(@"Z:\Paul\ing");
foreach (var f in files) 
{
    File.Move(f, @$"Z:\Paul\ing\{Guid.NewGuid().ToString().Replace("-", "")}.{f.Split(".").Last()}");
}

files = Directory.GetFiles(@"Z:\Paul\ing");

ApiClient apiClient = new ApiClient();

await apiClient.ExportMedia(files);