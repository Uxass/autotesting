import { By } from 'selenium-webdriver';

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.chapterLink2 = By.xpath('//*[@id="app-root"]/header/div/div[4]/ul/li[4]/a');
        this.chapterLink = By.xpath('//*[@id="app-root"]/header/div/div[3]/ul/li[2]/a');
        this.productLink = By.xpath('//*[@id="app-root"]/div[2]/div/div[2]/div[3]/div/div[1]/div/div[1]/a/div');
        this.clickOnLogo = By.xpath('//div[@class="DefaultHeader__logo___Gv9wQ"]');

    }

    async open() {
        await this.driver.get('https://www.tsum.ru/');
    }

    async clickOnChapter() {
        await this.driver.findElement(this.chapterLink).click();

    }
    async clickOnChapter2() {
        await this.driver.findElement(this.chapterLink2).click();

    }

    async clickOnProduct() {
        await this.driver.findElement(this.productLink).click();

    }
    async goToLogo() {
        await this.driver.findElement(this.clickOnLogo).click();

    }

}

export default HomePage;