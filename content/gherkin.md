---
menu:
  - gherkin
title: Gherkin Reference
---

Cucumber executes your `.feature` files, and those files contain executable specifications
written in a language called Gherkin.

Gherkin is plain-text English (or one of [60+ other languages](#spoken-languages)) with a little extra structure.
Gherkin is designed to be easy for people to read and write, yet structured enough to allow
for automated processing and concise description of business rules.

# Gherkin Syntax

Gherkin is a line-oriented language that uses indentation
to define structure, like Python and YAML. Line endings terminate statements (i.e. steps).
Either spaces or tabs may be used for indentation (but spaces are more portable). Most
lines start with a [keyword](#keywords).

Comment lines are allowed anywhere in the file. They begin with zero or more spaces,
followed by a hash sign (`#`) and some text. Comments do have to start on a new line.

The parser divides the input into features, scenarios, and steps. When you run
the feature, the trailing portion (after the keyword) of each step is matched to
a code block, called a [step definition](/cucumber/#step-definitions).

A Gherkin source file will usually contain a feature and several scenarios and/or scenario outlines that describe this feature.
For example:

```gherkin
Feature: Some terse yet descriptive text of what is desired
  Textual description of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information that will make the feature easier to understand

  Scenario: Some determinable business situation
    Given some precondition
    And some other precondition
    When some action by the actor
    Then some testable outcome is achieved
    And something else we can check happens too

  Scenario: A different situation
    # ...
```

The feature starts on the first line with the keyword `Feature`. The lines below are unparsed (i.e. free format) text, which you can use to
describe this feature. The keyword `Scenario` starts a scenario, followed by the steps for the scenario. The next scenario is started by the keyword `Scenario` again.
The text after the keyword `Scenario` -but still on the same line- is also free format text to describe your scenario.

## Keywords

Each line that isn't a blank line has to start with a Gherkin *keyword*, followed by any text you like. The only exceptions are the feature and scenario descriptions.

The main keywords are:

- `Feature`
- `Scenario`
- `Given`, `When`, `Then`, `And`, `But`  (Steps)
- `Background`
- `Scenario Outline`
- `Examples`

There are a few additional keywords:

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

{{% note "Localization"%}}
Gherkin is localized for dozens of [spoken languages](#spoken-languages); each has their own localized equivalent of these keywords.
{{% /note %}}

## Feature

A `.feature` file describes a single feature of the system, or a
particular aspect of a feature. It's a way to provide a high-level description
of a software feature, and to group related scenarios.

The `.feature` file starts with the keyword **Feature**, a *name* (on the same line),
followed by an optional (but highly recommended!) free format *description* of the feature which can span multiple lines.
The free format description ends when the first scenario starts.

The name and the description have no special meaning to Cucumber. Their purpose is to provide
a place for you to document important aspects of the feature, such as a brief explanation
and a list of business rules (general acceptance criteria).

In addition to a *name* and a *description*, features contain a list of [scenarios](#scenario)
or [scenario outlines](#scenario-outlines) with examples, and an optional [background](#background).

A Scenario starts with the word **Scenario** on a new line.

Every scenario consists of a list of steps, which must start with one of the
keywords **Given**, **When**, **Then**, **But**, or **And**. Cucumber treats them all the same, but you shouldn't!
The different keywords help you write scenarios that are easy to read and understand.

Here is an example:

```gherkin
Feature: Refund item

  Scenario: Jeff returns a faulty microwave
    Given Jeff has bought a microwave for $100
    And he has a receipt
    When he returns the microwave
    Then Jeff should be refunded $100
    But the faulty microwave should be returned
```

You can use [tags](/cucumber/#tags) to group features and scenarios together,
independent of your file and directory structure.

## Descriptions

Some parts of Gherkin documents do not have to start with a keyword.

On the lines following a `Feature`, `Scenario`, `Scenario Outline`, or `Examples`, you can write anything you like, as long as no line starts with a keyword.

## Scenario

A scenario is a *concrete example* that *illustrates* a business rule. It consists of
a list of [steps](#steps).

You can have as many steps as you like, but we recommend you keep the number at 3-5 per scenario.
If they become longer than that, they lose their expressive power as specification and documentation.

In addition to being a specification and documentation, a scenario is also a *test*.
As a whole, your scenarios are an *executable specification* of the system.

Scenarios follow the same pattern:

- Describe an initial context (`Given`)
- Describe an event (`When`)
- Describe an expected outcome (`Then`)

This is done with steps.

## Steps

A step typically starts with `Given`, `When`, or `Then`.

If there are multiple `Given` or `When` steps underneath each other, you can use `And` or `But`.
Cucumber does not differentiate between the keywords; this means that a step definition will match regardless of the keyword used.
However, we strongly recommend that you do! These words have been carefully selected for their purpose, and you should know what the purpose is to get into the BDD mindset.

Robert C. Martin has written a [great post](https://sites.google.com/site/unclebobconsultingllc/the-truth-about-bdd) about BDD's Given-When-Then concept where he thinks of them as a finite state machine.

### Given

`Given` steps are used to describe the initial context of the system---the *scene* of the scenario.
It is typically something that happened in the *past*.

When Cucumber executes a `Given` step, it will configure the system to be in a well-defined state,
such as creating and configuring objects or adding data to the test database.

The purpose of `Given`'s is to **put the system in a known state** before the user (or external system) starts interacting with the system (in the `When` steps).
Avoid talking about user interaction in `Given`'s. If you were creating use cases, `Given`'s would be your preconditions.

It's okay to have several `Given` steps (just use `And` or `But` for number 2 and upwards to make it more readable).

Examples:

- Create records (model instances) / set up the database state.
- It's okay to call into the layer "inside" the UI layer here (talking to the domain model).
- Log in a user (this is an exception to the no-interaction recommendation; things that "happened earlier" are okay).

{{% note "Rails users"%}}
We recommend using a [`Given` with a multiline table argument](https://github.com/aslakhellesoy/cucumber-rails-test/blob/master/features/manage_lorries.feature) to [set up records](https://github.com/aslakhellesoy/cucumber-rails-test/blob/master/features/step_definitions/lorry_steps.rb) instead of fixtures.
This way, you can read the Scenario and make sense out of it without having to look elsewhere (at the fixtures).
{{% /note %}}

### When

The purpose of `When`'s is to **describe the key action** the user performs (or, using Robert C. Martin's metaphor, the state transition).

`When` steps are used to describe an event, or an *action*. This can be a person interacting with the system, or it can be an event triggered by another system.

It's strongly recommended you only have a single `When` step per Scenario. If you feel compelled to add more, it's usually a sign that you should split the scenario up into multiple scenarios.

Examples:

- Interact with a web page (Selenium/Webrat/Watir *interaction* etc should mostly go into `When` steps).
- Interact with some other user interface element.
- Developing a library? Kicking off some kind of action that has an observable effect somewhere else.

### Then

The purpose of `Then`'s is to **observe outcomes**. The observations should be related to the business value/benefit in your feature description.

The observations should also be on some kind of *output*. That is, something that comes *out* of the system (report, user interface, message), and not something deeply buried inside it (that has no business value).

`Then` steps are used to describe an *expected* outcome, or result.

The [step definition](/cucumber/#step-definitions) of a `Then` step should use an *assertion* to
compare the *actual* outcome (what the system actually does) to the *expected* outcome
(what the step says the system is supposed to do).

Examples:

- Verify that something related to the `Given`+`When` is (or is not) in the output
- Check that some external system has received the expected message (was an email with specific content sent?)

While it might be tempting to implement `Then` steps to just look in the database - resist the temptation! You should only verify outcome that is observable for the user (or external system), and databases usually are not.

# `And`, `But`

If you have several `Given`s, `When`s, or `Then`s, you *could* write:

```gherkin
Scenario: Multiple Givens
Given one thing
Given another thing
Given yet another thing
When I open my eyes
Then I see something
Then I don't see something else
```

Or, you could make it read more fluidly by writing:

```gherkin
Scenario: Multiple Givens
  Given one thing
  And another thing
  And yet another thing
  When I open my eyes
  Then I see something
  But I don't see something else
```

If you find `Given`, `When`, `Then`, `And` and `But` too verbose, you can also use an additional keyword to start a step: `*`(**an asterisk**).
For example:
```Gherkin
Scenario: Attempt withdrawal using stolen card
  * I have $100 in my account
  * my card is invalid
  * I request $50
  * my card should not be returned
  * I should be told to contact the bank
```

Cucumber executes each step in a scenario, one at a time, in the sequence you’ve written them in.
When Cucumber tries to execute a step, it looks for a matching step definition to execute.

Keywords are not taken into account when looking for a match. This means you cannot have a
`Given`, `When`, `Then`, `And` or `But` step with the same text as another Step.

Cucumber considers the following steps duplicates:
```Gherkin
Given there is money in my account
Then there is money in my account
```

## Background

Occasionally you'll find yourself repeating the same `Given` steps in all of the scenarios in a feature.

Since it is repeated in every scenario, this is an indication that those steps
are not *essential* to describe the scenarios; they are *incidental details*. You can literally move such `Given` steps to the background, by grouping them under a `Background` section.

A `Background` allows you to add some context to the scenarios in the feature. It can contain one or more steps.
It is run before *each* scenario, but after any `Before` [hooks](/cucumber/#hooks). In your feature file, put the `Background` before the first scenario.

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

For a less explicit alternative to `Background`, check out [tagged hooks](/cucumber/#tagged-hooks).

**Good practices for using Background:**

- Don't use `Background` to set up **complicated state**, unless that state is actually something the client needs to know.

For example, if the user and site names don't matter to the client, use a higher-level step such as `Given that I am logged in as a site owner`.

- Keep your `Background` section **short**.

The client needs to actually remember this stuff when reading the scenarios. If the `Background` is more than 4 lines long, consider moving some of the irrelevant details into higher-level steps.

See [Calling steps from step definitions](/implementations/ruby/calling-steps-from-step-definitions/).

- Make your `Background` section **vivid**.

Use colorful names, and try to tell a story. The human brain keeps track of stories much better than it keeps track of names like `"User A"`, `"User B"`, `"Site 1"`, and so on.

- Keep your Scenarios **short**, and don't have too many.

If the `Background` section has scrolled off the screen, the reader no longer has a full overview of whats happening.
Think about using higher-level Steps, or splitting the `*.feature` file.

# Scenario Outlines

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

Scenario outlines allow us to more concisely express these examples through the use of a template with placeholders, using `Scenario Outline`, `Examples` with tables, and `< >`-delimited parameters:

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

The `Scenario Outline` steps provide a template which is never directly run. A `Scenario Outline` is run once for each row in the `Examples` section beneath it (not counting the first row).

The way this works is via placeholders. Placeholders must be contained within `< >` in the Scenario outline's steps.

For example:

```gherkin
Given <I'm a placeholder and I'm ok>
```

The placeholders indicate that when the `Examples` row is run, they should be substituted with real values from the `Examples` table. If a placeholder name is the same as a column title in the `Examples` table, that is the value that will replace it.

You can also use placeholders in [multiline step arguments](#step-arguments).

**IMPORTANT:** *Your step definitions will never have to match a placeholder. They will need to match the values that will _replace_ the placeholder.*

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

While scenario outlines help minimize redundancy, they aren't necessarily easier to read from a business or narrative perspective. Remember to choose `Examples` that illustrate something new about the feature.

One way to make sure that your `Examples` are contributing to the full picture of the feature is to break them into multiple tables. Whenever possible, include plain-text descriptions of the underlying rules, and break the `Examples` up to illustrate these rules.

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

In this feature, it isn't clear why certain passwords are valid or invalid.

By reformatting the `Examples` into two tables with descriptive text, the Scenario Outline becomes much more effective (p.75):

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

# Step Arguments

In some cases you might want to pass more data to a step than fits on a single line.
For this purpose Gherkin has `Doc Strings` and `Data Tables`:

## Doc Strings

`Doc Strings` are handy for passing a larger piece of text to a step definition. The syntax is inspired from Python's Docstring syntax.

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
In your step definition, there’s no need to find this text and match it in your pattern. It will automatically be passed as the last parameter in the step definition.

Indentation of the opening '"""' is unimportant, although common practice is two spaces in from the enclosing step.
The indentation inside the triple quotes, however, is significant. Each line of the `Doc String` will be de-indented according to the opening """. Indentation beyond the column of the opening """ will therefore be preserved.

## Data Tables

`Data Tables` are handy for passing a list of values to a step definition:

```gherkin
Given the following users exist:
  | name   | email              | twitter         |
  | Aslak  | aslak@cucumber.io  | @aslak_hellesoy |
  | Julien | julien@cucumber.io | @jbpros         |
  | Matt   | matt@cucumber.io   | @mattwynne      |
```
Just like `Doc Strings`, `Data Tables` will be passed to the step definition as the last argument.

The type of this argument will be DataTable. See the API docs for more details about how to access the rows and cells.

# Spoken Languages

Communication within a team always works better when people can use their spoken language. Cucumber supports over [60 spoken languages](https://github.com/cucumber/cucumber/blob/master/gherkin/gherkin-languages.json) and the number is steadily growing. This is Norwegian:

```gherkin
# language: no
Egenskap: Summering
  For å unngå at firmaet går konkurs
  Må regnskapsførerere bruke en regnemaskin for å legge sammen tall

  Scenario: to tall
    Gitt at jeg har tastet inn 5
    Og at jeg har tastet inn 7
    Når jeg summerer
    Så skal resultatet være 12

  Scenario: tre tall
    Gitt at jeg har tastet inn 5
    Og at jeg har tastet inn 7
    Og at jeg har tastet inn 1
    Når jeg summerer
    Så skal resultatet være 13
```

A `# language:` header on the first line of a Feature file tells Cucumber what spoken language to use - for example `# language: fr` for French. If you omit this header, Cucumber will default to English (`en`).

## Listing the available languages

```
cucumber --i18n help
```

## Listing the keywords of a particular language

For example Russian:

```
cucumber --i18n ru
```

## Adding a new language

It's easy!

- Make a [fork](https://help.github.com/articles/fork-a-repo/) of [Gherkin3](https://github.com/cucumber/gherkin3)
- Add your language's keywords to [gherkin-languages.json](https://github.com/cucumber/cucumber/blob/master/gherkin/gherkin-languages.json)
- Commit and push your changes - then send a [pull request](https://help.github.com/articles/using-pull-requests/).

That's it! When a new release of gherkin is made you can specify in a `# language: xx` header in your Feature files.

## Adding examples for a new language

The examples live in the Cucumber codebase.

Just copy the `examples/i18n/en` example to a new directory with the same name as the language you added. Then translate everything in there. When you're done you should be able to run `rake i18n` from the `examples/i18n` directory. If you want this code back into the official source you have to do those changes in your own cloned Git repo and send a pull request.

## Selecting a language from the command line

You can select a language from the command line using the `-L` or `--language` flag, followed by the two-letter language code. Run `cucumber --i18n help` to view the list of available languages and their two-letter codes.

## Gherkin Dialects

{{% gherkin-i18n-table %}}

