---
menu: reference
nav: docs
renderer: Cucumber::Website::Reference
title: State
polyglot: false
---

It's important to prevent state created by one scenario from leaking into others.
Leaking state makes your scenarios brittle, and difficult to run in isolation.

* Avoid using global or static variables.

* Make sure you clean your database between scenarios.

# Sharing state between steps

It's possible to store object state in variables inside your step definitions.

{{% note "Be careful with state"%}}
State can make your steps more tightly coupled and harder to reuse.
{{% /note %}}

## Dependency Injection in Java
If your programming language is Java, you will be writing glue code
([step definitions](/cucumber/#step-definitions) and [hooks](/cucumber/#hooks)) in plain old Java classes.

Cucumber will create a new instance of each of your glue code classes before each scenario.

If all of your glue code classes have an empty constructor, you don’t need anything else.
However, most projects will benefit from a dependency injection (DI) module to organize your code better and to share state between step definitions.

The available dependency injection modules are:

- [PicoContainer](#picocontainer) (The recommended one if your application doesn't use another DI module)
- [Spring](#spring)
- [Guice](#guice)
- [OpenEJB](#openejb)
- [Weld](#weld)
- [Needle](#needle)

### PicoContainer

To use PicoContainer, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>{{% version "cucumberjvm" %}}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-picocontainer', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/picocontainer).
For more information, please see [sharing state using Picocontainer](http://www.thinkcode.se/blog/2017/04/01/sharing-state-between-steps-in-cucumberjvm-using-picocontainer).

### Spring

To use Spring, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-spring</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-spring', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/spring).

### Guice

To use Guice, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-guice</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-guice', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/guice).
For more information, please see [sharing state using Guice](http://www.thinkcode.se/blog/2017/08/16/sharing-state-between-steps-in-cucumberjvm-using-guice).

### OpenEJB

To use OpenEJB, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-openejb</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-openejb', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/openejb).

### Weld

To use Weld, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-weld</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-weld', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/weld).

### Needle

To use Needle, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-needle</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-needle', version: '{{% version "cucumberjvm" %}}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/needle).

# Databases

## The Before Hook Approach

The recommended approach to clean a database between scenarios is to use a
`Before`[Hook](/cucumber/#hooks) to remove all data *before* a scenario starts.

This is usually better than using an `After`[hook](/cucumber/#hooks), as it allows
you to perform a post-mortem inspection of the database if a scenario fails.

An alternative approach is to use database transactions.

## The Database Transaction Approach

If your database supports it, you can wrap a transaction *around* each scenario.

This might lead to faster scenarios, but it comes at a cost.
You won't be able to perform a post-mortem, and you won't be able to
use [browser automation](#browser-automation-and-transactions).

To use this approach, you need to tell Cucumber to start a transaction in a `Before`[hook](/cucumber/#hooks), and later
roll it back in an `After`[hook](/cucumber/#hooks).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[tagged hooks](/cucumber/#tagged-hooks) using a tag named `@txn`.

To enable it, you must tag every [feature](/gherkin/#feature) or [scenario](/gherkin/#example) that requires
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

The [`cucumber-spring`](#dependency-injection-in-java) module contains `@txn` hooks in the `cucumber.api.spring` package.

This package isn't on your glue path by default, so you have to add it yourself in your
Cucumber Options.

```java
@RunWith(Cucumber.class)
@CucumberOptions(glue = {"your.own.glue.code", "cucumber.api.spring"})
public class RunCukesTest {
}
```

See the [`spring-txn`](https://github.com/cucumber/cucumber-jvm/tree/master/examples/spring-txn) example in Cucumber-JVM for a minimal setup.

# Browser Automation and Transactions

If you're using a [browser automation](/browser-automation/) tool that talks to your application over HTTP the transactional approach
will not work if your [step definitions](/cucumber/#step-definitions) and the web application serving HTTP request each have their own database connection.

If this is the case you should use the brute-force approach where the data is explicitly deleted before each scenario.
