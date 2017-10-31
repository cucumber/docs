---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Hooks/
title: Hooks
polyglot: true
---

Cucumber provides a number of Hooks which allow us to run blocks of code at various points in the Cucumber test cycle.

{{% text "ruby" %}}
You can put them in your `support/env.rb` file, or any other file under the `support` directory
(for example, in a file called `support/hooks.rb`).
{{% /text %}}

There is no link between where a Hook is defined and which Scenario or Step it is run for.
If you want more fine-grained control, you can use [Tagged Hooks](#tagged-hooks).

All defined Hooks run whenever the relevant event occurs.

## Scenario hooks

`Before` hooks will run before the first Step of each Scenario. They run in the **same order** in which they are registered.

```ruby
Before do
  # Do something before each scenario.
end
```

```ruby
Before do |scenario|
  # The +scenario+ argument is optional, but if you use it, you can get the title,
  # description, or name (title + description) of the scenario that is about to be
  # executed.
  Rails.logger.debug "Starting scenario: #{scenario.title}"
end
```

```java
@Before
public void beforeScenario(){
    // Do something before each scenario
}
```
```javascript
Before(function () {
    // This hook will be executed before all scenarios
});
```

`After` Hooks will run after the last step of each Scenario, even when steps are `failed`, `undefined`, `pending`, or `skipped`. They run in the **reverse order** in which they are registered.

```ruby
After do |scenario|
  # Do something after each scenario.
  # The +scenario+ argument is optional, but
  # if you use it, you can inspect status with
  # the #failed?, #passed? and #exception methods.

  if scenario.failed?
    subject = "[Project X] #{scenario.exception.message}"
    send_failure_email(subject)
  end
end
```

```java
@After
public void afterScenario(){
    // Do something after each scenario
}
```
```javascript
TODO: See Ruby or Java example
```
Here is an example in which we exit at the first failure (which could be useful in some cases like [Continuous Integration](/cucumber/continuous-integration/), where fast feedback is important).

```ruby
After do |s|
  # Tell Cucumber to quit after this scenario is done - if it failed.
  Cucumber.wants_to_quit = true if s.failed?
end
```

```java
@After
public void afterScenario(){
    // Tell Cucumber to quit after this scenario is done - if it failed.
    public void afterFailedScenario(Scenario scenario) {
        if (scenario.isFailed()) {
            // Do something when Scenario failed
        }
}
```

```javascript
TODO: See Ruby or Java example
```

{{% text "javascript" %}}
Hooks are used for setup and teardown of the environment before and after each scenario.
The first argument will be a [ScenarioResult](https://github.com/cucumber/cucumber-js/blob/2.x/src/models/scenario_result.js) for the current running scenario.
{{% /text %}}

```javascript
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before}) {
  // Synchronous
  Before(function () {
    this.count = 0;
  });

  // Asynchronous Callback
  Before(function (scenarioResult, callback) {
    var world = this;
    tmp.dir({unsafeCleanup: true}, function(error, dir) {
      if (error) {
        callback(error);
      } else {
        world.tmpDir = dir;
        callback();
      }
    });
  });

  // Asynchronous Promise
  After(function () {
    // Assuming this.driver is a selenium webdriver
    return this.driver.quit();
  });
});
```

{{% text "ruby" %}}
`Around` Hooks will run "around" a Scenario. This can be used to wrap the execution of a Scenario in a block. The `Around` hook receives a Scenario object and a block (`Proc`) object. The Scenario will be executed when you invoke `block.call`.

The following example will cause Scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:
{{% /text %}}
```ruby
Around('@fast') do |scenario, block|
  Timeout.timeout(0.5) do
    block.call
  end
end
```

## Step hooks

{{% text "ruby" %}}
**Warning: The `AfterStep` hook does not work with Scenarios which have Backgrounds (Cucumber 0.3.11)**
{{% /text %}}
```ruby
AfterStep do |scenario|
  # Do something after each step.
end
```

{{% text "java" %}}Cucumber jvm does not support Step hooks.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support Step hooks.{{% /text %}}

## Tagged hooks

Hooks can be conditionally selected for execution based on the tags of the scenario.
To run a particular Hook only for certain Scenarios, you can associate a
{{% text "ruby" %}}`Before`, `After`, `Around` or `AfterStep`{{% /text %}}
{{% text "java" %}}`Before` or `After`{{% /text %}}
{{% text "javascript" %}}`Before` or `After`{{% /text %}}
Hook with one or more [Tags](/cucumber/tags/).

You can use OR and AND and NOT Tags in much the same way as you can when running Cucumber from the command line. Examples:

```ruby
# Pass `OR` Tags in a single string, comma-separated:
Before('@cucumis, @sativus') do
  # This will only run before scenarios tagged
  # with @cucumis OR @sativus.
end

# Pass `AND` Tags as separate strings:
Before('@cucumis', '~@sativus') do
  # This will only run before scenarios tagged
  # with @cucumis AND NOT @sativus.

# You create complex Tag conditions using both `OR` and `AND` on Tags:
Before('@cucumis, @sativus', '@aqua') do
  # This will only run before scenarios tagged
  # with (@cucumis OR @sativus) AND @aqua
end

# `AfterStep` example:
AfterStep('@cucumis', '@sativus') do
  # This will only run after steps within scenarios tagged
  # with @cucumis AND @sativus.
end

# Pass `NOT` Tag
Before('NOT @cucumis') do
  # This will only run before scenarios NOT tagged
  # with @cucumis
end
```

```java
@Before
public void beforeScenario(){
    // This hook will be executed before all scenarios
}

@Before("@foo")
public void beforeScenario(){
    // This hook will be executed before scenarios tagged with @foo
}

@Before("@foo and @bar")
public void beforeScenario(){
    // This hook will be executed before scenarios tagged with @foo and @bar
}

@Before("@foo or @bar")
public void beforeScenario(){
    // This hook will be executed before scenarios tagged with @foo or @bar
}

@Before("not @foo")
public void beforeScenario(){
    // This hook will be executed before scenarios NOT tagged with @foo
}
```

```javascript
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before}) {
  Before(function () {
    // This hook will be executed before all scenarios
  });

  Before({tags: "@foo"}, function () {
    // This hook will be executed before scenarios tagged with @foo
  });

  Before({tags: "@foo and @bar"}, function () {
    // This hook will be executed before scenarios tagged with @foo and @bar
  });

  Before({tags: "@foo or @bar"}, function () {
    // This hook will be executed before scenarios tagged with @foo or @bar
  });

  Before({tags: "not @foo"}, function () {
    // This hook will be executed before scenarios NOT tagged with @foo
  });

  // You can use the following shorthand when only specifying tags
  Before("@foo", function () {
    // This hook will be executed before scenarios tagged with @foo
  });
});
```

See more documentation on [tag expressions](/cucumber/tag-expressions/).

**Think twice before you use Hooks!** 
Whatever happens in Hooks is invisible to people who only read the Features. 
You should consider using [Background](/gherkin/gherkin-reference/#background) as a more explicit 
alternative, especially if the setup should be readable by non-technical people.

## Global Hooks

{{% text "ruby" %}}
A Global Hook will run once before any Scenario is run. Put the
code at the top-level in your `env.rb` file (or any other file under 
`features/support` directory). 

Use `Kernel#at_exit` for global teardown. 

Example:
{{% /text %}}
```ruby
my_heavy_object = HeavyObject.new
my_heavy_object.do_it

at_exit do
  my_heavy_object.undo_it
end
```

{{% text "java" %}}Cucumber jvm does not support global hooks.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support global hooks.{{% /text %}}

## Running a `Before` Hook only once

{{% text "ruby" %}}
If you have a Hook you only want to run once, use a global variable:
{{% /text %}}
```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return $dunit if $dunit                  # bail if $dunit TRUE
  step "run the really slow log in method" # otherwise do it.
  $dunit = true                            # don't do it again.
end
```
{{% text "java" %}}Cucumber jvm does not support running a `Before` Hook only once.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support running a `Before` Hook only once.{{% /text %}}

## `AfterConfiguration`
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

{{% text "java" %}}Cucumber jvm does not support `AfterConfiguration` hooks.{{% /text %}}
{{% text "javascript" %}}Cucumber js does not support `AfterConfiguration` hooks.{{% /text %}}