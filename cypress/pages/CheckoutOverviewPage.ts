import { Product } from '../support/types';

export class CheckoutOverviewPage {
  private readonly title = '[data-test="title"]';
  private readonly item = '[data-test="inventory-item"]';
  private readonly subtotalLabel = '[data-test="subtotal-label"]';
  private readonly finishButton = '[data-test="finish"]';

  assertLoaded(): void {
    cy.url().should('include', '/checkout-step-two.html');
    cy.get(this.title).should('have.text', 'Checkout: Overview');
  }

  assertSummary(products: Product[]): void {
    cy.get(this.item).should('have.length', products.length);
    products.forEach(({ name }) => cy.contains(this.item, name).should('be.visible'));

    const expectedTotal = products
      .reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0)
      .toFixed(2);
    cy.get(this.subtotalLabel).should('contain.text', `$${expectedTotal}`);
  }

  finish(): void {
    cy.get(this.finishButton).click();
  }
}

export const checkoutOverviewPage = new CheckoutOverviewPage();
