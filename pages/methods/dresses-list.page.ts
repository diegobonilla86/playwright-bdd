import { DRESSES_LIST_SELECTORS } from "../selectors/dresses-list.selectors";
import { expect } from "@playwright/test";

export class DressesListPage {
  public getDressItem() {
    return DRESSES_LIST_SELECTORS.dressItem;
  }

  public getDressName() {
    return DRESSES_LIST_SELECTORS.dressName;
  }

  public async validateItemsNumber(itemsNumber: number) {
    expect(this.getDressItem()).toHaveLength(itemsNumber);
  }

  public async validateItemsNames(names: string[]) {
    for (var _i = 0; _i < names.length; _i++) {
      var name = names[_i];
      expect(name).toContain(names[_i]);
    }
  }
}
