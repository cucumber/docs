---
menu:
  - gherkin
title: Gherkin Reference
---

This is the general reference for all Cucumber implementations. Please refer to
the Implementations menu for links to platform-specific documentation.

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

- `Feature`
- `Scenario`
- `Given`, `When`, `Then`, `And`, `But`  (Steps)
- `Background`
- `Scenario Outline`
- `Examples`

There are a few extra keywords as well:

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

### Feature

A `.feature` file is supposed to describe a single Feature of the system, or a
particular aspect of a Feature. It's a way to provide a high-level description
of a software Feature, and to group related Scenarios.

The `.feature` file starts with the keyword **Feature**, a *name* (on the same line),
followed by an optional (but highly recommended) free format *description* which can span multiple lines.
The free format description ends when the first scenario starts.

Cucumber does not care about the name or the description.
Their purpose is simply to provide a place for you to document important aspects of the Feature,
such as a brief explanation and a list of business rules (general acceptance criteria).

In addition to a *name* and a *description*, features contain a list of [Scenarios](#scenario)
or [Scenario Outlines](#scenario-outlines) with Examples, and an optional [Background](#background).

A Scenario starts with the word **Scenario** (or the localized equivalent;
Gherkin is localized for dozens of [spoken languages](/gherkin/spoken-languages/))
on a new line.

Every Scenario consists of a list of Steps, which must start with one of the
keywords **Given**, **When**, **Then**, **But**, or **And**. Cucumber treats them all the same, but you shouldn't.

Here is an example:

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

You can use [Tags](/cucumber/tags/) to group Features and
Scenarios together, independent of your file and directory structure.

### Descriptions

Some parts of Gherkin documents do not have to start with a keyword.

On the lines following a `Feature`, `Scenario`, `Scenario Outline`, or `Examples`, you can write anything you like, as long as no line starts with a keyword.

### Scenario

A Scenario is a *concrete example* that *illustrates* a business rule. It consists of
a list of [Steps](#steps).

You can have as many Steps as you like, but we recommend you keep the number at 3-5 per Scenario.
If they become longer than that, they lose their expressive power as specification and documentation.

In addition to being a specification and documentation, a Scenario is also a *test*.
As a whole, your Scenarios are an *executable specification* of the system.

Scenarios follow the same pattern:

- Describe an initial context
- Describe an event
- Describe an expected outcome

This is done with Steps.

### Steps

A Step typically starts with `Given`, `When`, or `Then`.

If there are multiple `Given` or `When` Steps underneath each other, you can use `And` or `But`. Cucumber does not differentiate between the keywords, but choosing the right one is important for the readability of the Scenario as a whole.

#### Given

`Given` steps are used to describe the initial context of the system---the *scene* of the Scenario.
It is typically something that happened in the *past*.

When Cucumber executes a `Given` Step, it will configure the system to be in a well-defined state,
such as creating and configuring objects or adding data to the test database.

It's okay to have several `Given` steps (just use `And` or `But` for number 2 and upwards to make it more readable).

#### When

`When` Steps are used to describe an event, or an *action*. This can be a person interacting with the system, or it can be an event triggered by another system.

It's strongly recommended you only have a single `When` step per Scenario. If you feel compelled to add more, it's usually a sign that you should split the Scenario up into multiple Scenarios.

#### Then

`Then` steps are used to describe an *expected* outcome, or result.

The [Step Definition](/cucumber/step-definitions/) of a `Then` Step should use an *assertion* to
compare the *actual* outcome (what the system actually does) to the *expected* outcome
(what the Step says the system is supposed to do).

### Background

Occasionally you'll find yourself repeating the same `Given` Steps in all of the Scenarios in a Feature.

Since it is repeated in every Scenario, this is an indication that those Steps
are not *essential* to describe the Scenarios; they are *incidental details*. You can literally move such `Given` steps to the background, by grouping them under a `Background` section.

A `Background` allows you to add some context to the Scenarios in the Feature. It can contain one or more Steps.
It is run before *each* Scenario, but after any Before [Hooks](/cucumber/hooks/). In your feature file, put the `Background` before the first Scenario.

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

**Good practices for using Background:**

- Don't use Background to set up **complicated state**, unless that state is actually something the client needs to know.

For example, if the user and site names don't matter to the client, use a higher-level step such as `Given that I am logged in as a site owner`.

- Keep your Background section **short**.

The client needs to actually remember this stuff when reading the Scenarios. If the Background is more than 4 lines long, consider moving some of the irrelevant details into higher-level Steps?

See [Calling Steps from Step Definitions](/implementations/ruby/calling-steps-from-step-definitions/).

- Make your Background section **vivid**.

Use colorful names, and try to tell a story. The human brain keeps track of stories much better than it keeps track of names like `"User A"`, `"User B"`, `"Site 1"`, and so on.

- Keep your Scenarios **short**, and don't have too many.

If the Background section has scrolled off the screen, think about using higher-level Steps, or splitting the `*.feature` file.

## Scenario Outlines

Copying and pasting Scenarios to use different values quickly becomes tedious and repetitive:

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

Scenario Outlines allow us to more concisely express these examples through the use of a template with placeholders, using `Scenario Outline`, `Examples` with tables, and `< >`-delimited parameters:

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

The Scenario Outline Steps provide a template which is never directly run. A Scenario Outline is run once for each row in the `Examples` section beneath it (not counting the first row).

The way this works is via placeholders. Placeholders must be contained within `< >` in the Scenario Outline's Steps.

For example:

```gherkin
Given <I'm a placeholder and I'm ok>
```

The placeholders indicate that when the Examples row is run, they should be substituted with real values from the `Examples` table. If a placeholder name is the same as a column title in the `Examples` table, that is the value that will replace it.

You can also use placeholders in Multiline [Step Arguments](#step-arguments).

**IMPORTANT:** *Your Step Definitions will never have to match a placeholder. They will need to match the values that will _replace_ the placeholder.*

So, when running the first row of our example:

```gherkin
Examples:
  | start | eat | left |
  |  12   |  5  |  7   |
```

The Scenario that is actually run is:

```gherkin
Scenario Outline: eating
  Given there are 12 cucumbers      # <start> replaced with 12
  When I eat 5 cucumbers            # <eat> replaced with 5
  Then I should have 7 cucumbers    # <left> replaced with 7
```

While Scenario Outlines help minimize redundancy, they aren't necessarily easier to read from a business or narrative perspective. Remember to choose Examples that illustrate something new about the Feature.

One way to make sure that your Examples are contributing to the full picture of the Feature is to break them into multiple tables. Whenever possible, include plain-text descriptions of the underlying rules, and break the Examples up to illustrate these rules.

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

In that Feature, it isn't clear why certain passwords are valid or invalid.

By reformatting the Examples into two tables with descriptive text, the Scenario Outline becomes much more effective (p.75):

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

## Step Arguments

In some cases you might want to pass more data to a step than fits on a single line.
For this purpose Gherkin has Doc Strings and Data Tables:

### Doc Strings

Doc Strings are handy for passing a larger piece of text to a step definition. The syntax is inspired from Python's Docstring syntax.

The text should be offset by delimiters consisting of three double-quote marks on lines of their own:
```gherkin
Given a blog post named "Random" with Markdown body
  """
  Some Title, Eh?
  ===============
  Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  """
```
In your Step Definition, there’s no need to find this text and match it in your pattern. It will automatically be passed as the last parameter in the step definition.

Indentation of the opening '"""' is unimportant, although common practice is two spaces in from the enclosing step. The indentation inside the triple quotes, however, is significant. Each line of the Doc String will be de-indented according to the opening """. Indentation beyond the column of the opening """ will therefore be preserved.

### Data Tables

Data Tables are handy for passing a list of values to a step definition:

```gherkin
Given the following users exist:
  | name   | email              | twitter         |
  | Aslak  | aslak@cucumber.io  | @aslak_hellesoy |
  | Julien | julien@cucumber.io | @jbpros         |
  | Matt   | matt@cucumber.io   | @mattwynne      |
```
Just like Doc Strings, Data Tables will be passed to the Step Definition as the last argument.

The type of this argument will be DataTable. See the API docs for more details about how to access the rows and cells.
