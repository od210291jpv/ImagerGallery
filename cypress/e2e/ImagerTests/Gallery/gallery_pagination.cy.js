/// <reference types="cypress" />

import { onNavigation } from "../../../support/page_objects/navigation"
import { galleryPage } from "../../../support/page_objects/gallery_page"

describe("Check Gallery page pagination functionality", () => {

    beforeEach("Navigate to Gallery page", () => {
        cy.visit("/");
        onNavigation.galleryPage();
    });

    it("If gallery has more than 12 items, pagination buttons should be visible", () => {
        galleryPage
            .assertGalleryHasItems(12)
            .assertPaginationPagesToBeGreatherThen(1);

        cy.request("GET", "/Home/images?showHidden=true").as("allContent");

        cy.get("@allContent").then(xhr => {
            galleryPage.galleryItemDoesMatchExpected(0, xhr.body[0].source);
        });

        galleryPage.pagination.goToPage(2);

        cy.get("@allContent").then(xhr => {
            galleryPage.galleryItemDoesNotMatchExpected(0, xhr.body[0].source);
        });

        galleryPage.pagination.isPageButtonActive(2);
        galleryPage.pagination.isPageButtonNotActive(1);
    });

    it("Pagination boundary values", () => {
        galleryPage.pagination.goToFirstPage();
        galleryPage.assertGalleryHasItems(12);
        galleryPage.pagination.goToLastPage();
        galleryPage.assertGalleryHasItemsGreatherThan(0);
    });
});