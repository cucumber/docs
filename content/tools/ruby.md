---
title: Ruby Tools
weight: 1200
---

This page describes tools commonly used with Ruby.

# Build tools

Cucumber can be run in several ways.
Be aware that `rake cucumber`, `cucumber features`, and `autotest` with `ENV AUTOFEATURE=true` do not necessarily produce
the same results given the same features and step definitions.

## Rake

Running `rake cucumber` from the command line provides the simplest method to run Cucumber tests.

Using Rake requires a `Rakefile` with a `features` task definition. For example:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "--format pretty" # Any valid command line option can go here.
end
```

This will run all the Features with the pretty formatter.

Note, how we use the `cucumber_opts` accessor to define our arguments passed to Cucumber.

If you are using [Ruby on Rails](#ruby-on-rails), this task is defined for you already.

Now you can run Cucumber with Rake:

```shell
rake features
```

The rake script provided with Cucumber performs much of the background magic required to get the test database and requisite
libraries properly loaded.
In fact, an important habit to acquire is to run Cucumber as a `rake` task immediately after performing a migration.
This ensures that the test database schema is kept in sync with the development database schema.
You can achieve the same effect by running `rake db:test:prepare` before your first Cucumber run following a migration
but developing the habit of just running `rake cucumber` or `rake cucumber:wip` is probably the better course.

The Cucumber Rake task recognises the `@wip` Tag, so `rake cucumber:wip` will run only those scenarios tagged with **@wip**.

For example, given a feature file containing:

```
Feature: .  .  .

  Scenario: A

  @wip
  Scenario: B

  Scenario: C
```

Then running the command `rake cucumber:wip` will run the Steps contained inside Scenario B only,
while running `rake cucumber:ok` will run the Steps within all Scenarios other than B.

### Using Profiles in Rake Tasks

For complex Feature runs that are tested often, it is nice to save the command line arguments as [Cucumber profiles](/cucumber/configuration#profiles).

Once you have some profiles defined, you can use them in your Rake tasks, like so:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

namespace :features do
  Cucumber::Rake::Task.new(:non_js) do |t|
    t.profile = "webrat"
  end

  Cucumber::Rake::Task.new(:selenium) do |t|
    t.profile = "selenium"
  end
end
```

### Guarding Your production machines From Cucumber

Since Rake tasks are used on development and productions systems, it is generally a good idea to place a guard around your Cucumber task so your productions boxes don't need to install Cucumber.

Below is an example of how to do this. This example is the Rake task that Cucumber generates for Rails projects, but the same idea applies to any project using Cucumber and Rake:

```ruby
require 'rubygems'

begin
  require 'cucumber'
  require 'cucumber/rake/task'

  Cucumber::Rake::Task.new(:features) do |t|
    t.cucumber_opts = "--format pretty"
  end

  task features: 'db:test:prepare'
rescue LoadError
  desc 'Cucumber rake task not available'
  task :features do
    abort 'Cucumber rake task is not available. Be sure to install cucumber as a gem or plugin'
  end
end
```

## Ruby-on-Rails

### Rails 3.x and above

Go to Cucumber-Rails' [README](https://github.com/cucumber/cucumber-rails/blob/master/README.md) for installation instructions.

As of Cucumber-Rails version 0.5.0 and above, Cucumber-Rails **only** supports Rails 3.x and above (Rails 2 is **not** supported).