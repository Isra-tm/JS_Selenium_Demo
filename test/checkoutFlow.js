const {Builder, By, Key} = require('selenium-webdriver');
var should = require('chai').should();
const {USERNAME, PASSWORD} = require('../fixtures/loginData.js')

describe('Login and complete a product order', () => {

    it('should login correctly and successfully order a Backpack', async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        await driver.get("https://www.saucedemo.com/");

        let username = await driver.findElement(By.id('user-name'));
        let password = await driver.findElement(By.id('password'));
        let loginBtn = await driver.findElement(By.xpath('*//input[@data-test="login-button"]'));

        await username.sendKeys(USERNAME);
        await password.sendKeys(PASSWORD);
        await loginBtn.click();

        let addToCartBtn = await driver.findElement(By.name('add-to-cart-sauce-labs-backpack'));
        let cartBtn = await driver.findElement(By.css('#shopping_cart_container'));

        await addToCartBtn.click();
        await cartBtn.click();

        let checkoutBtn = await driver.findElement(By.id('checkout'));

        await checkoutBtn.click();

        let firstName = await driver.findElement(By.id('first-name'));
        let lastName = await driver.findElement(By.id('last-name'));
        let zipCode = await driver.findElement(By.id('postal-code'));
        let continueBtn = await driver.findElement(By.id('continue'));

        await firstName.sendKeys("John");
        await lastName.sendKeys("Doe");
        await zipCode.sendKeys("31000");
        await continueBtn.click();

        let finishBtn = await driver.findElement(By.name('finish'));

        await finishBtn.click();

        let orderCompleteText = await driver.findElement(By.css('h2.complete-header'))
            .getText();

        orderCompleteText.should.equal("THANK YOU FOR YOUR ORDER");

        await driver.quit();

    });
});