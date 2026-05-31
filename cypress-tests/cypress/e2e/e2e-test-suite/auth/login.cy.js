import {LoginPage} from '../../pages/LoginPage'

const loginPage = new LoginPage()

describe('Login Test', () => {
  it('TC01 - Login successfully with valid credentials', () => {
    cy.visit('https://www.saucedemo.com/')
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    
  })

    it('TC02 - Login failed with invalid username', ()=>{
      cy.visit('https://www.saucedemo.com/')
      loginPage.enterUsername('standard_user1')
      loginPage.enterPassword('secret_sauce')
      loginPage.clickLogin()
    })
    it('TC03 - Login failed with invalid password', ()=>{
      cy.visit('https://www.saucedemo.com/')
      loginPage.enterUsername('standard_user')
      loginPage.enterPassword('secret_sauce1')
      loginPage.clickLogin()
    })
    it('TC04 - Login failed no credentials', ()=>{
      cy.visit('https://www.saucedemo.com/')
      loginPage.clickLogin()
    })
})
//These test cases are basic ones to show the Login functionality. 
//More advanced test cases are on the product and cart suites.