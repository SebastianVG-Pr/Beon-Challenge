import { loginPage } from '../../pages/LoginPage';
import { inventoryPage } from '../../pages/InventoryPage';
import { cartPage } from '../../pages/CartPage';
import { checkoutInfoPage } from '../../pages/CheckoutInfoPage';
import { checkoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { checkoutCompletePage } from '../../pages/CheckoutCompletePage';

describe('SauceDemo - purchase flow', () => {
  beforeEach(() => {
    cy.fixture('uiData').as('uiData');
  });

  // single test on purpose, the cart is lost if cypress clears storage between tests so we are treating
  // this as a full e2e test
  it('buys two distinct items and shows the confirmation message', function () {
    const { user, customer } = this.uiData;

    loginPage.visit();
    loginPage.login(user.username, user.password);
    inventoryPage.assertLoaded();

    inventoryPage.addRandomItemsToCart(2).then((products) => {
      expect(products).to.have.length(2);
      expect(products[0]?.name).not.to.eq(products[1]?.name);
      inventoryPage.assertCartCount(2);

      inventoryPage.goToCart();
      cartPage.assertLoaded();
      cartPage.assertContainsExactly(products);

      cartPage.checkout();
      checkoutInfoPage.assertLoaded();
      checkoutInfoPage.fillForm(customer);
      checkoutInfoPage.continue();

      checkoutOverviewPage.assertLoaded();
      checkoutOverviewPage.assertSummary(products);
      checkoutOverviewPage.finish();

      checkoutCompletePage.assertLoaded();
      checkoutCompletePage.assertSuccessMessage('Thank you for your order!');
    });
  });
});
