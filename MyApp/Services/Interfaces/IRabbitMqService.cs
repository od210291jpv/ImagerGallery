namespace MyApp.Services.Interfaces
{
    public interface IRabbitMqService
    {
        void SendMessage(object obj);
        void SendMessage(string message, string queue);
        void SendMessage(object obj, string queue);
    }
}
