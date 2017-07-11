---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/FunFX-and-Flex/
title: FunFX and Flex
---

WARNING: FunFX is defunkt. Check out [Melomel](http://melomel.info/) instead.

[FunFX](http://wiki.github.com/peternic/funfx) is a Watir / SafariWatir / FireWatir extension that lets you talk to an [Adobe Flex](http://www.adobe.com/products/flex/) application straight from Ruby. It works wonderfully with Cucumber. Here is an example to get you started:

    # features/support/env.rb

    require 'rubygems'
    require 'spec'

    #require 'funfx/browser/safariwatir'
    #BROWSER = Watir::Safari.new
    require 'funfx/browser/firewatir'
    BROWSER = FireWatir::Firefox.new
    #require 'funfx/browser/watir'
    #BROWSER = Watir::IE.new

    DEMO_APP = "http://localhost:9851/index.html"

    Before do
      BROWSER.goto(DEMO_APP)
      @flex = BROWSER.flex_app('DemoAppId', 'DemoAppName')
    end

    at_exit do
      BROWSER.close
    end

    # features/step_definitions/date_steps.rb

    Given /^I am on the new date page$/ do
      tree = @flex.tree({:id => 'objectTree'})
      tree.open('Date controls')
      tree.select('Date controls>DateField1')
    end

    When /^I select date (.*)$/ do |date|
      date_field = @flex.date_field({:id => 'dateField1'})
      date_field.open
      date_field.change(date)
    end

    Then /^I should see (.*) as my date$/ do |date|
      date_field = @flex.date_field({:id => 'dateField1'})
      date_field.selected_date.to_s.should == Date.parse(date).to_s
    end

You can see the full example code in [FunFX' example directory](http://github.com/aslakhellesoy/funfx/tree/HEAD/examples/cucumber)

Ladislav Martincik has written a more general tutorial in [his blog](http://martincik.com/?p=20) that explains how to install FunFX and some basics about the FunFX API.
