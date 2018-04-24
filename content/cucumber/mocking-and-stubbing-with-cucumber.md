---
title: Mocking and Stubbing with Cucumber
subtitle: Decoupling your scenarios from infrastructure
menu:
  guides:
    weight: 50
---

Mocking is usually discouraged when using Cucumber; ideally you would exercise as much of your stack as possible.
There are cases when using mocking can come in handy. For example, if your system depends on a third party.
If you have a dependency on an external system, we recommend using [stubs instead of mocks](http://martinfowler.com/articles/mocksArentStubs.html).
You **can** set up mocks with expectations in your [step definitions](/cucumber/#step-definitions).

# Ruby

## RSpec 2.x

Starting with Cucumber 0.8.4, you can use all of RSpec's supported mocking frameworks (RSpec, Mocha, RR, Flexmock).
Just `require 'cucumber/rspec/doubles'` ([test-double](http://www.martinfowler.com/bliki/TestDouble.html) is a more generic term than mocks and stubs).

Perhaps place your stub action within a block as below:

```ruby
require 'cucumber/rspec/doubles'

RSpec::Mocks.with_temporary_scope do
stub_resp = {"city"=>"San Francisco", "state_abbreviation"=>"CA", "state"=>"California", "mailable_city"=>true}
SmartyStreets.stub(:get_city_state).with("94109").and_return(stub_resp)

click_button "check zip"
end
```

# Java

Different mocking frameworks may serve different purposes.

## Mockito

[Mockito](http://mockito.org) is a framework for the creation of [test doubles](http://www.martinfowler.com/bliki/TestDouble.html) in automated unit tests for the purpose of TDD or BDD.

## MockServer

You can use [MockServer](http://www.mock-server.com/) for mocking any system you integrate with via HTTP or HTTPS (i.e. services, web sites, etc).

## WireMock

[WireMock](http://wiremock.org/) is a simulator for HTTP-based APIs, similar to MockServer.

# JavaScript

If you are using cucumber-js, there are many test frameworks to choose from.
Which one you use, may depend on other JavaScript frameworks your project is using and / or personal preference.
