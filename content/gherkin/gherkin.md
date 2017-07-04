---
title: Gherkin Reference
menu:
  main:
---

# Reference

This is the general reference for all Cucumber implementations. Please refer to
the [documentation overview](/docs) for links to platform-specific documentation.

## Gherkin

Cucumber executes your `.feature` files, and those files contain executable specifications
written in a language called Gherkin.

Gherkin is plain-text English (or one of 60+ other languages) with a little extra structure.
Gherkin is designed to be easy to learn by non-programmers, yet structured enough to
allow concise description of examples to illustrate business rules in most real-world
domains.

Here is a sample Gherkin document:

```gherkin
Feature: Refund item

  Scenario: Jeff returns a faulty microwave
    Given Jeff has bought a microwave for $100
    And he has a receipt
    When he returns the microwave
    Then Jeff should be refunded $100
```

In Gherkin, each line that isn't blank has to start with a Gherkin *keyword*,
followed by any text you like. The main keywords are:

* `Feature`
* `Scenario`
* `Given `, `When `, `Then `, `And `, `But `  (Steps)
* `Background`
* `Scenario Outline`
* `Examples`

There are a few extra keywords as well:

* `"""` (Doc Strings)
* `|` (Data Tables)
* `@` (Tags)
* `#` (Comments)

### Feature

A `.feature` file is supposed to describe a single feature of the system, or a
particular aspect of a feature. It's just a way to provide a high-level description
of a software feature, and to group related scenarios.

A feature has three basic elements---the `Feature:` keyword, a *name* (on the same line)
and an optional (but highly recommended) *description* that can span multiple lines.

Cucumber does not care about the name or the description---the purpose is simply
to provide a place where you can document important aspects of the feature, such
as a brief explanation and a list of business rules (general acceptance criteria).

Here is an example:

```gherkin
Feature: Refund item

  Sales assistants should be able to refund customers' purchases.
  This is required by the law, and is also essential in order to
  keep customers happy.

  Rules:
  - Customer must present proof of purchase
  - Purchase must be less than 30 days ago
```

