export class CheckoutCompletePage {
  private readonly completeHeader = '[data-test="complete-header"]';

  assertLoaded(): void {
    cy.url().should('include', '/checkout-complete.html');
  }

  assertSuccessMessage(message: string): void {
    cy.get(this.completeHeader).should('be.visible').and('have.text', message);
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();
