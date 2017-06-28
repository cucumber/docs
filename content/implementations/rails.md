---
title: Ruby on Rails
nav: docs
menu:
  - reference
  - implementations
renderer: Cucumber::Website::Reference
---

# Ruby on Rails

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
