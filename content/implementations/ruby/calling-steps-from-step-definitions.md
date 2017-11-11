---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Calling-Steps-from-Step-Definitions/
title: Calling Steps from Step Definitions
---

> TODO: Deprecated feature?

It is possible to call Steps from [Step Definitions](/step-definitions/):

```
# ruby
Given /^the user (.*) exists$/ do |name|
  # ...
end

Given /^I log in as (.*)$/ do |name|
  # ...
end

Given /^(.*) is logged in$/ do |name|
  step "the user #{name} exists"
  step "I log in as #{name}"
end
```

As of version 0.4.4, you can also do this:

```
Given /^(.*) is logged in$/ do |name|
  # Look ma, no quotes!
  # Easier to do "extract steps from plain text" refactorings with cut and paste!
  steps %Q{
    Given the user #{name} exists
    Given I log in as #{name}
  }
end
```

Invoking Steps from Step Definitions is practical if you have several common Steps that you want to perform in several Scenarios—or, simply if you want to make your Scenarios shorter and more declarative.

This allows you to do this in a Scenario:

```
# feature
Scenario: View last incidents
  Given Linda is logged in # This will in fact invoke 2 step definitions
  When I go to the incident page
```

Instead of having a lot of repetition:

```
# feature
Scenario: View last incidents
  Given the user Linda exists
  And I log in as Linda
  When I go to the incident page
```

# Calling Steps with multiline Step arguments

Sometimes you want to call a Step that has been designed to take Multiline [Step Arguments](/gherkin/gherkin-reference/#step-arguments) and sometimes you want to call a step that has been designed to take [Multiline Strings](#doc-strings).
For example:

## Tables

```
# ruby
Given /^an expense report for (.*) with the following posts:$/ do |date, posts_table|
  # The posts_table variable is an instance of Cucumber::Ast::Table
end
```

This can easily be called from a plain text Step like this:

```
# feature
Given an expense report for Jan 2009 with the following posts:
  | account | description | amount |
  | INT-100 | Taxi        |    114 |
  | CUC-101 | Peeler      |     22 |
```

But what if you want to call this from a Step Definition?

There are a couple of ways to do this:

```
# ruby
Given /A simple expense report/ do
  step "an expense report for Jan 2009 with the following posts:", table(%{
    | account | description | amount |
    | INT-100 | Taxi        |    114 |
    | CUC-101 | Peeler      |     22 |
  })
end
```

Or, if you prefer a more programmatic approach:

```
# ruby
Given /A simple expense report/ do
  step "an expense report for Jan 2009 with the following posts:", table([
    %w{ account description amount },
    %w{ INT-100 Taxi        114    },
    %w{ CUC-101 Peeler      22     }
  ])
end
```

You can also simply receive a table and pass it down. This Spanish Step Definition passes its table to the English one:

```
# ruby
Entonces /^debo ver los links:$/ do |links_table|
  Then "I should see the links:", links_table
end

Then /^I should see the links:$/ do |links_table|
  links_table.hashes.each do |hash|
    Then "I should see the link #{hash['link']}"
  end
end
```

## Doc Strings

To call a Step that takes a multiline string, such as

```
# ruby
Given /^I fill in "([^\"]*)" with$/ do |field, pystring|
  fill_in(field, :with => pystring)
end
```

From a Step Definition, pass the string after the Step:

```
# ruby
Given /^a document exists with content$/ do |pystring|
  step "I go to add a document"
  step 'I fill in "ditacontent" with', pystring
  step  'I press "Add to repository"'
end
```
