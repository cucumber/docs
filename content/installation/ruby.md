Cucumber for Ruby is a Ruby gem. Depending on your project structure there are several ways to install it:

# Rubygems

Install from the command line:

```shell
gem install cucumber
```

# Bundler (without Rails)

Add `cucumber` to your `Gemfile`:

```ruby
group :test do
  gem 'cucumber'
end
```

Install the gem:

```shell
bundle
```

Try it out:

```shell
cucumber --help
```

Then, initialize a `features/` directory:

```shell
cucumber --init
```

[Bundler](http://gembundler.com/) is a utility gem that manages project specific RubyGem dependencies such that each
Rails project is unaffected by the gem requirements of another.
If you use Bundler to support multiple gem versions in multiple Rails projects on a single development host then you must
run Cucumber using the preface `bundle exec`. For example: `bundle exec cucumber -pnone features`.

## Ruby on Rails

[Cucumber-Rails](https://github.com/cucumber/cucumber-rails) is a generator that
generates and modifies files in a Rails project so it can be used with Cucumber.

Add `cucumber-rails` to your `Gemfile`:

```ruby
group :test do
  gem 'cucumber-rails', :require => false
  # database_cleaner is not mandatory, but highly recommended
  gem 'database_cleaner'
end
```

Install the gem:

```shell
bundle
```

Learn about the various options:

```shell
rails generate cucumber:install --help
```

Run the generator:

```shell
rails generate cucumber:install
```

Cucumber-Rails will detect whether the RSpec gems are installed. If so, then the rails generator builds the environment files to suit.
If not, it ignores RSpec and configures for test-unit instead.
