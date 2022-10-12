import { MENU_CONTENT_SELECTORS } from "../selectors/menu-content.selector";
import { Page } from "playwright";

export class MenuContentPage {
  public getTShirtMenu() {
    return MENU_CONTENT_SELECTORS.tShirtMenu;
  }

  public getMenuContentPageURL() {
    return MENU_CONTENT_SELECTORS.menuContentPageURL;
  }

  public getDressMenu() {
    return MENU_CONTENT_SELECTORS.dressMenu;
  }

  public visitMenuContentPage = async (page: Page) => {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.goto(this.getMenuContentPageURL()),
    ]);
  };

  public goToShirtMenu = async (page: Page) => {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.click(this.getTShirtMenu()),
    ]);
  };

  public goToDressesMenu = async (page: Page) => {
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      await page.click(this.getDressMenu()),
    ]);
  };
}
