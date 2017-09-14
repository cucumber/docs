---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Running-Features/
title: Running Features
---

> TODO: Generalize

There are several ways to run your Features. This page lists the most common ones. 

Any of these techniques also lets you define common command line options in a [`cucumber.yml`](/cucumber/cucumber.yml/) file.

## Using the Gem's `cucumber` Command

Assuming you've installed cucumber as a gem, run this at a command prompt to see the options for running Features:

```
cucumber --help
```

For example:

```
cucumber features/authenticate_user.feature:44 --format html > features.html
```

...will run the Scenario defined at line 44 of the `authenticate_user` Feature, format it as HTML, and pipe it to the `features.html` file for viewing in a browser.

```
cucumber features --name "Failed login"
```

...will run the Scenario(s) named `"Failed login"`.

```
cucumber --require features features/authentication/authenticate_user.feature
```

...will run the `authenticate_user` Feature. Any Feature in a sub-directory of `features/` directory must `require` Features. **Note:** You can also add this to your `cucumber.yml`.

You can also use [Tags](/cucumber/tags/) to specify what to run, or pass [Environment Variables](/cucumber/environment-variables/) to Cucumber.

## Using Rake

From the command line:

```
rake features
```

This requires a `Rakefile` with a `Cucumber` task definition. For example:

```
require 'rubygems'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "--format pretty" # Any valid command line option can go here.
end

```

If you are using [Ruby on Rails](/implementations/ruby/ruby-on-rails/), this task is defined for you already. 

For more information, please see the [detailed page about using `rake`.](/implementations/ruby/rake/)

## Using TextMate

See the [`Cucumber.tmbundle`](https://github.com/cucumber/cucumber-tmbundle) documentation.

## Using other build tools

Maven and Ant are described in [JRuby](/implementations/jvm/#jruby) and [Java](/implementations/jvm/#java).

MSBuild and Nant should be under [IronRuby](http://ironruby.net/) and [.NET](/implementations/dotnet-specflow/).

Anything else? Please contribute to this wiki!
