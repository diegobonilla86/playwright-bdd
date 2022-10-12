import { SHOPPING_CART_SELECTORS } from "../selectors/shopping-cart.selectors";
import { Page } from "playwright";
import { updateExpressionWithTypeArguments } from "typescript";

export class ShoppingStepPage {
  public getCheckoutButton() {
    return SHOPPING_CART_SELECTORS.checkoutButton;
  }

  public getUsername() {
    return SHOPPING_CART_SELECTORS.username;
  }

  public getPassword() {
    return SHOPPING_CART_SELECTORS.password;
  }

  public getSignInButton() {
    return SHOPPING_CART_SELECTORS.signInButton;
  }

  public async proceedCheckout(page: Page) {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.click(this.getCheckoutButton()),
    ]);
  }

  public async signInApplication(
    page: Page,
    username: string,
    password: string
  ) {
    await page.type(this.getUsername(), username, { timeout: 30000 });
    await page.type(this.getPassword(), password);
    await page.click(this.getSignInButton());
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 90000 }),
    ]);
  }
}
