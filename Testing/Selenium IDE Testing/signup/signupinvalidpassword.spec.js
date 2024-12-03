// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('sign_up invalid password', function() {
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
  it('sign_up invalid password', async function() {
    // Test name: sign_up invalid password
    // Step # | name | target | value
    // 1 | open | http://localhost:5173/ | 
    await driver.get("http://localhost:5173/")
    // 2 | setWindowSize | 1210x816 | 
    await driver.manage().window().setRect({ width: 1210, height: 816 })
    // 3 | click | linkText=Sign Up | 
    await driver.findElement(By.linkText("Sign Up")).click()
    // 4 | click | name=fullname | 
    await driver.findElement(By.name("fullname")).click()
    // 5 | type | name=fullname | Aditya Iyer
    await driver.findElement(By.name("fullname")).sendKeys("Aditya Iyer")
    // 6 | click | name=email | 
    await driver.findElement(By.name("email")).click()
    // 7 | type | name=email | 202201322@daiict.ac.in
    await driver.findElement(By.name("email")).sendKeys("202201322@daiict.ac.in")
    // 8 | click | name=password | 
    await driver.findElement(By.name("password")).click()
    // 9 | type | name=password | adi34
    await driver.findElement(By.name("password")).sendKeys("adi34")
    // 10 | click | css=.mt-14 | 
    await driver.findElement(By.css(".mt-14")).click()
  })
})
