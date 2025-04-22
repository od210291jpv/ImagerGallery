/// <reference types="cypress" />

describe("Imager draft page UI tests", () => { // some king of test suite
    it("Open Main Page and check elements presence", () => { // specific test
        cy.visit("/");
        cy.search("board");
        const resultImage = cy.get("[data-image]");
        expect(resultImage).to.not.equal(null);
        resultImage.should('have.class', 'imgContent');

    });
    it("User should be able to proceed to gallery via page URL", () => {
        cy.visit("/main");
        cy.contains("2025 - Imager");
    });
    it("User should be able to proceed to gallery", () => {
        cy.visit("/")
            .contains("Gallery")
            .click()
            .get("#search-input").as("search");
        expect('@search').to.not.equal(null);
    });
});