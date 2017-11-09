---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Gherkin/
title: Gherkin Syntax
status: merge into gherkin.md
---

# Gherkin Syntax

Gherkin is a line-oriented language that uses indentation
to define structure, like Python and YAML. Line endings terminate statements (i.e. Steps).
Either spaces or tabs may be used for indentation (but spaces are more portable). Most
lines start with a keyword.

Comment lines are allowed anywhere in the file (as long as they're on a new line).
They begin with zero or more spaces, followed by a hash sign (`#`) and some text.

The parser divides the input into Features, Scenarios, and Steps. When you run
the Feature, the trailing portion (after the keyword) of each Step is matched to
a code block, called a [Step Definition](/cucumber/step-definitions/).

A Gherkin source file usually looks like this.

```gherkin
Feature: Some terse yet descriptive text of what is desired
  Textual description of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information that will make the feature easier to understand

  Scenario: Some determinable business situation
    Given some precondition
    And some other precondition
    When some action by the actor
    And some other action
    And yet another action
    Then some testable outcome is achieved
    And something else we can check happens too

  Scenario: A different situation
    # ...
```

The Feature starts on the first line. Lines 2–4 are unparsed (free format) text, which is expected to
describe the business value of this Feature. The keyword **Scenario** on line 6 starts a Scenario.
Lines 7–13 are the Steps for the Scenario. Line 15 starts the next Scenario, and so on.

Read more:

- [Feature](/gherkin/gherkin-reference/#feature) - general structure of a feature
- [Given-When-Then](/gherkin/given-when-then/) - steps
