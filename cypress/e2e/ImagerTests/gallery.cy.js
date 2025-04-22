/// <reference types="cypress" />

describe("Gallery page tests", () => {
    it("User can open gallery page", () => {
        cy.visit("/").contains("Gallery").click();
        cy.contains('Gallery Feed');
    });

    it("User can click a post in gallery", () => {
        cy.openGallery();
        const gallery = cy.get('#gallery');
        const allItems = gallery.children();

        allItems.first().click();
        allItems.first().should('contain', "Test description number");
        
    });

    it("Uer can search for a post in Gallery", () => {
        cy.openGallery();
        const search = cy.get("#search-input");
        search.type("test");

        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
            expect($figure).to.have.length(1)
        });

        search.clear().type('.webp');

        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure).to.have.length(10);
            });
    });
});