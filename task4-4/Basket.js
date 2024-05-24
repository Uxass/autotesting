import { By } from 'selenium-webdriver';

class BasketPage {
    constructor(driver) {
        this.driver = driver;
        this.deleteButton = By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[1]/div/div[2]/div/button[2]');
        this.checkoutButton = By.xpath('');
        this.productLink = By.xpath('');
        this.restore = By.xpath('//*[@id="app-root"]/div[2]/div/div[2]/div[1]/div/div[1]/div[1]/div/button');
       

    }

    async deleteProduct() {
        await this.driver.findElement(this.deleteButton).click();
    }
    

    async getTotalPrice() {
        const totalPriceElement = await this.driver.findElement(this.totalPrice);
        return await totalPriceElement.getText();
    }
    async clickOnProductBasket() {
        await this.driver.findElement(this.productLink).click();

    }
    async restoreItem() {
        await this.driver.findElement(this.restore).click();

    }
}

export default BasketPage;