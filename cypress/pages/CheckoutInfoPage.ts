export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutInfoPage {
  private readonly title = '[data-test="title"]';
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';

  assertLoaded(): void {
    cy.url().should('include', '/checkout-step-one.html');
    cy.get(this.title).should('have.text', 'Checkout: Your Information');
  }

  fillForm({ firstName, lastName, postalCode }: CustomerInfo): void {
    // react sometimes eats keystrokes, so check the value
    cy.get(this.firstNameInput).type(firstName).should('have.value', firstName);
    cy.get(this.lastNameInput).type(lastName).should('have.value', lastName);
    cy.get(this.postalCodeInput).type(postalCode).should('have.value', postalCode);
  }

  continue(): void {
    cy.get(this.continueButton).click();
  }
}

export const checkoutInfoPage = new CheckoutInfoPage();
