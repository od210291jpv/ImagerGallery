using Bogus;

namespace E2Etests.Support.Helpers.DataGenerators.FakeData
{
    public class FakeDataHelper
    {
        private Faker faker;

        public FakeDataHelper()
        {
            this.faker = new Faker("en");
        }

        public string Username 
        {
            get => this.faker.Internet.UserName();
        }

        public string Password 
        { 
            get => this.faker.Internet.Password();
        }
    }
}
