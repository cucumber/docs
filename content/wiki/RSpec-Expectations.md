+++
title = "RSpec Expectations"
source = "https://github.com/cucumber/cucumber/wiki/RSpec-Expectations/"
menu = ["all", "wiki"]
+++

If you're using bundler, add the `rspec-expectations` gem to your Gemfile. Cucumber will automatically load RSpec's matchers and expectation methods to be available in your step definitions.

e.g.

```ruby
Given /^a nice new bike$/ do
  expect(bike).to be_shiny
end
```

If you'd like to configure RSpec, you'll need to also add the `rspec-core` gem to your Gemfile. Then, you can add to your `features/support/env.rb` configuration such as

```ruby
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end
```
