---
title: Step Definitions
subtitle: Connecting Gherkin steps to code
polyglot:
 - java
 - javascript
 - ruby
 - kotlin
 - scala

weight: 1
---

A Step Definition is a {{% stepdef-body %}} with an [expression](#expressions) that links it to one or more [Gherkin steps](/docs/gherkin/reference#steps).
When Cucumber executes a [Gherkin step](/docs/gherkin/reference#steps) in a scenario, it will look for a matching *step definition* to execute.

To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the following step definition:

{{% block "java" %}}

```java
package com.example;
import io.cucumber.java.en.Given;

public class StepDefinitions {
    @Given("I have {int} cukes in my belly")
    public void i_have_n_cukes_in_my_belly(int cukes) {
        System.out.format("Cukes: %n\n", cukes);
    }
}
```

Or, using Java8 lambdas:

```java
package com.example;
import io.cucumber.java8.En;

public class StepDefinitions implements En {
    public StepDefinitions() {
        Given("I have {int} cukes in my belly", (Integer cukes) -> {
            System.out.format("Cukes: %n\n", cukes);
        });
    }
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example
import io.cucumber.java8.En

class StepDefinitions : En {

    init {
        Given("I have {int} cukes in my belly") { cukes: Int ->
                println("Cukes: $cukes")
        }
    }

}
```

{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example
import io.cucumber.java8.En

class StepDefinitions : En {

    init {
        Given("I have {int} cukes in my belly") { cukes: Int ->
                println("Cukes: $cukes")
        }
    }

}
```

{{% /block %}}

{{% block "scala" %}}

```scala
package com.example
import io.cucumber.scala.{ScalaDsl, EN}

class StepDefinitions extends ScalaDsl with EN {

    Given("I have {int} cukes in my belly") { cukes: Int =>
        println(s"Cukes: $cukes")
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

A step definition's *expression* can either be a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression)
or a [Cucumber Expression](/docs/cucumber/cucumber-expressions). The examples in this section use Cucumber Expressions. 
If you prefer to use Regular Expressions, each {{% expression-parameter %}} from the match will be passed as arguments to the step
definition's {{% stepdef-body %}}.

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
        println("Cukes: $cukes")
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
Given("I have {int} cukes in my belly") { cukes: Int =>
    println(s"Cukes: $cukes")
}
```
{{% /block %}}

{{% block "ruby" %}}

```ruby
Given(/I have {int} cukes in my belly/) do |cukes|
end
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
Given(/I have {int} cukes in my belly/, function (cukes) {
});
```
{{% /block %}}

If the {{% expression-parameter %}} expression is identical to one of the registered
[parameter types](/docs/cucumber/cucumber-expressions#parameter-types)'s `regexp`,
the captured string will be transformed before it is passed to the
step definition's {{% stepdef-body %}}. In the example above, the `cukes`
argument will be an integer, because the built-in `int` parameter type's
`regexp` is `\d+` .

# State management

A step definition can transfer state to a subsequent step definition by storing
state in instance variables.

{{% block "javascript" %}}
{{% warn "No arrow functions" %}}
Please note that if you use arrow functions, you will have to create a variable representing state outside of the steps, in order to share state between steps!

```javascript
let cukesState;

Given('I have {int} cukes in my belly', cukes => {
  cukesState = cukes
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

When Cucumber encounters a [Gherkin step](/docs/gherkin/reference#steps) without a
matching step definition, it will print a
step definition snippet with a matching [Cucumber Expression](/docs/cucumber/cucumber-expressions).
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

{{% block "scala" %}}

```scala
Given("I have {int} red balls") { balls: Int =>
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

Suggested snippets will use your own [parameter types](/docs/cucumber/cucumber-expressions#parameter-types)
if they match parts of your undefined step. If a [color](/docs/cucumber/cucumber-expressions#custom-parameter-types)
parameter type exists, Cucumber would use that in the suggested expression:

{{% block "java" %}}

```java
@Given("I have {int} {color} balls")
public void i_have_color_balls(int int1, Color color) {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
@Given("I have {int} {color} balls") { balls: Int, color: Color ->
}
```
{{% /block %}}}

{{% block "scala" %}}

```scala
Given("I have {int} {color} balls") { (balls: Int, color: Color) =>
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

Make sure you use the `summary` plugin when running Cucumber in order
to have the snippets printed.
