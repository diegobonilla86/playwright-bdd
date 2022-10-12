import { ADDRESS_STEP_SELECTORS } from "./../selectors/address-step.selectors";
import { Page } from "playwright";

export class AddressStepPage {
  public getProceedToCheckoutButton() {
    return ADDRESS_STEP_SELECTORS.proceedToCheckoutButton;
  }

  public async goToShippingCart(page: Page) {
    await Promise.all([
      page.waitForNavigation({ timeout: 60000 }),
      await page.click(this.getProceedToCheckoutButton()),
    ]);
  }
}
