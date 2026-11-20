import { Product } from '../support/types';

export class CartPage {
  private readonly title = '[data-test="title"]';
  private readonly cartItem = '[data-test="inventory-item"]';
  private readonly itemName = '[data-test="inventory-item-name"]';
  private readonly itemPrice = '[data-test="inventory-item-price"]';
  private readonly itemQuantity = '[data-test="item-quantity"]';
  private readonly checkoutButton = '[data-test="checkout"]';

  assertLoaded(): void {
    cy.url().should('include', '/cart.html');
    cy.get(this.title).should('have.text', 'Your Cart');
  }

  assertContainsExactly(products: Product[]): void {
    cy.get(this.cartItem).should('have.length', products.length);

    products.forEach(({ name, price }) => {
      cy.contains(this.cartItem, name).within(() => {
        cy.get(this.itemName).should('have.text', name);
        cy.get(this.itemQuantity).should('have.text', '1');
        cy.get(this.itemPrice).should('have.text', price);
      });
    });
  }

  checkout(): void {
    cy.get(this.checkoutButton).click();
  }
}

export const cartPage = new CartPage();
