export class LoginPage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';

  visit(): void {
    cy.visit('/');
    cy.get(this.loginButton).should('be.visible');
  }

  login(username: string, password: string): void {
    cy.get(this.usernameInput).type(username);
    cy.get(this.passwordInput).type(password, { log: false });
    cy.get(this.loginButton).click();
  }
}

export const loginPage = new LoginPage();
