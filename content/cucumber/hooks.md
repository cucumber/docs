---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Hooks/
title: Hooks
---

> TODO: Important. Generalize.

Cucumber provides a number of Hooks which allow us to run blocks at various points in the Cucumber test cycle. 
You can put them in your `support/env.rb` file, or any other file under the `support` directory 
(for example, in a file called `support/hooks.rb`). 

There is no association between where a Hook is defined and which Scenario or Step it is run for. 
But if you want more fine grained control, you can use Tagged Hooks (see below).

All defined Hooks are run whenever the relevant event occurs.

## Scenario hooks

`Before` hooks will be run before the first Step of each Scenario. 
They are run in the same order they are registered.

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

`After` Hooks will be run after the last step of each Scenario, even when steps are `failed`, `undefined`, `pending`, or `skipped`. 
They will run in the *opposite* order of which they are registered.

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

Here is an example in which we exit at the first failure (which could be useful in some cases like [Continuous Integration](/cucumber/continuous-integration/), where fast feedback is important).

```ruby
After do |s|
  # Tell Cucumber to quit after this scenario is done - if it failed.
  Cucumber.wants_to_quit = true if s.failed?
end
```

`Around` Hooks will run "around" a Scenario. This can be used to wrap the execution of a Scenario in a block. The `Around` hook receives a Scenario object and a block (`Proc`) object. The Scenario will be executed when you invoke `block.call`.

The following example will cause Scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:

```ruby
Around('@fast') do |scenario, block|
  Timeout.timeout(0.5) do
    block.call
  end
end
```

## Step hooks

**Warning: `AfterStep` hook does not work with Scenarios which have Backgrounds (Cucumber 0.3.11)**

```ruby
AfterStep do |scenario|
  # Do something after each step.
end
```

## Tagged hooks

Sometimes you may want a certain Hook to run only for certain Scenarios. This can be achieved by associating a `Before`, `After`, `Around` or `AfterStep` Hook with one or more [Tags](/cucumber/tags/). 

You can OR and AND Tags in much the same way as you can when running Cucumber from the command line. Examples:

Pass `OR` Tags in a single string, comma-separated:

```ruby
Before('@cucumis, @sativus') do
  # This will only run before scenarios tagged
  # with @cucumis OR @sativus.
end
```

Pass `AND` Tags as separate strings:

```ruby
Before('@cucumis', '~@sativus') do
  # This will only run before scenarios tagged
  # with @cucumis AND NOT @sativus.
end
```

You create complex Tag conditions using both `OR` and `AND` on Tags:

```ruby
Before('@cucumis, @sativus', '@aqua') do
  # This will only run before scenarios tagged
  # with (@cucumis OR @sativus) AND @aqua
end
```

`AfterStep` example:

```ruby
AfterStep('@cucumis', '@sativus') do
  # This will only run after steps within scenarios tagged
  # with @cucumis AND @sativus.
end
```

**Think twice before you use Hooks!** 
Whatever happens in Hooks is invisible to people who only read the Features. 
You should consider using [Background](/gherkin/background/) as a more explicit 
alternative, especially if the setup should be readable by non-technical people.

## Global Hooks

If you want something to happen once before any Scenario is run, just put that 
code at the top-level in your `env.rb` file (or any other file under 
`features/support` directory). 

Use `Kernel#at_exit` for global teardown. 

Example:

```ruby
my_heavy_object = HeavyObject.new
my_heavy_object.do_it

at_exit do
  my_heavy_object.undo_it
end
```

## Running a `Before` Hook only once

If you have a Hook you only want to run once, use a global variable:

```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return $dunit if $dunit                  # bail if $dunit TRUE
  step "run the really slow log in method" # otherwise do it.
  $dunit = true                            # don't do it again.
end
```

## `AfterConfiguration`

You may also provide an `AfterConfiguration` Hook that will be run after Cucumber has been configured. The block you provide will be passed on to Cucumber's configuration (an instance of `Cucumber::Cli::Configuration`). 

Example:

```ruby
AfterConfiguration do |config|
  puts "Features dwell in #{config.feature_dirs}"
end
```

This Hook will run _only once_: after support has been loaded, and before any Features are loaded. 

You can use this Hook to extend Cucumber. For example you could affect how Features are loaded, or register [custom formatters](/implementations/ruby/custom-formatters/) programmatically.
