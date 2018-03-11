---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/Using-Rake/
title: Using Rake
---

Cucumber ships with a rake task that you can easily extend to fit your needs.
Please note that running Cucumber from rake will add some additional startup time when running Cucumber.

For this reason, it is recommended that you use the Cucumber binary directly, and reserve the Cucumber rake task for use in CI builds and other automated needs.  (The rake task is basically a thin wrapper for the Cucumber binary.)

To use Cucumber's rake task, you need to `require` the task file and define a task with it.  Below is a basic rake task that will run all the Features with the pretty formatter:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "features --format pretty"
end
```


