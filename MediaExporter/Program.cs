// See https://aka.ms/new-console-template for more information
using Bogus;
using MediaExporter.ApiClient;
using System.Text.RegularExpressions;

//string[] files = Directory.GetFiles(@"Z:\Paul\ing");
string[] files = Directory.GetFiles(@"Z:\Paul\ing");
string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


foreach (var f in files) 
{
    string fileExtention = f.Split(".").Last();
    string namePrefix = "";
    var debug = f.Split(@"\").Last().Replace(fileExtention, "");
    Faker faker = new Faker("en");
    if (!chars.Any(c => f.Split(@"\").Last().Replace(fileExtention, "").Contains(c)))
    {
        namePrefix = $"{faker.Name.FirstName()}.";
    }
    else 
    {
        string randomStr = chars[new Random().Next(0, chars.Length - 1)].ToString();
        namePrefix = Regex.Replace(f.Split(@"\").Last().Replace(fileExtention, ""), @"\d", randomStr);
    }

    string newFileName = @$"Z:\Paul\ing\{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}_{namePrefix}{fileExtention}";

    File.Move(f, newFileName);
}

files = Directory.GetFiles(@"Z:\Paul\ing");

ApiClient apiClient = new ApiClient();

await apiClient.ExportMedia(files);

Console.WriteLine("All media exported.");
Console.WriteLine("Pushing to Redis...");

var pushResponse = await apiClient.PushToRedis(files.Length);

Console.WriteLine($"Push to Redis response status: {pushResponse}");