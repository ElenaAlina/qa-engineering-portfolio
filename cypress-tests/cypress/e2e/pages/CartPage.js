export class CartPage{
    visit(){
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type(user.username)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
    }
    //define variables to not hardcode the values
    products = '[data-test="title"]'
    addToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]'
    elements = {
        title:'.title'
    }
    checkProducts(){
        cy.get(this.elements.title)
            .should('be.visible')
            .and('have.text','Products')
    }   

    clickAddToCart(){
        cy.get(this.addToCartButton).click()
    }
}