---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Gherkin/
title: Gherkin syntax
---

Gherkin Syntax
--------------

Like Python and YAML, Gherkin is a line-oriented language that uses indentation
to define structure. Line endings terminate statements (eg, steps). Either
spaces or tabs may be used for indentation (but spaces are more portable). Most
lines start with a keyword.

Comment lines are allowed anywhere in the file. They begin with zero or more
spaces, followed by a hash sign (`#`) and some amount of text.

The parser divides the input into features, scenarios and steps. When you run
the feature the trailing portion (after the keyword) of each step is matched to
a Ruby code block called [Step Definitions](/gherkin/step-definitions/).

A Gherkin source file usually looks like this

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
          ...
```

First line starts the feature. Lines 2–4 are unparsed text, which is expected to
describe the business value of this feature. Line 6 starts a scenario. Lines
7–13 are the steps for the scenario. Line 15 starts next scenario and so on.

Read more

-   \[\[Feature Introduction\]\] - general structure of a feature
-   \[\[Given-When-Then\]\] - steps
