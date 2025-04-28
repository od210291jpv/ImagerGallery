describe("Gallery page search functionality checks", () => {
    beforeEach("Navigate to Gallery page", () => {
        cy.visit("/");
        onNavigation.galleryPage();
    });

    it("Uer can search for a post in Gallery", () => {

        cy.request("GET", "/Home/images?showHidden=true").as("allContent");
        cy.get("@allContent").then((response) => {
            
        });

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