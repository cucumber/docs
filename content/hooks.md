---
source: https://github.com/cucumber/cucumber/wiki/Hooks/
title: Hooks
description: Setup and teardown
polyglot: true
---

Hooks are blocks of code that can run at various points in the Cucumber execution cycle.
They are typically used for setup and teardown of the environment before and after each scenario.

Hooks are global by default. Where a hook is defined has no impact on what scenarios
or steps it is run for. If you want more fine-grained control, you can use [tagged hooks](#tagged-hooks).

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

# Scenario hooks

Scenario hooks run for every scenario.

## Before

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
You should consider using [Background](/gherkin/gherkin-reference/#background) as a more explicit
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

## After

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

## Around

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

## AfterStep

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
To run a particular Hook only for certain scenarios, you can associate a
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

## Running a hook only once

{{% block "java" %}}
TODO
{{% /block %}}

{{% block "javascript" %}}
TODO
{{% /block %}}

{{% block "ruby" %}}
If you have a hook you only want to run once, use a global variable:

```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return if $dunit                         # bail if $dunit is true
  step "run the really slow log in method" # otherwise do it.
  $dunit = true                            # don't do it again.
end
```
{{% /block %}}

## AfterConfiguration

{{% block "ruby" %}}
You may also provide an `AfterConfiguration` Hook that will be run after Cucumber has been configured. The block you provide will be passed on to Cucumber's configuration (an instance of `Cucumber::Cli::Configuration`).
{{% /block %}}

Example:

```ruby
AfterConfiguration do |config|
  puts "Features dwell in #{config.feature_dirs}"
end
```

{{% text "ruby" %}}
This Hook will run _only once_: after support has been loaded, and before any Features are loaded.

You can use this Hook to extend Cucumber. For example you could affect how Features are loaded, or register [Custom Formatters](/implementations/ruby/custom-formatters/) programmatically.
{{% /text %}}

{{% text "java" %}}Cucumber jvm does not support `AfterConfiguration` hooks.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support `AfterConfiguration` hooks.{{% /text %}}
