---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Feature-Introduction/
title: Feature Introduction
---

Every `.feature` file conventionally consists of a single feature. A line starting with the keyword **Feature** followed by free indented text starts a feature. A feature usually contains a list of scenarios. You can write whatever you want up until the first scenario, which starts with the word **Scenario** (or localized equivalent; Gherkin is localized for \[\[dozens of languages|Spoken languages\]\]) on a new line. You can use \[\[tagging|Tags\]\] to group features and scenarios together independent of your file and directory structure.

Every scenario consists of a list of steps, which must start with one of the keywords **Given**, **When**, **Then**, **But** or **And**. Cucumber treats them all the same, but you shouldn't. Here is an example:

\`\`\`gherkin
Feature: Serve coffee
Coffee should not be served until paid for
Coffee should not be served until the button has been pressed
If there is no coffee left then money should be refunded

Scenario: Buy last coffee
Given there are 1 coffees left in the machine
And I have deposited 1$
When I press the coffee button
Then I should be served a coffee
\`\`\`

In addition to a scenario, a feature may contain a background, scenario outline and examples. Respective keywords (in English) and places to read more about them are listed below. You can get a list of localized keywords with `cucumber --i18n [LANG]`.

|                   |                          |                              |
|-------------------|--------------------------|------------------------------|
| **keyword**       | **localized**            | **more info, see**           |
| name              | 'English'                |                              |
| native            | 'English'                |                              |
| encoding          | 'UTF-8'                  |                              |
| feature           | 'Feature'                | \[\[Feature Introduction\]\] |
| background        | 'Background'             | \[\[Background\]\]           |
| scenario          | 'Scenario'               | \[\[Feature Introduction\]\] |
| scenario\_outline | 'Scenario Outline'       | \[\[Scenario outlines\]\]    |
| examples          | 'Examples' / 'Scenarios' | \[\[Scenario outlines\]\]    |
| given             | 'Given'                  | \[\[Given-When-Then\]\]      |
| when              | 'When'                   | \[\[Given-When-Then\]\]      |
| then              | 'Then'                   | \[\[Given-When-Then\]\]      |
| and               | 'And'                    | \[\[Given-When-Then\]\]      |
| but               | 'But'                    | \[\[Given-When-Then\]\]      |

### Step definitions

For each step Cucumber will look for a matching **step definition**. A step definition is written in Ruby. Each step definition consists of a keyword, a string or regular expression, and a block. Example:

\`\`\`ruby

1.  features/step\_definitions/coffee\_steps.rb

Then "I should be served coffee" do
@machine.dispensed\_drink.should == "coffee"
end
\`\`\`

Step definitions can also take parameters if you use regular expressions:

\`\`\`ruby

1.  features/step\_definitions/coffee\_steps.rb

Given /there are (\\d+) coffees left in the machine/ do |n|
@machine = Machine.new(n.to\_i)
end
\`\`\`

This step definition uses a regular expression with one match group - <code>(\\d+)</code>. (It matches any sequence of digits). Therefore, it matches the first line of the scenario. The value of each matched group gets yielded to the block as a string. You must take care to have the same number of regular expression groups and block arguments. Since block arguments are always strings, you have to do any type conversions inside the block, or use \[\[Step Argument Transforms\]\].

When Cucumber prints the results of the running features it will underline all step arguments so that it's easier to see what part of a step was actually recognised as an argument. It will also print the path and line of the matching step definition. This makes it easy to go from a feature file to any step definition.

Take a look at \[\[Step Definitions\]\] and the examples directory to see more.
