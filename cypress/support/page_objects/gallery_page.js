import { galleryPagination } from "./gallery_pagination"

export class GalleryPage
{
    constructor()
    {
        this.pagination = galleryPagination;
    }

    assertPaginationPagesToBeGreatherThen(then)
    {        
        cy.get('#pagination').then((pagination) => {
            expect(pagination.children.length).to.above(then);
        });

        return this;
    }

    assertGalleryHasItems(count)
    {
        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure).to.have.length(count);
            });

        return this;
    }

    assertGalleryHasItemsGreatherThan(then)
    {
        cy.get(".gallery-container")
            .find("figure")
            .should(($figure) => {
                expect($figure.length).be.greaterThan(then);
            });

        return this;
    }

    galleryItemDoesMatchExpected(itemIndex, expectedValue)
    {                
        cy.get(".gallery-container").find("figure").eq(itemIndex).find("img").invoke("attr", "src").then((href) => {            
            expect(href.toLowerCase()).to.equal(expectedValue.toLowerCase());
        });
    }

    galleryItemDoesNotMatchExpected(itemIndex, expectedValue) {
        cy.get(".gallery-container").find("figure").eq(itemIndex).find("img").invoke("attr", "src").then((href) => {
            expect(href.toLowerCase()).to.not.equal(expectedValue.toLowerCase());
        });
    }

    getGalleryItemDescriptionByIndex(itemIndex, expectedValue) {
        cy.get(".gallery-container").find("figure").eq(itemIndex)
    }

    getGalleryItemAltByIndex(itemIndex, expectedValue) {
        cy.get(".gallery-container").find("figure").eq(itemIndex)
    }

    searchForAPost(searchText)
    {
        const search = cy.get("#search-input");
        search.clear();
        search.type(searchText);
        cy.wait(search);
    }
}

export const galleryPage = new GalleryPage();