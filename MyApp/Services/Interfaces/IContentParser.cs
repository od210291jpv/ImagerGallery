namespace FpzParser.Interfaces
{
    public interface IContentParser
    {
        public Task<string> Parse(string contentLink);
    }
}
