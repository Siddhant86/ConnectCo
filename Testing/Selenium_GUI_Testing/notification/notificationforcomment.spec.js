// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Notification_for_comment', function() {
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
  it('Notification_for_comment', async function() {
    // Test name: Notification_for_comment
    // Step # | name | target | value
    // 1 | open | https://connectco.netlify.app/ | 
    await driver.get("https://connectco.netlify.app/")
    // 2 | setWindowSize | 1051x798 | 
    await driver.manage().window().setRect({ width: 1051, height: 798 })
    // 3 | click | linkText=Sign In | 
    await driver.findElement(By.linkText("Sign In")).click()
    // 4 | click | name=email | 
    await driver.findElement(By.name("email")).click()
    // 5 | type | name=email | ghorizeelj@gmail.com
    await driver.findElement(By.name("email")).sendKeys("ghorizeelj@gmail.com")
    // 6 | click | name=password | 
    await driver.findElement(By.name("password")).click()
    // 7 | type | name=password | Password123New
    await driver.findElement(By.name("password")).sendKeys("Password123New")
    // 8 | click | css=.fi-rr-eye-crossed | 
    await driver.findElement(By.css(".fi-rr-eye-crossed")).click()
    // 9 | click | id=formElement | 
    await driver.findElement(By.id("formElement")).click()
    // 10 | click | css=.mt-14 | 
    await driver.findElement(By.css(".mt-14")).click()
    // 11 | mouseOver | css=.tag:nth-child(2) | 
    {
      const element = await driver.findElement(By.css(".tag:nth-child(2)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 12 | click | css=.pl-6 | 
    await driver.findElement(By.css(".pl-6")).click()
    // 13 | type | css=.pl-6 | chess
    await driver.findElement(By.css(".pl-6")).sendKeys("chess")
    // 14 | sendKeys | css=.pl-6 | ${KEY_ENTER}
    await driver.findElement(By.css(".pl-6")).sendKeys(Key.ENTER)
    // 15 | click | css=.blog-title | 
    await driver.findElement(By.css(".blog-title")).click()
    // 16 | click | css=.flex:nth-child(5) .w-10:nth-child(3) > .fi | 
    await driver.findElement(By.css(".flex:nth-child(5) .w-10:nth-child(3) > .fi")).click()
    // 17 | click | css=.input-box | 
    await driver.findElement(By.css(".input-box")).click()
    // 18 | type | css=.input-box | Hi, congratulation on winning concours
    await driver.findElement(By.css(".input-box")).sendKeys("Hi, congratulation on winning concours")
    // 19 | click | css=.btn-dark | 
    await driver.findElement(By.css(".btn-dark")).click()
    // 20 | click | css=.input-box | 
    await driver.findElement(By.css(".input-box")).click()
    // 21 | click | css=.hover\3A bg-grey\/30 | 
    await driver.findElement(By.css(".hover\\3A bg-grey\\/30")).click()
    // 22 | click | css=.fi-rs-comment-dots | 
    await driver.findElement(By.css(".fi-rs-comment-dots")).click()
    // 23 | click | css=.flex > .underline | 
    await driver.findElement(By.css(".flex > .underline")).click()
    // 24 | click | css=.input-box:nth-child(2) | 
    await driver.findElement(By.css(".input-box:nth-child(2)")).click()
    // 25 | type | css=.input-box:nth-child(2) | Want a party
    await driver.findElement(By.css(".input-box:nth-child(2)")).sendKeys("Want a party")
    // 26 | click | css=.btn-dark:nth-child(3) | 
    await driver.findElement(By.css(".btn-dark:nth-child(3)")).click()
    // 27 | click | css=.flex-none > .w-20 | 
    await driver.findElement(By.css(".flex-none > .w-20")).click()
    // 28 | mouseOver | linkText=Write | 
    {
      const element = await driver.findElement(By.linkText("Write"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 29 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 30 | mouseOver | css=.font-bold | 
    {
      const element = await driver.findElement(By.css(".font-bold"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 31 | click | css=.font-bold | 
    await driver.findElement(By.css(".font-bold")).click()
    // 32 | click | linkText=Sign In | 
    await driver.findElement(By.linkText("Sign In")).click()
    // 33 | click | name=email | 
    await driver.findElement(By.name("email")).click()
    // 34 | type | name=email | zeelghoritry@gmail.com
    await driver.findElement(By.name("email")).sendKeys("zeelghoritry@gmail.com")
    // 35 | click | name=password | 
    await driver.findElement(By.name("password")).click()
    // 36 | type | name=password | ZeelGhoriTry54321
    await driver.findElement(By.name("password")).sendKeys("ZeelGhoriTry54321")
    // 37 | click | css=.mt-14 | 
    await driver.findElement(By.css(".mt-14")).click()
    // 38 | click | css=.fi-rr-bell | 
    await driver.findElement(By.css(".fi-rr-bell")).click()
    // 39 | click | css=.py-2:nth-child(3) | 
    await driver.findElement(By.css(".py-2:nth-child(3)")).click()
    // 40 | click | css=.hover\3Atext-black:nth-child(2) | 
    await driver.findElement(By.css(".hover\\3Atext-black:nth-child(2)")).click()
    // 41 | click | css=.input-box | 
    await driver.findElement(By.css(".input-box")).click()
    // 42 | type | css=.input-box | Thank you for greetings
    await driver.findElement(By.css(".input-box")).sendKeys("Thank you for greetings")
    // 43 | click | css=.px-10 | 
    await driver.findElement(By.css(".px-10")).click()
    // 44 | click | css=.py-2:nth-child(4) | 
    await driver.findElement(By.css(".py-2:nth-child(4)")).click()
    // 45 | click | css=.py-2:nth-child(3) | 
    await driver.findElement(By.css(".py-2:nth-child(3)")).click()
    // 46 | mouseOver | css=.fi-rr-moon-stars | 
    {
      const element = await driver.findElement(By.css(".fi-rr-moon-stars"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 47 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 48 | mouseOver | css=.h-full | 
    {
      const element = await driver.findElement(By.css(".h-full"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 49 | mouseOut | css=.h-full | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 50 | click | css=.h-full | 
    await driver.findElement(By.css(".h-full")).click()
    // 51 | click | css=.font-bold | 
    await driver.findElement(By.css(".font-bold")).click()
    // 52 | click | css=html | 
    await driver.findElement(By.css("html")).click()
    // 53 | doubleClick | css=html | 
    {
      const element = await driver.findElement(By.css("html"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
  })
})
