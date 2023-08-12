---
title: Cucumber Reference
subtitle: "Using Cucumber: Step Definitions, Hooks, Tags"
polyglot:
 - java
 - javascript
 - ruby
 - kotlin
 - scala

weight: 2
---

Cucumber can be used to implement automated tests based on scenarios described in your Gherkin feature files.


# Step Arguments

In the example given in [step definitions](/docs/cucumber/step-definitions), Cucumber extracts the text `48` from the step, converts it to an `int`
and passes it as an argument to the {{% stepdef-body %}}.

The number of parameters in the {{% stepdef-body %}} has to match the number of {{% expression-parameter %}}s in the expression. (If there is a mismatch, Cucumber will throw an error).

## Data Tables

Data tables from Gherkin can be accessed by using the DataTable object as the last parameter in a step definition.
This conversion can be done either by Cucumber or manually.

{{% text "java,kotlin" %}}Depending on the table shape as one of the following collections:{{% /text %}}

```java
List<List<String>> table
List<Map<String, String>> table
Map<String, String> table
Map<String, List<String>> table
Map<String, Map<String, String>> table
```

The simplest way to pass a {{% text "java,kotlin" %}}`List<String>`{{% /text %}}{{% text "scala"
%}}`java.util.List[String]`{{% /text %}}{{% text "ruby,javascript" %}}list of strings{{% /text %}} to a step definition
is to use a data table:

```gherkin
Given the following animals:
  | cow   |
  | horse |
  | sheep |
```

Declare the argument as a {{% text "java,kotlin" %}}`List<String>`{{% /text %}}{{% text "scala" %}}`java.util.List[String]`{{% /text %}}{{% text "ruby,javascript" %}}list of strings{{% /text %}}, but don't define any {{% expression-parameter %}}s in the expression:

{{% block "java" %}}
Annotated method style:

```java
@Given("the following animals:")
public void the_following_animals(List<String> animals) {
}
```
{{% /block %}}

{{% block "kotlin" %}}
Annotated method style:

```kotlin
@Given("the following animals:")
fun the_following_animals(animals: List<String>) {
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
Given("the following animals:") { animals: java.util.List[String] =>
}
```
{{% /block %}}

In this case, the `DataTable` is automatically flattened to a {{% text "java,kotlin" %}}`List<String>`{{% /text %}}{{% text "scala" %}}`java.util.List[String]`{{% /text %}}{{% text "ruby,javascript" %}}array of strings{{% /text %}}
by Cucumber (using `DataTable.asList(String.class)`) before invoking the step definition.

{{% text "java,kotlin" %}}Note: In addition to collections of String, Integer, Float, BigInteger and BigDecimal, Byte,
Short, Long and Double are also supported.{{% /text %}}

{{% block "scala" %}}

**Note:** For now, Cucumber Scala does not support using Scala collection types.

