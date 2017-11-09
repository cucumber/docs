---
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Tags
description: Grouping Scenarios
---

Tags are a great way to organise your Features and Scenarios. Consider this example:

```gherkin
@billing
Feature: Verify billing

  @important
  Scenario: Missing product description
    Given hello

  Scenario: Several products
    Given hello
```

A Scenario or Feature can have as many Tags as you like. Just separate them with spaces:

```gherkin
@billing @bicker @annoy
Feature: Verify billing
```

Reasons for tagging scenarios:

* [**Filtering**](#running-a-subset-of-scenarios): Cucumber allows you to use tags as a filter to pick out specific scenarios to run or report on. You can even have Cucumber fail your test run if a certain tag appears too many times.
* [**Hooks**](#hooks): Run a block of code whenever a scenario with a particular tag is about to start or has just finished.
* [**Documentation**](#documentation): You simply want to use a tag to attach a label to certain scenarios, for example to label them with an ID from a project or requirement management tool.

# Running a subset of Scenarios

You can use the `--tags` option to tell Cucumber that you only want to run Features or Scenarios that have (or don't have) certain Tags.

Examples:

```gherkin
@important
Feature: Calculate insurance prices
```

See [Tag Expressions](#tag-expressions) for more details on how to use tags.
Cucumber can also enforce [Tag Limits](#tag-limits-and-wip).

(Another way to "filter" what you want to run is to use the `file.feature:line` pattern or the `--scenario` option as described in [Running Features](/cucumber/running-features/)).

# Hooks
Tags are also used in [Tagged Hooks](/cucumber/hooks/#tagged-hooks), which allow you to use Tags to define Before and/or After blocks to run for marked Scenarios.

# Documentation

Tags are also a great way to "link" your Cucumber Features to other documents. For example, if you have to deal with old school requirements in a different system (Word, Excel, a wiki) you can refer to numbers:

```gherkin
@BJ-x98.77 @BJ-z12.33
Feature: Convert transaction
```

Another creative way to use Tags is to keep track of where in the development process a certain Feature is:

```gherkin
@qa_ready
Feature: Index projects
```

# Tag Inheritance

Any Tag that exists on a `Feature` will be inherited by `Scenario`, `Scenario Outline`, or `Examples`.

# Tag expressions

Tag Expressions provide a simple query language for tags. The simplest tag expression is
simply a single tag, for example:

    @smoke

A slightly more elaborate expression may combine tags, for example:

    @smoke and not @ui

Tag Expressions are used for two purposes:

1. Run a subset of scenarios (using the `--tags expression` option of the command line)
2. Specify that a hook should only run for a subset of scenarios (using [Tagged Hooks](/cucumber/hooks/#tagged-hooks))

Tag Expressions are [boolean expressions](https://en.wikipedia.org/wiki/Boolean_expression)
of tags with the logical operators `and`, `or` and `not`.

For more complex Tag Expressions you can use parenthesis for clarity, or to change operator precedence:

    (@smoke or @ui) and (not @slow)

As you may have seen in the previous examples, Cucumber allows you to use logical ANDs and ORs to help gain greater control of which Features to run.

Example: Running Scenarios which match `billing OR important`

```shell
cucumber --tags '@billing or @important'
```

Example: Running Scenarios which match `billing AND important`

```shell
cucumber --tags @billing --tags @important
```

You can combine these two methods to create powerful selection criteria:

Example: Running Scenarios which match: `(billing OR WIP) AND important`

```shell
cucumber --tags '@billing or @wip' --tags @important
```

Example: Skipping both `todo AND wip` tags

```shell
cucumber --tags 'not @todo' --tags 'not @wip'
```

You can use this Tag logic in your [Hooks](/cucumber/hooks/) as well.

<!--- *This feature was originally added in version 0.4.3.*
*The logical behaviour of Tags was later reversed in version 0.6.0.* --->

An overview of different options:
```shell
cucumber --tags @billing            # Runs both Scenarios
cucumber --tags @important          # Runs the first Scenario
cucumber --tags 'not @important'    # Runs the second Scenario (Scenarios without @important)
cucumber --tags ~@important         # Deprecated; use cucumber --tags 'not @important' instead

cucumber --tags @billing --tags @important    # Runs the first Scenario (Scenarios with @important AND @billing)
cucumber --tags '@billing or @important'      # Runs both Scenarios (Scenarios with @important OR @billing)
cucumber --tags @billing,@important           # Deprecated; use cucumber --tags '@billing or @important' instead

cucumber --tags 'not @foo and (@bar or @zap)' # Runs Scenarios marked with @bar or @ zap, but not with @foo
cucumber --tags ~@foo --tags @bar,@zap        # Deprecated; use cucumber --tags 'not @foo and (@bar or @zap)' instead
```

(The [standard library](https://github.com/cucumber/cucumber/blob/master/docs/standard-library.adoc#implementations) list indicates
what Cucumber implementations currently support Tag Expressions).

# Overriding the Tag filters from a profile

It is not currently possible to override the Tag filters from a profile.

The default profile, for example, includes a `--tags 'not @wip'` filter. But what if you want to use everything from the default profile *except* the `--tags 'not @wip'` portion?

You might think you could just append something like this to the command line to "undo" the `--tags` from the profile: `--tags '@wip or not @wip'` (anything either **tagged** with `wip` or *not* tagged with `wip`).

But because that is effectively doing an "and" between `--tags 'not @wip'` and`--tags @wip --tags 'not @wip'`, it doesn't match any Scenarios.

How can we override the Tag filter then?

# Tag limits and WIP

If you're following Kanban principles, you want to limit the work in progress (WIP). The idea is, the fewer Features or Scenarios that are being worked on simultaneously, the quicker you'll be able to implement new Features.

Cucumber can enforce this using *Tag limits*.

Here is an example:

```shell
cucumber --tags @dev:2,@qa:3
```

This will make Cucumber fail if you have more than 2 `dev` Tags or more than 3 `qa` Tags, even if each of your Scenarios pass individually.

Used in conjunction with the `--wip` switch, you can set up a project to enforce the WIP limits of your team.

# Special Tags

**@allow-rescue**: Turns off Cucumber’s exception capturing for the tagged Scenario(s). Used when the code being tested is expected to raise and handle exceptions.

**@javascript**: Uses a Javascript-aware system to process web requests (e.g., Selenium) instead of the default (non-Javascript-aware) webrat browser.

**@no-txn**: Turns off transactions. See [Browsers and Transactions](/implementations/ruby/browsers-and-transactions/).
