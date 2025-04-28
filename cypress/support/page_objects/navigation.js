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
}

export const onNavigation = new Navigation();