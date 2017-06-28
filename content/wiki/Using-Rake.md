+++
title = "Using Rake"
source = "https://github.com/cucumber/cucumber/wiki/Using-Rake/
menu = ["all", "wiki"]
+++

Cucumber ships with a rake task that you can easily extend to fit your needs.  Please keep in mind that rake will add some additional startup time when running your features.  For that reason, it is recommended that you use the Cucumber binary directly and reserve the Cucumber rake task for use in CI builds and other automated needs.  (The Cucumber task is basically a thin wrapper for the Cucumber binary.)  To use Cucumber's rake task you simply need to require the task file and define a task with it.  Below is a basic rake task that will run all the features with the pretty formatter:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "features --format pretty"
end
```

Note, how we use the `cucumber_opts` accessor to define our arguments passed to the cucumber binary.

<a name="profiles"></a>

## Using Profiles in Rake Tasks

For complex feature runs that you do often it is nice to save the command line arguments as [cucumber profiles](http://github.com/cucumber/cucumber/wiki/cucumber.yml). Once you have some profiles defined you can use it in your rake tasks like so:

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

## Using RCov

Please see the wiki page [Using RCov](http://wiki.github.com/cucumber/cucumber/using-rcov-with-cucumber-and-rails).

## Guarding Your Production Boxes From Cucumber

Since rake tasks are used on development and productions systems it is generally a good idea to place a guard around your cucumber task so your productions boxes don't need to install cucumber.  Below is an example of how to do this.  This example is the rake task that Cucumber generates for Rails projects, but the same idea applies to any project using Cucumber and Rake:

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
