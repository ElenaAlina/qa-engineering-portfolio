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

//implies verifying the access to the inventory link without being authenticated, and checking that the user is redirected to the login page.
it('SEC04 - Unauthorized access to inventory page', () => { 
    cy.visit('https://www.saucedemo.com/inventory.html', {
        failOnStatusCode: false
    });

    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');

    cy.url().should('not.include', '/inventory.html');
 });
//try to access the cart page without being authenticated, and check that the user is redirected to the login page.
//the check is made at the user interface level, by checking that the username and password fields are visible, and that the URL does not include /cart.html
it('SEC-05 - Unauthorized access to cart', () => {
    cy.visit('https://www.saucedemo.com/cart.html', {
        failOnStatusCode: false
    });

    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');

    cy.url().should('not.include', '/cart.html');
});
//checks that the user cannot acces the protected links after the logout, and that the user is redirected to the login page. 
// The check is made at the user interface level, by checking that the username and password fields are visible, 
// and that the URL does not include /inventory.html or /cart.html
it('SEC06 - Logout invalidates access', () => {
    cy.fixture('users').then((users) => {
            const user = users.validUser
            loginPage.visit()
            loginPage.enterUsername(user.username)
            loginPage.enterPassword(user.password)
            loginPage.clickLogin()
        

        cy.url().should('include', '/inventory.html');

        logoutPage.logout();

        cy.get('[data-test="login-button"]').should('be.visible');

        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode: false
        });

        cy.get('[data-test="login-button"]').should('be.visible');
        cy.url().should('not.include', '/inventory.html');
});
});
//check the timeout of the session after a period of inactivity
//Precondition: authenticated user / Action: wait for a period of inactivity / Expected result: user is logged out and redirected to the login page
//BLOCKED - EXPLORATORY CHECK THE EXPIRATION TIME ON SAUCEDEMO.COM - the session timeout is not specified in the documentation, and the session does not expire after a period of inactivity.
it.skip('SEC-07 - Session timeout after inactivity', () => {
   
});

//check the HTTP security headers, such as Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and Strict-Transport-Security.
//Content-Security-Policy (CSP): restricts script sources and reduce XSS attacks
//Strict-Transport-Security(HSTS): indicates on browser to use HTTPS for future connections
//X-Content-Type-Options: the nosniff value, helps MIME type sniffing to be interpreted and reduce the risk of drive-by downloads
//X-Frame-Options: helps prevent clickjacking by limiting the ability of the page to be loaded/embedded in iframe elements
//Referrer-Policy: controls what information about the page of origin is sent in the Referer header
it('SEC08 - Security headers', () => {
    cy.request({
        url: 'https://www.saucedemo.com/',
        failOnStatusCode: false
    }).then((response) => {
        const headers = response.headers;

        cy.log(`CSP: ${headers['content-security-policy'] || 'MISSING'}`);
        cy.log(`HSTS: ${headers['strict-transport-security'] || 'MISSING'}`);
        cy.log(`X-Content-Type-Options: ${headers['x-content-type-options'] || 'MISSING'}`);
        cy.log(`X-Frame-Options: ${headers['x-frame-options'] || 'MISSING'}`);
        cy.log(`Referrer-Policy: ${headers['referrer-policy'] || 'MISSING'}`);
        expect(response.status).to.be.lessThan(500);
        //output on saucedemo.com -> all these headers are missing, but depending on the company's security policies, other headers may be present which helps in protecting 
        // the application from various attacks, such as XSS, clickjacking, and data injection attacks
    });
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