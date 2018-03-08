---
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
source: https://github.com/cucumber/cucumber/wiki/Hooks/
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Cucumber Reference
polyglot: true
---

Cucumber can be used to implement automated tests based on scenarios described in your Gherkin feature files.

# Step Definitions

When Cucumber executes a [step](/gherkin/#steps) in a scenario, it will look for a matching *step definition* to execute.
Step definitions connect Gherkin steps to code.

A step definition is
{{% text "java" %}}a method with an expression attached to it. They are defined in Java classes.{{% /text %}}
{{% text "ruby" %}}a block of code with a regular expression attached to it. They are defined in Ruby files under `features/step_definitions/*_steps.rb`.{{% /text %}}
{{% text "javascript" %}}a function with a Cucumber expression attached to it. They are defined in Javascript files under `features/step_definitions/*_steps.js`.{{% /text %}}

 To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the step definition below:

```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_n_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```

```ruby
Given('I have {int} cukes in my belly') do |cukes|
  puts "Cukes: #{cukes}"
end
```

```javascript
Given('I have {int} cukes in my belly', function (cukes) {
  console.log(`Cukes: ${cukes}`)
});
```

{{% warn %}}
Please note that if you use arrow functions, you won't be able
to share state between steps!

```javascript
// Don't do this!
Given('I have {int} cukes in my belly', cukes => {
  console.log(`Cukes: ${cukes}`)
})
```
{{% /warn %}}

In the example above Cucumber extracts the text `48` from the step, converts it to an `int`
and passes it as an argument to the {{% stepdef-body %}}.

The number of parameters in the {{% stepdef-body %}} has to match the number of {{% expression-parameter %}}s in the expression. (If there is a mismatch, Cucumber will throw an error).

# Data Tables

{{% text "java" %}}

To automatically transform DataTables in your feature file, you can change the DataTable to a List or Map:
List<YourType>, List<List<E>>, List<Map<K,V>> or Map<K,V> where E,K,V must be a scalar (String, Integer, Date, enum etc).
To transform to a List<YourType>, the field names for YourType must match the column names in your feature file (except for spaces and capitalization).

{{% /text %}}

# Steps

A step is analogous to a method call or function invocation.

For example:

```gherkin
Given I have 93 cucumbers in my belly
```

In this step, you're "calling" the above step definition with one argument: the value `93`.

Steps are declared in your {{% text "ruby" %}}`features/\*.feature`{{% /text %}}{{% text "java" %}}`*.feature`{{% /text %}}{{% text "javascript" %}}`*.feature`{{% /text %}} files.


## Matching steps

1. Cucumber matches a step against a Step Definition's `Regexp`
2. Cucumber gathers any capture groups or variables
3. Cucumber passes them to the step definition's {{% text "ruby" %}}`Proc` (or “function”){{% /text %}}{{% text "javascript" %}}function{{% /text %}}{{% text "java" %}}method{{% /text %}} and executes it

Recall that step definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**).

All step definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each step, Cucumber will look for a registered step definition with a matching `Regexp`. If it finds one, it will execute it, passing all capture groups and variables from the Regexp as arguments to the method or function.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up Step Definitions.

