---
title: State
subtitle: Sharing state, isolated state, dependency injection
polyglot:
- java
- javascript
- ruby
- kotlin
---

It's important to prevent state created by one scenario from leaking into others.
Leaking state makes your scenarios brittle, and difficult to run in isolation.

To prevent leaking state between scenarios:

* Avoid using global or static variables.{{% block "java,kotlin" %}}
* Be aware of how [cucumber parallel execution](/docs/guides/parallel-execution/) works, and access shared state via a ThreadLocal if parallel execution is enabled.{{% /block %}}
* Make sure you clean your database in a `Before` hook.
* If you share a browser between scenarios, delete cookies in a `Before` hook.

# Sharing state between steps

Within your scenarios, you might want to share state between steps.

It's possible to store object state in variables inside your step definitions.

{{% note "Be careful with state"%}}
State can make your steps more tightly coupled and harder to reuse.
{{% /note %}}
{{% block "java,kotlin" %}}
In the presence of [cucumber parallel execution](/docs/guides/parallel-execution/) it is advisable to share state via a ThreadLocal.{{% /block %}}

## World object

{{% block "ruby" %}}
In Ruby, Cucumber runs scenarios in a `World`. By default, the `World` is an instance of `Object`.

All [step definitions](/docs/cucumber/step-definitions) will run in the context of the current `World` instance; a new instance
is created for each scenario. This means that `self` in a step definition block will be the `World` instance. Any `@instance_variable`
instantiated in a step definition will be assigned to the `World`, and can be accessed from other step definitions.

If you want to add any behaviour to the world, like helper methods, or logging, you can do this in `support/env.rb`:

```ruby
module CustomWorld
  def a_helper
    ...
  end
end

World(CustomWorld)
```

Now you can call `a_helper` from your step definitions.

Note that every scenario is run in a separate instance of the world,
so there is no implicit state-sharing from scenario to scenario.

You can also include modules in your `World`:

```ruby
module MyHelper
  def some_other_helper
    ...
  end
end

module CustomWorld
  include MyHelper

  def a_helper
    ...
  end
end

World(CustomWorld)
```

Several other frameworks such as Rspec or Webrat have modules that provide special methods that you can include in your `World` this way.

If you don't want to define your own `World` class (and just use the default `Object` instances), you can still include modules
in your `World` instances without polluting `Object` with a global include:

```ruby
module MyHelper
  def some_other_helper
    ...
  end
end

module MyOtherHelpers
  def helper_b
    ...
  end
end

World(MyHelper, MyOtherHelpers)
```

This will `extend` each new `World` object with those modules.

