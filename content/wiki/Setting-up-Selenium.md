+++
title = "Setting up Selenium"
source = "https://github.com/cucumber/cucumber/wiki/Setting-up-Selenium/"
menu = ["all", "wiki"]
+++

**WARNING:** This guide is for setting up Selenium version 1, and is somewhat obsolete. We recommend you use [Selenium 2 / WebDriver](http://rubygems.org/gems/selenium-webdriver) instead, through [Capybara](https://rubygems.org/gems/capybara) if you're on Rails.

Pre-requisites
--------------

Selenium-RC requires the Java Runtime Environment (JRE) version 1.5.0 or higher

<p>
For webrat -v=0.5.1, you should use selenium-client -v=1.2.16. Do not use webrat -v=0.5.0. For webrat -v=0.4.4, you must use selenium-client -v=1.2.14.

</p>
Step 1: Install the Selenium gem
--------------------------------

    <code>sudo gem install Selenium</code>

    <code>sudo gem install selenium-client</code>

Step 2: Starting Selenium
-------------------------

The Selenium gem installs a script which allows us to get Selenium-RC running

    <code>selenium</code>

OR
you can run the jar directly

    <code>java -jar selenium-server.jar</code>

Step 3: Run the cucumber example
--------------------------------

    <code>cucumber examples/selenium/features/</code>

Useful links
------------

[Official Selenium-RC site](http://seleniumhq.org/projects/remote-control/)

[Selenium gem at rubyforge](http://selenium.rubyforge.org/)

Cucumber / Selenium / Webrat
----------------------------

Many apps have features that don't require javascript to work, and running them all in selenium makes things slow. Since webrat steps support selenium out of the box, you can reuse almost all of your standard step definitions for selenium as well. Here's a recipe for how you can:

-   Run your non-selenium features with transactional fixtures and standard webrat steps
-   Run your entire suite (html and javascript) features with selenium, without transactional fixtures
-   Reuse all (or almost all) or your step definitions between selenium and non-selenium runners

**NOTE** - when using this setup, you do *not* need to start selenium manually. Webrat will spawn a new selenium process and a mongrel process for you.

First, setup a directory structure like the following:

    <code>features/
    |-- enhanced
    |   `-- ajaxy.feature
    |-- plain
    |   `-- non_ajaxy.feature
    |-- step_definitions
    |   `-- webrat_steps.rb
    `-- support
        |-- enhanced.rb
        |-- env.rb
        `-- plain.rb

</code>

Create a \[\[cucumber.yml\]\] file in the root directory of your project (yes, this is cluttered). In it, create these 2 profiles:

    <code>default: -r features/support/env.rb -r features/support/plain.rb -r features/step_definitions features/plain
    selenium: -r features/support/env.rb -r features/support/enhanced.rb -r features/step_definitions features/enhanced

</code>

In env.rb, turn on all webrat features:

    <code>ENV["RAILS_ENV"] = "test"
    require File.expand_path(File.dirname(__FILE__) + '/../../config/environment')
    require 'cucumber/rails/world'
    require 'cucumber/formatter/unicode'
    require 'webrat/integrations/rspec-rails'
    require 'cucumber/rails/rspec'
    </code>

In enhanced.rb, set up the selenium-specific files:

    <code>Webrat.configure do |config|
      config.mode = :selenium
      # Selenium defaults to using the selenium environment. Use the following to override this.
      # config.application_environment = :test
    end

    # this is necessary to have webrat "wait_for" the response body to be available
    # when writing steps that match against the response body returned by selenium
    World(Webrat::Selenium::Matchers)

    Before do
      # truncate your tables here, since you can't use transactional fixtures*
    end
    </code>

<small>\* For truncating your DB take a look at [DatabaseCleaner](http://github.com/bmabey/database_cleaner/tree/master</small>)

In plain.rb, set up the standard webrat features:

    <code># truncate your tables here if you are using the same database as selenium, since selenium doesn't use transactional fixtures
    Cucumber::Rails.use_transactional_fixtures = true
    </code>

To run your regular features, you can execute:

    <code>cucumber</code>

To run your selenium features, you can execute:

    <code>cucumber -p selenium</code>

Rails 2.2+ and Sessions
-----------------------

When running Selenium with Rails 2.3.2 (and this appears to be true for 2.2 as well) sessions did not work. They were being saved, but then were lost upon reload. Adding the following to the selenium environment file fixed this problem:

    <code>config.action_controller.session = { :session_http_only => false }</code>

Setup stories
-------------

-   <http://tero.tilus.net/rutinat/2009/08/18/cucumber-running-selenium-on-debian-lenny/>
