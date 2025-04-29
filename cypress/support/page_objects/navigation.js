import { adminLogin } from "./admin_login";
import { galleryPage } from "./gallery_page";

export class Navigation {
    mainPage()
    {
        cy.contains("Home").click();
    }

    galleryPage()
    {
        cy.contains("Gallery").click();
        return galleryPage;
    }

    administrationLogin()
    {
        cy.contains("Administration").click();
        return adminLogin;
    }

    privacyPage()
    {
        cy.contains("Privacy").click();
        return this;
    }

    login(login, password)
    {
        cy.visit("/");

        const loginInput = cy.get("#login");
        const passwordInput = cy.get("#password");
        const loginForm = cy.get("#loginForm");

        loginInput.click().type(login);
        passwordInput.click().type(password);
        loginForm.submit();
    }
}

export const onNavigation = new Navigation();