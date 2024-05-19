export class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async goToUrl(url) {
    await this.driver.get(url);
  }

  async enterText(locator, textToEnter) {
    const element = await this.driver.findElement(locator);
    await element.sendKeys(textToEnter);
  }

  async click(locator) {
    const element = await this.driver.findElement(locator);
    await element.click();
  }

  async getText(locator) {
    const element = await this.driver.findElement(locator);
    return await element.getText();
  }

  getDateTimeString() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;
  }

  async saveScreenshot(fileName) {
    const date = this.getDateTimeString();
    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(`./screenshots/lab2/error_${fileName}_${date}.png`, image, 'base64');
  }

  async closeBrowser() {
    await this.driver.sleep(1000);
    await this.driver.quit();
  }
}
