// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Edit blog', function() {
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
  it('Edit blog', async function() {
    await driver.get("https://connectco.netlify.app/")
    await driver.manage().window().setRect({ width: 1398, height: 792 })
    await driver.findElement(By.linkText("Sign In")).click()
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("pareshpatel@gmail.com")
    await driver.findElement(By.name("password")).sendKeys("Paresh123")
    await driver.findElement(By.name("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".w-12 > .w-full")).click()
    await driver.findElement(By.css(".w-12 > .w-full")).click()
    await driver.findElement(By.linkText("Dashboard")).click()
    await driver.findElement(By.css(".max-md\\3A-mt-8")).click()
    {
      const element = await driver.findElement(By.css(".max-md\\3A-mt-8"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.linkText("Edit")).click()
    await driver.findElement(By.css(".btn-dark")).click()
    await driver.findElement(By.css(".btn-dark")).click()
    await driver.findElement(By.css(".w-12 > .w-full")).click()
    await driver.findElement(By.css(".text-left")).click()
    await driver.findElement(By.css("html")).click()
    {
      const element = await driver.findElement(By.css("html"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
  })
})