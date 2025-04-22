export class GalleryPage
{
    assertPaginationPagesToBeGreather(then)
    {        
        cy.get('#pagination').then((pagination) => {
            expect(pagination.children.length).to.above(then);
        });        
    }
}

export const galleryPage = new GalleryPage();