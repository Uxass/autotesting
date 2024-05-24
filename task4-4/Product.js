import { By, until } from 'selenium-webdriver';

class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.addToBasketButton = By.xpath('//*[@id="app-root"]/div[2]/div/div[1]/div[2]/div[5]/div[1]/div[1]/div/button');
        this.goToBasketButton = By.xpath('//div[@class="User__slot___uNY5J User__narrow___TeiMz"]');
        this.put = By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[1]/div/div[2]/div/button[1]');
        this.unPut = By.xpath("/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[1]/div/div[2]/div/button[1]");
    }

    async addToBasket() {
        await this.driver.findElement(this.addToBasketButton).click();
    }

    async goToBasket() {
        let element = await this.driver.findElement(this.goToBasketButton);
        let actions = this.driver.actions({ bridge: true });
        await actions.doubleClick(element).perform();
    }


    async putAside() {
        await this.driver.findElement(this.put).click();
    }
    async unPutAside() {
        await this.driver.findElement(this.unPut).click();
    }
}

export default ProductPage;