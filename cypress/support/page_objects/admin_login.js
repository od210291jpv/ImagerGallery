export class AdminLogin
{
    login(login, password)
    {
        cy.get("#username").as("usernameInput");
        cy.get("#password").as("password");

        cy.get("@usernameInput").clear();
        cy.get("@usernameInput").type(login);

        cy.get("@password").clear();
        cy.get("@password").type(password);

        cy.get('[type="submit"]').click();
        return this; // make return another page object
    }
}

export const adminLogin = new AdminLogin();