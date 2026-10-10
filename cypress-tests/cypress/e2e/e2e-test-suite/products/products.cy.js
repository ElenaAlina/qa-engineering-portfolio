import {LoginPage} from '../../pages/LoginPage';

describe('Product details page - Verify product details page displays correct information', () => {
    const loginPage = new LoginPage();
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser;   
            loginPage.visit();
            loginPage.enterUsername(user.username);
            loginPage.enterPassword(user.password);
            loginPage.clickLogin();
        });
    });
    it('TC01 - Verify product list is displayed', () => {
       cy.get('[data-test="inventory-container"]')
            .should('be.visible')        
            
    });
    it('TC02 - Check the number of products listed on the product list page', () => { 
        cy.get('[data-test="inventory-item"]').then(($products) =>{
        
        const productCount = $products.length;
        cy.log('Number of products: ${productCount}');
        expect(productCount).to.be.greaterThan(0);
    });
});
it('TC03 - Check product details page displays correct information', () => {
    cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('be.visible');
    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('be.visible');
    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]').should('be.visible');
    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');
    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should('be.visible');    

});
    it('TC-04 - Product added to cart: Verify product details page displays correct information', () => {
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
        cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
        cy.get('[data-test="cart-list"]').should('be.visible');
        cy.get('[data-test="cart-quantity-label"]').should('be.visible');
        cy.get('[data-test="cart-desc-label"]').should('be.visible');
        cy.get('[data-test="item-quantity"]').should('be.visible');
        cy.get('[data-test="inventory-item-desc"]').should('be.visible');
        cy.get('[data-test="inventory-item-price"]').should('be.visible');
        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').should('be.visible');
        cy.get('[data-test="continue-shopping"]').should('be.visible');
        cy.get('[data-test="checkout"]').should('be.visible');
        cy.get('[data-test="inventory-item-name"]').should('be.visible').click();
        cy.get('.inventory_details_desc_container').should('be.visible');
        cy.get('[data-test="item-test.allthethings()-t-shirt-(red)-img"]').should('be.visible');
        cy.get('[data-test="inventory-item-name"]').should('be.visible');
        cy.get('[data-test="inventory-item-desc"]').should('be.visible');
        cy.get('[data-test="inventory-item-price"]').should('be.visible');
        cy.get('[data-test="remove"]').should('be.visible');
        cy.get('[data-test="back-to-products"]').should('be.visible');

    });
});