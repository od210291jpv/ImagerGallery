import { adminLogin } from "./admin_login";

export class Navigation {
    mainPage()
    {
        cy.contains("Home").click();
    }

    galleryPage()
    {
        cy.contains("Gallery").click();
        return this;
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
}

export const onNavigation = new Navigation();