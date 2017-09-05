---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Feature-Introduction/
title: Feature Introduction
---

> TODO: gherkin reference

Every `.feature` file conventionally consists of a single feature. A line
starting with the keyword **Feature** followed by free indented text starts a
feature. A feature usually contains a list of scenarios. You can write whatever
you want up until the first scenario, which starts with the word **Scenario**
(or localized equivalent; Gherkin is localized for dozens of [spoken
languages](/gherkin/spoken-languages/) on a new line. You can use \[\[tagging|Tags]] to group features and
scenarios together independent of your file and directory structure.

Every scenario consists of a list of steps, which must start with one of the
keywords **Given**, **When**, **Then**, **But** or **And**. Cucumber treats them
all the same, but you shouldn't. Here is an example:

```gherkin
Feature: Serve coffee
Coffee should not be served until paid for
Coffee should not be served until the button has been pressed
If there is no coffee left then money should be refunded

Scenario: Buy last coffee
Given there are 1 coffees left in the machine
And I have deposited 1$
When I press the coffee button
Then I should be served a coffee
```

In addition to a scenario, a feature may contain a background, scenario outline and examples.
