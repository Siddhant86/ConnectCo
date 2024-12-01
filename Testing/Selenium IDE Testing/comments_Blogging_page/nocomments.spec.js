// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('No_comments', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('No_comments', async function() {
    await driver.get("http://localhost:5173/blog/IndiaDZ-VeJWcIr78WjqXSRStB")
    await driver.manage().window().setRect({ width: 1050, height: 652 })
    await driver.findElement(By.css(".flex:nth-child(10) .w-10:nth-child(3) > .fi")).click()
    await driver.findElement(By.css(".fi-br-cross")).click()
  })
})