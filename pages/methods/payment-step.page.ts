import { PAYMENT_STEP_SELECTORS } from "../selectors/payment-step.selectors";
import { Page } from "playwright";
import { expect } from "@playwright/test";

export class PaymentStepPage {
  public getPayByBankButton() {
    return PAYMENT_STEP_SELECTORS.payByBankButton;
  }

  public getConfirmOrderButton() {
    return PAYMENT_STEP_SELECTORS.confirmOrderButton;
  }

  public getConfirmationMessage() {
    return PAYMENT_STEP_SELECTORS.confirmationMessage;
  }

  public async goToPayProduct(page: Page) {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.click(this.getPayByBankButton()),
      await page.click(this.getConfirmOrderButton()),
    ]);
  }
}
