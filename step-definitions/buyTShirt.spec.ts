import {
  Given,
  When,
  Then,
  BeforeAll,
  After,
  AfterAll,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { expect, Browser, BrowserContext, Page } from "@playwright/test";
import { MenuContentPage } from "../pages/methods/menu-content.page";
import { ProductListPage } from "../pages/methods/product-list.page";
import { ShoppingStepPage } from "../pages/methods/shopping-cart.page";
import { AddressStepPage } from "../pages/methods/address-step.page";
import { ShippingStepPage } from "../pages/methods/shipping-step.page";
import { PaymentStepPage } from "../pages/methods/payment-step.page";
import { chromium, LaunchOptions } from "playwright";

setDefaultTimeout(process.env.PWDEBUG ? -1 : 90 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

const menuContentPage = new MenuContentPage();
const productListPage = new ProductListPage();
const shoppingStepPage = new ShoppingStepPage();
const addressStepPage = new AddressStepPage();
const shippingStepPage = new ShippingStepPage();
const paymentStepPage = new PaymentStepPage();

const browserOptions: LaunchOptions = {
  slowMo: 50,
  headless: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true,
  },
};

BeforeAll(async () => {
  browser = await chromium.launch(browserOptions);
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  const image = await page.screenshot({
    path: `./evidence/screenshots/` + `evidence.png`,
  });
  await page.close();
  await context?.close();
});

AfterAll(() => {
  browser.close();
});

Given(/^the user navigates to the shopping page$/, async () => {
  await menuContentPage.visitMenuContentPage(page);
});

When(
  /^the user navigates to the TShirt option in the categories menu$/,
  async () => {
    await menuContentPage.goToShirtMenu(page);
  }
);

When(/^the user selects the product to buy$/, async () => {
  await page.dispatchEvent(productListPage.getProducts(), "mouseover");
  await page.click(productListPage.getProductList());
  await productListPage.goToShopping(page);
});

When(
  /^the user proceed to checkout "([^"]*)" "([^"]*)"$/,
  async (username: string, password: string) => {
    await shoppingStepPage.proceedCheckout(page);
    await shoppingStepPage.signInApplication(page, username, password);
  }
);

When(/^the user navigates to shipping card page$/, async () => {
  await addressStepPage.goToShippingCart(page);
});

When(/^the user goes to payment$/, async () => {
  await shippingStepPage.goToPayment(page);
});

Then(/^the user is able to pay the product$/, async () => {
  await paymentStepPage.goToPayProduct(page);
  await expect(
    page.locator(paymentStepPage.getConfirmationMessage())
  ).toHaveText("Your order on My Store is complete.");
});
