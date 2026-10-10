import {LogoutPage} from '../../pages/LogoutPage';
import {LoginPage} from '../../pages/LoginPage';

const logoutPage = new LogoutPage();
const loginPage = new LoginPage();

describe('Logout Test', () => {
  it('Test 1 - Logout after successfully logged in', () => {
    cy.fixture('users').then((users) => {
      const user = users.validUser;
      loginPage.visit();
      loginPage.enterUsername(user.username);
      loginPage.enterPassword(user.password);
      loginPage.clickLogin();

      logoutPage.logout();
      cy.get('body').should('contain', 'Accepted usernames are:');
    });
  });
});