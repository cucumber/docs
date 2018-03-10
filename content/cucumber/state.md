---
menu: reference
nav: docs
renderer: Cucumber::Website::Reference
title: State
polyglot: false
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

## Dependency Injection in Java
If your programming language is Java you will be writing glue code
([Step Definitions](/cucumber/#step-definitions) and [Hooks](/cucumber/#hooks)) in plain old Java classes.

Cucumber will create a new instance of each of your glue code classes before each Scenario.

If all of your glue code classes have an empty constructor, you don’t need anything else.
However, most projects will benefit from a Dependency Injection module to organize your code better and to share state between Step Definitions.

The available Dependency Injection modules are:

- [PicoContainer](#picocontainer) (The recommended one if your application doesn't use another DI container)
- [Spring](#spring)
- [Guice](#guice)
- [OpenEJB](#openejb)
- [Weld](#weld)
- [Needle](#needle)

### PicoContainer

To use PicoContainer, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/picocontainer).
For more information, please see [sharing state using Picocontainer](http://www.thinkcode.se/blog/2017/04/01/sharing-state-between-steps-in-cucumberjvm-using-picocontainer).

### Spring

To use Spring, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-spring</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/spring).
For more information, please see [sharing state using Spring](http://www.thinkcode.se/blog/2017/06/24/sharing-state-between-steps-in-cucumberjvm-using-spring).

### Guice

To use Guice, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-guice</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/guice).
For more information, please see [sharing state using Guice](http://www.thinkcode.se/blog/2017/08/16/sharing-state-between-steps-in-cucumberjvm-using-guice).

### OpenEJB

To use OpenEJB, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-openejb</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/openejb).

### Weld

To use Weld, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-weld</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/weld).

### Needle

To use Needle, add the following dependency:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-needle</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/needle).

# Databases

## The Before Hook Approach

The recommended approach to clean a database between Scenarios is to use a
`Before`[Hook](/cucumber/#hooks) to remove all data *before* a Scenario starts.

This is usually better than using an `After`[Hook](/cucumber/#hooks), as it allows
you to perform a post-mortem inspection of the database if a Scenario fails.

An alternative approach is to use database transactions.

## The Database Transaction Approach

You can wrap a transaction (if your database supports it) *around* each Scenario.

(This might lead to faster Scenarios, but it comes at a cost.
You won't be able to perform a post-mortem, and you won't be able to
use [Browser Automation](/browser-automation/)).

You simply tell Cucumber to start a transaction in a `Before`[Hook](/cucumber/#hooks), and later
roll it back in an `After`[Hook](/cucumber/#hooks).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[Tagged Hooks](/cucumber/#tagged-hooks) using a Tag named `@txn`.

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

### With JUnit and Spring

The [`cucumber-spring`](#dependency-injection-in-java) module contains `@txn` Hooks in the `cucumber.api.spring` package.

This package isn't on your glue path by default, so you have to add it yourself in your
Configuration Options.

```java
@RunWith(Cucumber.class)
@CucumberOptions(glue = {"your.own.glue.code", "cucumber.api.spring"})
public class RunCukesTest {
}
```

See the [`spring-txn`](https://github.com/cucumber/cucumber-jvm/tree/master/examples/spring-txn) example in Cucumber-JVM for a minimal setup.

# Browsers, beware

If you're using a [Browser Automation](/browser-automation/) tool that talks to your application over HTTP the transactional approach
will not work if your [Step Definitions](/cucumber/#step-definitions) and the web application serving HTTP request each have their own database connection.

If this is the case you should use the brute-force approach where the data is explicitly deleted before each Scenario.
