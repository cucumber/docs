---
menu: reference
nav: docs
renderer: Cucumber::Website::Reference
title: State
polyglot: true
---

It's important to prevent state created by one Scenario from leaking into others.
Leaking state makes your Scenarios brittle, and difficult to run in isolation.

* Avoid using global or static variables.

* Make sure you clean your database between Scenarios.

# Sharing state between steps

It's possible to store object state in variables inside your Step Definitions.

{{% note "Be careful with state"%}}
State can make your steps more tightly coupled and harder to reuse.
{{% /note %}}

<!--- You can follow a longer discussion [here](http://www.mail-archive.com/rspec-users@rubyforge.org/msg06268.html).
TODO: summarize relevant information from this thread? --->

{{% text "java" %}}You might also want to have a look at [dependency injection](/implementations/jvm/java-di).{{% /text %}}

# Databases

## The Before Hook Approach

The recommended approach to clean a database between Scenarios is to use a
`Before`[Hook](/hooks/) to remove all data *before* a Scenario starts.

This is usually better than using an `After`[Hook](/hooks/), as it allows
you to perform a post-mortem inspection of the database if a Scenario fails.

An alternative approach is to use database transactions.

## The Database Transaction Approach

You can wrap a transaction (if your database supports it) *around* each Scenario.

(This might lead to faster Scenarios, but it comes at a cost.
You won't be able to perform a post-mortem, and you won't be able to
use [browser automation](/browser-automation/)).

You simply tell Cucumber to start a transaction in a `Before`[Hook](/hooks/), and later
roll it back in an `After`[Hook](/hooks/).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[Tagged Hooks](/hooks/#tagged-hooks) using a Tag named `@txn`.

To enable it, you must tag every [Feature](/gherkin/#feature) or [Scenario](/gherkin/#scenario) that requires
transactions with `@txn`:

```gherkin
@txn
Feature: Let's write a lot of stuff to the DB

  Scenario: I clean up after myself
    Given I write to the DB

  Scenario: And so do I!
    Given I write to the DB
```

{{% block "java" %}}
## Using JUnit and Spring

The [`cucumber-spring`](/implementations/jvm/java-di/#spring) module contains `@txn` Hooks in the `cucumber.api.spring` package.

This package isn't on your glue path by default, so you have to add it yourself in your
Configuration Options.

```java
@RunWith(Cucumber.class)
@CucumberOptions(glue = {"your.own.glue.code", "cucumber.api.spring"})
public class RunCukesTest {
}
```

See the [`spring-txn`](https://github.com/cucumber/cucumber-jvm/tree/master/examples/spring-txn) example in Cucumber-JVM for a minimal setup.
{{% /block %}}
## Browsers, beware

If you're using a [Browser Automation](/browser-automation/) tool that talks to your application over HTTP the transactional approach
will not work if your [Step Definitions](/step-definitions/) and the web application serving HTTP request each have their own database connection.

If this is the case you should use the brute-force approach where the data is explicitly deleted before each Scenario.
