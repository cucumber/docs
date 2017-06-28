+++
title = "Patterns"
source = "https://github.com/cucumber/cucumber/wiki/Patterns/"
menu = ["all", "wiki"]
+++

A draft list of useful Cucumber patterns:

\* XPath Sections

**** Description: ability to scope an inspection or webrat step to a part of the html.

**** Motivation: when an element appears at multiple locations in an html page you want the ability to specify which one a step refers to

**** Examples:

    <code>Then I should see "logout" in the account section</code>

    <code>When I follow "next" in the pagination section</code>

**** Implementation:

****\* Steps like

    <code>When /^I follow "([^\"]*)" in the (.*)$/</code>

****\* A mapping of section names to xpaths that can be used for scoping

****\* Webrat [needs a patch](https://webrat.lighthouseapp.com/projects/10503/tickets/153-within-should-support-xpath) to allow xpaths to be used

\* Easy objects

**** Description: generic step to create objects in a rails app

**** Motivation: when writing cucumber for rails, you often want to create some objects and set their properties

**** Examples:

****\*

    <code>Given the following People exist:
    | name | date of birth |
    | john | 20 Jan 1980   |
    | mary | 10 days ago   |</code>

**** Implementation:

****\* Generic step that has a model name and a table as arguments

****\* Factory used to create an object for each row with the properties defined in the table

****\* Transforms that map the properties to the correct type

\* Relative times

\* Manual steps

**** Description: have a step that indicates an action that requires a human

**** Motivation: some things can not be automatically tested (JS UI, captcha) and we still want cucumber to describe how the app should behave

**** Examples:

    <code>Then /^.* \(manual step\)$/ do
    end</code>

    <code>And I fill in the captcha correctly (manual step)</code>

**** Implementation: define a step that matches anything and a unique string that denotes a manual step

\* Debugger

**** Description: a step to go into the debugger

**** Motivation: because puts statements just don't cut it

**** Implementation:

    <code>When I go to the homepage
    And debugger</code>

    <code>Then /^debugger$/ do
      debugger
    end</code>

    <code>
    >: cucumber features/test.feature 
    Feature: Test for debugger
      Scenario: Opening a debugger # features/test.feature:2
        When I go to the homepage  # features/step_definitions/webrat_steps.rb:10
    [23, 32] in /myproject/vendor/plugins/cucumber/bin/../lib/cucumber/core_ext/instance_exec.rb
       23          Thread.critical = old_critical
       24        end
       25        begin
       26          ret = send(mname, *args)
       27        ensure
    => 28          InstanceExecHelper.module_eval{ remove_method(mname) } rescue nil
       29        end
       30        ret
       31      end
       32    end
    /myproject/vendor/plugins/cucumber/lib/cucumber/core_ext/instance_exec.rb:28
    InstanceExecHelper.module_eval{ remove_method(mname) } rescue nil
    (rdb:1) puts response.body.split("\n").select{ |l| l =~ /meta/}
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    nil
    (rdb:1)</code>

-   Using tags for managing development progress / continuous integration breakage
-   Using tags for linking to feature tracking (lighthouse, pivotal tracker, trac, etc)
