---
title: Cucumber Reference
subtitle: "Using Cucumber: Step Definitions, Hooks, Tags"
polyglot:
  - java
  - javascript
  - ruby
---

Cucumber can be used to implement automated tests based on scenarios described in your Gherkin feature files.

# Step Definitions

When Cucumber executes a [step](/gherkin/reference#steps) in a scenario, it will look for a matching *step definition* to execute.
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

{{% text "javascript" %}}
{{% warn %}}
Please note that if you use arrow functions, you won't be able to share state between steps!

```javascript
// Don't do this!
Given('I have {int} cukes in my belly', cukes => {
  console.log(`Cukes: ${cukes}`)
})
```
{{% /warn %}}
{{% /text %}}

{{% text "java" %}}
Java step definitions are written in regular Java classes. They can be written either using lambda expressions or
method annotations.

**Lambda Expressions (Java 8)**

If you use the `cucumber-java8` module, you can write the [step definitions](/cucumber/api/#step-definitions)
using lambdas:

```java
package foo;

import cucumber.api.java8.En;

public class MyStepdefs implements En {
    public MyStepdefs() {
        Given("I have (\\d+) cukes in my belly", (Integer cukes) -> {
            System.out.format("Cukes: %n\n", cukes);
        });
    }
}
```

Note that your class will have to implement the interface `cucumber.api.java8.En` to use the Cucumber keywords.

**Annotated methods (Java 6 and onwards)**

If you use the `cucumber-java` module, you can write them using annotated methods:

```java
package foo;

public class MyStepdefs {
    @Given("I have (\\d+) cukes in my belly")
    public void I_have_cukes_in_my_belly(int cukes) {
        System.out.format("Cukes: %n\n", cukes);
    }
}
```

In this case your class will not have to extend or implement anything.
{{% /text %}}

# Step Arguments

In the example above Cucumber extracts the text `48` from the step, converts it to an `int`
and passes it as an argument to the {{% stepdef-body %}}.

The number of parameters in the {{% stepdef-body %}} has to match the number of {{% expression-parameter %}}s in the expression. (If there is a mismatch, Cucumber will throw an error).

## Data Tables

{{% text "java" %}}
The simplest way to pass a `List<String>` to a step definition is to use commas:

```gherkin
Given the following animals: cow, horse, sheep
```

and declare the argument as a `List<String>`:

```java
@Given("the following animals: (.*)")
public void the_following_animals(List<String> animals) {
}
```

See the [`@Delimiter` annotation](https://github.com/cucumber/cucumber-jvm/blob/master/core/src/main/java/cucumber/api/Delimiter.java) for details about how to define a delimiter different than `,`.

If you prefer to use a DataTable to define a list, you can do that too:

```gherkin
Given the following animals:
  | cow   |
  | horse |
  | sheep |
```

Declare the argument as a `List<String>`, but don't define any capture groups in the pattern:

```java
@Given("the following animals:")
public void the_following_animals(List<String> animals) {
}
```

In this case, the `DataTable` is automatically flattened to a `List<String>`
by Cucumber (using `DataTable.asList(String.class)`) before invoking the step definition.
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

1. Cucumber matches a step against a step definition's `Regexp`
2. Cucumber gathers any capture groups or variables
3. Cucumber passes them to the step definition's {{% text "ruby" %}}`Proc` (or “function”){{% /text %}}{{% text "javascript" %}}function{{% /text %}}{{% text "java" %}}method{{% /text %}} and executes it

Recall that step definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**).

All step definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each step, Cucumber will look for a registered step definition with a matching `Regexp`. If it finds one, it will execute it, passing all capture groups and variables from the Regexp as arguments to the method or function.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up step definitions.

Also, check out [multiline step arguments](/gherkin/reference#step-arguments) for more info on how to pass entire tables or bigger strings to your step definitions.

### Step Results

Each step can have one of the following results:

#### Success

When Cucumber finds a matching step definition it will execute it. If the block in the step definition doesn't raise an error, the step is marked as successful (green). Anything you `return` from a step definition has no significance whatsoever.

#### Undefined

When Cucumber can't find a matching step definition, the step gets marked as undefined (yellow), and all subsequent steps in the scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

#### Pending

When a step definition's method or function invokes the `pending` method, the step is marked as pending (yellow, as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

#### Failed Steps

When a step definition's method or function is executed and raises an error, the step is marked as failed (red). What you return from a step definition has no significance whatsoever.

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
You should consider using a [background](/gherkin/reference#background) as a more explicit
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

The following example will cause scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:
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

### BeforeStep

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
Hook with a [tag expression](/cucumber/api/#tag-expressions).

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

{{% text "ruby" %}}
If you have a hook you only want to run once, use a global variable:


```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return if $dunit  # bail if $dunit is true
  the_slow_thing    # otherwise do it.
  $dunit = true     # don't do it again.
end
```
{{% /text %}}

{{% block "java" %}}Cucumber-JVM does not support running a hook only once.{{% /block %}}
{{% block "javascript" %}}Cucumber.js does not support running a hook only once.{{% /block %}}

## AfterConfiguration

{{% text "ruby" %}}
You may also provide an `AfterConfiguration` hook that will be run after Cucumber has been configured. The block you provide will be passed on to Cucumber's configuration (an instance of `Cucumber::Cli::Configuration`).

Example:
{{% /text %}}

```ruby
AfterConfiguration do |config|
  puts "Features dwell in #{config.feature_dirs}"
end
```

{{% text "ruby" %}}
This hook will run _only once_: after support has been loaded, and before any features are loaded.

You can use this hook to extend Cucumber. For example you could affect how features are loaded, or register custom formatters programmatically.
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

## Tag Expressions

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

### Development Process

Another creative way to use tags is to keep track of where in the development process a certain feature is:

```gherkin
@qa_ready
Feature: Index projects
```

{{% text "ruby" %}}
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
list on the command line, because now all `--tags` options are ANDed together.  Thus the combination of `--tags @wip` **AND** `--tags ~@wip` fails everywhere.

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
unspecified scenarios to manageable levels. Those following [Kanban](http://en.wikipedia.org/wiki/kanban) or
[Lean Software Development](http://en.wikipedia.org/wiki/Lean_software_development) based methodologies will find this useful.
{{% /text %}}

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

By default, Cucumber will treat anything ending in
{{% text "java" %}}`.java`{{% /text %}}
{{% text "javascript" %}}`.js`{{% /text %}}
{{% text "ruby" %}}`.rb`{{% /text %}} under the root
{{% text "java, javascript" %}}resource{{% /text %}}
{{% text "ruby" %}}library{{% /text %}} directory as a step definition file.

Thus, a step contained in
{{% text "java" %}}`features/models/entities/step-definitions/anything.java`{{% /text %}}
{{% text "javascript" %}}`features/models/entities/step-definitions/anything.js`{{% /text %}}
{{% text "ruby" %}}`features/models/entities/step_definitions/anything.rb`{{% /text %}}
can be used in a feature file contained in
{{% text "java, javascript" %}}`features/views/entity-new`{{% /text %}}
{{% text "ruby" %}}`features/views/entity_new`{{% /text %}}
, provided that:

- Cucumber is invoked on a root directory common to both (`./features`, in this example); OR
- explicitly required on the command line

{{% block "ruby" %}}

The following command will run the `authenticate_user` feature. Any feature in a sub-directory of `features/` directory must `require` features.

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

{{% block "java" %}}
The **Command-Line Interface Runner (CLI Runner)** is an executable Java class that can be run from the command-line.

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

You can also run features using a [build tool](/tools/general#build-tools) or an [IDE](/tools/general#ides).

# Configuration

Cucumber provides several configuration options.

## Command-line

Configuration options can be passed to on the command-line.

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
and `After` [hooks](#hooks).
{{% /note %}}

The Cucumber runner acts like a suite of a JUnit tests. As such other JUnit features such as Categories, Custom JUnit
Listeners and Reporters can all be expected to work.

For more information on JUnit, see the [JUnit web site](http://www.junit.org).
{{% /block %}}

{{% block "javascript" %}}
Use the `cucumber-js --help` command to see which arguments can be passed to the executable file.
{{% /block %}}

You can also use [tags](#tags) to specify what to run.

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
You can also define common command-line options in a [`cucumber.yml`](/cucumber/configuration/) file.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to configure options, have a look at the [cucumber-js docs on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md).
{{% /block %}}
