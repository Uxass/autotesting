import { By } from "selenium-webdriver";
import { BasePage } from "../basepage.js";

export class LambdaPage extends BasePage {
  async findElementsWithXPath(xpath) {
    return driver.findElements(By.xpath(xpath));
  }

  async getElements() {
    this.itemsCount = (await this.findElementsWithXPath(`//li[@class='ng-scope']/input`)).length;
    this.falseItemsCount = (await this.findElementsWithXPath(`//span[@class='done-false']`)).length;
    
    return { total: this.itemsCount, falseTotal: this.falseItemsCount };
  }

  async open() {
    await this.goToUrl('https://lambdatest.github.io/sample-todo-app/');
  }

  async checkTitle() {
    await this.getElements();
    
    const titleElement = await this.findElementWithXPath('//span[@class="ng-binding"]');
    const titleText = await titleElement.getText();
    const expectedText = `${this.falseItemsCount} of ${this.itemsCount} remaining`;
    
    return titleText === expectedText;
  }

  async clickItem(id) {
    const item = await driver.findElement(By.xpath(`//input[@name='li${id}']`));
    await item.click();
  }

  async isItemActive(item) {
    return (await item.getAttribute('class')) === 'done-true';
  }

  async getItem(itemId) {
    return await driver.findElement(By.xpath(`//input[@name='li${itemId}']/following-sibling::span`));
  }

  async isItemNotActive(item) {
    return (await item.getAttribute('class')) === 'done-false';
  }

  async createNewItem(text) {
    await this.enterText(By.id('sampletodotext'), text);
    await this.click(By.id('addbutton'));
    await this.getElements();
  }

  get itemCount() {
    return this.itemsCount;
  }

  get falseItemCount() {
    return this.falseItemsCount;
  }
}

