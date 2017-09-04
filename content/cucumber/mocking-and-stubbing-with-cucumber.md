---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Mocking-and-Stubbing-with-Cucumber/
title: Mocking and Stubbing with Cucumber
---

> TODO: Generalize and update

Mocking is usually discouraged when using Cucumber. You **can** set up mocks with expectations in your [Step Definitions](/cucumber/step-definitions/), but ideally you would exercise as much of your stack as possible. If you have a dependency on an external system we recommend using [stubs instead of mocks](http://martinfowler.com/articles/mocksArentStubs.html).

## RSpec 2.x

Starting with Cucumber 0.8.4 you can use all of RSpec's supported mocking frameworks (RSpec, Mocha, RR, Flexmock). Just `require 'cucumber/rspec/doubles'` ([Test-Double](http://www.martinfowler.com/bliki/TestDouble.html) is a more generic term than mocks and stubs).

Perhaps place your stub action within a block as below:

```
require 'cucumber/rspec/doubles'

RSpec::Mocks.with_temporary_scope do
stub_resp = {"city"=>"San Francisco", "state_abbreviation"=>"CA", "state"=>"California", "mailable_city"=>true}
SmartyStreets.stub(:get_city_state).with("94109").and_return(stub_resp)

click_button "check zip"
end
```
