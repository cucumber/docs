---
menu:
- implementations
nav: docs
title: PHP using Behat
---

# Behat

Behat is the official Cucumber implementation for PHP.

The docs are currently at [behat.org](http://behat.org).

According to <http://docs.behat.org/en/v3.0/> bq. Since v3.0, Behat is considered
an official Cucumber implementation in PHP and is part of one big family of BDD
tools.

## Directly testing PHP code

To directly test PHP code using step definitions written in PHP, please see the [Cuke4Php](https://github.com/olbrich/cuke4php) project.

## Testing against PHP web applications

Most people seem to use cucumber for rails and most of the howtos and documents on the web reflect this. But cucumber is a great tool for testing any kind of web application, no matter what language it was built in. We could use Selenium, and there are good [how-to's](http://wiki.github.com/cucumber/cucumber/setting-up-selenium) for that - but Selenium is slow and clunky to setup, and should only be used if you need to test JavaScript. What if I want to write BDD stories and test a PHP app with cucumber?

Turns out it is easier than I expected. Webrat has options for interfacing with a web application using rails, selenium or mechanize. All we have to do is tell webrat to use mechanize and most things will work exactly the same as in any other cucumber setup.

Here is how to do it:

```
<code>
  Scenario: Install cucumber
    Given I am running Ubuntu
    And I have not yet installed cucumber
    When I run "apt-get install ruby ruby1.8-dev rdoc1.8 irb libxml2-dev \
      libxslt1-dev libc6-dev-i386 libopenssl-ruby"
    # We install rubygems by hand because the apt version uses strange paths
    And I run "wget http://rubyforge.org/frs/download.php/60718/rubygems-1.3.5.tgz"
    And I run "tar xvf rubygems-1.3.5.tgz"
    And I run "cd rubygems-1.3.5"
    And I run "sudo ruby setup.rb"
    # Add github's gem source list
    And I run "gem sources -a http://gems.github.com"
    And I run "sudo gem install cucumber mechanize rspec webrat"
    Then I have installed cucumber

  Scenario: Setup a cucumber environment for your php app
    Given I have a php app that is running
    And I am in the app's top level directory
    When I create a "features" directory
    And I create a "features/support" directory
    And I create a "features/step_definitions" directory
    And I put the following in "features/support/env.rb"
</code>

<code>
# RSpec
require 'rspec/expectations'

# Webrat
require 'webrat'

require 'test/unit/assertions'
World(Test::Unit::Assertions)

Webrat.configure do |config|
  config.mode = :mechanize
end

World do
  session = Webrat::Session.new
  session.extend(Webrat::Methods)
  session.extend(Webrat::Matchers)
  session
end
</code>

<code>
    Then I can write cucumber tests and execute them
</code>
```

A few other gotchas:

The mechanize configuration for webrat seems to use response_body instead of
response.body. I am not sure what is going on there, but when using the webrat
step definitions from: <http://github.com/brynary/webrat> required a few
substitutions to make it work right.

If you want your test data to be the same every time your run it, you need a few
things. First, you need a separate database that has a known and controlled set
of data in it. Secondly, if your data is different every time you test, then
your tests probably are not repeatable.

To get around this you can hack in database dumps and table dumps to happen
before and after scenarios. You can save database state before all of the tests
and reload it at the end so that next time it will be the same, or you can do it
on a per feature level and per database table level. I have so far found the
second approach to be the quickest and most flexible.

The per feature and per table approach can be accomplished using \[\[hooks]].
Here are is the code that I currently have in 'support/hooks.rb'

```
    Before ('@reset_users') do
      # Save user table data
      save_table("game_user")
    end

    After ('@reset_users') do
      # Reload user table data
      load_table("game_user")
    end

    def save_table(table_name)
      run "mysqldump -u #{@@test_database_username} --password=#{@@test_database_password} \
        #{@@test_database_name} #{table_name}> /tmp/#{table_name}"

    end

    def load_table(table_name)
      run "mysql -u #{@@test_database_username} --password=#{@@test_database_password} \
        #{@@test_database_name} < /tmp/#{table_name}"
    end
```

Then you can just put the @reset_users tag in before the scenario that does
stuff with your user table, and it will reset it after it completes:

```
<code>
  @reset_users
  Scenario: Create a user
    Given ...
</code>
```

A full cucumber env.rb for PHP can be found
[here](http://gist.github.com/188166) Also check out the features directory in
[chits](http://github.com/mikeymckay/chits) to see cucumber testing a real PHP
app.
