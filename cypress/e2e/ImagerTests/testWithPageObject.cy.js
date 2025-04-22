/// <reference types="cypress" />

import { onNavigation } from "../../support/page_objects/navigation"
import { adminLogin } from "../../support/page_objects/admin_login"

describe("Page object approach test", () => {
    beforeEach("open the app", () => {
        cy.visit("/main");
    });

    it("Gallery", () => {
        onNavigation.galleryPage().administrationLogin().login("Admin", "Password");
    });
});