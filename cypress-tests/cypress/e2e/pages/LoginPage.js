export class LoginPage{
    visit(){
        cy.visit('https://www.saucedemo.com/')
    }
    //define variables to not hardcode the values
    username = '[data-test="username"]'
    password = '[data-test="password"]'
    login_button = '[data-test="login-button"]'

    enterUsername(user){
        cy.get(this.username).type(user)
    }

    enterPassword(password){
        cy.get(this.password).type(password)
    }
    clickLogin(){
        cy.get(this.login_button).click()
    }
}