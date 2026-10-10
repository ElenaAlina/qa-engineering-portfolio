import {LoginPage} from '../../pages/LoginPage';
import {CartPage} from '../../pages/CartPage'

describe('Cart Test Suite', () => {
    const cartPage = new CartPage()
    const loginPage = new LoginPage()
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser
            loginPage.visit()
            loginPage.enterUsername(user.username)
            loginPage.enterPassword(user.password)
            loginPage.clickLogin()
        })
    })

    it('Add to cart & Remove items from cart', () => {   
        cartPage.checkProducts()
        cartPage.clickAddToCart()
        cartPage.openCart()
        cy.get('.shopping_cart_badge').should('have.text', '1')

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="continue-shopping"]').should('be.visible').click()
        cy.get('.shopping_cart_badge').should('have.text','1')

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="continue-shopping"]').should('be.visible').click()

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','2')
        cy.wait(2000)

        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','1')
        cy.wait(2000)

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','2')

        

        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('not.exist')
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text','2')
            
    })
    it('Checkout process', () => {
        //check the products and add an item to the cart
        cartPage.checkProducts()
        cartPage.clickAddToCart()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        
        //click on the cart and proceed to checkout
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').should('be.visible').click()
        
        //add the checkout information and cancel the process
        cy.get('[data-test="firstName"]').type('Andrew')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="cancel"]').should('be.visible').click()

        //click on the cart and proceed to checkout
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').should('be.visible').click()

        //add the checkout information and continue the process
        cy.get('[data-test="firstName"]').type('Mark')
        cy.get('[data-test="lastName"]').type('Poe')
        cy.get('[data-test="postalCode"]').type('56789')
        cy.get('[data-test="continue"]').should('be.visible').click()

        //finish the checkout process and verify the order completion
        cy.get('[data-test="finish"]').should('be.visible').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('cart_item').should('have.length','0')
    })

    it('Check cart API requests', () => {
    // Login is already performed in beforeEach()

    // Verify inventory page
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')

    // Add one product to cart
    cy.get('[data-test^="add-to-cart"]').first().click()

    // Open cart
    cy.get('[data-test="shopping-cart-link"]').click()

    // Verify cart contains one item
    cy.get('.cart_item').should('have.length', 1)        

    })

})