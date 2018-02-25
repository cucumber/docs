---
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
source: https://github.com/cucumber/cucumber/wiki/Hooks/
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Cucumber Reference
polyglot: true
---
Cucumber can be used to implement automated tests based on scenarios described in your Gherkin feature files.

# Step Definitions

When Cucumber executes a step in a scenario, it will look for a matching *step definition* to execute.
The step definitions map, or "glue", the Gherkin to the underlying programming language.

A step definition is
{{% text "java" %}}a method with a regular expression attached to it. They are defined in Java files.{{% /text %}}
{{% text "ruby" %}}a block of code with a regular expression attached to it. They are defined in Ruby files under `features/step_definitions/`.  Each filename should follow the pattern `\*\_steps.rb`.{{% /text %}}
{{% text "javascript" %}}a function with a Cucumber expression attached to it. They are defined in Javascript files.{{% /text %}}

 To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the step definition below:

```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```

```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
  puts "Cukes: #{cukes}"
end
```

```javascript
Given(/^I have (\d+) cukes in my belly$/, function (cukes) {
  console.log(`Cukes: ${cukes}`);
});
```

{{% block "javascript" %}}
Please note that if you use arrow functions, you won't be able
to share state between steps!

```javascript
// Don't do this!
Given(/^I have (\d+) cukes in my belly$/, cukes => {
  console.log(`Cukes: ${cukes}`);
});
```

{{% /block %}}

## Step Definition Arguments

A step definition can optionally accept *arguments*; determined by the capture groups in a Regular Expression (`Regexp`).
The number and type of the arguments are defined in the step definition.

The step definition in the example above accepts just one argument, identified by the capture group
{{% text "ruby" %}}`(\d+)`.  When the step definition is executed, the argument is passed to the Ruby code as `cukes`.{{% /text %}}
{{% text "java" %}}`(\\d+)`.  When the step definition is executed, the argument is passed to the Java code as `cukes`.{{% /text %}}
{{% text "javascript" %}}`(\d+)`.  When the step definition is executed, the argument is passed to the JavaScript code as `cukes`.{{% /text %}}

{{% text "ruby" %}}
If you aren't comfortable with Regular Expressions, it's also possible to define step definitions using strings and variables, like this:
{{% /text %}}
```ruby
Given "I have $n cucumbers in my belly" do |cukes|
  # Some Ruby code here
end
```

{{% text "ruby" %}}
In this case, the String is compiled to a Regular Expression behind the scenes: `/^I have (.\*) cucumbers in my belly$/`.
{{% /text %}}

{{% text "java" %}}

### DataTables
To automatically transform DataTables in your feature file, you can change the DataTable to a List or Map:
List<YourType>, List<List<E>>, List<Map<K,V>> or Map<K,V> where E,K,V must be a scalar (String, Integer, Date, enum etc).
To transform to a List<YourType>, the field names for YourType must match the column names in your feature file (except for spaces and capitalization).
{{% /text %}}

## Steps

A step is analogous to a method call or function invocation.

For example:

```gherkin
Given I have 93 cucumbers in my belly
```

In this step, you're "calling" the above step definition with one argument: the value `93`.

Steps are declared in your {{% text "ruby" %}}`features/\*.feature`{{% /text %}}{{% text "java" %}}`*.feature`{{% /text %}}{{% text "javascript" %}}`*.feature`{{% /text %}} files.


## How Steps and Step Definitions work together

1. Cucumber matches a step against a Step Definition's `Regexp`
2. Cucumber gathers any capture groups or variables
3. Cucumber passes them to the step definition's {{% text "ruby" %}}`Proc` (or “function”){{% /text %}}{{% text "javascript" %}}function{{% /text %}}{{% text "java" %}}method{{% /text %}} and executes it

Recall that step definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**).

All step definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each step, Cucumber will look for a registered step definition with a matching `Regexp`. If it finds one, it will execute it, passing all capture groups and variables from the Regexp as arguments to the method or function.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up Step Definitions.

