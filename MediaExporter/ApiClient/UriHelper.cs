namespace MediaExporter.ApiClient
{
    public static class UriHelper
    {
        public static string SendMedia(string name, int publisherId = 1, bool hidden = true) 
        {
            return $"http://192.168.88.252:8080/Content?Description={name}&PublisherId={publisherId}&Hidden={hidden}&Alt=alt";
        }
    }
}
