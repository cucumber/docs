---
title: FAQ
subtitle: "Frequently Asked Questions"
polyglot:
 - java
 - javascript
 - ruby
 - kotlin
weight: 50
---

# Getting started and help

## How do I get started with Cucumber?
To get started from scratch, try the [10-minute tutorial](/docs/guides/10-minute-tutorial).
{{% block "java" %}}
If you'd prefer to get started with a working project (or if you are having trouble getting the tutorial to work),
you can get started with the [cucumber-java-skeleton](https://github.com/cucumber/cucumber-java-skeleton). This project is designed to work "out of the box".
{{% /block %}}

You can read these docs to learn more about [Gherkin](/docs/gherkin/reference), [Cucumber](/docs/cucumber/api) and [BDD](/docs/bdd).
There are also links to several [blog posts](/docs/community/blog-posts) about Cucumber and BDD.

## Where can I get more in depth information?
If you'd like to go more in depth, try one of the following:

- [Books](/docs/professional/books) 

- [Cucumber School (online training)](/docs/professional/school)

- [BDD Kickstart (classroom training)](/docs/professional/training)

## Where can I get help?
For questions, you can [get in touch](/docs/community/get-in-touch) with the community.

# Installing and running Cucumber

## How do I install Cucumber?
How to install Cucumber, depends on which programming language you are using.

You can find information on how to install your flavour of Cucumber on the [installation](/docs/installation) page.

## Which version of Cucumber should I use?
In general, it is recommended to use the most recently released version of Cucumber for your programming language.
Each release will fix known bugs and/or add new features.

You can find the most recent version of Cucumber either in the [10-minute tutorial](//docsguides/10-minute-tutorial), the [installation](/docs/installation) page or on [GitHub](https://github.com/cucumber).
{{% block "java" %}}
Note that with Cucumber-JVM v2.x, the `groupId` has changed from `info.cukes` to `io.cucumber`.
If you cannot find a version newer than 1.2.5, change the groupId in your dependencies.
{{% /block %}}

## Upgrading
Cucumber tries to follow the [SemVer](http://semver.org/) specification for release numbers. Essentially, that means that:

* If only the right-hand (patch) number in the release changes, you don't need to worry.
* If the middle number (minor) number in the release changes, you don't need to worry.
* If the left-hand (major) number changes, you can expect that things might break.

{{% block "javascript" %}}
You can read the [changelog file](https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md) to learn about the changes in every release.
{{% /block %}}
{{% block "ruby" %}}
You can read the [changelog file](https://github.com/cucumber/cucumber-ruby/blob/master/CHANGELOG.md) to learn about the changes in every release.
{{% /block %}}
{{% block "java,kotlin" %}}
You can read the [changelog file](https://github.com/cucumber/cucumber-jvm/blob/master/CHANGELOG.md) to learn about the changes in every release.
{{% /block %}}

## How do I run Cucumber?
For information on how to run Cucumber, see [Running Cucumber](/docs/cucumber/api/#running-cucumber).

## What are the configuration options for running Cucumber?
For information about configuration options, see [Configuration](/docs/cucumber/configuration/).

{{% block "java,kotlin" %}}
When running Cucumber with JUnit, you can specify several options on how JUnit should run your tests.
Check the section on [JUnit](https://docs.cucumber.io/cucumber/api/#junit) for more information.

For more details about the available CucumberOptions, check the [code](https://github.com/cucumber/cucumber-jvm/blob/master/core/src/test/java/io/cucumber/core/options/CucumberOptions.java).
{{% /block %}}

## Cucumber says my steps are undefined, but I have implemented step definitions!
If Cucumber is telling you that your steps are undefined, when you have defined step definitions, this means that Cucumber cannot *find* your step definitions.
You'll need to make sure to specify the path to your step definitions (glue path) correctly.

{{% block "java,kotlin" %}}
By default Cucumber-JVM will search in the package (or sub-packages) of the runner class.
You can also tell Cucumber-JVM explicitly which packages (and sub-packages) to search, with:
 ```java
 @CucumberOptions(glue = {"<package>", "<package>", "<etc>"})
 public class RunCucumberTest{}
```
 ```kotlin
 @CucumberOptions(glue = ["<package>", "<package>", "<etc>"])
 class RunCucumberTest
```
{{% /block %}}

## Cucumber expressions vs regex
For more information about Cucumber expressions, see the section on [Cucumber expressions](/docs/cucumber/cucumber-expressions/).
You can still use regular expression (regex) also, but you cannot use Cucumber expressions and regular expressions in the same step definition.

{{% block "java,kotlin" %}}
Cucumber expressions were added in Cucumber-JVM version 3.0.0.

Note that a step definition using regex will start with `^` and end with `$`, while a step definition using Cucumber expressions will not.

An example using regex:
```java
    @Given("^today is ([0-9]{4}-[0-9]{2}-[0-9]{2})$")
    public void today_is(Date date) {
        calculator = new DateCalculator(date);
    }
```

An example using Cucumber expressions:
```java
    @When("I add {int} and {int}")
    public void adding(int arg1, int arg2) {
        calc.push(arg1);
        calc.push(arg2);
        calc.push("+");
    }
```
{{% /block %}}

## How do I use lambdas to define step definitions?
{{% block "ruby,javascript" %}}
Lambdas are specific to Java and Kotlin.
{{% /block %}}

{{% block "java,kotlin" %}}
To use lambdas to define your step definitions, make sure to use the `cucumber-java8` dependency, instead of the `cucumber-java` dependency.
You can find the required dependencies [here](https://docs.cucumber.io/installation/java/).
{{% /block %}}

{{% block "java" %}}
For an example on how to use them, see this [code example](https://github.com/cucumber/cucumber-jvm/blob/master/examples/java8-calculator/src/test/java/io/cucumber/examples/java8/RpnCalculatorSteps.java).
{{% /block %}}

{{% block "kotlin" %}}
For an example on how to use them, see this [code example](https://github.com/cucumber/cucumber-jvm/blob/master/kotlin-java8/src/test/kotlin/cucumber/runtime/kotlin/test/LambdaStepdefs.kt).
{{% /block %}}

## How do I call other steps or scenarios?
Each scenario should be *independent*; you should be able to run them in any order or in parallel without one scenario interfering with another.

Each scenario should *test exactly one thing* so that when it fails, it fails for a clear reason. This means you wouldn't reuse one scenario inside another scenario.

If your scenarios use the same or similar steps, or perform similar actions on your system, you can extract [helper methods](#how-to-use-helper-methods) to do those things.

### How to use helper methods
Helper methods allow you to re(use) actions in steps and avoid writing multiple step definitions for similar behaviours. You write a helper method for actions like *logging in to your application* and then reuse them as a step or part of other steps.
This helps keep your tests clean, concise and maintainable.

To learn more about using helper methods, check out [Helper methods](/docs/gherkin/step-organization/#helper-methods) and [Grouping step definitions](/docs/gherkin/step-organization/#grouping-step-definitions). 

## How detailed should my scenarios be?
Your scenarios should contain *just enough* information to describe the *behaviour* of the system.
They should not describe the implementation of your application, as that might change - causing your tests to fail.
They shouldn't contain too many details, as this will distract from the actual *behaviour*.

Let's illustrate this with an example.
Imagine we have a process where the user will be notified of the result.
At the moment that might be implemented as sending them an email, but that might change in the future (for instance, to a text message).
You can specify the step as follows:
```gherkin
Then the user will be notified
```
This way, if the implementation of how the user is notified changes, you will only have to change the step definition (or the helper method called by that step definition),
rather than the step itself **and** all underlying code.

For more information, have a look at [Writing better Gherkin](/docs/bdd/better-gherkin/) and/or [Writing maintainable automated acceptance tests (pdf).](http://dhemery.com/pdf/writing_maintainable_automated_acceptance_tests.pdf)

## How can I specify my test cases in Excel / csv?
We advise you *not* to use Excel or csv files to define your test cases; using Excel or csv files is considered an anti-pattern.

One of the goals of Cucumber is to have *executable specifications*. This means your feature files should contain just the right level of information to document the expected behaviour of the system.
If your test cases are kept in separate files, how would you be able to read the documentation?

This also means you shouldn't have too many details in your feature file. If you do, you might consider moving them to your step definitions or [helper methods](#how-to-use-helper-methods).
For instance, if you have a form where you need to populate lots of different fields, you might use the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to do so.

## How can I make Cucumber conditionally skip steps
Each scenario should test *one thing* and fail for one particular reason. This means there should be no reason to skip steps.

If there does seem to be a reason you'd want to skip steps conditionally, you probably have an anti-pattern.
For instance, you might be trying to test multiple things in one scenario or you might not be in control of the state of your test environment or test data.

The best thing to do here is to fix the root cause.

## How can I make Cucumber run the skipped steps after a failed step
Cucumber skips all steps after a failed step by design. Once a step has failed, the test has failed and there should be no reason to perform the next steps.
If you have a need to run the additional steps, likely your scenario is testing too many different things at once. Consider splitting your scenario into smaller tests.

## Taking a screenshot after (failed) steps
Taking a screenshot when a scenario fails, might help you to figure out what went wrong.
To take a screenshot on failure, you can configure an [after hook](/docs/cucumber/api/#after).

For an [example](/docs/guides/browser-automation/#screenshot-on-failure) on how to use take a screenshot
with {{% text "java,javascript,kotlin" %}}[WebDriver](http://www.seleniumhq.org/projects/webdriver/){{% /text %}}{{% text "ruby" %}}[Capybara](https://github.com/teamcapybara/capybara){{% /text %}} for failed scenarios and embed them in Cucumber's report, see the [browser automation](/docs/guides/browser-automation) page.

{{% block "java,javascript,kotlin" %}}
Below is an example of how to take a screenshot with
[WebDriver](http://www.seleniumhq.org/projects/webdriver/)
Below is an example of how to take a screenshot with
for failed scenarios and embed them in Cucumber's report.
{{% /block %}}

Note that taking a screenshot after *every step* is considered an anti-pattern.
You should be able to rely on your test automation, without having to check every step of your scenario with a screenshot.
Your automation should be stable and tests should fail for a clear reason.

## Getting weird characters in the console output
If you are getting some weird additional characters in the output of your steps, like `[32m`, this is a problem with escaping ANSI color codes.
{{% block "ruby,javascript" %}}
This is a problem that may occur when using Java.
{{% /block %}}

{{% block "java,kotlin" %}}
In order to prevent this problem, you can set the option `monochrome` to `true.

If you are using Eclipse, you might try this [plugin](https://marketplace.eclipse.org/content/ansi-escape-console).
{{% /block %}}

# How do I share state between steps?
{{% block "ruby,javascript" %}}
In order to share state between steps, you can use a [world object](/docs/cucumber/state/#world-object).
{{% /block %}}

{{% block "java,kotlin" %}}
If you are using Cucumber on the JVM, you can use [dependency injection (DI)](/docs/cucumber/state/#dependency-injection) to share state between steps.

If your project already uses a dependency framework supported by Cucumber (and/or you are familiar with one of them), it's probably easiest to use that framework. 
Otherwise, Picocontainer is the most light weight framework you can use.
{{% /block %}}

# Arity Mismatch
An arity mismatch exception{{% text "java,kotlin" %}} `cucumber.runtime.CucumberException: Arity mismatch`{{% /text %}} indicates that the step does not provide the right number of arguments needed for the step definition.
