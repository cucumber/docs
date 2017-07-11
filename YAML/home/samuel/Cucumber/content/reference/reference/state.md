---
menu: reference
nav: docs
renderer: Cucumber::Website::Reference
title: State
---

# State

It's important to prevent state created by one scenario to leak into the next.
Leaking state makes your scenarios brittle and very difficult to run in isolation.

Avoid using global or static variables.

Make sure you clean your database between scenarios.

## Databases

The recommended approach to clean a database between scenarios is to use a
[Before Hook](/docs/reference#before) to remove all data *before* a scenario starts.

This is usually better than using an [After Hook](/docs/reference#after) as it allows
you to perform a post-mortem inspection of the database in case a scenario fails.

An alternative approach is to use database transactions.

## Transactions

You can wrap a transaction (if your database supports it) _around_ each Scenario.

(This might lead to faster scenarios, but it comes at a cost. You won't be able
to perform a post-mortem, and you won't be able to use [browser automation](#browsers-beware)).

You simply tell Cucumber to start a transaction in a [Before Hook](/docs/reference#before) and roll it back
in an [After Hook](/docs/reference#after).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[Tagged Hooks](/docs/reference#tagged-hooks) using a tag named `@txn`.

To enable it you have to tag every [Feature](/docs/reference#feature) or [Scenario](/docs/reference#scenario)
that needs transactions with `@txn`:

```gherkin
@txn
Feature: Let's write a lot of stuff to the DB

  Scenario: I clean up after myself
    Given I write to the DB

  Scenario: And so do I!
    Given I write to the DB
```

### Using JUnit and Spring

The [cucumber-spring](/docs/reference/java-di#spring) module contains `@txn` hooks in the `cucumber.api.spring` package.

This package isn't on your [glue path](/docs/reference/jvm#glue-path) by default, so you have to add it yourself in your
[Configuration Options](/docs/reference/jvm#configuration).

```java
@RunWith(Cucumber.class)
@CucumberOptions(glue = {"your.own.glue.code", "cucumber.api.spring"})
public class RunCukesTest {
}
```

See the [spring-txn](https://github.com/cucumber/cucumber-jvm/tree/master/examples/spring-txn) example in Cucumber-JVM for a minimal setup.

### Browsers, beware

If you're using a [Browser Automation](/docs/reference/browser-automation) tool that talks to your application over HTTP the transactional approach
will not work if your [Step Definitions](/docs/reference#step-definitions) and the web application serving HTTP request each have their own database connection.

If this is the case you should use the brute-force approach where the data is explicitly deleted before each scenario.
