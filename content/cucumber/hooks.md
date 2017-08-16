---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Hooks/
title: Hooks
---

> TODO: Important. Generalize.

Cucumber provides a number of hooks which allow us to run blocks at various points in the Cucumber test cycle. You can put them in your `support/env.rb` file or any other file under the `support` directory, for example in a file called `support/hooks.rb`. There is no association between where the hook is defined and which scenario/step it is run for, but you can use tagged hooks (see below) if you want more fine grained control.

All defined hooks are run whenever the relevant event occurs.

## Scenario hooks

`Before` hooks will be run before the first step of each scenario. They will run in the same order of which they are registered.

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

`After` hooks will be run after the last step of each scenario, even when there are failing, undefined, pending or skipped steps. They will run in the *opposite* order of which they are registered.

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

Here is another example, where we exit at the first failure (could be useful in some rare cases like [Continuous Integration](/cucumber/continuous-integration/) when fast feedback is important).

```ruby
After do |s|
  # Tell Cucumber to quit after this scenario is done - if it failed.
  Cucumber.wants_to_quit = true if s.failed?
end
```

`Around` hooks will run "around" a scenario. This can be used to wrap the execution of a scenario in a block. The Around hook receives a scenario object and a block (Proc) object. The scenario will be executed when you invoke `block.call`.

The following example will cause scenarios tagged with `@fast` to fail if the execution takes longer than 0.5 seconds:

```ruby
Around('@fast') do |scenario, block|
  Timeout.timeout(0.5) do
    block.call
  end
end
```

## Step hooks

**Warning: AfterStep hook does not work with scenarios which have backgrounds (cucumber 0.3.11)**

```ruby
AfterStep do |scenario|
  # Do something after each step.
end
```

## Tagged hooks

Sometimes you may want a certain hook to run only for certain scenarios. This can be achieved by associating a `Before`, `After`, `Around` or `AfterStep` hook with one or more [tags](/cucumber/tags/). You can OR and AND tags in much the same way as you can when running Cucumber from the command line. Examples:

For OR tags, pass the tags in a single string comma separated:

```ruby
Before('@cucumis, @sativus') do
  # This will only run before scenarios tagged
  # with @cucumis OR @sativus.
end
```

For AND tags, pass the tags as separate tag strings:

```ruby
Before('@cucumis', '~@sativus') do
  # This will only run before scenarios tagged
  # with @cucumis AND NOT @sativus.
end
```

You create complex tag conditions using both OR and AND on tags:

```ruby
Before('@cucumis, @sativus', '@aqua') do
  # This will only run before scenarios tagged
  # with (@cucumis OR @sativus) AND @aqua
end
```

After Step example:

```ruby
AfterStep('@cucumis', '@sativus') do
  # This will only run after steps within scenarios tagged
  # with @cucumis AND @sativus.
end
```

Think twice before you use this feature, as whatever happens in hooks is invisible to people who only read the features. You should consider using [background](/gherkin/background/) as a more explicit alternative if the setup should be readable by non-technical people.

## Global hooks

If you want something to happen once before any scenario is run - just put that code at the top-level in your `env.rb` file (or any other file in your `features/support` directory. Use `Kernel#at_exit` for global teardown. Example:

```ruby
my_heavy_object = HeavyObject.new
my_heavy_object.do_it

at_exit do
  my_heavy_object.undo_it
end
```

## Running a Before hook only once

If you have a hook you only want to run once, use a global variable:

```ruby
Before do
  $dunit ||= false  # have to define a variable before we can reference its value
  return $dunit if $dunit                  # bail if $dunit TRUE
  step "run the really slow log in method" # otherwise do it.
  $dunit = true                            # don't do it again.
end
```

## AfterConfiguration

You may also provide an `AfterConfiguration` hook that will be run after Cucumber has been configured. The block you provide will be passed the cucumber configuration (an instance of `Cucumber::Cli::Configuration`). Example:

```ruby
AfterConfiguration do |config|
  puts "Features dwell in #{config.feature_dirs}"
end
```

This hook will run only once; after support has been loaded but before features are loaded. You can use this hook to extend Cucumber, for example you could affect how features are loaded or register [custom formatters](/implementations/ruby/custom-formatters/) programatically.
