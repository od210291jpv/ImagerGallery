/// <reference types="cypress" />

import { onNavigation } from "../../../support/page_objects/navigation"
import { galleryPage } from "../../../support/page_objects/gallery_page"

const itempsPerpage = 12;

describe("Check Gallery page common UI items", () =>
{
    beforeEach("Navigate to Gallery page", () => {
        cy.visit("/");
        onNavigation.login("Paul01", "Password");
        onNavigation.galleryPage();
    })

    it("Check common UI elements", () => {
        cy.get("h1").should("contain", "Gallery Feed");
        cy.get("[type='search']").should("have.id", "search-input");
        cy.get(".gallery-item").eq(0).should("have.class", "gallery-item");

        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure).to.have.length(itempsPerpage);
            });

        galleryPage.assertPaginationPagesToBeGreatherThen(0);        
    })
})