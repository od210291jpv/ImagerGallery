namespace PlayWrightUiService.Ui.Interfaces
{
    public interface IUielement
    {
        public IUielement Get();

        public string Locator { get; init; }        
    }
}
