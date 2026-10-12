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
        const user = users.validUser;

        loginPage.visit();
        loginPage.enterUsername(user.username);
        loginPage.enterPassword(user.password);
        loginPage.clickLogin();

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

it('SEC7 - Cross-Site Scripting (XSS) protection', () => {
    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    loginPage.visit();
    loginPage.enterUsername('<script>alert(1)</script>');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.get('[data-test="error"]').should('be.visible');
    cy.url().should('not.include', '/inventory.html');

    cy.get('@alertStub').should('not.have.been.called');
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
// SEC09.1 - Checks that the URL, including query parameters and fragments, does not exposing sensitive information after login.
it('SEC09.1 - Sensitive information exposure in URL', () => {
    cy.fixture('users').then((users) => {
    const user = users.validUser;

    loginPage.visit();
    loginPage.enterUsername(user.username);
    loginPage.enterPassword(user.password);
    loginPage.clickLogin();

    cy.url().should('not.include', user.password);
    cy.url().should('not.include', user.username);
});

});

// SEC09.2 - Checks that sensitive information, such as the password, is not displayed in the page content after login.
it('SEC09.2 - Sensitive information exposure in page content', () => {
    cy.fixture('users').then((users) => {
    const user = users.validUser;

    loginPage.visit();
    loginPage.enterUsername(user.username);
    loginPage.enterPassword(user.password);
    loginPage.clickLogin();

    cy.url().should('not.include', user.password);
    cy.url().should('not.include', user.username);

    cy.get('body').should('not.contain', user.password);
    
});
    
});

// SEC09.3 - Checks that the password is not stored in localStorage or sessionStorage.
it('SEC09.3 - Sensitive information exposure in browser storage', () => {
cy.fixture('users').then((users) => {
const user = users.validUser;

    cy.window().then((win) => {
        const localStorageData = JSON.stringify(win.localStorage);
        const sessionStorageData = JSON.stringify(win.sessionStorage);

        expect(localStorageData).not.to.include(user.password);
        expect(sessionStorageData).not.to.include(user.password);
    });
});

});

// SEC09.4 - Checks that sensitive information is not displayed after logout and that protected pages cannot be accessed without authentication.
it('SEC09.4 - Sensitive information exposure after logout', () => {
cy.fixture('users').then((users) => {
const user = users.validUser;
    loginPage.visit();
    loginPage.enterUsername(user.username);
    loginPage.enterPassword(user.password);
    loginPage.clickLogin();
    logoutPage.logout();

    cy.get('[data-test="password"]').should('have.value', '');
  });
});
//Input validation and sanitization to check if the correctly validates the input data and sanitizes it to prevent errors or security vulnerabilities
it('SEC10.1 - Input validation and sanitization -> Empty username and complete password', () => {
cy.fixture('users').then((users) => {
const user = users.validUser;
    loginPage.visit();
    loginPage.enterPassword(user.password);
    loginPage.clickLogin();

    cy.get('.error-message-container').should('be.visible').and('contain','Username is required');
    cy.url().should('not.include', '/inventory.html');
  });
});
it('SEC10.2 - Input validation and sanitization -> Complete username and empty password', () => {
cy.fixture('users').then((users) => {
const user = users.validUser;
    loginPage.visit();
    loginPage.enterUsername(user.username);
    loginPage.clickLogin();

    cy.get('.error-message-container').should('be.visible').and('contain','Password is required');
    cy.url().should('not.include', '/inventory.html');
  });
});
it('SEC10.3 - Input validation and sanitization -> Spaces included in the username and password fields', () => {
cy.fixture('users').then((users) => {
const user = users.validUser;
    loginPage.visit();
    loginPage.enterUsername('   ');
    loginPage.enterPassword('  ');
    loginPage.clickLogin();

    cy.get('.error-message-container').should('be.visible').and('contain','Username and password do not match any user in this service');
    cy.url().should('not.include', '/inventory.html');
  });    
});
it('SEC10.4 - Input validation and sanitization -> Special characters in username and password fields', () => {
 cy.fixture('users').then((users) => {
const user = users.validUser;
    loginPage.visit();
    loginPage.enterUsername('<>@#$%^&*');
    loginPage.enterPassword('<>@#$%^&*');
    loginPage.clickLogin();

    cy.get('.error-message-container').should('be.visible').and('contain','Username and password do not match any user in this service');
    cy.url().should('not.include', '/inventory.html');
  });      
});
//the app validates a long input without blocking or raising errors, but it does not sanitize the input, 
// which could lead to security vulnerabilities if the input is used in a context where it could be executed as code or interpreted as a command
it('SEC10.5 - Input validation and sanitization -> Input length validation', () => {
    const longUsername = 'a'.repeat(500);
    loginPage.visit();
    cy.get('[data-test="username"]').type(longUsername, { delay: 0 }).should('have.value', longUsername);;
    loginPage.enterPassword('secret_sauce'); 
    loginPage.clickLogin(); 
    cy.get('[data-test="error"]').should('be.visible'); 
    cy.url().should('not.include', '/inventory.html');
});
//====================
// SEC10.6-SEC10.8 overlap with SEC13 and SEC29, but focus on input validation
// and handling of potentially malicious input, while SEC13 and SEC29 focus
// specifically on XSS and SQL injection security testing.
//====================
// Checks that an HTML markup string entered in the login fields is rejected
// and does not result in unexpected behavior. This does not prove HTML sanitization. 
it('SEC10.6 - Input validation and sanitization -> HTML markup string', () => {
loginPage.visit(); 
loginPage.enterUsername('<b>test</b>'); 
loginPage.enterPassword('secret_sauce'); 
loginPage.clickLogin();   
cy.get('[data-test="error"]').should('be.visible'); 
cy.url().should('not.include', '/inventory.html');
});
// Checks that a SQL injection-like payload does not bypass authentication.
// This does not prove complete protection against SQL injection.
it('SEC10.7 - Input validation and sanitization -> SQL payload', () => {
loginPage.visit();
loginPage.enterUsername("' OR '1'='1"); 
loginPage.enterPassword("' OR '1'='1"); 
loginPage.clickLogin();
cy.get('[data-test="error"]').should('be.visible'); 
cy.url().should('not.include', '/inventory.html');    
});
// Checks that an XSS-like payload entered in the login fields does not execute
// JavaScript or cause unexpected behavior. This does not prove complete XSS protection.
it('SEC10.8 - Input validation and sanitization -> XSS payload', () => {
const alertStub = cy.stub().as('alertStub'); 
cy.on('window:alert', alertStub); 
loginPage.visit(); 
loginPage.enterUsername('<script>alert(1)</script>'); 
loginPage.enterPassword('secret_sauce'); 
loginPage.clickLogin(); cy.get('[data-test="error"]').should('be.visible'); 

cy.url().should('not.include', '/inventory.html'); 
cy.get('@alertStub').should('not.have.been.called');    
});
//rejected repeated authentication with invalid data
it('SEC11 - Brute force protection', () => {
    for (let i = 0; i < 5; i++) {
        loginPage.visit();
        loginPage.enterUsername('invalid_user');
        loginPage.enterPassword('wrong_password');
        loginPage.clickLogin();

        cy.get('[data-test="error"]').should('be.visible');
        cy.url().should('not.include', '/inventory.html');

        cy.get('[data-test="username"]').clear();
        cy.get('[data-test="password"]').clear();
    };
});

it('SEC12 - Cross-Site Scripting (XSS) protection', () => {
    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    loginPage.visit();

    loginPage.enterUsername('<script>alert(1)</script>');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.get('[data-test="error"]').should('be.visible');
    cy.url().should('not.include', '/inventory.html');

    cy.get('@alertStub').should('not.have.been.called');
});
//verify the HTTP headers
it('SEC13 - Clickjacking protection -> correct OUTPUT: Failed', () => {
    //following this check marks the test as fail, because the protection is missing on this public website and seems to be some security vulnerabilieties which needs to be checked further
cy.request({
        url: 'https://www.saucedemo.com/',
        failOnStatusCode: false
    }).then((response) => {
        const headers = response.headers;
        const xFrameOptions = headers['x-frame-options'];
        const csp = headers['content-security-policy'];

        const hasXFrameProtection =
            typeof xFrameOptions === 'string' &&
            ['deny', 'sameorigin'].includes(xFrameOptions.toLowerCase());

        const hasCspFrameProtection =
            typeof csp === 'string' &&
            /frame-ancestors\s+[^;]+/i.test(csp);

        expect(
            hasXFrameProtection || hasCspFrameProtection,
            'X-Frame-Options or CSP frame-ancestors protection'
        ).to.equal(true);
    });    
});
//check the cokkie attributes:
//Secure — HTTPS cookie transfer
//HttpOnly — the cookie can't be accessed trough document.cookie Javascript
//SameSite — controlls cookie's transfer at cross-site level
it('SEC14 - Secure cookie attributes', () => {
loginPage.visit();

loginPage.enterUsername('standard_user');
loginPage.enterPassword('secret_sauce');
loginPage.clickLogin();

cy.url().should('include', '/inventory.html');

cy.getCookies().then((cookies) => {
    expect(cookies.length, 'Cookies available after login').to.be.greaterThan(0);

    cookies.forEach((cookie) => {
        cy.log(`Cookie: ${cookie.name}`);
        cy.log(`Secure: ${cookie.secure}`);
        cy.log(`HttpOnly: ${cookie.httpOnly}`);
        cy.log(`SameSite: ${cookie.sameSite}`);
        });
    });
    });
//checks if server details are exposed
it('SEC15 - Security misconfiguration - correct OUTPUT: Failed', () => {
cy.request({
        url: 'https://www.saucedemo.com/',
        failOnStatusCode: false
    }).then((response) => {
        const headers = response.headers;

        const serverHeader = headers['server'];
        const poweredByHeader = headers['x-powered-by'];

        expect(
            serverHeader,
            'Server header should not disclose server details'
        ).to.be.undefined;

        expect(
            poweredByHeader,
            'X-Powered-By header should not disclose technology details'
        ).to.be.undefined;
    });   
});

it('SEC16 - Security testing of session management', () => {
loginPage.visit();
    loginPage.enterUsername('standard_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.url().should('include', '/inventory.html');

    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();

    cy.url().should('eq', 'https://www.saucedemo.com/');

   cy.request({
    url: 'https://www.saucedemo.com/inventory.html',
    failOnStatusCode: false
}).then((response) => {
    expect(response.status).to.be.oneOf([302, 401, 403, 404]);
}); 
    
});

});
