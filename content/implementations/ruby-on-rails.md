+++
title = "Ruby on Rails"
source = "https://github.com/cucumber/cucumber/wiki/ruby-on-rails/"
menu = ["implementations"]
+++

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




Rails 3.x and above
===================

Go to Cucumber-Rails' [README](https://github.com/cucumber/cucumber-rails/blob/master/README.md) for installation instructions and ignore this page.

As of Cucumber-Rails version 0.5.0 and above, Cucumber-Rails **only** supports Rails 3.x and above (Rails 2 is **not** supported). The following is only for Rails 2.x.

Rails 2.x
=========

If you are on Rails 2.x you have to use an older version of Cucumber-Rails. These are the recommended versions for maximum compatibility with Rails 2.3.x (though see note on javascript emulation below):

    <code>gem "capybara", "1.1.1"
    gem "cucumber", "1.1.0"
    gem "cucumber-rails", "0.3.2"

</code>

The rest of this page describes how to install Cucumber-Rails in a Rails 2.x application. These instructions assume you already have a Rails 2.x application, and that you have a shell where the current directory is the root of your Rails app.

Install Cucumber-Rails
----------------------

    <code>[sudo] gem install cucumber-rails -v 0.3.2</code>

The <code>cucumber-rails</code> gem depends on the <code>cucumber</code> gem, so you don't need to install that separately.

### Bootstrap Cucumber-Rails

Cucumber-Rails needs to add a few files to your project:

    <code>ruby script/generate cucumber</code>

If you're on an OS that supports fork we recommend you use \[\[Spork and --drb\]\] as this lets you start cucumber faster:

    <code>ruby script/generate cucumber --spork</code>

For more help on the generator you can just ask for help:

    <code>ruby script/generate cucumber --help</code>

Take a look at the generated files. If you need to, you can tweak them later.

### Install new dependencies

    <code>[sudo] rake RAILS_ENV=cucumber gems:install</code>

### Start a feature

It's really, really recommended that you write your features by hand - in collaboration with your customer / business analyst / domain expert / interaction designer. However, to get you started you can use the feature generator to generate the first few features:

    <code>ruby script/generate feature Frooble name:string color:string description:text
    </code>

This will generate a simple plain text feature with associated steps. Don't get addicted to this
generator - you're better off writing these by hand in the long run.

**Important**: The generated feature will fail unless you have set up a layout in your app. This is because Webrat fails to parse HTML
that isn't well formed (i.e. has a single <code>

<html>
</code> root node). [Here is a simple layout](http://github.com/aslakhellesoy/cucumber-rails-test/raw/master/app/views/layouts/application.html.erb) you can use, but I hope you have a better one yourself.

### Run features

If working on a fresh Rails project, first set up the (empty) database:

    <code>rake db:migrate</code>

(Otherwise Cucumber fails with the error <code>no such file to load -- YourProjectName/db/schema.rb</code>.)

Then run the features:

    <code>rake cucumber</code>

(You may run <code>rake -T cucumber</code> to see the other rake tasks available)

This should result in a *statu quo*, because you haven't written any code yet (I hope).

Now it's time to write some code, or generate some. Try this:

    <code>script/generate rspec_scaffold Frooble name:string color:string description:text
    rake db:migrate
    rake cucumber
    </code>

### Other ways of running features

You can also run specific features directly with cucumber:

    <code>cucumber --require features --require lib features/subdir/
    cucumber --require features --require lib features/some-nifty.feature</code>

And using autospec with a similar setting (<code>--require features --require lib</code>), applied in your project's /cucumber.yml:

    <code>autotest-all: --require features --require lib --format progress features
    autotest: --require features --require lib features  
    default: --format pretty
    html: --format html --out features.html</code>

Remember that you need AUTOFEATURE=true for autospec to include cucumber features. See \[\[Running Features\]\] and \[\[Autotest Integration\]\] for more info.

For autospec, change autotest in the above block to autospec:

    <code>autospec-all: --require features --require lib --format progress features
    autospec: --require features --require lib features  
    default: --format pretty
    html: --format html --out features.html</code>

### Special tags

There are two special \[\[tags\]\] you can use to change how Cucumber runs your scenarios

#### @no-txn

By default all scenarios will run within a database transaction that is rolled back at the end. However, scenarios tagged with <code>@no-txn</code> will run **without** a transaction. This can be useful when you have to deal with \[\[Browsers and Transactions\]\]. Beware that this will leave data in your database after that scenario, which can lead to hard-to-debug failures in subsequent scenarios. If you use this, we recommend you create a Before block that will explicitly put your database in a known state, for example using [DatabaseCleaner](http://github.com/bmabey/database_cleaner)

#### @allow-rescue

Scenarios tagged with <code>@allow-rescue</code> will cause Rails to rescue all errors and render error pages, more or less in the same way your application would behave in the default production environment. It's not recommended to do this for all of your scenarios, as this makes it hard to discover errors in your application.

#### Controller and View spec redundancy

Since I recommend you verify outcomes (**Then** steps) by looking at the HTML, you might end up having some degree of redundancy with controller and view specs. I recommend you delete generated controller and view specs if you run into too much maintenance headaches and rely on the features instead. However, in some cases it can be handy to use them.

### Authentication

Some guidance for authentication is provided below. It is recommended that a new user is created, rather than loaded through fixtures or etc.

In the .feature, use a phrase similar to <code>Given a user is logged in as "markEmark"</code>, and add the following to your relevent step definitions.

    <code>Given /^a user is logged in as "(.*)"$/ do |login|
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
    </code>

### Capybara Javascript-emulation bug workaround

\`\`\`undefined local variable or method \`node' for \#&lt;Capybara::RackTest::Node...\`\`\` results from upgrading capybara &gt; 0.3.2 (to get working form selectors).
Remove the line \`\`\`require 'cucumber/rails/capybara\_javascript\_emulation'\`\`\` from support/env.rb. This will break any tests reliant on this behaviour, as the links will now send get requests (the javascript is ignored by rack-test). To get the right behaviour again you should tag them with @javascript, so Capybara runs them with a javascript driver (such as selenium/firefox).
