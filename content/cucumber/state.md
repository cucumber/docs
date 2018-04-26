---
title: State
subtitle: Sharing state, isolated state
---

It's important to prevent state created by one scenario from leaking into others.
Leaking state makes your scenarios brittle, and difficult to run in isolation.

To prevent leaking state between scenarios:

* Avoid using global or static variables.

* Make sure you clean your database between scenarios.

# Sharing state between steps

Within your scenarios, you might want to share state between steps.

It's possible to store object state in variables inside your step definitions.

{{% note "Be careful with state"%}}
State can make your steps more tightly coupled and harder to reuse.
{{% /note %}}

## World object

In Ruby, Cucumber runs scenarios in a `World`. By default, the `World` is an instance of `Object`.

All [step definitions](/cucumber/api/#step-definitions) will run in the context of the current `World` instance; a new instance
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

If you use [Ruby on Rails](/tools/ruby#ruby-on-rails), there is already a `World` set up for you, so you will get
an instance of `Cucumber::Rails::World`, which is a subclass of `ActionDispatch::IntegrationTest`. This gives you access to a lot of Rails' helper methods.

For more information, have a look at [Building a better World](http://drnicwilliams.com/2009/04/15/cucumber-building-a-better-world-object/) (blog post).

Cucumber-js also uses a `World` as an isolated context for each scenario. You can find more information in the
[cucumber-js documentation on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md).

## Dependency Injection
If your programming language is Java, you will be writing glue code
([step definitions](/cucumber/api/#step-definitions) and [hooks](/cucumber/api/#hooks)) in plain old Java classes.

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

There are several options to remove state from your database, to prevent leaking state between scenarios.

## The Before Hook Approach

The recommended approach to clean a database between scenarios is to use a
`Before` [hook](/cucumber/api/#hooks) to remove all data *before* a scenario starts.

This is usually better than using an `After` [hook](/cucumber/api/#hooks), as it allows
you to perform a post-mortem inspection of the database if a scenario fails.

An alternative approach is to use database transactions.

## The Database Transaction Approach

If your database supports it, you can wrap a transaction *around* each scenario.

This might lead to faster scenarios, but it comes at a cost.
You won't be able to perform a post-mortem, and you won't be able to
use [browser automation](#browser-automation-and-transactions).

To use this approach, you need to tell Cucumber to start a transaction in a `Before`[hook](/cucumber/api/#hooks), and later
roll it back in an `After`[hook](/cucumber/api/#hooks).

This is such a common thing to do that several Cucumber extensions provide ready-to-use
[tagged hooks](/cucumber/api/#tagged-hooks) using a tag named `@txn`.

To enable it, you must tag every [feature](/gherkin/reference#feature) or [scenario](/gherkin/reference#example) that requires
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

The [`cucumber-spring`](#spring) module contains `@txn` hooks in the `cucumber.api.spring` package.

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

If you're using a [browser automation](/guides/browser-automation) tool that talks to your application over HTTP, the
transactional approach will not work if your [step definitions](/cucumber/api/#step-definitions) and the web application serving
HTTP request each have their own database connection.
With transactions on, transactions are **never** committed to the database (but rolled back at the end of each Scenario).
Therefore, the web server's connection will never see data from Cucumber, and therefore your browser won't either.
Likewise, Cucumber's connection won't see data from the web server.

In this case, you will have to turn off database transactions and make sure the data is explicitly deleted before each Scenario.

## Turn of transactions
If you're using [Ruby on Rails](/tools/ruby#ruby-on-rails) it's easy to turn off transactions for a feature or particular scenarios. Use the `@no-txn` tag, like this:

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

## Cleaning Your Database

If you're using [Ruby on Rails](/tools/ruby#ruby-on-rails), a good tool to deal with this is Ben Mabey's
[Database Cleaner](https://github.com/bmabey/database_cleaner) gem,
which you can install with `gem install database_cleaner`.

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
