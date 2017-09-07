---
menu: reference
renderer: Cucumber::Website::Reference
title: Browser Automation
---

# Browser Automation

Cucumber is not a Browser Automation tool, but it works well with Browser
Automation tools such as:

- [Selenium Webdriver](http://docs.seleniumhq.org/projects/webdriver/)
- [Capybara](http://teamcapybara.github.io/capybara/)
- [Watir](http://watir.com)
- [Serenity](http://serenity-bdd.info)

## Selenium WebDriver

Let's convert the [Selenium-Webdriver by Example tutorial](http://docs.seleniumhq.org/docs/03_webdriver.jsp#introducing-the-selenium-webdriver-api-by-example)
to use Cucumber.

We can express the example as the following Scenario:

```gherkin
Scenario: Finding some cheese
  Given I am on the Google search page
  When I search for "Cheese!"
  Then the page title should start with "cheese"
```

Here are the accompanying Step Definitions:

[carousel]

```ruby
# TODO! See the Java example for now.
```

```java
package com.example;

public class ExampleSteps {
    private final WebDriver driver = new FirefoxDriver();

    @Given("^I am on the Google search page$")
    public void I_visit_google() {
        driver.get("https://www.google.com");
    }

    @When("^I search for \"(.*)\"$")
    public void search_for(String query) {
        WebElement element = browser.findElement(By.name("q"));
        // Enter something to search for
        element.sendKeys(query);
        // Now submit the form. WebDriver will find the form for us from the element
        element.submit();
    }

    @Then("^the page title should start with \"(.*)\"$")
    public void checkTitle() {
        // Google's search is rendered dynamically with JavaScript.
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
          public Boolean apply(WebDriver d) {
          return d.getTitle().toLowerCase().startsWith("cheese");
          }
        });
        assertThat(driver.getTitle(), startsWith("cheese"));
        // Should see: "cheese! - Google Search"
    }

    @After()
    public void closeBrowser() {
        driver.quit();
    }
}
```

[/carousel]

## Watir

TODO

## Serenity BDD

Serenity BDD is an open source reporting library that helps you write better
structured, more maintainable automated acceptance criteria. Serenity also produces
rich meaningful test reports (or "living documentation") that report not only the
test results, but also which features have been tested. 

A detailed tutorial on using Cucumber-JVM with Serenity can be found
[here](http://thucydides.info/docs/articles/an-introduction-to-serenity-bdd-with-cucumber.html).

The above Scenario's Step Definitions might be written for Serenity like this:

[carousel]

```ruby
# Serenity only works with Java for now.
```

```java
package com.example.features.steps;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import net.serenitybdd.demos.todos.pages.GoogleHomePage;
import net.serenitybdd.demos.todos.pages.SearchResultsPage;

import static org.assertj.core.api.Assertions.assertThat;

public class SearchSteps {

    GoogleHomePage googleHomePage;
    SearchResultsPage searchResultsPage;

    @Given("^I am on the Google search page$")
    public void i_am_on_the_Google_search_page() throws Throwable {
        googleHomePage.open();
    }

    @When("^I search for \"([^\"]*)\"$")
    public void i_search_for(String searchTerm) throws Throwable {
        googleHomePage.searchBy(searchTerm);
    }

    @Then("^the page title should start with \"([^\"]*)\"$")
    public void the_page_title_should_start_with(String expectedTitleStart) throws Throwable {
        assertThat(searchResultsPage.getTitle().toLowerCase())
                 .startsWith(expectedTitleStart.toLowerCase());
    }
}
```

[/carousel]

In this example, the `WebDriver` interaction is delegated to `PageObject` subclasses. 
Serenity has built-in support for `PageObject`s, which might look like this:

[carousel]

```ruby
# Serenity only works with Java for now.
```

```java
@DefaultUrl("http://www.google.com")
public class GoogleHomePage extends PageObject {

    public static final String FOOTER_TO_APPEAR = "#foot";

    @FindBy(name = "q")
    private WebElementFacade searchField;

    public void searchBy(String searchTerm) {
        // Enter something to search for and submit the form
        searchField.type(searchTerm)
                   .then()
                   .sendKeys(Keys.RETURN);

        // Google's search page is rendered dynamically with JavaScript.
        // Wait for the footer to appear to know that the search is complete.
        waitFor(FOOTER_TO_APPEAR);
    }
}

public class SearchResultsPage extends PageObject {}
```

[/carousel]

## Tips and Tricks

### Multiple Browsers

Cucumber can run your Scenarios with different browsers. 
Simply select the browser to use based on a configuration property loaded at runtime:

[carousel]

```ruby
Capybara.register_driver :selenium do |app|
  browser = (ENV['browser'] || 'firefox').to_sym
  Capybara::Selenium::Driver.new(app, :browser => browser)
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

[/carousel]

Then, simply define the `browser` property when you run Cucumber:

[carousel]

```
browser=chrome cucumber
```

```
mvn test -Dbrowser=chrome
```

[/carousel]

If you are using Serenity, simply pass the `driver` system property (no extra coding required):

[carousel]

```
mvn test -Ddriver=chrome
```

[/carousel]

### Re-using the browser window

Closing and re-opening the browser window between Scenarios will slow them down.

To reuse them, you can use the [`SharedDriver`](https://github.com/cucumber/cucumber-jvm/blob/master/examples/java-webbit-websockets-selenium/src/test/java/cucumber/examples/java/websockets/SharedDriver.java) 
wrapper rather than calling `WebDriver` directly.

### Example Projects

- [java-webbit-websockets-selenium](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-webbit-websockets-selenium)
- [serenity-with-cucumber](https://github.com/serenity-bdd/serenity-articles/tree/master/introduction-to-serenity-with-cucumber/src/samples/etsy-tester)