Also, check out [Multiline step arguments](/gherkin/#step-arguments) for more info on how to pass entire tables or bigger strings to your step definitions.


### Step Results

**Successful Steps**

When Cucumber finds a matching step definition it will execute it. If the block in the step definition doesn't raise an error, the step is marked as successful (green). Anything you `return` from a step definition has no significance whatsoever.

**Undefined Steps**

When Cucumber can't find a matching step definition, the step gets marked as yellow, and all subsequent steps in the scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

**Pending Steps**

When a step definition's method or function invokes the `pending` method, the step is marked as yellow (as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

**Failed Steps**

When a step definition's method or function is executed and raises an error, the step is marked as red. What you return from a step definition has no significance whatsoever.

Returning {{% text "ruby" %}}`nil`{{% /text %}}{{% text "java" %}}`null`{{% /text %}}{{% text "javascript" %}}`null`{{% /text %}} or `false` will **not** cause a step definition to fail.

**Skipped Steps**

Steps that follow `undefined`, `pending`, or `failed` steps are never executed,  even if there is a matching step definition. These steps are marked as cyan.

{{% text "ruby" %}}

**String Steps**

In Ruby, step definitions can be written using Strings rather than Regular Expressions.

Instead of writing:

```ruby
Given /^I have (.*) cucumbers in my belly$/ do |cukes|
```

You could write:

```ruby
Given "I have $count cucumbers in my belly" do |cukes|
```

When writing a step definition using the String form, any word preceded by a `$` is taken to be a placeholder. Behind the scenes, Cucumber will convert it to the Regular Expression `(.*)`.

The text matched by the wildcard becomes an argument to the block, and the word that appeared in the step definition is disregarded.
{{% /text %}}

**Ambiguous Steps**

Step definitions have to be unique for Cucumber to know what to execute.
If you use ambiguous step definitions,{{% text "ruby" %}}Cucumber will raise a `Cucumber::Ambiguous` error,{{% /text %}}
{{% text "java" %}} Cucumber will raise an `AmbiguousStepDefinitionsException`,{{% /text %}}
{{% text "javascript" %}}the step / scenario will get an "Ambiguous" result,{{% /text %}}
telling you to fix the ambiguity.

{{% text "ruby" %}}

**Guess mode**

In Ruby, running the plain text step will match the `Regexp` of both step definitions and raise `Cucumber::Ambiguous`.

However, if you run Cucumber with `--guess`, it will guess that you were aiming for the step definition with 2 match groups.

There is ranking logic that gets invoked when the option is turned on:

1. The longest `Regexp` with 0 capture groups always wins.
2. The `Regexp` with the most capture groups wins (when there are none with 0 groups).
3. If there are 2+ `Regexp` with the same number of capture groups, the one with the shortest overall captured string length wins.
4. If there are still 2+ options, then a `Cucumber::Ambiguous` error is raised.

So if you try `--guess` with the mice above, Cucumber will pick `/Three blind (.\*)/`, because `"mice"` is shorter than `"blind"`.

*Consider guess mode to be a workaround.* We still recommend that you have unambiguous regular expressions. When you have a lot of step definitions, it's easy to lose track of the situations where Cucumber's guess mode occurs, and that can lead to some surprises.
{{% /text %}}

**Redundant Steps**

In Cucumber, you're not allowed to use a `Regexp` more than once in a step definition—even across files, and even with different code inside the method or function.
Note that the keywords (`Given`, `When`, `Then`, `And` and `But`) are not part of the `Regexp`;
this means you also cannot have the same step definition, but with different keywords.

{{% text "ruby" %}}
Thus, the following would cause a `Cucumber::Redundant` error:

```ruby
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three (.*) mice/ do |disability|
  # some other code..
end
```
{{% /text %}}

**Nested Steps**

In an effort to keep from [repeating yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), you may be tempted to utilize Cucumber's feature of calling step definitions from other steps: **DON'T**.
While this may seem like a useful feature to utilize, it creates bad code smells and will be deprecated in the future. In places where you're calling steps from other steps, use those as opportunities to refactor your code to create helper methods.

{{% text "ruby" %}}
Instead of:

```ruby
Given('a starting amount of ${int}') do |int|
  steps %(
    Given a customer account with ID: 'foo123'
    Given a balance of 100 dollars
    Given the customer has authenticated with pin 1234
  )
end
```

Create accounts and user helper classes/methods, which would allow you to refactor your step to the following:

```ruby
Given('a starting amount of ${int}') do |starting_amount|
  @starting_balance = starting_amount
  @user = User.new(0)
  @account = Account.new('foo123', @starting_balance, 1234)
end
```

Now that your code has been refactored you can access these helper methods anywhere in your code, instead of calling a step. Benefits:

* Increased flexibility
* Increased readability
* Increased usability
* You won't be writing code that's planned to be deprecated

{{% /text %}}

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
Hook with a [tag expression](/tags/#tag-expressions).

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

See more documentation on [tags](/tags/).

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

{{% text "ruby" %}}
## Running a hook only once

If you have a hook you only want to run once, use a global variable:

```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return if $dunit                         # bail if $dunit is true
  step "run the really slow log in method" # otherwise do it.
  $dunit = true                            # don't do it again.
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
* [Scoping hooks to a subset of scenarios](/hooks#tagged-hooks)

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

<p></p>

{{% tip "Filtering by line" %}}
Another way to run a subset of scenarios is to use the `file.feature:line` pattern or the `--scenario` option as described in [Running features](/running).
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