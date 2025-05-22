/// <reference types="cypress" />

import { onNavigation } from "../../../support/page_objects/navigation"

describe("Gallery page search functionality checks", () => {
    beforeEach("Navigate to Gallery page", () => {
        cy.visit("/");
        onNavigation.login("Paul01", "Password");
        onNavigation.galleryPage();
    });

    it("Uer can search for a post in Gallery", () => {

        cy.request("GET", "/Home/images?showHidden=true").as("allContent");
        cy.get("@allContent").then((response) => {
            
        });

        const search = cy.get("#search-input");
        search.type("Img");

        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure).length.to.above(0)
            });

        search.clear().type('Drink beer on Moon');

        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure).to.have.length(1);
            });
    });
});