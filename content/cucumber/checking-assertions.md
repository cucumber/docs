---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/RSpec-Expectations/
title: Checking Assertions
---

> TODO: Generalize

If you're using bundler, add the `rspec-expectations` gem to your `Gemfile`.
Cucumber will automatically load RSpec's matchers and expectation methods to be
available in your Step Definitions.

e.g.

```ruby
Given /^a nice new bike$/ do
  expect(bike).to be_shiny
end
```

If you'd like to configure RSpec, you'll need to also add the `rspec-core` gem
to your `Gemfile`. Then, you can add to your `features/support/env.rb`
configuration, such as:

```ruby
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end
```

## Test Unit

Don't like RSpec's `should` methods for assertions? No problem, we won't force
you to. 

You can use the familiar `Test::Unit` `assert` methods by mixing it into
your [`World`](/wiki/a-whole-new-world).

```ruby
require 'test/unit/assertions'

World(Test::Unit::Assertions)
```

<!-- TODO: You can see a full example under the [examples](https://github.com/cucumber/cucumber/tree/master/examples%2Ftest_unit) -->