See [Github](https://github.com/cucumber/cucumber-jvm-scala/issues/50)

{{% /block %}}

{{% text "javascript" %}} For an example of data tables in JavaScript, go [here](https://github.com/cucumber/cucumber-js/blob/master/src/models/data_table.ts) {{% /text %}}

{{% text "java,kotlin" %}}In addition, see
[cucumber-jvm data-tables](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-java#data-tables){{% /text %}}

# Steps

A step is analogous to a method call or function invocation.

For example:

```gherkin
Given I have 93 cucumbers in my belly
```

In this step, you're "calling" the above step definition with one argument: the value `93`.

Steps are declared in your {{% text "ruby" %}}`features/\*.feature`{{% /text %}}{{% text "java,kotlin,scala" %}}`*.feature`{{% /text %}}{{% text "javascript" %}}`*.feature`{{% /text %}} files.

## Matching steps

1. Cucumber matches a step against a step definition's `Regexp`
2. Cucumber gathers any {{% expression-parameter %}}s or variables
3. Cucumber passes them to the step definition's {{% stepdef-body %}} and executes it

Recall that step definitions start with a [preposition](https://www.merriam-webster.com/dictionary/given) or an [adverb](https://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**).

All step definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each step, Cucumber will look for a registered step definition with a matching `Regexp`. If it finds one, it will execute it, passing all {{% expression-parameter %}}s and variables from the Regexp as arguments to the {{% stepdef-body %}}.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up step definitions.

Also, check out [multiline step arguments](/docs/gherkin/reference#step-arguments) for more info on how to pass entire tables or bigger strings to your step definitions.

### Step Results

Each step can have one of the following results:

#### Success

When Cucumber finds a matching step definition it will execute it. If the block in the step definition doesn't raise an error, the step is marked as successful (green). Anything you `return` from a step definition has no significance whatsoever.

#### Undefined

When Cucumber can't find a matching step definition, the step gets marked as undefined (yellow), and all subsequent steps in the scenario are skipped.

#### Pending

When a step definition's {{% stepdef-body %}} invokes the `pending` {{% stepdef-body %}}, the step is marked as pending (yellow, as with `undefined` ones), indicating that you have work to do.

#### Failed Steps

When a step definition's {{% stepdef-body %}} is executed and raises an error, the step is marked as failed (red). What you return from a step definition has no significance whatsoever.

Returning {{% text "ruby" %}}`nil`{{% /text %}}{{% text "java,kotlin,scala" %}}`null`{{% /text %}}{{% text "javascript" %}}`null`{{% /text %}} or `false` will **not** cause a step definition to fail.

#### Skipped

Steps that follow `undefined`, `pending`, or `failed` steps are never executed, even if there is a matching step definition. These steps are marked as skipped (cyan).

#### Ambiguous

Step definitions have to be unique for Cucumber to know what to execute.
If you use ambiguous step definitions,{{% text "ruby" %}}Cucumber will raise a `Cucumber::Ambiguous` error,{{% /text %}}
{{% text "java,kotlin,scala" %}} Cucumber will raise an `AmbiguousStepDefinitionsException`,{{% /text %}}
{{% text "javascript" %}}the step / scenario will get an "Ambiguous" result,{{% /text %}}
telling you to fix the ambiguity.

# Hooks

Hooks are blocks of code that can run at various points in the Cucumber execution cycle.
They are typically used for setup and teardown of the environment before and after each scenario.

Where a hook is defined has no impact on what scenarios or steps it is run for.
If you want more fine-grained control, you can use [conditional hooks](#conditional-hooks).

{{% text "java,kotlin" %}}
You can declare hooks in any class.
{{% /text %}}

{{% text "scala" %}}
You can declare hooks in any class, trait or object.
{{% /text %}}

{{% text "ruby" %}}
You can declare hooks in your `features/support/env.rb` file, or any other file under
the `features/support` directory (for example, in a file called `support/hooks.rb`).
{{% /text %}}

{{% text "javascript" %}}
You can declare hooks in your `features/support/env.js` file, or any other file under
the `features/support` directory (for example, in a file called `features/support/hooks.js`).
{{% /text %}}

## Scenario hooks

Scenario hooks run for every scenario.

### Before

`Before` hooks run before the first step of each scenario.

{{% block "java" %}}
Annotated method style:

```java
@Before
public void doSomethingBefore() {
}
```

Lambda style:

```java
Before(() -> {
});
```
{{% /block %}}

{{% block "kotlin" %}}
Lambda style:

```kotlin
Before { scenario: Scenario ->
    // doSomething
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
Before { scenario: Scenario =>
    // doSomething
}
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
// Import the Before function
const { Before } = require('@cucumber/cucumber')
```

```javascript
Before(async function () {
})
```

{{% tip "Avoid arrow functions" %}}
ES6 arrow functions `() => {}` bind `this` to the current context, which prevents
sharing state between hooks and step definitions.
{{% /tip %}}
{{% /block %}}

{{% block "ruby" %}}

```ruby
Before do
  # Do something before each scenario
end
```
{{% /block %}}

{{% tip "Think twice before you use Before" %}}
Whatever happens in a `Before` hook is invisible to people who only read the features.
You should consider using a [background](/docs/gherkin/reference#background) as a more explicit
alternative, especially if the setup should be readable by non-technical people.
Only use a `Before` hook for low-level logic such as starting a browser or deleting
data from a database.
{{% /tip %}}

{{% block "java,kotlin,scala" %}}
You can specify an explicit order for hooks if you need to.
{{% /block %}}

{{% block "java" %}}
Annotated method style:

```java
@Before(order = 10)
public void doSomething(){
    // Do something before each scenario
}
```

Lambda style:

```java
Before(10, () -> {
    // Do something before each scenario
});
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
Before(10) { scenario: Scenario ->
    // Do something before each scenario
}
```
{{% warn "Using Kotlin named objects or companion objects" %}}

If @BeforeAll, @AfterAll etc. are used in Kotlin named objects or companion objects an `io.cucumber.java.InvalidMethodSignatureException`
will be thrown, as Kotlin will create a class `MyStepDefinitions$Companion` which has non-static methods.

- [read more about it here](https://kotlinlang.org/docs/java-to-kotlin-interop.html#static-methods).

The `@JvmStatic` annotation does not prevent this behaviour of Kotlin; it adds the static methods to `MyStepDefinitionsMethod` only. 

Consequently, Cucumber will detect the static methods in `MyStepDefinitions` class, as well as the non-static methods in `MyStepDefinitions$Companion` class and will complain about the second one.

As a solution to this problem, use [ package level functions](https://kotlinlang.org/docs/java-to-kotlin-interop.html#package-level-functions) - this is, without companion objects. 

{{% /warn %}}

```kotlin
package io.cucumber.example

import io.cucumber.java.AfterAll
import io.cucumber.java.BeforeAll

@BeforeAll
fun beforeAll() {
   println("before all")
}

@AfterAll
fun afterAll() {
   println("after all")
}
```

{{% /block %}}

{{% block "scala" %}}

```scala
Before(10) { scenario: Scenario =>
    // Do something before each scenario
}
```
{{% /block %}}

{{% block "javascript" %}}

`Before` hooks run in the **same order** in which they are declared.
{{% /block %}}

{{% block "ruby" %}}

`Before` hooks run in the **same order** in which they are declared.
{{% /block %}}

### After

`After` hooks run after the last step of each scenario, even when the step result is `failed`, `undefined`, `pending`, or `skipped`.

{{% block "java" %}}
Annotated method style:

```java
@After
public void doSomethingAfter(Scenario scenario){
    // Do something after after scenario
}
```

Lambda style:

```java
After((Scenario scenario) -> {
});
```

{{% /block %}}

{{% block "kotlin" %}}
Lambda style:

```kotlin
After { scenario: Scenario ->
    // doSomething
}
```

{{% /block %}}

{{% block "scala" %}}

```scala
After { scenario: Scenario =>
    // doSomething
}
```

{{% /block %}}

{{% block "javascript" %}}

```javascript
After(async function (scenario) {
})
```

{{% /block %}}

{{% block "ruby" %}}

```ruby
After do |scenario|
end
```

{{% /block %}}

The `scenario` parameter is optional. If you use it, you can inspect the status of the scenario.

For example, you can take a screenshot with {{% text "java,javascript,kotlin,scala" %}}[WebDriver](https://www.seleniumhq.org/projects/webdriver/){{% /text %}}{{% text "ruby" %}}[Capybara](https://github.com/teamcapybara/capybara){{% /text %}} for failed scenarios and embed them in Cucumber's report.

See the [browser automation page](/docs/guides/browser-automation/#screenshot-on-failure) for an example on how to do so.

{{% block "ruby" %}}
Here is an example in which we exit at the first failure (which could be useful in some cases like [Continuous Integration](/docs/guides/continuous-integration), where fast feedback is important).

```ruby
After do |s|
  # Tell Cucumber to quit after this scenario is done - if it failed.
  Cucumber.wants_to_quit = true if s.failed?
end
```
{{% /block %}}

### Around

{{% block "ruby" %}}

`Around` hooks will run "around" a scenario. This can be used to wrap the execution of a scenario in a block. The `Around` hook receives a `Scenario` object and a block (`Proc`) object. The scenario will be executed when you invoke `block.call`.

The following example will cause scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:

```ruby
Around('@fast') do |scenario, block|
  Timeout.timeout(0.5) do
    block.call
  end
end
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}Cucumber-JVM does not support `Around` hooks.{{% /block %}}
{{% block "javascript" %}}Cucumber.js does not support `Around` hooks.{{% /block %}}

## Step hooks
{{% text "java,kotlin,scala,javascript" %}}
Step hooks are invoked before and after a step. The hooks have 'invoke around' semantics, meaning that if a `BeforeStep`
hook is executed the `AfterStep` hooks will also be executed regardless of the result of the step. If a step did not
pass, the following step and its hooks will be skipped.
{{% /text %}}

### BeforeStep

{{% text "ruby" %}}Cucumber-Ruby does not support `BeforeStep` hooks.{{% /text %}}

{{% block "java" %}}
Annotated method style:

```java
@BeforeStep
public void doSomethingBeforeStep(Scenario scenario){
}
```

Lambda style:

```java
BeforeStep((Scenario scenario) -> {

});
```
{{% /block %}}

{{% block "kotlin" %}}
Lambda style:

```kotlin
BeforeStep { scenario: Scenario ->
    // doSomething
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
BeforeStep { scenario: Scenario =>
    // doSomething
}
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
BeforeStep(async function({pickle, pickleStep, gherkinDocument, testCaseStartedId, testStepId}) {
    // doSomething
})

BeforeStep({tags: "@foo"}, async function() {
    // apply this hook to only specific scenarios
})
```
{{% /block %}}

### AfterStep

{{% block "ruby" %}}

```ruby
AfterStep do |scenario|
end
```
{{% /block %}}

{{% block "java" %}}
Annotated method style:

```java
@AfterStep
public void doSomethingAfterStep(Scenario scenario){
}
```

Lambda style:

```java
AfterStep((Scenario scenario) -> {
});
```

{{% /block %}}

{{% block "kotlin" %}}
Lambda style:

```kotlin
AfterStep { scenario: Scenario ->
    // doSomething
}
```

{{% /block %}}

{{% block "scala" %}}

```scala
AfterStep { scenario: Scenario =>
    // doSomething
}
```

{{% /block %}}

{{% block "javascript" %}}

```javascript
AfterStep(async function({pickle, pickleStep, gherkinDocument, result, testCaseStartedId, testStepId}) {
    // doSomething
})
```

{{% /block %}}

## Conditional hooks

Hooks can be conditionally selected for execution based on the tags of the scenario.
To run a particular hook only for certain scenarios, you can associate a
{{% text "java,kotlin,scala" %}}`Before` or `After`{{% /text %}}
{{% text "javascript" %}}`Before` or `After`{{% /text %}}
{{% text "ruby" %}}`Before`, `After`, `Around` or `AfterStep`{{% /text %}}
hook with a [tag expression](#tag-expressions).

{{% block "java" %}}
Annotated method style:

```java
@After("@browser and not @headless")
public void doSomethingAfter(Scenario scenario){
}
```

Lambda style:

```java
After("@browser and not @headless", (Scenario scenario) -> {
});
```
{{% /block %}}

{{% block "kotlin" %}}
Lambda style:

```kotlin
After (arrayOf("@browser and not @headless")) { scenario: Scenario ->
    driver.quit()
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
After("@browser and not @headless") { scenario: Scenario =>

}
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
Before({tags: '@browser and not @headless'}, async function () {
})
```
{{% /block %}}

{{% block "ruby" %}}

```ruby
Before('@browser and not @headless') do
end
```
{{% /block %}}

See more documentation on [tags](#tags).

## Global hooks

Global hooks will run once before any scenario is run or after all scenario have
been run.
{{% block "ruby" %}}
Put the code at the top-level in your `env.rb` file (or any other file
under `features/support` directory).
{{% /block %}}

### BeforeAll

`BeforeAll` run before any scenario is run.

{{% block "ruby" %}}

```ruby
BeforeAll do
  # Do something before any scenario is executed
end
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
const { BeforeAll } = require('@cucumber/cucumber');

BeforeAll(async function () {
  // perform some shared setup
});
```
{{% /block %}}

{{% block "java" %}}
Annotated method style:

```java
@BeforeAll
public static void beforeAll() {
    // Runs before all scenarios
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
BeforeAll {
    // doSomething
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
BeforeAll {
    // doSomething
}
```
{{% /block %}}

### AfterAll

`AfterAll` run after all scenarios have been executed.

{{% block "ruby" %}}

```ruby
AfterAll do
  # Do something after all scenarios have been executed
end
```
{{% /block %}}

{{% block "javascript" %}}

```javascript
const { AfterAll } = require('@cucumber/cucumber');

AfterAll(async function () {
  // perform some shared setup
});
```
{{% /block %}}

{{% block "java" %}}
Annotated method style:

```java
@AfterAll
public static void afterAll() {
    // Runs after all scenarios
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
AfterAll {
    // doSomething
}
```
{{% /block %}}

{{% block "scala" %}}

```scala
AfterAll {
    // doSomething
}
```
{{% /block %}}

## InstallPlugin

{{% block "ruby" %}}
You may also provide an `InstallPlugin` hook that will be run after Cucumber has been configured. The block you provide will be passed on to Cucumber's configuration (an instance of `Cucumber::Cli::Configuration`), and a wrapper to some cucumber internals as a registry.

```ruby
InstallPlugin do |config, registry|
  puts "Features dwell in #{config.feature_dirs}"
end
```

This hook will run _only once_: after support has been loaded, and before any features are loaded.

You can use this hook to extend Cucumber. For example, you could affect how features are loaded, or register custom formatters programmatically.

[cucumber-wire](https://github.com/cucumber/cucumber-ruby-wire) is a good example
of how to use InstallPlugin and what a Cucumber plugin can do.
{{% /block %}}

{{% text "java,kotlin,scala" %}}Cucumber-JVM does not support the `InstallPlugin` hook.{{% /text %}}
{{% text "javascript" %}}Cucumber.js does not support the `InstallPlugin` hook.{{% /text %}}

## AfterConfiguration

`AfterConfiguration` has been deprecated in favor of [`BeforeAll`](#beforeall) and
[`InstallPlugin`](#installplugin) depending on your needs.

# Tags

Tags are a great way to organise your features and scenarios.

They can be used for two purposes:

* [Running a subset of scenarios](#running-a-subset-of-scenarios)
* [Restricting hooks to a subset of scenarios](#conditional-hooks)

Consider the following example:

```gherkin
@billing
Feature: Verify billing

  @important
  Scenario: Missing product description
    Given hello

  Scenario: Several products
    Given hello
```

A feature or scenario can have as many tags as you like. Separate them with spaces:

```gherkin
@billing @bicker @annoy
Feature: Verify billing
```

Tags can be placed above the following Gherkin elements:

* `Feature`
* `Scenario`
* `Scenario Outline`
* `Examples`

In `Scenario Outline`, you can use tags on different example like below:

```gherkin
Scenario Outline: Steps will run conditionally if tagged
  Given user is logged in
  When user clicks <link>
  Then user will be logged out

  @mobile
  Examples:
    | link                  |
    | logout link on mobile |

  @desktop
  Examples:
    | link                   |
    | logout link on desktop |
```

It is *not* possible to place tags above `Background` or steps (`Given`, `When`, `Then`, `And` and `But`).

## Tag Inheritance

Tags are inherited by child elements.

Tags that are placed above a `Feature` will be inherited by `Scenario`, `Scenario Outline`, or `Examples`.

Tags that are placed above a `Scenario Outline` will be inherited by `Examples`.

## Running a subset of scenarios

You can tell Cucumber to only run scenarios with a particular tag:

{{% block "java,kotlin,scala" %}}
For JUnit 5 see the [cucumber-junit-platform-engine documentation](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-junit-platform-engine#tags)

For JUnit 4 and TestNG using a JVM system property:

```shell
mvn test -Dcucumber.filter.tags="@smoke and @fast"
```

Or an environment variable:

```shell
# Linux / OS X:
CUCUMBER_FILTER_TAGS="@smoke and @fast" mvn test

# Windows:
set CUCUMBER_FILTER_TAGS="@smoke and @fast"
mvn test
```

Or changing your JUnit 4/TestNG  runner class:
{{% /block %}}

{{% block "java" %}}

```java
@CucumberOptions(tags = "@smoke and @fast")
public class RunCucumberTest {}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
@CucumberOptions(tags = "@smoke and @fast")
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
@CucumberOptions(tags = "@smoke and @fast")
class RunCucumberTest {}
```
{{% /block %}}

{{% block "javascript" %}}

```shell
# You can omit the quotes if the expression is a single tag
./node_modules/.bin/cucumber.js --tags "@smoke and @fast"
```
{{% /block %}}

{{% block "ruby" %}}

```shell
# You can omit the quotes if the expression is a single tag
cucumber --tags "@smoke and @fast"
```
{{% /block %}}

## Ignoring a subset of scenarios

You can tell Cucumber to ignore scenarios with a particular tag:

{{% block "java,kotlin,scala" %}}

Using JUnit runner class:

{{% /block %}}

{{% block "java" %}}

 ```java
@CucumberOptions(tags = "not @smoke")
public class RunCucumberTest {}
```
{{% /block %}}

{{% block "kotlin" %}}

 ```kotlin
@CucumberOptions(tags = "not @smoke")
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

 ```scala
@CucumberOptions(tags = "not @smoke")
class RunCucumberTest {}
```
{{% /block %}}

{{% block "javascript" %}}

```shell
# You can omit the quotes if the expression is a single tag
./node_modules/.bin/cucumber.js --tags "not @smoke"
```
{{% /block %}}

{{% block "ruby" %}}

```shell
# You can omit the quotes if the expression is a single tag
cucumber --tags "not @smoke"
```
{{% /block %}}

{{% tip "Filtering by line" %}}
Another way to run a subset of scenarios is to use the `file.feature:line` pattern or the `--scenario` option.
{{% /tip %}}

### Tag expressions
A tag expression is an *infix boolean expression*. Below are some examples:

| Expression           |                                                       Description |
|----------------------|------------------------------------------------------------------:|
| `@fast`              |                                     Scenarios tagged with `@fast` |
| `@wip and not @slow` | Scenarios tagged with `@wip` that aren't also tagged with `@slow` |
| `@smoke and @fast`   |                   Scenarios tagged with both `@smoke` and `@fast` |
| `@gui or @database`  |                Scenarios tagged with either `@gui` or `@database` |

Note: Using a `,` to separate tags in expressions such as `@tag1,@tag2` will cause the entire expression to be parsed as a single tag, potentially leading to unintended outcomes. It's required to separate the tags with space or operators like `and` `or` and `not`.

For even more advanced tag expressions you can use parenthesis for clarity, or
to change operator precedence:

```
(@smoke or @ui) and (not @slow)
```

## Using tags for documentation

Your imagination is the only limitation when it comes to using tags for documentation.

### Link to other documents

Tags can refer to IDs in external systems such as requirement management tools, issue trackers or
test management tools:

```gherkin
@BJ-x98.77 @BJ-z12.33
Feature: Convert transaction
```

You can use a custom Cucumber reporting plugin that will turn tags into links pointing to
documents in your external tool.

### Development Process

Another creative way to use tags is to keep track of where in the development process a certain feature is:

```gherkin
@qa_ready
Feature: Index projects
```

{{% block "ruby" %}}
As distributed, Cucumber-Rails builds a Rake task that recognizes the *`@wip`* tag.
However, any string may be used as a tag and any scenario or entire feature can have multiple tags associated with it.

The default profile contained in the distributed `config/cucumber.yml` contains these lines:

```
<%
.  .  .
std_opts = "--format #{ENV['CUCUMBER_FORMAT'] || 'progress'} --strict --tags ~@wip"
%>
default: <%= std_opts %> features
.  .  .
```

Note the trailing option `--tags ~@wip`.  Cucumber provides for negating tags by prefacing the `--tags` argument with a tilde character (**`~`**).
This tells Cucumber to not process features and scenarios with this tag. If you do not specify a different profile (`cucumber -p profilename`), then the default profile will be used.
If the default profile is used, then the `--tags ~@wip` will cause Cucumber to skip any scenario with this tag. This will override the `--tags=@authen` option passed in the command line, and so you will see this:

```
$ cucumber --tags=@authent
Using the default profile...

0 scenarios
0 steps
0m0.000s
```

Since version 0.6.0, one can no longer overcome this default setting by adding the `--tags=@wip` to the Cucumber argument
list on the command line, because now all `--tags` options are ANDed together.  Thus, the combination of `--tags @wip` **AND** `--tags ~@wip` fails everywhere.

You either must create a special profile in `config/cucumber.yml` to deal with this, or alter the default profile to suit your needs.

The `@wip` tags are a special case. If any scenario tagged as `@wip` passes all of its steps without error, and the
`--wip` option is also passed, Cucumber reports the run as failing (because Scenarios that are marked as a work in progress are not *supposed* to pass!)

Note as well that the `--strict` and `--wip` options are mutually exclusive.

The number of occurrences of a particular tag in your features may be controlled by appending a colon followed by a
number to the end of the tag name passed to the `--tags` option, like so:

```
$ cucumber --tags=@wip:3 features/log\*
```

The existence of more than the specified number of occurrences of that tag in all the features that are exercised during
a particular Cucumber run will produce a warning message. If the `--strict` option is passed as well, as is the case with
the default profile, then instead of a warning the run will fail.

Limiting the number of occurrences is commonly used in conjunction with the `@wip` tag to restrict the number of
unspecified scenarios to manageable levels. Those following [Kanban](https://en.wikipedia.org/wiki/kanban) or
[Lean Software Development](https://en.wikipedia.org/wiki/Lean_software_development) based methodologies will find this useful.
{{% /block %}}

# Running Cucumber

{{% block "java,kotlin,scala" %}}
Cucumber is a Java library with extensions for different tools and platforms.
It is launched by running JUnit 4, JUnit 5, your build tool, your IDE or the CLI.
{{% /block %}}

{{% block "javascript" %}}
Cucumber is a command line tool. It is launched by running `cucumber-js` from the command line, or a build script.
{{% /block %}}

{{% block "ruby" %}}
Cucumber is a command line tool. It is launched by running `cucumber` from the command line, or a build script.
{{% /block %}}

It is possible to [configure](/docs/cucumber/configuration) how Cucumber should run features.

## From the command line

{{% block "ruby" %}}
The most common option is to run Cucumber from the command line. By default, Cucumber will treat anything ending in `.rb` under the root library directory as a step definition file.
Thus, a step contained in `features/models/entities/step_definitions/anything.rb` can be used in a feature file contained in `features/views/entity_new`, provided that:

- Cucumber is invoked on a root directory common to both (`./features`, in this example); OR
- explicitly required on the command line
{{% /block %}}

{{% block "javascript" %}}
The most common option is to run Cucumber from the command line. By default, Cucumber will treat anything ending in`.js` under the root directory as a step definition file.
Thus, a step contained in `features/models/entities/step-definitions/anything.js` can be used in a feature file, provided that:

- Cucumber is invoked on a root directory common to both (`./features`, in this example); OR
- explicitly required on the command line
{{% /block %}}

{{% block "ruby" %}}
The following command will run the `authenticate_user` feature. Any feature in a subdirectory of `features/` directory must `require` features.

```
cucumber --require features features/authentication/authenticate_user.feature
```

Note that if the `--require` option is passed, then **ONLY** that directory tree will be searched for step definition matches.
You may specify the `--require` option multiple times if you need to include step definitions from directories that do not share a convenient root.

Otherwise, to run all features:

```
cucumber
```

{{% /block %}}

{{% block "java,kotlin,scala" %}}
The *Command-Line Interface Runner (CLI Runner)* is an executable Java class that can be run from the command-line.

```
java io.cucumber.core.cli.Main
```
Note that you will need to add the `cucumber-core` jar and all of its transitive dependencies to your classpath, in addition to the location of your compiled .class files. You can find these jars in [Maven Central](https://mvnrepository.com/repos/central).

You will also need to provide the CLI with your step definitions via the `--glue` option followed by its package name, and the filepath of your feature file(s).

For example:
```shell
java -cp "path/to/each/jar:path/to/compiled/.class/files" io.cucumber.core.cli.Main /path/to/your/feature/files --glue hellocucumber --glue anotherpackage
```
Alternatively if you are using a Maven project, you can run the CLI using the [Exec Maven](https://www.mojohaus.org/exec-maven-plugin/) plugin:

```shell
mvn exec:java                                  \
    -Dexec.classpathScope=test                 \
    -Dexec.mainClass=io.cucumber.core.cli.Main \
    -Dexec.args="/path/to/your/feature/files --glue hellocucumber --glue anotherpackage"
```

{{% /block %}}

{{% block "javascript" %}}

Cucumber.js includes an executable file to run the features. After installing Cucumber in a project, you can run it with:

``` shell
$ ./node_modules/.bin/cucumber.js
```

The executable is also aliased as `cucumber-js` and `cucumberjs`.

{{% note "Windows users"%}}
Use `cucumber-js` or `cucumberjs` instead of `cucumber.js`.
The latter is causing the operating system to invoke JScript instead of Node.js,
because of the file extension.
{{% /note %}}

{{% note "Note on global installs"%}}
Cucumber does not work when installed globally because cucumber needs to be required in support files and globally installed modules cannot be required.
{{% /note %}}

{{% /block %}}

You can also run features using a [build tool](/docs/tools/general#build-tools) or an [IDE](/docs/tools/general#ides).

## JUnit 5 

{{% block "java,kotlin,scala" %}}
See the [cucumber-junit-platform-engine documentation](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-junit-platform-engine#configuration-options) for more information.

{{% /block %}}

{{% block "ruby" %}}
Ruby can't be run by JUnit 5.
{{% /block %}}

{{% block "javascript" %}}
Javascript can't be run by JUnit 5.
{{% /block %}}

## JUnit 4

{{% block "java,kotlin,scala" %}}
To use JUnit to execute cucumber scenarios add the `cucumber-junit` dependency to your pom.

```xml
<dependencies>
  [...]
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-junit</artifactId>
        <version>${cucumber.version}</version>
        <scope>test</scope>
    </dependency>
  [...]
</dependencies>
```
Note that `cucumber-junit` is based on JUnit 4. If you're using JUnit 5, use the [cucumber-junit-platform-engine](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-junit-platform-engine) or include `junit-vintage-engine` dependency, as well. For more information, please refer to [JUnit 5 documentation](https://junit.org/junit5/docs/current/user-guide/#migrating-from-junit4-running)

Create an empty class that uses the Cucumber JUnit runner.

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions()
public class RunCucumberTest {
}
```

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber::class)
@CucumberOptions()
class RunCucumberTest {
}
```

```scala
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(classOf[Cucumber])
@CucumberOptions()
class RunCucumberTest {
}
```

This will execute all scenarios in same package as the runner, by default glue code is also assumed to be in the same
package.

The `@CucumberOptions` can be used to provide
[additional configuration](#list-configuration-options) to the runner.

**Using plugins:**

For example if you want to tell Cucumber to use the two formatter plugins `pretty` and `html`, you can specify it like this:
{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"})
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"})
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(plugin = Seq("pretty", "html:target/cucumber"))
class RunCucumberTest {
}
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}
For example if you want to tell Cucumber to print code snippets for missing
step definitions use the `summary` plugin, you can specify it like this:
{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "summary"}, snippets = CAMELCASE)
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "summary"}, snippets = CAMELCASE)
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(plugin = Seq("pretty", "summary"), snippets = CAMELCASE)
class RunCucumberTest {
}
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}
The default option for `snippets` is `UNDERSCORE`. This settings can be used to
specify the way code snippets will be created by Cucumber.

**Performing a dry-run:**

For example if you want to check whether all feature file steps have corresponding step definitions, you can specify it like this:
{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(dryRun=true)
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(dryRun=true)
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(dryRun=true)
class RunCucumberTest {
}
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}
The default option for `dryRun` is `false`.

**Formatting console output:**

For example if you want console output from Cucumber in a readable format, you can specify it like this:
{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(monochrome=true)
public class RunCucumberTest {
}
```

{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(monochrome=true)
class RunCucumberTest
```

{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(monochrome=true)
class RunCucumberTest {
}
```

{{% /block %}}

{{% block "java,kotlin,scala" %}}

The default option for `monochrome` is `false`.

**Select scenarios using tags:**

For example if you want to tell Cucumber to only run the scenarios specified with specific tags, you can specify it like this:

{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(tags = {"@foo and not @bar"})
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(tags = {"@foo and not @bar"})
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(tags = Seq("@foo and not @bar"))
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}

**Specify an object factory:**

For example if you are using Cucumber with a DI framework and want to use a custom object factory, you can specify it like this:
{{% /block %}}

{{% block "java" %}}

```java
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(objectFactory = FooFactory.class)
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package com.example

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber.class)
@CucumberOptions(objectFactory = FooFactory.class)
class RunCucumberTest
```
{{% /block %}}

{{% block "scala" %}}

```scala
package com.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(classOf[Cucumber])
@CucumberOptions(objectFactory = FooFactory.class)
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}
The default option for `objectFactory` is to use the default object factory.
Additional information about using custom object factories can be found [here](/docs/cucumber/state/#the-cucumber-object-factory)

There are additional options available in the `@CucumberOptions` annotation.

Usually, the test class will be empty. You can, however, specify several JUnit rules.

{{% note "Supported JUnit annotations"%}}
Cucumber supports JUnits `@ClassRule`, `@BeforeClass` and `@AfterClass` annotations.
These will be executed before and after all scenarios. Using them is not recommended, as it limits the portability between different runners;
they may not execute correctly when using the commandline, [IntelliJ IDEA](https://www.jetbrains.com/help/idea/cucumber.html) or
[Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse) . Instead, it is recommended to use Cucumbers `Before` and `After` [hooks](#hooks).
{{% /note %}}

The Cucumber runner acts like a suite of a JUnit tests. As such other JUnit features such as Categories, Custom JUnit
Listeners and Reporters can all be expected to work.

For more information on JUnit, see the [JUnit website](https://www.junit.org)

{{% /block %}}

{{% block "ruby" %}}
Ruby can't be run by JUnit.
{{% /block %}}

{{% block "javascript" %}}
Javascript can't be run by JUnit.
{{% /block %}}

# Options

Cucumber provides several options that can be passed to on the command-line.

{{% block "ruby" %}}
For example:

To run the scenario defined at line 44 of the `authenticate_user` feature, format it as HTML, and pipe it to the `features.html` file for viewing in a browser:

```shell
cucumber features/authenticate_user.feature:44 --format html > features.html
```

To run the scenario(s) named `"Failed login"`:

```shell
cucumber features --name "Failed login"
```
{{% /block %}}

## List configuration options

You can list the options available for the Cucumber version you are using.

{{% block "ruby" %}}
Assuming you've installed Cucumber as a gem, run this at a command prompt to see the options for running features:

```
cucumber --help
```
{{% /block %}}

{{% block "java,kotlin,scala" %}}
Pass the `--help` option to print out all the available configuration options:

```
java io.cucumber.core.cli.Main --help
```

{{% /block %}}

{{% block "javascript" %}}
Use the `cucumber-js --help` command to see which arguments can be passed to the executable file.
{{% /block %}}

You can also use [tags](#tags) to specify what to run.

{{% block "java,kotlin,scala" %}}
Cucumber will in order of precedence parse properties from system properties,
environment variables and the `cucumber.properties` file.

Note that options provided by `@CucumberOptions` take precedence over the
properties file and CLI arguments take precedence over all.

Note that the `cucumber-junit-platform-engine` is provided with properties
by the Junit Platform rather than Cucumber. See
[junit-platform-engine Configuration Options](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-junit-platform-engine#configuration-options)
for more information.

For example, if you are using Maven and want to run a subset of scenarios tagged
with `@smoke`:

```
mvn test -Dcucumber.filter.tags="@smoke"
```

Supported properties are:
```
cucumber.ansi-colors.disabled=  # true or false. default: false
cucumber.execution.dry-run=     # true or false. default: false
cucumber.execution.limit=       # number of scenarios to execute (CLI only).
cucumber.execution.order=       # lexical, reverse, random or random:[seed] (CLI only). default: lexical
cucumber.execution.wip=         # true or false. default: false.
cucumber.features=              # comma separated paths to feature files. example: path/to/example.feature, path/to/other.feature
cucumber.filter.name=           # regex. example: .*Hello.*
cucumber.filter.tags=           # tag expression. example: @smoke and not @slow
cucumber.glue=                  # comma separated package names. example: com.example.glue
cucumber.plugin=                # comma separated plugin strings. example: pretty, json:path/to/report.json
cucumber.object-factory=        # object factory class name. example: com.example.MyObjectFactory
cucumber.snippet-type=          # underscore or camelcase. default: underscore
```

{{% /block %}}

{{% block "ruby" %}}
You can also define common command-line options in a [`cucumber.yml`](/docs/cucumber/configuration) file.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to configure options, have a look at the [cucumber-js docs on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md)

{{% /block %}}
