import { Product } from '../support/types';

export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly inventoryItem = '[data-test="inventory-item"]';
  private readonly itemName = '[data-test="inventory-item-name"]';
  private readonly itemPrice = '[data-test="inventory-item-price"]';
  private readonly addToCartButton = 'button[data-test^="add-to-cart"]';
  private readonly removeButton = 'button[data-test^="remove"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

  assertLoaded(): void {
    cy.url().should('include', '/inventory.html');
    cy.get(this.title).should('have.text', 'Products');
    cy.get(this.inventoryItem).should('have.length.greaterThan', 1);
  }

  addRandomItemsToCart(count: number): Cypress.Chainable<Product[]> {
    const added: Product[] = [];

    return cy
      .get(this.inventoryItem)
      .then(($items) => {
        // for this part I did use AI for the solution, haven't used random samples in a bit
        const indexes = Cypress._.sampleSize(Cypress._.range($items.length), count);

        indexes.forEach((index) => {
          // re-query each time, the card re-renders after clicking
          cy.get(this.inventoryItem)
            .eq(index)
            .within(() => {
              cy.get(this.itemName).invoke('text').then((name) => {
                cy.get(this.itemPrice).invoke('text').then((price) => {
                  added.push({ name, price });
                });
              });
              cy.get(this.addToCartButton).click();
              cy.get(this.removeButton).should('be.visible');
            });
        });
      })
      .then(() => added);
  }

  assertCartCount(count: number): void {
    cy.get(this.cartBadge).should('have.text', String(count));
  }

  goToCart(): void {
    cy.get(this.cartLink).click();
  }
}

export const inventoryPage = new InventoryPage();
