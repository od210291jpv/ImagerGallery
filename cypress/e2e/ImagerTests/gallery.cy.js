/// <reference types="cypress" />

describe("Gallery page tests", () => {
    it("User can open gallery page", () => {
        cy.visit("/").contains("Gallery").click();
        cy.contains('Gallery Feed');
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