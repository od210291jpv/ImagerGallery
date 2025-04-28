export class GalleryPagination
{
    goToPage(pageNumber)
    {
        cy.get(".page-number").contains(pageNumber).click();
        return this;
    }

    goToFirstPage()
    {
        cy.get(".page-number").first().as("firstPage").click();
        cy.get("@firstPage").then(page => {
            expect(+page.text()).to.be.equal(1);
        });
    }

    goToLastPage()
    {
        cy.get(".page-number").last().as("lastPage").click();
        cy.get(".page-number").as("pages").get("@pages").then(pages => {
            const length = pages.length;
            cy.get("@lastPage").then(lastPage => {
                expect(+lastPage.text()).to.be.equal(length);
            });
        });
    }

    isPageButtonActive(pageNumber)
    {
        cy.get(".page-btn.page-number.active").contains(pageNumber);
    }

    isPageButtonNotActive(pageNumber)
    {
        cy.get(".page-btn.page-number").contains(pageNumber).invoke("attr", "class").should("not.contain", "active");
    }
}

export const galleryPagination = new GalleryPagination();