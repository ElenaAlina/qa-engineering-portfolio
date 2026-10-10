export class LogoutPage{
    visit(){
        cy.visit('https://www.saucedemo.com/');
    }
    logout(){
        cy.get('#react-burger-menu-btn').click();
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();

    }
    
    
}