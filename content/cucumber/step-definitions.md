---
title: Step Definitions
subtitle: Connecting Gherkin steps to code
polyglot:
 - java
 - javascript
 - ruby
 - kotlin

weight: 1
---

A Step Definition is a
{{% text "java" %}}Java method{{% /text %}}
{{% text "kotlin" %}}Kotlin function{{% /text %}}
{{% text "javascript" %}}JavaScript function{{% /text %}}
{{% text "ruby" %}}Ruby block{{% /text %}}
with an [expression](#expressions) that links it to one or more [Gherkin steps](/gherkin/reference#steps).
When Cucumber executes a [Gherkin step](/gherkin/reference#steps) in a scenario, it will look for a matching *step definition* to execute.

To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the following step definition:

{{% block "java" %}}
```java
package foo;
import cucumber.api.java.en.Given;

public class MyStepdefs {
    @Given("I have {int} cukes in my belly")
    public void i_have_n_cukes_in_my_belly(int cukes) {
        System.out.format("Cukes: %n\n", cukes);
    }
}
```

Or, using Java8 lambdas:

```java
package foo;
import cucumber.api.java8.En;

public class MyStepdefs implements En {
    public MyStepdefs() {
        Given("I have {int} cukes in my belly", (Integer cukes) -> {
            System.out.format("Cukes: %n\n", cukes);
        });
    }
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package foo
import cucumber.api.java8.En

class MyStepdefs : En {

    init {
        Given("I have {int} cukes in my belly") { cukes: Int -> 
                prinln("Cukes: $cukes")
        }
    }

}
```

{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package foo
import cucumber.api.java8.En

class MyStepdefs : En {

    init {
        Given("I have {int} cukes in my belly") { cukes: Int -> 
                prinln("Cukes: $cukes")
        }
    }

}
```

{{% /block %}}

{{% block "ruby" %}}
```ruby
Given('I have {int} cukes in my belly') do |cukes|
  puts "Cukes: #{cukes}"
end
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
const { Given } = require('cucumber')

Given('I have {int} cukes in my belly', function (cukes) {
  console.log(`Cukes: ${cukes}`)
});
```
{{% /block %}}

# Expressions

A step definition's *expression* can either be a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression) or a [Cucumber Expression](/cucumber/cucumber-expressions). If you prefer to use Regular Expressions, each *capture group* from the match will be passed as arguments to the step definition's {{% stepdef-body %}}.

{{% block "java" %}}
```java
@Given("I have {int} cukes in my belly")
public void i_have_n_cukes_in_my_belly(int cukes) {
}
```
{{% /block %}}

{{% block "kotlin" %}}
```kotlin
Given("I have {int} cukes in my belly") { cukes: Int -> 
        prinln("Cukes: $cukes")
}
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
end
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
Given(/I have (\d+) cukes in my belly/, function (cukes) {
});
```
{{% /block %}}

If the capture group expression is identical to one of the registered 
[parameter types](/cucumber/cucumber-expressions#parameter-types)'s `regexp`,
the captured string will be transformed before it is passed to the 
step definition's {{% stepdef-body %}}. In the example above, the `cukes`
argument will be an integer, because the built-in `int` parameter type's
`regexp` is `\d+` .

# State management

A step definition can transfer state to a subsequent step definition by storing
state in instance variables.

{{% block "javascript" %}}
{{% warn "No arrow functions" %}}
Please note that if you use arrow functions, you won't be able to share state between steps!

```javascript
Given('I have {int} cukes in my belly', cukes => {
  // Don't do this. The value of "this" is the "global" object
  this.cukes = cukes
})
```
{{% /warn %}}
{{% /block %}}

# Scope

Step definitions aren't linked to a particular feature file or scenario.
The file, class or package name of a step definition does not affect what Gherkin
steps it will match. The only thing that matters is the step definition's
expression.

# Snippets

When Cucumber encounters a [Gherkin step](/gherkin/reference#steps) without a
matching step definition, it will print a 
step definition snippet with a matching [Cucumber Expression](/cucumber/cucumber-expressions).
You can use this as a starting point for new step definitions.

Consider this Gherkin step:

    Given I have 3 red balls

If you don't have a matching step definition, Cucumber will suggest the following
snippet:

{{% block "java" %}}
```java
@Given("I have {int} red balls")
public void i_have_red_balls(int int1) {
}
```
{{% /block %}}

{{% block "kotlin" %}}
```kotlin
@Given("I have {int} red balls") { balls: Int ->
}
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
Given('I have {int} red balls') do |int1|
end
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
Given("I have {int} red balls", function (int1) {
});
```
{{% /block %}}

Suggested snippets will use your own [parameter types](/cucumber/cucumber-expressions#parameter-types)
if they match parts of your undefined step. If a [color](/cucumber/cucumber-expressions#custom-parameter-types) 
parameter type exists, Cucumber would use that in the suggested expression:

{{% block "java" %}}
```java
@Given("I have {int} {color} balls")
public void i_have_red_balls(int int1, Color color) {
}
```
{{% /block %}}

{{% block "kotlin" %}}
```kotlin
@Given("I have {int} {color} balls") { balls: Int, color: Color ->
}
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
Given('I have {int} {color} balls') do |int1, color|
end
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
Given("I have {int} {color} balls", function (int1, color) {
});
```
{{% /block %}}

# Abstract Your Steps

It is always a good idea to make sure that you are not writing duplicate/similar step definitions. While there are a number of ways to do so and you can document your step definitions as well, it is always good to make use of **helper methods** to abstract your step definitions and reduce the number of steps.

For example, if you have the following steps used across multiple scenarios :

```
    Given I go to the home page
    Given I check the about page of the website 
    Given I get the contact details
```

and all of these steps have different step definitions which visit the Home, About and Contact pages, you might be writing _redundant steps_. It is possible that the underlying code for executing each of these test cases is different, **but** it is important to understand that from the point of view of their **behavior**, all of these steps do essentially similar things, ie.

_* Open the Home page_
_* Open the About page_
_* Open the Contact page_

As such, you can use abstract helper methods to reduce all these into one step :

    Given I go to the {} page

with the step def :

```java
@Given("I want to open the {string} page")
public void i_want_to_open_page(String name) {
  pageFactory.openPage(name);
}
```

And then inside your step definition, use a helper method to determine how the page must be opened and direct your step definition to the correct code for opening that particular page.

This helps you in a number of ways like,

1. Allowing you to have less and more easily maintainable steps.
2. Making your project easily scalable: Adding tests for a new functionality with the same underlying _behavior_ is a lot easier and less cumbersome.
3. Making your test cases concise and easy to understand by anyone.

to name a few.

You can use the same method to write steps for validating a webpage, clicking a button, etc each with their own helper methods.

A good look at the _(Abstract) Factory Design_ pattern can be very useful for creating/refractoring your test cases with such abstraction. Also, using [Data Tables](/cucumber/api/#data-tables) for providing inputs along with this method makes your steps even more easy to maintain and understand.
