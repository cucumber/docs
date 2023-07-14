---
title: Browser Automation
subtitle: Selenium WebDriver, Capybara and more
polyglot:
  - java
  - javascript
  - ruby
  - kotlin
weight: 1300
---

Cucumber is not a browser automation tool, but it works well with the following browser automation tools.

# Selenium WebDriver

WebDriver is designed to provide a simpler, more concise programming interface than some other tools. Selenium WebDriver better supports dynamic web pages where elements of a page may change without the page itself being reloaded. WebDriver's goal is to supply a well-designed object-oriented API that provides improved support for modern advanced web-app testing problems.

[Selenium-WebDriver](https://www.selenium.dev/documentation/webdriver/) can be used in multiple programming languages, including Java, JavaScript, Ruby and Kotlin.

Let us look at an example of Cucumber using Selenium WebDriver in UI testing, by converting the [Selenium WebDriver Getting Started](https://www.selenium.dev/documentation/webdriver/getting_started/).

We can express the example as the following scenario:

```gherkin
Scenario: Finding some cheese
   Given I am on the Google search page
   When I search for "Cheese!"
   Then the page title should start with "cheese"
```

```java
package com.example;

import io.cucumber.java.After;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ExampleSteps {

    private final WebDriver driver = new FirefoxDriver();
    
    @Given("I am on the Google search page")
    public void I_visit_google() {
        driver.get("https://www.google.com");
    }

    @When("I search for {string}")
    public void search_for(String query) {
        WebElement element = driver.findElement(By.name("q"));
        // Enter something to search for
        element.sendKeys(query);
        // Now submit the form. WebDriver will find the form for us from the element
        element.submit();
   }

   @Then("the page title should start with {string}")
   public void checkTitle(String titleStartsWith) {
       // Google's search is rendered dynamically with JavaScript
       // Wait for the page to load timeout after ten seconds
       new WebDriverWait(driver,10L).until(new ExpectedCondition<Boolean>() {
           public Boolean apply(WebDriver d) {
               return d.getTitle().toLowerCase().startsWith(titleStartsWith);
           }
       });
   }

   @After()
   public void closeBrowser() {
       driver.quit();
   }
}
```

```kotlin
package com.example

import io.cucumber.java8.Scenario
import io.cucumber.java8.En
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.ui.WebDriverWait

class ExampleSteps: En {

    lateinit var driver: WebDriver

    init {
        Given("I am on the Google search page") {
            driver.get("https:\\www.google.com")
        }

        When("I search for {string}") { query: String ->
            val element: WebElement = driver.findElement(By.name("q"))
            // Enter something to search for
            element.sendKeys(query)
            // Now submit the form. WebDriver will find the form for us from the element
            element.submit()
        }

        Then("the page title should start with {string}") { titleStartsWith: String ->
            // Google's search is rendered dynamically with JavaScript
            // Wait for the page to load timeout after ten seconds
            WebDriverWait(driver, 10L).until { d ->
                d.title.toLowerCase().startsWith(titleStartsWith)
            }
        }

        After { scenario: Scenario ->
            driver.quit()
        }
    }
}
```

```javascript
const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the Google search page', async function () {
    await driver.get('http://www.google.com');
});

When('I search for {string}', async function (searchTerm) {
    const element = await driver.findElement(By.name('q'));
    element.sendKeys(searchTerm, Key.RETURN);
    element.submit();
});

Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
});

AfterAll(async function(){
    await driver.quit();
});
```

```ruby
require 'rubygems'
require 'selenium-webdriver'

Given(/^I am on the Google search page$/) do
  driver = Selenium::WebDriver.for :firefox
  driver.get "http://google.com"
end

When(/^I search for "([^"]*)"$/) do
  element = driver.find_element(name: "q")
  element.send_keys "Cheese!"
  element.submit
end

Then(/^the page title should start with "([^"]*)"$/) do
  wait = Selenium::WebDriver::Wait.new(timeout: 10)
  wait.until { driver.title.downcase.start_with? "cheese!" }
  puts "Page title is #{driver.title}"
    browser.close
end
```

More information on [Selenium Webdriver](http://docs.seleniumhq.org/projects/webdriver/).

# Browser Automation Tools for JVM

## Serenity BDD

{{% text "java,kotlin" %}}

Serenity BDD is an open source reporting library that helps you write better
structured, more maintainable automated acceptance criteria. Serenity also produces
rich meaningful test reports (or "living documentation") that report not only the
test results, but also which features have been tested.

A detailed tutorial on using Cucumber-JVM with Serenity can be found
[here](https://serenity-bdd.info/docs/articles/an-introduction-to-serenity-bdd-with-cucumber.html), and more information on Serenity can be found on their [official website](http://serenity-bdd.info).

{{% /text %}}

{{% text "javascript,ruby" %}}Serenity only works with JVM languages.{{% /text %}}

# Browser Automation Tools for Ruby

## Watir

{{% text "ruby" %}}

Watir (pronounced _water_), is an open-source (BSD), family of Ruby libraries for automating web browsers. It allows you to write tests that are easier to read and maintain. It is straightforward and flexible.

Watir drives browsers the same way people do. It clicks links, fills in forms, presses buttons. Watir also checks results, such as whether expected text appears on the page.

Watir is a family of Ruby libraries but it supports your application no matter which technology it is developed in. While Watir supports only Internet Explorer on Windows; Watir-WebDriver solves single browser testing and support Chrome, Firefox, Internet Explorer, Opera and also running in headless mode (HTMLUnit).

Now let's jump in to a sample UI testing program using Watir:

```ruby
require "rubygems"
require "rspec"
require "watir"

describe "google.com" do
  let(:browser) { @browser ||= Watir::Browser.new :firefox }
  before { browser.goto "http://google.com" }
  browser.text_field(name: "q").set "watir"
  browser.button.click
  browser.div(id: "resultStats").wait_until
  browser.title.should == "watir - Google Search"
  after { browser.close }
end
```

Now let us incorporate Cucumber to this test:

```gherkin
Feature: Search In order to use Google users must be able to search for content
  Scenario: Search for a term
    Given I have entered "watir" into the query
    When I click "search"
    Then I should see some results
```

```ruby
require "watir"
require "rspec/expectations"

Given(/^I have entered "([^"]*)" into the query$/) do |term|
  @browser ||= Watir::Browser.new :firefox
  @browser.goto "google.com"
  @browser.text_field(name: "q").set term
end

When(/^I click "([^"]*)"$/) do
 @browser.button.click
end

Then(/^I should see some results$/) do
  @browser.div(id: "resultStats").wait_until_present
  @browser.close
end
```
More information on [Watir](http://watir.com).

{{% /text %}}

{{% text "java,javascript,kotlin" %}}Watir only works with Ruby.{{% /text %}}

## Capybara

{{% text "ruby" %}}

Cucumber-Rails is pre-configured with support for view integration testing using [Capybara](https://github.com/jnicklas/capybara)
(`script/generate cucumber --capybara`).

Unless instructed otherwise the Cucumber-Rails install generator will set up the necessary support files for Capybara.

While Capybara is the preferred testing method for HTML views in cucumber-rails it does not play well with Rails' own
built-in `MiniTest/Test::Unit`. In particular, whenever Capybara is required into a Cucumber World then the `response.body`
method of `Rails Test::Unit` is removed. Capybara depends upon Nokogiri and Nokogiri prefers to use XML rather than CSS tags.
This behaviour can be overridden in `./features/support/env.rb`.

More information on [Capybara](https://teamcapybara.github.io/capybara/).

{{% /text %}}

{{% text "java,javascript,kotlin" %}}Capybara only works with Ruby.{{% /text %}}

# Tips and Tricks

## Screenshot on failure
Taking a screenshot when a scenario fails, might help you to figure out what went wrong.
To take a screenshot on failure, you can configure an [after hook](/docs/cucumber/api/#after).

{{% block "java,javascript,kotlin" %}}
Below is an example of how to take a screenshot with
[WebDriver](https://www.selenium.dev/documentation/webdriver/browser/windows/#takescreenshot)
for failed scenarios and embed them in Cucumber's report.
{{% /block %}}

```java
if (scenario.isFailed()) {
    byte[] screenshot = ((TakesScreenshot) webDriver).getScreenshotAs(OutputType.BYTES);
    scenario.attach(screenshot, "image/png", "name");
}
```

```kotlin
if (scenario.isFailed()) {
    val screenshot = ((TakesScreenshot) webDriver).getScreenshotAs(OutputType.BYTES)
    scenario.attach(screenshot, "image/png", "name")
}
```

```javascript
After(function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        var world = this;
        return webDriver.takeScreenshot().then(function(screenShot, error) {
            if (!error) {
                world.attach(screenShot, "image/png");
            }
        });
    }
});
```

{{% block "ruby" %}}
Below is an example of how to take a screenshot with
[Capybara](https://github.com/teamcapybara/capybara)
for failed scenarios and embed them in Cucumber's report.
{{% /block %}}

```ruby
# Available scenario methods: #failed?, #passed?, and #exception
if scenario.failed?
  path = "html-report/#{scenario.__id__}.html"
  page.driver.browser.save_screenshot(path)
  attach(path, "image/png")
end
```

## Multiple Browsers

Cucumber can run your scenarios with different browsers, based on a configuration property loaded at runtime:

```ruby
Capybara.register_driver :selenium do |app|
  browser = (ENV['browser'] || 'firefox').to_sym
  Capybara::Selenium::Driver.new(app, browser: browser)
end
```

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WebDriverFactory {
    public static WebDriver createWebDriver() {
        String webdriver = System.getProperty("browser", "firefox");
        switch(webdriver) {
            case "firefox":
                return new FirefoxDriver();
            case "chrome":
                return new ChromeDriver();
            default:
                throw new RuntimeException("Unsupported webdriver: " + webdriver);
        }
    }
}
```

```kotlin
// TODO: Convert Java example to Kotlin

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WebDriverFactory {
    public static WebDriver createWebDriver() {
        String webdriver = System.getProperty("browser", "firefox");
        switch(webdriver) {
            case "firefox":
                return new FirefoxDriver();
            case "chrome":
                return new ChromeDriver();
            default:
                throw new RuntimeException("Unsupported webdriver: " + webdriver);
        }
    }
}

```

```javascript
// TODO
```

Then, define the `browser` property when you run Cucumber:
{{% text "ruby" %}}

```
browser=chrome cucumber
```
{{% /text %}}

{{% text "java,kotlin" %}}

```
mvn test -Dbrowser=chrome
```

If you are using Serenity, pass the `driver` system property (no extra coding required):

```
mvn test -Ddriver=chrome
```
{{% /text %}}

{{% text "javascript" %}}

```
// TODO: How to pass arguments in JavaScript
```
{{% /text %}}
