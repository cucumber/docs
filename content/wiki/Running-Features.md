+++
title = "Running Features"
source = "https://github.com/cucumber/cucumber/wiki/Running-Features/
menu = ["all", "wiki"]
+++

There are several ways to run your features. This page lists the most common ones. Any of these techniques also lets you define common command line options in a \[\[cucumber.yml\]\] file.

Using the Gem's 'cucumber' Command
----------------------------------

Assuming you've installed cucumber as a gem, run this at a command prompt to see the options for running features:

    <code>cucumber --help</code>

For example

    <code>cucumber features/authenticate_user.feature:44 --format html > features.html</code>

...will run the scenario defined at line 44 of the authenticate\_user feature, format it as HTML and pipe it to the features.html file for viewing in a browser.

    <code>cucumber features --name "Failed login"</code>

...will run the scenario(s) named "Failed login"

    <code>cucumber --require features features/authentication/authenticate_user.feature</code>

...will run authenticate\_user feature. Any feature that is located inside a sub-directory of features directory must require features. Note: you can also add this to your cucumber.yml.

You can also use \[\[tags\]\] to specify what to run, or pass \[\[Environment Variables\]\] to Cucumber.

Using Rake
----------

From the command line:

    <code>rake features</code>

This requires a Rakefile with a Cucumber task definition. For example:

    <code>require 'rubygems'
    require 'cucumber/rake/task'

    Cucumber::Rake::Task.new(:features) do |t|
      t.cucumber_opts = "--format pretty" # Any valid command line option can go here.
    end
    </code>

If you are using \[\[Ruby on Rails\]\] this task is defined for you already. For more information please see the [detailed page about using rake.](http://wiki.github.com/cucumber/cucumber/using-rake)

Using TextMate
--------------

See the [Cucumber.tmbundle](http://github.com/cucumber/cucumber-tmbundle) documentation

Using RCov
----------

[How to use Cucumber with RCov](http://github.com/cucumber/cucumber/wikis/using-rcov-with-cucumber-and-rails)

Using other build tools
-----------------------

Maven and Ant are described in \[\[JRuby and Java\]\]. MSBuild and Nant should be under \[\[IronRuby and .NET\]\]. Anything else - please contribute to this wiki!
