import {LoginPage} from '../../pages/LoginPage';
import {LogoutPage} from '../../pages/LogoutPage';
import {CartPage} from '../../pages/CartPage';

const loginPage = new LoginPage();
const logoutPage = new LogoutPage();
const cartPage = new CartPage();

describe('Security Test Suite', () => {
    

it('SEC01 - Login with invalid credentials', () => {
        loginPage.visit();
        loginPage.clickLogin();
        cy.get('[data-test="error"]').should('be.visible');
    });

it('SEC02 - Login with empty credentials', () => {
    loginPage.visit();
    cy.get('[data-test="username"]').should('have.value', '');
    cy.log('Username field is empty');

    cy.get('[data-test="password"]').should('have.value', '');
    cy.log('Password field is empty');

    loginPage.clickLogin();

    cy.get('[data-test="error"]').should('be.visible');
});

//Check that the password field is masked and not visible in plain text in DOM -> to be comlemented with a test for the HTTPS connection and the secure cookie attributes (SEC15)
it('SEC03 - Password is masked', () => {
    loginPage.visit();

    cy.get('[data-test="password"]')
        .should('have.attr', 'type', 'password');
});

it.skip('SEC04 - Unauthorized access to inventory page', () => {  

 });

it.skip('SEC-05 - Unauthorized access to cart', () => {
    
});

it.skip('SEC06 - Logout invalidates access', () => {

});

it.skip('SEC-07 - Session timeout after inactivity', () => {
   
});

it.skip('SEC08 - Security headers', () => {

});

it.skip('SEC09 - Sensitive information exposure', () => {
});

it.skip('SEC10 - Input validation and sanitization', () => {});

it.skip('SEC11 - Brute force protection', () => {});

it.skip('SEC12 - Cross-Site Request Forgery (CSRF) protection', () => {});

it.skip('SEC13 - Cross-Site Scripting (XSS) protection', () => {});

it.skip('SEC14 - Clickjacking protection', () => {});

it.skip('SEC15 - Secure cookie attributes', () => {});  

it.skip('SEC16 - Security logging and monitoring', () => {});

it.skip('SEC17 - Security misconfiguration', () => {});

it.skip('SEC18 - Insecure direct object references (IDOR)', () => {});  

it.skip('SEC19 - Security testing of third-party libraries and dependencies', () => {});

it.skip('SEC20 - Security testing of API endpoints', () => {});

it.skip('SEC21 - Security testing of file uploads and downloads', () => {});

it.skip('SEC22 - Security testing of session management', () => {});

it.skip('SEC23 - Security testing of authentication and authorization mechanisms', () => {});

it.skip('SEC24 - Security testing of data storage and encryption', () => {});   

it.skip('SEC25 - Security testing of error handling and exception management', () => {});

it.skip('SEC26 - Security testing of logging and monitoring mechanisms', () => {});

it.skip('SEC27 - Security testing of input validation and output encoding', () => {});      

it.skip('SEC28 - Security testing of third-party integrations and APIs', () => {});

it.skip('SEC29 - Security testing SQL injection and other injection attacks', () => {});

it.skip('SEC30 - Security testing of denial-of-service (DoS) and distributed denial-of-service (DDoS) attacks', () => {})



});