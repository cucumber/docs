---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/Using-Rake/
title: Using Rake
---

Cucumber ships with a rake task that you can easily extend to fit your needs. Please note that running Cucumber from rake will add some additional startup time when running your Features.  

For this reason, it is recommended that you use the Cucumber binary directly, and reserve the Cucumber rake task for use in CI builds and other automated needs.  (The rake task is basically a thin wrapper for the Cucumber binary.)  

To use Cucumber's rake task, you simply need to `require` the task file and define a task with it.  Below is a basic rake task that will run all the Features with the pretty formatter:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "features --format pretty"
end
```

Note, how we use the `cucumber_opts` accessor to define our arguments passed to the Cucumber binary.

## Using Profiles in Rake Tasks

For complex Feature runs that are tested often, it is nice to save the command line arguments as [Cucumber profiles](/cucumber/cucumber.yml). 

Once you have some profiles defined, you can use them in your rake tasks, like so:

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

## Guarding Your Production Boxes From Cucumber

Since rake tasks are used on development and productions systems, it is generally a good idea to place a guard around your Cucumber task so your productions boxes don't need to install Cucumber.  

Below is an example of how to do this.  This example is the rake task that Cucumber generates for Rails projects, but the same idea applies to any project using Cucumber and Rake:

```ruby
require 'rubygems'

begin
  require 'cucumber'
  require 'cucumber/rake/task'

  Cucumber::Rake::Task.new(:features) do |t|
    t.cucumber_opts = "--format pretty"
  end

  task :features => 'db:test:prepare'
rescue LoadError
  desc 'Cucumber rake task not available'
  task :features do
    abort 'Cucumber rake task is not available. Be sure to install cucumber as a gem or plugin'
  end
end
```
