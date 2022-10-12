import { SHIPPING_STEP_SELECTORS } from "../selectors/shipping-step.selectors";
import { Page } from "playwright";

export class ShippingStepPage {
  public getAgreeTermsCheckbox() {
    return SHIPPING_STEP_SELECTORS.agreeTermsCheckbox;
  }

  public getProceedCheckoutButton() {
    return SHIPPING_STEP_SELECTORS.proceedCheckoutButton;
  }

  public async goToPayment(page: Page) {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.check(this.getAgreeTermsCheckbox()),
      await page.click(this.getProceedCheckoutButton()),
    ]);
  }
}
