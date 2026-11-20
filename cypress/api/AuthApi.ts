export class AuthApi {
  private readonly baseUrl: string = Cypress.expose('apiUrl');

  createToken(username: string, password: string): Cypress.Chainable<Cypress.Response<{ token: string }>> {
    return cy.request<{ token: string }>({
      method: 'POST',
      url: `${this.baseUrl}/auth`,
      body: { username, password },
    });
  }
}

export const authApi = new AuthApi();
