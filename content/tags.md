---
source: https://github.com/cucumber/cucumber/wiki/Tags/
title: Tags
description: Grouping Scenarios
polyglot: true
---

Tags are a great way to organise your features and scenarios. Consider this example:

```gherkin
@billing
Feature: Verify billing

  @important
  Scenario: Missing product description
    Given hello

  Scenario: Several products
    Given hello
```

A feature or scenario or can have as many tags as you like. Just separate them with spaces:

```gherkin
@billing @bicker @annoy
Feature: Verify billing
```

Tags can be placed above the following Gherkin elements:

* `Feature` 
* `Scenario`
* `Scenario Outline`
* `Examples`

It is *not* possible to place tags above `Background` or steps (`Given`, `When`, `Then`, `And` and `But`).

# Tag Inheritance

Tags are inherited by child elements.

Tags that are placed above a `Feature` will be inherited by `Scenario`, `Scenario Outline`, or `Examples`.

Tags that are placed above a `Scenario Outline` will be inherited by `Examples`.

# Tag expressions

Tag expressions provide a simple query language to select scenarios based on 
[boolean expressions](https://en.wikipedia.org/wiki/Boolean_expression).

Tag expressions are used for two different purposes: 

* [Running a subset of scenarios](#running-a-subset-of-scenarios)
* [Scoping hooks to a subset of scenarios](/cucumber/hooks#tagged-hooks)

The simplest possible tag expression is simply a tag, for example:

```shell
@wip
```

You can combine tags to form more advanced expressions using boolean logic:

```shell
@wip and not @slow
@smoke and @fast
@gui or @database
@gui and @database
```

For even more advanced tag expressions you can use parenthesis for clarity, or 
to change operator precedence:

```shell
(@smoke or @ui) and (not @slow)
```

## Running a subset of scenarios

You can tell Cucumber to only run scenarios with a particular tag:

{{% block "java" %}}
Using a Java system property:

```shell
mvn test -Dcucumber.options='--tags "@smoke and @fast"'
```

Or an environment variable:

```shell
# Linux / OS X:
CUCUMBER_OPTIONS='--tags "@smoke and @fast"' mvn test

# Windows:
set CUCUMBER_OPTIONS='--tags "@smoke and @fast"'
mvn test
```

Or changing your JUnit runner class:

```java
@Cucumber.Options(tags = "@smoke and @fast")
public class RunCucumberTest {}
```

{{% /block %}}

{{% block "javascript" %}}
```shell
# You can omit the quotes if the expression is a single tag
./node_modules/.bin/cucumber.js --tags "@smoke and @fast"
```
{{% /block %}}

{{% block "ruby" %}}
```shell
# You can omit the quotes if the expression is a single tag
cucumber --tags "@smoke and @fast"
```
{{% /block %}}

<p></p>

{{% tip %}}
Another way to run a subset of scenarios is to use the `file.feature:line` pattern or the `--scenario` option as described in [Running Features](/cucumber/running-features/).
{{% /tip %}}

# Using tags for documentation

Your imagination is the only limitation when it comes to using tags for documentation.

## Link to other documents

Tags can refer to IDs in external systems such as requirement management tools, issue trackers or
test management tools:

```gherkin
@BJ-x98.77 @BJ-z12.33
Feature: Convert transaction
```

You can use a custom Cucumber reporting plugin that will turn tags into links pointing to
documents in your external tool.

## Development process

Another creative way to use Tags is to keep track of where in the development process a certain Feature is:

```gherkin
@qa_ready
Feature: Index projects
```

