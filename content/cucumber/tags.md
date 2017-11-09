---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Tags
---

> TODO: Gherkin *and* Cucumber. This is mostly Cucumber

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

# Tag Inheritance

Any Tag that exists on a `Feature` will be inherited by `Scenario`, `Scenario Outline`, or `Examples`.

# Running a subset of Scenarios

You can use the `--tags` option to tell Cucumber that you only want to run Features or Scenarios that have (or don't have) certain Tags.

Examples:

```shell
cucumber --tags @billing            # Runs both Scenarios
cucumber --tags @important          # Runs the first Scenario
cucumber --tags ~@important         # Runs the second Scenario (Scenarios without @important)

cucumber --tags @billing --tags @important    # Runs the first Scenario (Scenarios with @important AND @billing)
cucumber --tags @billing,@important           # Runs both Scenarios (Scenarios with @important OR @billing)
```

(Another way to "filter" what you want to run is to use the `file.feature:line` pattern or the `--scenario` option as described in [Running Features](/cucumber/running-features/)).

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

Tags are also used in Tagged [Hooks](/cucumber/hooks/), which allow you to use Tags to define `Before` and/or `After` blocks to run for marked Scenarios.

# Logically `AND`-ing and `OR`-ing Tags

As you may have seen in the previous examples, Cucumber allows you to use logical ANDs and ORs to help gain greater control of which Features to run.

Tags which are comma-separated are ORed:

Example: Running Scenarios which match `important OR billing`

```shell
cucumber --tags @billing,@important
```

Tags which are passed in separate `--tags` are ANDed

Example: Running Scenarios which match `important AND billing`

```shell
cucumber --tags @billing --tags @important
```

You can combine these two methods to create powerful selection criteria:

Example: Running Scenarios which match: `(billing OR WIP) AND important`

```shell
cucumber --tags @billing,@wip --tags @important
```

Example: Skipping both `todo AND wip` tags

```shell
cucumber --tags ~@todo --tags ~@wip
```

You can use this Tag logic in your [Hooks](/cucumber/hooks/) as well.

*This feature was originally added in version 0.4.3.*
*The logical behaviour of Tags was later reversed in version 0.6.0.*

# Overriding the Tag filters from a profile

It is not currently possible to override the Tag filters from a profile.

The default profile, for example, includes a `--tags ~@wip` filter. But what if you want to use everything from the default profile *except* the `--tags ~@wip` portion?

You might think you could just append something like this to the command line to "undo" the `--tags` from the profile: `--tags @wip,~@wip` (anything either **tagged** with `wip` or *not* tagged with `wip`).

But because that is effectively doing an "and" between `--tags ~@wip` and`--tags @wip,~@wip`, it doesn't match any Scenarios.

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