Also, check out [Multiline step arguments](/gherkin/#step-arguments) for more info on how to pass entire tables or bigger strings to your step definitions.


### Step Results

Each step can have one of the following results:

#### Success

When Cucumber finds a matching step definition it will execute it. If the block in the step definition doesn't raise an error, the step is marked as successful (green). Anything you `return` from a step definition has no significance whatsoever.

#### Undefined

When Cucumber can't find a matching step definition, the step gets marked as yellow, and all subsequent steps in the scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

#### Pending

When a step definition's method or function invokes the `pending` method, the step is marked as yellow (as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

#### Failed Steps

When a step definition's method or function is executed and raises an error, the step is marked as red. What you return from a step definition has no significance whatsoever.

Returning {{% text "ruby" %}}`nil`{{% /text %}}{{% text "java" %}}`null`{{% /text %}}{{% text "javascript" %}}`null`{{% /text %}} or `false` will **not** cause a step definition to fail.

#### Skipped

Steps that follow `undefined`, `pending`, or `failed` steps are never executed,  even if there is a matching step definition. These steps are marked as cyan.

#### Ambiguous

Step definitions have to be unique for Cucumber to know what to execute.
If you use ambiguous step definitions,{{% text "ruby" %}}Cucumber will raise a `Cucumber::Ambiguous` error,{{% /text %}}
{{% text "java" %}} Cucumber will raise an `AmbiguousStepDefinitionsException`,{{% /text %}}
{{% text "javascript" %}}the step / scenario will get an "Ambiguous" result,{{% /text %}}
telling you to fix the ambiguity.

# Hooks

Hooks are blocks of code that can run at various points in the Cucumber execution cycle.
They are typically used for setup and teardown of the environment before and after each scenario.

Where a hook is defined has no impact on what scenarios or steps it is run for.
If you want more fine-grained control, you can use [tagged hooks](#tagged-hooks).

{{% text "java" %}}
You can declare hooks in any class.
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

{{% block "javascript" %}}
```javascript
// Import the Before function
const { Before } = require('cucumber')
```

Synchronous style:

```javascript
Before(function () {
})
```

{{% tip "Avoid arrow functions" %}}
ES6 arrow functions `() => {}` bind `this` to the current context, which prevents
sharing state between hooks and step definitions.
{{% /tip %}}

Promise style:

```javascript
After(function () {
  return somethingReturningPromise()
});
```

Callback style:

```javascript
After(function (callback) {
  somethingCallingCallback(callback)
});
```

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
You should consider using [Background](/gherkin/#background) as a more explicit
alternative, especially if the setup should be readable by non-technical people.
Only use a `Before` hook for low-level logic such as starting a browser or deleting
data from a database.
{{% /tip %}}

{{% block "java" %}}
You can specify an explicit order for hooks if you need to.

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

{{% block "javascript" %}}
`Before` hooks run in the **same order** in which they are declared.
{{% /block %}}

{{% block "ruby" %}}
`Before` hooks run in the **same order** in which they are declared.
{{% /block %}}

### After

`After` hooks run after the last step of each scenario, even when steps are `failed`, `undefined`, `pending`, or `skipped`.

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

{{% block "javascript" %}}

```javascript
After(function (scenario) {
})
```

{{% /block %}}

{{% block "ruby" %}}

```ruby
After do |scenario|
})
```

{{% /block %}}

The `scenario` parameter is optional, but if you use it, you can inspect the status
of the scenario.

{{% block "java" %}}
For example, you can take a screenshot with
[WebDriver](http://www.seleniumhq.org/projects/webdriver/)
for failed scenarios and embed them in Cucumber's report.
{{% /block %}}

{{% block "ruby" %}}
For example, you can take a screenshot with
[Capybara](https://github.com/teamcapybara/capybara)
for failed scenarios and embed them in Cucumber's report.
{{% /block %}}

```java
if (scenario.isFailed()) {
    byte[] screenshot = webDriver.getScreenshotAs(OutputType.BYTES);
    scenario.embed(screenshot, "image/png");
}
```

```javascript
TODO: See Ruby or Java example
```

```ruby
# Available scenario methods: #failed?, #passed?, and #exception
if scenario.failed?
  path = "html-report/#{scenario.__id__}.html"
  page.driver.browser.save_screenshot(path)
  embed(path, "image/png")
end
```

{{% block "ruby" %}}
Here is an example in which we exit at the first failure (which could be useful in some cases like [Continuous Integration](/cucumber/continuous-integration/), where fast feedback is important).
{{% /block %}}

```ruby
After do |s|
  # Tell Cucumber to quit after this scenario is done - if it failed.
  Cucumber.wants_to_quit = true if s.failed?
end
```

### Around

{{% text "ruby" %}}
`Around` hooks will run "around" a scenario. This can be used to wrap the execution of a scenario in a block. The `Around` hook receives a `Scenario` object and a block (`Proc`) object. The scenario will be executed when you invoke `block.call`.

The following example will cause Scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:
{{% /text %}}

```ruby
Around('@fast') do |scenario, block|
  Timeout.timeout(0.5) do
    block.call
  end
end
```

{{% block "java" %}}Cucumber-JVM does not support `Around` hooks.{{% /block %}}
{{% block "javascript" %}}Cucumber.js does not support `Around` hooks.{{% /block %}}

## Step hooks

### AfterStep

{{% block "ruby" %}}
```ruby
AfterStep do |scenario|
end
```
{{% /block %}}

{{% block "java" %}}Cucumber-JVM does not support `AfterStep` hooks.{{% /block %}}
{{% block "javascript" %}}Cucumber.js does not support `AfterStep` hooks.{{% /block %}}

## Tagged hooks

Hooks can be conditionally selected for execution based on the tags of the scenario.
To run a particular hook only for certain scenarios, you can associate a
{{% text "java" %}}`Before` or `After`{{% /text %}}
{{% text "javascript" %}}`Before` or `After`{{% /text %}}
{{% text "ruby" %}}`Before`, `After`, `Around` or `AfterStep`{{% /text %}}
Hook with a [tag expression](/cucumber/#tag-expressions).

{{% block "java" %}}
Annotated method style:

```java
@After("@browser and not @headless")
public void doSomethingAfter(){
}
```

Lambda style:

```java
After("@browser and not @headless", (Scenario scenario) -> {
});
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
Before({tags: '@browser and not @headless'}, function () {
})
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
Before('@browser and not @headless' do
end
```
{{% /block %}}

See more documentation on [tags](#tags).

## Global Hooks

{{% block "ruby" %}}
A global hook will run once before any scenario is run. Simply put the
code at the top-level in your `env.rb` file (or any other file under
`features/support` directory).

Use `Kernel#at_exit` for global teardown.

Example:
{{% /block %}}
```ruby
my_heavy_object = HeavyObject.new
my_heavy_object.do_it

at_exit do
  my_heavy_object.undo_it
end
```

{{% block "java" %}}Cucumber-JVM does not support global hooks.{{% /block %}}
{{% block "javascript" %}}Cucumber.js does not support global hooks.{{% /block %}}

## Running a hook only once

If you have a hook you only want to run once, use a global variable:

{{% text "ruby" %}}
```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return if $dunit  # bail if $dunit is true
  the_slow_thing    # otherwise do it.
  $dunit = true     # don't do it again.
end
```
{{% /text %}}

## AfterConfiguration

{{% text "ruby" %}}
You may also provide an `AfterConfiguration` Hook that will be run after Cucumber has been configured. The block you provide will be passed on to Cucumber's configuration (an instance of `Cucumber::Cli::Configuration`).

Example:
{{% /text %}}

```ruby
AfterConfiguration do |config|
  puts "Features dwell in #{config.feature_dirs}"
end
```

{{% text "ruby" %}}
This Hook will run _only once_: after support has been loaded, and before any Features are loaded.

You can use this Hook to extend Cucumber. For example you could affect how Features are loaded, or register [Custom Formatters](/implementations/ruby/custom-formatters/) programmatically.
{{% /text %}}

{{% text "java" %}}Cucumber-JVM does not support `AfterConfiguration` hooks.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support `AfterConfiguration` hooks.{{% /text %}}

# Tags

Tags are a great way to organise your features and scenarios. Consider this example:

```gherkin
@billing
Feature: Verify billing

  @important
  Scenario: Missing product description
    Given hello

  Scenario: Several products
    Given hello
```

A feature or scenario or can have as many tags as you like. Just separate them with spaces:

```gherkin
@billing @bicker @annoy
Feature: Verify billing
```

Tags can be placed above the following Gherkin elements:

* `Feature`
* `Scenario`
* `Scenario Outline`
* `Examples`

It is *not* possible to place tags above `Background` or steps (`Given`, `When`, `Then`, `And` and `But`).

## Tag Inheritance

Tags are inherited by child elements.

Tags that are placed above a `Feature` will be inherited by `Scenario`, `Scenario Outline`, or `Examples`.

Tags that are placed above a `Scenario Outline` will be inherited by `Examples`.

## Tag expressions

Tag expressions provide a simple query language to select scenarios based on
[boolean expressions](https://en.wikipedia.org/wiki/Boolean_expression).

Tag expressions are used for two different purposes:

* [Running a subset of scenarios](#running-a-subset-of-scenarios)
* [Scoping hooks to a subset of scenarios](#tagged-hooks)

The simplest possible tag expression is simply a tag, for example:

```shell
@wip
```

You can combine tags to form more advanced expressions using boolean logic:

```shell
@wip and not @slow
@smoke and @fast
@gui or @database
@gui and @database
```

For even more advanced tag expressions you can use parenthesis for clarity, or
to change operator precedence:

```shell
(@smoke or @ui) and (not @slow)
```

## Running a subset of scenarios

You can tell Cucumber to only run scenarios with a particular tag:

{{% block "java" %}}
Using a Java system property:

```shell
mvn test -Dcucumber.options='--tags "@smoke and @fast"'
```

Or an environment variable:

```shell
# Linux / OS X:
CUCUMBER_OPTIONS='--tags "@smoke and @fast"' mvn test

# Windows:
set CUCUMBER_OPTIONS='--tags "@smoke and @fast"'
mvn test
```

Or changing your JUnit runner class:

```java
@Cucumber.Options(tags = "@smoke and @fast")
public class RunCucumberTest {}
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

{{% tip "Filtering by line" %}}
Another way to run a subset of scenarios is to use the `file.feature:line` pattern or the `--scenario` option.
{{% /tip %}}

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

### Development process

Another creative way to use Tags is to keep track of where in the development process a certain Feature is:

```gherkin
@qa_ready
Feature: Index projects
```

# Running Cucumber

Cucumber is a 
{{% text "java" %}}JUnit extension.{{% /text %}}
{{% text "javascript,ruby" %}}command line tool.{{% /text %}}
It is launched by running
{{% text "java" %}}JUnit from your build tool or your IDE.{{% /text %}}
{{% text "javascript" %}}`cucumber-js` from the command line, or a build script.{{% /text %}}
{{% text "javascript" %}}`cucumber` from the command line, or a build script.{{% /text %}}

It is possible to [configure](#configuration) how Cucumber should run features.

## From the command line

The most common option is to run Cucumber from the command line.

{{% block "ruby" %}}

The following command will run the `authenticate_user` feature. Any feature in a sub-directory of `features/` directory must `require` features.

```
cucumber --require features features/authentication/authenticate_user.feature
```

{{% /block %}}

{{% block "java" %}}

**CLI Runner**

The Command-Line Interface Runner (CLI Runner) is an executable Java class that can be run from the command-line, or from any build tool (such as Maven, Gradle or Ant), or an IDE.

```
java cucumber.api.cli.Main
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

You can also run features using a build tool.

# Configuration

Cucumber provides several configuration options.

## Command-line

Configuration options can be passed to on the command-line.

{{% block "ruby" %}}
For example:

To run the Scenario defined at line 44 of the `authenticate_user` Feature, format it as HTML, and pipe it to the `features.html` file for viewing in a browser:

```shell
cucumber features/authenticate_user.feature:44 --format html > features.html
```

To run the Scenario(s) named `"Failed login"`:

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

{{% block "java" %}}
Pass the `--help` option to print out all the available configuration options:

```
java cucumber.api.cli.Main --help
```

Or:

```
mvn test -Dcucumber.options="--help"
```

For example, if you want to tell Cucumber to use the two formatter plugins `pretty` and `html`, you can specify it like this:

```java
package mypackage;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"})
public class RunCukesTest {
}
```

Usually, this class will be empty. You can, however, specify several JUnit rules.

{{% note "Supported JUnit annotations"%}}
Cucumber supports JUnits `@ClassRule`, `@BeforeClass` and `@AfterClass` annotations.
These will executed before and after all scenarios. Using these is not recommended, as it limits the portability between different runners;
they may not execute correctly when using the commandline, [IntelliJ IDEA](https://www.jetbrains.com/help/idea/cucumber.html) or
[Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse). Instead it is recommended to use Cucumbers `Before`
+and `After` [hooks](#hooks).
{{% /note %}}

The Cucumber runner acts like a suite of a JUnit tests. As such other JUnit features such as Categories, Custom JUnit
Listeners and Reporters can all be expected to work.

For more information on JUnit, see the [JUnit web site](http://www.junit.org).
{{% /block %}}

{{% block "javascript" %}}
Use the `cucumber-js --help` command to see which arguments can be passed to the executable file.
{{% /block %}}

You can also use [tags](#tags) to specify what to run, or pass [environment variables](/cucumber/environment-variables) to Cucumber.

{{% block "java" %}}
Configuration options can also be overridden and passed to *any* of the runners via the `cucumber.options` Java system property.

For example, if you are using Maven and want to run a subset of scenarios tagged
with `@smoke`:

```
mvn test -Dcucumber.options="--tags @smoke"
```

Some of the runners provide additional mechanisms for passing options to Cucumber.
{{% /block %}}

{{% block "ruby" %}}
You can also define common command-line options in a [`cucumber.yml`](/cucumber/cucumber.yml/) file.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to configure options, have a look at the [cucumber-js docs on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md).
{{% /block %}}