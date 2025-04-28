/// <reference types="cypress" />

import { onNavigation } from "../../../support/page_objects/navigation"
import { galleryPage } from "../../../support/page_objects/gallery_page"

describe("Gallery page post items checks", () => {

    beforeEach("Navigate to Gallery page", () => {
        cy.visit("/");
        onNavigation.galleryPage();
    });

    it("User can click a post in gallery", () => {

        cy.request("GET", "/Home/images?showHidden=true").as("allContent");

        cy.get("@allContent").then(xhr => {            

            cy.openGallery();

            const gallery = cy.get('#gallery');
            const allItems = gallery.children();

            allItems.first().click();
            allItems.first().should('contain', xhr.body[0].description);
        });
    });
});