If you use [Ruby on Rails](/docs/tools/ruby#ruby-on-rails), there is already a `World` set up for you, so you will get
an instance of `Cucumber::Rails::World`, which is a subclass of `ActionDispatch::IntegrationTest`. This gives you access
to a lot of Rails' helper methods.
{{% /block %}}

{{% block "javascript" %}} Cucumber-js uses a `World` as an isolated context for each scenario. You can find more
information in the
[cucumber-js documentation on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md).
{{% /block %}}

{{% block "java,kotlin" %}} JVM languages do not know a "World" object, like Ruby and JavaScript. Instead, you'll need
to use [Dependency Injection](#dependency-injection).{{% /block %}}

## Dependency Injection
{{% block "java,kotlin" %}} If your programming language is a JVM language, you will be writing glue code
([step definitions](/docs/cucumber/step-definitions) and [hooks](/docs/cucumber/api/#hooks)) in classes.

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

{{% /block %}} {{% block "ruby,javascript" %}} Dependency Injection is specific to JVM languages. {{% /block %}}

### PicoContainer
{{% block "java,kotlin" %}} 
To use PicoContainer, add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Or, if you are using Gradle, add:
```
compile group: 'io.cucumber', name: 'cucumber-picocontainer', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/picocontainer).
For more information, please see [sharing state using PicoContainer](http://www.thinkcode.se/blog/2017/04/01/sharing-state-between-steps-in-cucumberjvm-using-picocontainer).
{{% /block %}}

{{% block "ruby,javascript" %}} PicoContainer is a Dependency Injection framework for JVM languages. {{% /block %}}


### Spring
{{% block "java,kotlin" %}} 
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
compile group: 'io.cucumber', name: 'cucumber-spring', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/spring).
{{% /block %}}

{{% block "ruby,javascript" %}} Spring is a Dependency Injection framework for JVM languages. {{% /block %}}

### Guice
{{% block "java,kotlin" %}} 
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
compile group: 'io.cucumber', name: 'cucumber-guice', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/guice).
For more information, please see [sharing state using Guice](http://www.thinkcode.se/blog/2017/08/16/sharing-state-between-steps-in-cucumberjvm-using-guice).
{{% /block %}}

{{% block "ruby,javascript" %}} Guice is a Dependency Injection framework for JVM languages. {{% /block %}}

### OpenEJB
{{% block "java,kotlin" %}} 
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
compile group: 'io.cucumber', name: 'cucumber-openejb', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/openejb).
{{% /block %}}

{{% block "ruby,javascript" %}} OpenEJB is a Dependency Injection framework for JVM languages. {{% /block %}}

### Weld
{{% block "java,kotlin" %}} 
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
compile group: 'io.cucumber', name: 'cucumber-weld', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/weld).
{{% /block %}}

{{% block "ruby,javascript" %}} Weld is a Dependency Injection framework for JVM languages. {{% /block %}}

### Needle
{{% block "java,kotlin" %}} 
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
compile group: 'io.cucumber', name: 'cucumber-needle', version: '{{% version "cucumberjvm" %}}'
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/main/needle).
{{% /block %}}

{{% block "ruby,javascript" %}} Needle is a Dependency Injection framework for JVM languages. {{% /block %}}

# How to use DI
{{% block "java,kotlin" %}} 
When using a DI framework all your step definitions, hooks, transformers, etc. will be created by the frameworks instance injector.
{{% /block %}}

{{% block "ruby,javascript" %}} Dependency Injection is specific to JVM languages. {{% /block %}}

## Using a custom injector
{{% block "java,kotlin" %}} Cucumber example tests are typically small and have no dependencies. In real life, though,
tests often need access to application specific object instances which also need to be supplied by the injector. These
instances need to be made available to your step definitions so that actions can be applied on them and delivered
results can be tested.

The reason using Cucumber with a DI framework typically originates from the fact that the tested application also uses
the same framework. So we need to configure a custom injector to be used with Cucumber.
This injector ties tests and application instances together.

Here is an example of a typical step definition using [Google Guice](/docs/cucumber/state/#guice). Using the
Cucumber provided Guice injector will fail to instantiate the required `appService` member.

```java
package com.example.app;

import static org.junit.Assert.assertTrue;

import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.guice.ScenarioScoped;
import com.example.app.service.AppService;
import java.util.Objects;
import javax.inject.Inject;

@ScenarioScoped
public final class StepDefinition {

    private final AppService appService;

    @Inject
    public StepDefinition( AppService appService ) {
        this.appService = Objects.requireNonNull( appService, "appService must not be null" );
    }

    @When("the application services are started")
    public void startServices() {
        this.appService.startServices();
    }

    @Then("all application services should be running")
    public void checkThatApplicationServicesAreRunning() {
        assertTrue( this.appService.servicesAreRunning() );
    }
}
```

The implementation of the AppService may need further arguments and configuration that typically
has to be provided by a Guice module. Guice modules are used to configure an injector and might look like this:

```java
package com.example.app.service.impl;

import com.example.app.service.AppService;
import com.google.inject.AbstractModule;

public final class ServiceModule extends AbstractModule {
    @Override
    protected void configure() {
        bind( AppService.class ).to( AppServiceImpl.class );
        // ... (further bindings)
    }
}
```

The actual injector is then created like this: `injector = Guice.createInjector( new ServiceModule() );`

This means we need to create our own injector and tell Cucumber to use it.
{{% /block %}}

{{% block "ruby,javascript" %}} Using a custom injector is specific to JVM languages. {{% /block %}}

## The Cucumber object factory
{{% block "java,kotlin" %}} 
Whenever Cucumber needs a specific object, it uses an object factory.
Cucumber has a default object factory that (in case of Guice) creates a default injector and
delegates object creation to that injector.
If you want to customize the injector we need to provide our own object factory and tell Cucumber to use it instead.

```java
package com.example.app;

import io.cucumber.core.backend.ObjectFactory;
import io.cucumber.guice.CucumberModules;
import io.cucumber.guice.ScenarioScope;
import com.example.app.service.impl.ServiceModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Stage;

public final class CustomObjectFactory implements ObjectFactory {

    private Injector injector;

    public CustomObjectFactory() {
        // Create an injector with our service module
        this.injector =
          Guice.createInjector( Stage.PRODUCTION, CucumberModules.createScenarioModule(), new ServiceModule());
    }

    @Override
    public boolean addClass( Class< ? > clazz ) {
        return true;
    }

    @Override
    public void start() {
        this.injector.getInstance( ScenarioScope.class ).enterScope();
    }

    @Override
    public void stop() {
        this.injector.getInstance( ScenarioScope.class ).exitScope();
    }

    @Override
    public < T > T getInstance( Class< T > clazz ) {
        return this.injector.getInstance( clazz );
    }
}
```

This is the default object factory for Guice except that we have added our own bindings to the injector.
Cucumber loads the object factory through the `java.util.ServiceLoader`. In order for the ServiceLoader to be able
to pick up our custom implementation we need to provide the file `META-INF/services/io.cucumber.core.backend.ObjectFactory`.

```
com.example.app.CustomObjectFactory
#
# ... additional custom object factories could be added here
#
```

Now we have to tell Cucumber to use our custom object factory. There are several ways how this could be accomplished.
{{% /block %}}

{{% block "ruby,javascript" %}} The Cucumber object factory is specific to JVM languages. {{% /block %}}

### Using the Cucumber object factory from the command line
{{% block "java,kotlin" %}} 
When Cucumber is run from the command line, the custom object factory can be specified as argument.

```bash
java io.cucumber.core.cli.Main --object-factory com.example.app.CustomObjectFactory
```
{{% /block %}}

{{% block "ruby,javascript" %}} Using the Cucumber object factory is specific to JVM languages. {{% /block %}}

### Using the Cucumber object factory a property file
{{% block "java,kotlin" %}} Cucumber makes use of a properties file (`cucumber.properties`) if it exists. The custom
object factory can be specified in this file and will be picked up when Cucumber is running. The following entry needs
to be available in the `cucumber.properties` file:

```
cucumber.object-factory=com.example.app.CustomObjectFactory
```
{{% /block %}}

{{% block "ruby,javascript" %}} Using the Cucumber object factory is specific to JVM languages. {{% /block %}}

### Using the Cucumber object factory with a test runner (JUnit 5/JUnit 4/TestNG)
{{% block "java,kotlin" %}} 
The Cucumber modules for [JUnit 4](/docs/cucumber/api/#junit) and [TestNG](/docs/cucumber/checking-assertions/#testng) allow to run Cucumber through a JUnit/TestNG test.
The custom object factory can be configured using the `@CucumberOptions` annotation. For JUnit 5 see the [cucumber-junit-platform-engine](https://github.com/cucumber/cucumber-jvm/tree/main/junit-platform-engine) documentation.
{{% /block %}}

{{% block "ruby,javascript" %}} Using the Cucumber object factory is specific to JVM languages. {{% /block %}}

# Databases

There are several options to remove state from your database, to prevent leaking state between scenarios.

## The Before Hook Approach

The recommended approach to clean a database between scenarios is to use a `Before` [hook](/docs/cucumber/api/#hooks) to
remove all data *before* a scenario starts. This is usually better than using an `After`
[hook](/docs/cucumber/api/#hooks), as it allows you to perform a post-mortem inspection of the database if a scenario
fails.

An alternative approach is to use database transactions.

## The Database Transaction Approach

If your database supports it, you can wrap a transaction *around* each scenario.

This might lead to faster scenarios, but it comes at a cost.
You won't be able to perform a post-mortem, and you won't be able to
use [browser automation](#browser-automation-and-transactions).

To use this approach, you need to tell Cucumber to start a transaction in a `Before`[hook](/docs/cucumber/api/#hooks), and later
roll it back in an `After`[hook](/docs/cucumber/api/#hooks).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[conditional hooks](/docs/cucumber/api/#conditional-hooks) using a tag named `@txn`.

To enable it, you must tag every [feature](/docs/gherkin/reference#feature) or [scenario](/docs/gherkin/reference#example) that requires
transactions with `@txn`:

```gherkin
@txn
Feature: Let's write a lot of stuff to the DB

  Scenario: I clean up after myself
    Given I write to the DB

  Scenario: And so do I!
    Given I write to the DB
```

### With JUnit 5 and Spring
{{% block "java,kotlin" %}} 
See the [`spring-txn`](https://github.com/cucumber/cucumber-jvm/tree/main/examples/spring-java-junit5) example in Cucumber-JVM for a minimal setup.
{{% /block %}}

{{% block "ruby,javascript" %}} JUnit 5 and Spring are used with JVM languages. {{% /block %}}

# Browser Automation and Transactions

If you're using a [browser automation](/docs/guides/browser-automation) tool that talks to your application over HTTP,
the transactional approach will not work if your [step definitions](/docs/cucumber/step-definitions) and the web
application serving HTTP request each have their own database connection. With transactions on, transactions are
**never** committed to the database (but rolled back at the end of each Scenario). Therefore, the web server's
connection will never see data from Cucumber, and therefore your browser won't either. Likewise, Cucumber's connection
won't see data from the web server.

In this case, you will have to turn off database transactions and make sure the test data is explicitly deleted before each Scenario.

## Turn off transactions
{{% block "ruby" %}} 
If you're using [Ruby on Rails](/docs/tools/ruby#ruby-on-rails), you can turn off transactions for
a feature or particular scenarios. Use the `@no-txn` tag, like this:

```
@no-txn
Feature: Lots of Scenarios with transactions off.
```

If this is the case you should use the brute-force approach where the data is explicitly deleted before each scenario.
Or this:

```
Feature: ...
  @no-txn
  Scenario: One Scenario with transactions off.
```

With Rails, you can also turn off transaction globally in your `features/support/env.rb`:

```
Cucumber::Rails::World.use_transactional_fixtures = false
```
{{% /block %}}

{{% block "java,kotlin,javascript" %}} Ruby tools provide specific ways to turn of transactions. {{% /block %}}

## Cleaning Your Database
{{% block "ruby" %}} If you're using [Ruby on Rails](/docs/tools/ruby#ruby-on-rails), a good tool to deal with this is
Ben Mabey's [Database Cleaner](https://github.com/bmabey/database_cleaner) gem, which you can install with `gem install
database_cleaner`.

You can use this very effectively with the `@no-txn` tag. For example, add something like the following somewhere in e.g. `features/support/db_cleaner.rb`:

```
require 'database_cleaner'
DatabaseCleaner.clean_with :truncation # clean once to ensure clean slate
DatabaseCleaner.strategy = :truncation

Before('@no-txn') do
  DatabaseCleaner.start
end

After('@no-txn') do
  DatabaseCleaner.clean
end
```

If you're not using Rails, you can recreate the entire `@no-txn` behaviour using `DatabaseCleaner` in Ruby with the following code:

```
# With this you should be able to tag the stories that need to use truncation.
# Otherwise, the transaction strategy will be used all the other times.

require 'database_cleaner'
DatabaseCleaner.clean_with :truncation # clean once to ensure clean slate
DatabaseCleaner.strategy = :transaction # use transactions by default

Before('@no-txn') do
  DatabaseCleaner.strategy = :truncation
end

Before do
  DatabaseCleaner.start
end

After do
  DatabaseCleaner.clean
end

After('@no-txn') do
  DatabaseCleaner.strategy = :transaction
end
```
{{% /block %}}

{{% block "java,kotlin,javascript" %}} Ruby tools provide specific ways to clean your database. {{% /block %}}
