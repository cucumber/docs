---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Mocking-and-Stubbing-with-Cucumber/
title: Mocking and Stubbing with Cucumber
---

Mocking is usually discouraged when using Cucumber. You **can** set up mocks with expectations in your \[\[Step Definitions]], but ideally you would exercise as much of your stack as possible. If you have a dependency on an external system we recommend using [stubs instead of mocks](http://martinfowler.com/articles/mocksArentStubs.html).

## RSpec 2.x

Starting with Cucumber 0.8.4 you can use all of RSpec's supported mocking frameworks (RSpec, Mocha, RR, Flexmock). Just <code>require 'cucumber/rspec/doubles'</code> ([Test-Double](http://www.martinfowler.com/bliki/TestDouble.html) is a more generic term than mocks and stubs).

Perhaps place your stub action within a block as below:

\`\`\`
require 'cucumber/rspec/doubles'

RSpec::Mocks.with_temporary_scope do
stub_resp = {"city"=>"San Francisco", "state_abbreviation"=>"CA", "state"=>"California", "mailable_city"=>true}
SmartyStreets.stub(:get_city_state).with("94109").and_return(stub_resp)

click_button "check zip"
end
\`\`\`

## RSpec 1.2.8-1.3.0

As of RSpec 1.2.8 if you need to use stubs within Cucumber and you are using the built in mocking/stubbing framework that ships with RSpec you simply need to <code>require 'spec/stubs/cucumber'</code> in your env.rb file. Note that message expectations (should_receive) are *not* automatically verified.

Existing stubbing/mocking frameworks only support in-process stubbing & mocking, [cross-stub](http://github.com/ngty/cross-stub) provides simple cross process stubbing, which is useful when running cucumber with selenium, culerity, steam, etc.
[Aruba-Doubles](http://github.com/bjoernalbers/aruba-doubles) lets you stub command line applications with Cucumber.

We recommend you only stub things like Time and external services like OpenID etc.
