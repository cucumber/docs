---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Background/
title: Background
---

A Background allows you to add some context to the Scenarios in a single Feature.

The Background can contain one or more Steps. It is run before *each* Scenario, but after any Before [Hooks](/cucumber/hooks/).

Example:

```gherkin
Feature: Multiple site support
As a Mephisto site owner
I want to host blogs for different people
In order to make gigantic piles of money

Background:
Given a global administrator named "Greg"
And a blog named "Greg's anti-tax rants"
And a customer named "Dr. Bill"
And a blog named "Expensive Therapy" owned by "Dr. Bill"

Scenario: Dr. Bill posts to his own blog
Given I am logged in as Dr. Bill
When I try to post to "Expensive Therapy"
Then I should see "Your article was published."

Scenario: Dr. Bill tries to post to somebody else's blog, and fails
Given I am logged in as Dr. Bill
When I try to post to "Greg's anti-tax rants"
Then I should see "Hey! That's not your blog!"

Scenario: Greg posts to a client's blog
Given I am logged in as Greg
When I try to post to "Expensive Therapy"
Then I should see "Your article was published."
```

For a less explicit alternative to Background, check out [Tagged Hooks](/cucumber/hooks/#tagged-hooks).

## Good practices for using Background

### Don't use Background to set up **complicated state**, unless that state is actually something the client needs to know.

For example, if the user and site names don't matter to the client, use a higher-level step such as `Given that I am logged in as a site owner`.

### Keep your Background section **short**.

The client needs to actually remember this stuff when reading the Scenarios. If the Background is more than 4 lines long, consider moving some of the irrelevant details into higher-level Steps? 

See [Calling Steps from Step Definitions](/implementations/ruby/calling-steps-from-step-definitions/).

### Make your Background section **vivid**.

Use colorful names, and try to tell a story. The human brain keeps track of stories much better than it keeps track of names like `"User A"`, `"User B"`, `"Site 1"`, and so on.

### Keep your Scenarios **short**, and don't have too many.

If the Background section has scrolled off the screen, think about using higher-level Steps, or splitting the `*.feature` file.
