---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Tags
---

Tags are a great way to organise your features and scenarios. Consider this example:

\`\`\`gherkin
@billing
Feature: Verify billing

@important
Scenario: Missing product description

Scenario: Several products
\`\`\`

A Scenario or feature can have as many tags as you like. Just separate them with spaces:

\`\`\`gherkin
`billing`bicker @annoy
Feature: Verify billing
\`\`\`

## Tag Inheritance

Any tag that exists on a <code>Feature</code> will be inherited by <code>Scenario</code>, <code>Scenario Outline</code> or <code>Examples</code>.

## Running a subset of scenarios

You can use the <code>--tags</code> option to tell Cucumber that you only want to run features or scenarios that have (or don't have) certain tags. Examples:

```
cucumber --tags @billing            # Runs both scenarios
cucumber --tags @important          # Runs the first scenario
cucumber --tags ~@important         # Runs the second scenario (Scenarios without @important)

cucumber --tags @billing --tags @important    # Runs the first scenario (Scenarios with @important AND @billing)
cucumber --tags @billing,@important           # Runs both scenarios (Scenarios with @important OR @billing)
```

(Another way to "filter" what you want to run is to use the <code>file.feature:line</code> pattern or the <code>--scenario</code> option as described in [[Running Features]]).

Tags are also a great way to "link" your Cucumber features to other documents. For example, if you have to deal with old school requirements in a different system (Word, Excel, a wiki) you can refer to numbers:

\`\`\`gherkin
`BJ-x98.77`BJ-z12.33
Feature: Convert transaction
\`\`\`

Another creative way to use tags is to keep track of where in the development process a certain feature is:

\`\`\`gherkin
@qa_ready
Feature: Index projects
\`\`\`

Tags are also used in Tagged [[Hooks]], which let you use tags to define what <code>Before</code> and <code>After</code> blocks get run for what scenarios.

## Logically ANDing and ORing Tags

As you may have seen in the previous examples Cucumber allows you to use logical ANDs and ORs to help gain greater control of what features to run.

Tags which are comma separated are ORed:

Example: Running scenarios which match `important OR`billing

```
<code>cucumber --tags @billing,@important</code>
```

Tags which are passed in separate --tags are ANDed

Example: Running scenarios which match `important AND`billing

```
<code>cucumber --tags @billing --tags @important</code>
```

You can combine these two methods to create powerful selection criteria:

Example: Running scenarios which match: (`billing OR`WIP) AND @important

```
<code>cucumber --tags @billing,@wip --tags @important</code>
```

Example: Skipping both `todo and`wip tags

```
<code>cucumber --tags ~@todo --tags ~@wip</code>
```

You can use this tag logic in your [[Hooks]] as well.

*This feature was originally added in version 0.4.3. The logical behaviour of tags was later reversed in version 0.6.0.*

## Overriding the tag filters from a profile

It is currently not possible to override the tag filters from a profile.

The default profile, for example, includes a &lt;code>--tags ~@wip&lt;/code> filter. But what if you want to use everything from the default profile *except* the &lt;code>--tags ~@wip&lt;/code> portion?

You might think you could just append something like this to the command line to "undo" the <code>--tags</code> from the profile: &lt;code>--tags @wip,~@wip&lt;/code> (anything either **tagged** with `wip or *not* tagged with`wip)

But because that is effectively doing an "and" between &lt;code>--tags ~@wip&lt;/code> and &lt;code>--tags @wip,~@wip&lt;/code>, it doesn't match any scenarios.

How can we override the tag filter then?

## Tag limits and WIP

If you're following Kanban principles, you want to limit the work in progress (WIP). The idea is that the fewer features or scenarios that being worked on simultaneously, the quicker you'll be able to implement new features.

Cucumber can enforce this using tag limits. Here is an example:

```
cucumber --tags @dev:2,@qa:3
```

This will make cucumber fail if you have more than 2 <code>`dev</code> tags or more than 3 <code>`qa</code> tags, even if each of your scenarios pass individually.

Used in conjunction with the <code>--wip</code> switch you can set up your project to enforce the WIP limits of your team.

## Special Tags

**@allow-rescue**: Turns off Cucumber’s exception capturing for the tagged scenario(s). Used when the code being tested is expected to raise and handle exceptions.

**@javascript**: Uses a javascript-aware system to process web requests (e.g., Selenium) instead of the default (non-javascript-aware) webrat browser.

**@no-txn**: Turns off transactions. See [[Browsers and Transactions]].
