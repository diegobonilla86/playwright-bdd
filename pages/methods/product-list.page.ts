import { PRODUCT_LIST_SELECTORS } from "../selectors/product-list.selectors";
import { Page } from "playwright";

export class ProductListPage {
  public getProductList() {
    return PRODUCT_LIST_SELECTORS.productList;
  }

  public getProceedToCheckoutButton() {
    return PRODUCT_LIST_SELECTORS.proceedToCheckoutButton;
  }

  public getProducts() {
    return PRODUCT_LIST_SELECTORS.products;
  }

  public async goToShopping(page: Page) {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.click(this.getProceedToCheckoutButton()),
    ]);
  }
}