In addition to a *name* and a *description*, features contain a list of [Scenarios](#scenario)
or [Scenario Outlines](#scenario-outline), and an optional [Background](#background).

### Descriptions

Some parts of Gherkin documents do not have to start with a keyword.

On the lines following a `Feature`, `Scenario`, `Scenario Outline` or `Examples`
you can write anything you like, as long as no line starts with a key a keyword.

### Scenario

A scenario is a *concrete example* that *illustrates* a business rule. It consists of
a list of [steps](#steps).

You can have as many steps as you like, but we recommend you keep the number at 3-5 per scenario.
If they become longer than that they lose their expressive power as specification and documentation.

In addition to being a specification and documentation, a scenario is also a *test*.
As a whole, your scenarios are an *executable specification* of the system.

Scenarios follow the same pattern:

* Describe an initial context
* Describe an event
* Describe an expected outcome

This is done with steps.

### Steps

A step typically starts with `Given `, `When ` or `Then `. If there are multiple `Given ` or `When `
steps underneath each other, you can use `And ` or `But `. Cucumber does not differentiate between
the keywords, but choosing the right one is important for the readability of the scenario as a whole.

#### Given

`Given ` steps are used to describe the initial context of the system---the *scene* of the scenario.
It is typically something that happened in the *past*.

When Cucumber executes a `Given ` step it will configure the system to be in a well-defined state,
such as creating and configuring objects or adding data to the test database.

It's ok to have several `Given ` steps (just use `And ` or `But ` for number 2 and upwards to make it more readable).

#### When

`When ` steps are used to describe an event, or an *action*. This can be a person interacting with the
system, or it can be an event triggered by another system.

It's strongly recommended you only have a single `When ` step per scenario. If you feel compelled to
add more it's usually a sign that you should split the scenario up in multiple scenarios.

#### Then

`Then ` steps are used to describe an *expected* outcome, or result.

The [step definition](#step-definitions) of a `Then ` step should use an *assertion* to
compare the *actual* outcome (what the system actually does) to the *expected* outcome
(what the step says the system is supposed to do).

### Background

Occasionally you'll find yourself repeating the same `Given ` steps in all of the scenarios
in a feature file. Since it is repeated in every scenario it is an indication that those steps
are not *essential* to describe the scenarios, they are *incidental details*.

You can literally move such `Given ` steps to the background by grouping them under a
`Background` section before the first scenario:

```gherkin
Background:
  Given a $100 microwave was sold on 2015-11-03
  And today is 2015-11-18
```

## Scenario Outlines

Copying and pasting scenarios to use different values quickly becomes tedious and repetitive:

```gherkin
Scenario: eat 5 out of 12
  Given there are 12 cucumbers
  When I eat 5 cucumbers
  Then I should have 7 cucumbers

Scenario: eat 5 out of 20
  Given there are 20 cucumbers
  When I eat 5 cucumbers
  Then I should have 15 cucumbers
```

Scenario outlines allow us to more concisely express these examples through the use of a template with placeholders, using `Scenario Outline`, `Examples` with tables and `< >` delimited parameters:

```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    |  12   |  5  |  7   |
    |  20   |  5  |  15  |
```

The Scenario Outline steps provide a template which is never directly run. A Scenario Outline is run once for each row in the `Examples` section beneath it (not counting the first row).

The way this works is via placeholders. Placeholders must be contained within `< >` in the Scenario Outline's steps. For example:

```gherkin
Given <I'm a placeholder and I'm ok>
```

The placeholders indicate that when the Examples row is run they should be substituted with real values from the `Examples` table. If a placeholder name is the same as a column title in the `Examples` table then this is the value that will replace it.

You can also use placeholders in [Multiline Step Arguments](docs/gherkin.md#doc-strings).

**IMPORTANT:** *Your step definitions will never have to match a placeholder. They will need to match the values that will replace the placeholder*

So when running the first row of our example:

```gherkin
Examples:
  | start | eat | left |
  |  12   |  5  |  7   |
```

The scenario that is actually run is:

```gherkin
Scenario Outline: eating
  Given there are 12 cucumbers      # <start> replaced with 12
  When I eat 5 cucumbers            # <eat> replaced with 5
  Then I should have 7 cucumbers    # <left> replaced with 7
```

While `scenario outlines` help minimize redundancy, they aren't necessarily easier to read from a business or narrative perspective. Remember to choose `examples` that illustrate something new about the `feature`.

One way to make sure that your `examples` are contributing to the full picture of the `feature` is to break them into multiple tables. Whenever possible, include plain-text descriptions of the underlying rules and break the examples up to illustrate these rules.

Here is an example from [The Cucumber Book](https://pragprog.com/book/hwcuc/the-cucumber-book) (p.74):

```gherkin
Feature: Account Creation
Scenario Outline: Password validation
  Given I try to create an account with password "<Password>"
  Then I should see that the password is <Valid or Invalid>

  Examples:
  | Password | Valid or Invalid |
  | abc      | invalid          |
  | ab1      | invalid          |
  | abc1     | valid            |
  | abcd     | invalid          |
  | abcd1    | valid            |
```
In that feature, it isn't clear why certain passwords are valid or invalid. By reformatting the examples into two tables with descriptive text, the scenario outline becomes much more effective (p.75):

```gherkin
Feature: Account Creation
Scenario Outline: Password validation
  Given I try to create an account with password "<Password>"
  Then I should see that the password is <Valid or Invalid>

  Examples: Too Short
    Passwords are invalid if less than 4 characters

    | Password | Valid or Invalid |
    | abc      | invalid          |
    | ab1      | invalid          |

  Examples: Letters and Numbers
    Passwords need both letters and numbers to be valid

    | abc1     | valid            |
    | abcd     | invalid          |
    | abcd1    | valid            |
```
