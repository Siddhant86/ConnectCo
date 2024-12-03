// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Theme_Testing', function() {
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
  it('Theme_Testing', async function() {
    // Test name: Theme_Testing
    // Step # | name | target | value
    // 1 | open | http://localhost:5173/ | 
    await driver.get("http://localhost:5173/")
    // 2 | setWindowSize | 1051x798 | 
    await driver.manage().window().setRect({ width: 1051, height: 798 })
    // 3 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 4 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 5 | click | linkText=Sign Up | 
    await driver.findElement(By.linkText("Sign Up")).click()
    // 6 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 7 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 8 | click | linkText=Sign In | 
    await driver.findElement(By.linkText("Sign In")).click()
    // 9 | mouseOver | linkText=Sign In | 
    {
      const element = await driver.findElement(By.linkText("Sign In"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 10 | mouseOut | linkText=Sign In | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 11 | click | name=email | 
    await driver.findElement(By.name("email")).click()
    // 12 | type | name=email | ghorizeelj@gmail.com
    await driver.findElement(By.name("email")).sendKeys("ghorizeelj@gmail.com")
    // 13 | click | name=password | 
    await driver.findElement(By.name("password")).click()
    // 14 | type | name=password | Password123New
    await driver.findElement(By.name("password")).sendKeys("Password123New")
    // 15 | click | css=.mt-14 | 
    await driver.findElement(By.css(".mt-14")).click()
    // 16 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 17 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 18 | click | css=.flex-none > .w-20 | 
    await driver.findElement(By.css(".flex-none > .w-20")).click()
    // 19 | click | linkText=Write | 
    await driver.findElement(By.linkText("Write")).click()
    // 20 | mouseOver | css=.btn-dark | 
    {
      const element = await driver.findElement(By.css(".btn-dark"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 21 | mouseOut | css=.btn-dark | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 22 | click | css=.flex-none > img | 
    await driver.findElement(By.css(".flex-none > img")).click()
    // 23 | click | css=.fi-rr-bell | 
    await driver.findElement(By.css(".fi-rr-bell")).click()
    // 24 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 25 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 26 | click | css=.sidebar-link:nth-child(5) | 
    await driver.findElement(By.css(".sidebar-link:nth-child(5)")).click()
    // 27 | click | css=.flex-none > img | 
    await driver.findElement(By.css(".flex-none > img")).click()
    // 28 | click | css=.fi-rr-bell | 
    await driver.findElement(By.css(".fi-rr-bell")).click()
    // 29 | click | linkText=Blogs | 
    await driver.findElement(By.linkText("Blogs")).click()
    // 30 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 31 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 32 | click | linkText=Edit Profile | 
    await driver.findElement(By.linkText("Edit Profile")).click()
    // 33 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 34 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 35 | click | linkText=Change Password | 
    await driver.findElement(By.linkText("Change Password")).click()
    // 36 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 37 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 38 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 39 | click | linkText=Profile | 
    await driver.findElement(By.linkText("Profile")).click()
    // 40 | click | id=root | 
    await driver.findElement(By.id("root")).click()
    // 41 | doubleClick | id=root | 
    {
      const element = await driver.findElement(By.id("root"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 42 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 43 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 44 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 45 | click | linkText=Dashboard | 
    await driver.findElement(By.linkText("Dashboard")).click()
    // 46 | click | css=.max-md\3A-mt-8 | 
    await driver.findElement(By.css(".max-md\\3A-mt-8")).click()
    // 47 | doubleClick | css=.max-md\3A-mt-8 | 
    {
      const element = await driver.findElement(By.css(".max-md\\3A-mt-8"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 48 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 49 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 50 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 51 | mouseOver | css=.h-full | 
    {
      const element = await driver.findElement(By.css(".h-full"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 52 | mouseOut | css=.h-full | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 53 | click | linkText=Settings | 
    await driver.findElement(By.linkText("Settings")).click()
    // 54 | click | css=.max-md\3A-mt-8 | 
    await driver.findElement(By.css(".max-md\\3A-mt-8")).click()
    // 55 | doubleClick | css=.max-md\3A-mt-8 | 
    {
      const element = await driver.findElement(By.css(".max-md\\3A-mt-8"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 56 | click | css=.fi-rr-moon-stars | 
    await driver.findElement(By.css(".fi-rr-moon-stars")).click()
    // 57 | click | css=.fi-rr-sun | 
    await driver.findElement(By.css(".fi-rr-sun")).click()
    // 58 | click | css=.gap-10 | 
    await driver.findElement(By.css(".gap-10")).click()
    // 59 | click | css=.object-cover | 
    await driver.findElement(By.css(".object-cover")).click()
    // 60 | click | css=.object-cover | 
    await driver.findElement(By.css(".object-cover")).click()
    // 61 | click | css=.font-bold | 
    await driver.findElement(By.css(".font-bold")).click()
    // 62 | click | css=html | 
    await driver.findElement(By.css("html")).click()
    // 63 | doubleClick | css=html | 
    {
      const element = await driver.findElement(By.css("html"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
  })
})