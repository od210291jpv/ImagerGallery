// See https://aka.ms/new-console-template for more information
using Bogus;
using MediaExporter.ApiClient;
using System.Text.RegularExpressions;

var files = Directory.GetFiles(@"Z:\Paul\ing");

ApiClient apiClient = new ApiClient();

await apiClient.ExportMedia(files);
await apiClient.ExportPersistanceMedia(files);

Console.WriteLine("All media exported.");
Console.WriteLine("Pushing to Redis...");

var pushResponse = await apiClient.PushToRedis(files.Length);

Console.WriteLine($"Push to Redis response status: {pushResponse}");