---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/ruby-on-rails/
title: Ruby on Rails
---

[Cucumber-Rails](https://github.com/cucumber/cucumber-rails) is a generator that
generates and modifies files in a Rails project so it can be used with Cucumber.

## Installation

Before you can use the generator, add the gem to your project's `Gemfile` as follows:

```ruby
group :test, :development do
  gem 'cucumber-rails', :require => false
  # database_cleaner is not required, but highly recommended
  gem 'database_cleaner'
end
```

Install the gem:

```
bundle install
```

Run the generator:

```
rails generate cucumber:install
```

## Running

With Rake:

```
rake cucumber
```

Without Rake:

```
[bundle exec] cucumber
```

# Rails 3.x and above

Go to Cucumber-Rails' [README](https://github.com/cucumber/cucumber-rails/blob/master/README.md) for installation instructions and ignore this page.

As of Cucumber-Rails version 0.5.0 and above, Cucumber-Rails **only** supports Rails 3.x and above (Rails 2 is **not** supported). The following is only for Rails 2.x.

# Rails 2.x

If you are on Rails 2.x you have to use an older version of Cucumber-Rails. These are the recommended versions for maximum compatibility with Rails 2.3.x (though see note on javascript emulation below):

```
gem "capybara", "1.1.1"
gem "cucumber", "1.1.0"
gem "cucumber-rails", "0.3.2"
```

The rest of this page describes how to install Cucumber-Rails in a Rails 2.x application. These instructions assume you already have a Rails 2.x application, and that you have a shell where the current directory is the root of your Rails app.

## Install Cucumber-Rails

```
[sudo] gem install cucumber-rails -v 0.3.2
```

The `cucumber-rails` gem depends on the `cucumber` gem, so you don't need to install that separately.

### Bootstrap Cucumber-Rails

Cucumber-Rails needs to add a few files to your project:

```
ruby script/generate cucumber
```

If you're on an OS that supports fork we recommend you use [[Spork and `--drb`]]. This lets you start Cucumber faster:

```
ruby script/generate cucumber --spork
```

For more help on the generator, just ask for help:

```
ruby script/generate cucumber --help
```

Take a look at the generated files. If you need to, you can tweak them later.

### Install new dependencies

```
[sudo] rake RAILS_ENV=cucumber gems:install
```

### Start a Feature

It's really, really recommended that you write your Features by hand, *and* in collaboration with your customer / business analyst / domain expert / interaction designer. 

However, to get you started, you can use the Feature generator to generate the first few Features:

```
ruby script/generate feature Frooble name:string color:string description:text
```

This will generate a simple plain text Feature with associated Steps. 

*Don't get addicted to this generator!* You're better off writing these by hand in the long run.

**Important**: The generated Feature will fail, unless you have set up a layout in your app. This is because Webrat fails to parse HTML
that isn't well formed (i.e. has a single `<html>` root node). [Here is a simple layout](https://github.com/aslakhellesoy/cucumber-rails-test/raw/master/app/views/layouts/application.html.erb) you can use, but I hope you have a better one yourself.

### Run Features

If working on a fresh Rails project, first set up the (empty) database:

```
rake db:migrate
```

(Otherwise Cucumber fails with the error `no such file to load -- YourProjectName/db/schema.rb`.)

Then run the Features:

```
rake cucumber
```

(You may run `rake -T cucumber` to see the other rake tasks available)

This should result in a *statu quo*, because you haven't written any code yet (I hope).

Now it's time to write some code, or generate some. Try this:

```
script/generate rspec_scaffold Frooble name:string color:string description:text
rake db:migrate
rake cucumber
```

### Other ways of running Features

You can also run specific Features directly with Cucumber:

```
cucumber --require features --require lib features/subdir/
cucumber --require features --require lib features/some-nifty.feature
```

And using autospec with a similar setting (`--require features --require lib`), applied in your project's `cucumber.yml`:

```
autotest-all: --require features --require lib --format progress features
autotest: --require features --require lib features  
default: --format pretty
html: --format html --out features.html
```

Remember that you need `AUTOFEATURE=true` for autospec to include Cucumber Features. See [Running Features](/cucumber/running-features) and [Autotest Integration](/wiki/autotest-integration) for more info.

For autospec, change `autotest` in the above block to `autospec`:

```
autospec-all: --require features --require lib --format progress features
autospec: --require features --require lib features  
default: --format pretty
html: --format html --out features.html
```

### Special Tags

There are two special [[Tags]] you can use to change how Cucumber runs your Scenarios.

#### `@no-txn`

By default, all Scenarios will run within a database transaction that is rolled back at the end. However, Scenarios tagged with `@no-txn` will run **without** a transaction. 

This can be useful when you have to deal with [[Browsers and Transactions]]. Beware that this will leave data in your database after that Scenario, which can lead to hard-to-debug failures in subsequent Scenarios. 

If you use this, we recommend you create a Before block that will explicitly put your database in a known state (for example using [DatabaseCleaner](https://github.com/bmabey/database_cleaner)).

#### `@allow-rescue`

Scenarios tagged with `@allow-rescue` will cause Rails to rescue all errors and render error pages, more or less in the same way your application would behave in the default production environment. It's not recommended to do this for all of your scenarios, as this makes it hard to discover errors in your application.

#### Controller and View spec redundancy

Since I recommend you verify outcomes (**`Then`** steps) by looking at the HTML, you might end up having some degree of redundancy with controller and view specs. I recommend you delete generated controller and view specs if you run into too much maintenance headaches and rely on the Features instead. However, in some cases it can be handy to use them.

### Authentication

Some guidance for authentication is provided below. It is recommended that a new user is created, rather than loaded through fixtures or other means.

In the `.feature`, use a phrase similar to `Given a user is logged in as "markEmark"`, and add the following to your relevent Step Definitions.

```
Given /^a user is logged in as "(.*)"$/ do |login|
  @current_user = User.create!(
    :login => login,
    :password => 'generic',
    :password_confirmation => 'generic',
    :email => "#{login}@example.com"
  )

  # :create syntax for restful_authentication w/ aasm. Tweak as needed.
  # @current_user.activate!

  visit "/login"
  fill_in("login", :with => login)
  fill_in("password", :with => 'generic')
  click_button("Log in")
  response.body.should =~ /Logged/m  
end
```
