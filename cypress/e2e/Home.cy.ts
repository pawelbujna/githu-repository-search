//  Can be overwritten depending on the environment
const HOST_URL = 'http://localhost:3000';

const visitHomePage = (queryParameters?: string) => {
    let host = HOST_URL;

    if (queryParameters) {
        host = `${host}?${queryParameters}`;
    }

    cy.visit(host);
};

describe('Home page', () => {
    it('should open the page', () => {
        visitHomePage();

        cy.title().should('contain', 'Github search');
    });

    it('opens the page with custom query parameters', () => {
        visitHomePage('query=react');

        cy.get('input[type="text"]').should('have.value', 'react');
    });

    it('should refresh the results after changing query in search field', () => {
        visitHomePage();

        cy.get('input[type="text"]').clear().type('freeCodeCamp');

        cy.get('.ant-list-item-meta-title').first().should('contain', 'freeCodeCamp');
    });

    it('should visit different pages', () => {
        visitHomePage();

        cy.get('.ant-pagination-item-2').click();

        cy.url().should('include', 'after=10');

        cy.get('.ant-pagination-item-1').click();

        cy.url().should('include', 'after=0');
    });

    it('should display more results on the page', () => {
        visitHomePage('query=react');

        // Select dropdown
        cy.get('.ant-select-selector').click();

        cy.get('div[title="20 / page"]').click();

        cy.get('.ant-list-item-meta-title').should('have.length', 20);
    });
});
