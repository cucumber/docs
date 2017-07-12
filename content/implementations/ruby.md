---
menu:
- implementations
nav: docs
title: Ruby/JRuby
---

# Ruby/JRuby

Note: If you are using Ruby on Rails, see the [Cucumber-Rails](/docs/reference/rails) reference.

## Installation

Cucumber for Ruby is a ruby gem, and can be installed from the command line:

```
gem install cucumber
```

If you are using [Bundler](http://gembundler.com/), just add it to your `Gemfile`:

```ruby
group :test do
  gem 'cucumber'
end
```

Then initialize a features directory:

```
cucumber --init
```

## Running

To see the full list of options:

```
cucumber --help
```

Otherwise, to run all features:

```
cucumber
```
