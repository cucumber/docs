---
menu:
- implementations
nav: docs
title: Cucumber-JVM
---

Cucumber-JVM is a Cucumber implementation for the most popular JVM languages.

This document is the reference for functionality specific to Cucumber-JVM.

Please see [Gherkin](/gherkin/) for functionality common to all Cucumber implementations.

# Languages

Cucumber-JVM supports Java, Kotlin and Android.

Other JVM languages have been moved to their own repository:

- [Clojure](https://github.com/cucumber/cucumber-jvm-clojure)
- [Gosu](https://github.com/cucumber/cucumber-jvm-gosu)
- [Groovy](https://github.com/cucumber/cucumber-jvm-groovy)
- [JRuby](https://github.com/cucumber/cucumber-jvm-jruby)
- [Jython](https://github.com/cucumber/cucumber-jvm-jython)
- [Rhino](https://github.com/cucumber/cucumber-jvm-rhino)
- [Scala](https://github.com/cucumber/cucumber-jvm-scala)


## Installation

Cucumber-JVM consists of several modules (JARs). We recommend using a build tool, like [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/),
to manage the dependencies in your project.

Determining which dependencies to add to your project, depends on the programming language you are using. If you
are using Java, you may also want to add one of the JARs for [dependency injection](/implementations/jvm/java-di/).
In addition, you may want to use a test framework, like JUnit or TestNg.

### Snapshot releases

If you want to take advantage of functionality that has been committed to the git `master` branch, but hasn't been released to the public maven repo yet, you can use `SNAPSHOT` builds from the [sonatype snapshot repo](https://oss.sonatype.org/content/repositories/snapshots/io/cucumber/).

If you are using Maven, just add the following to your `pom.xml`:

```xml
<repository>
    <id>sonatype-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
```

Then, add a dependency to the snapshot version.

For example:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>2.1.1-SNAPSHOT</version>
    <scope>test</scope>
</dependency>
```

You can find the current snapshot version number [here](https://github.com/cucumber/cucumber-jvm/blob/master/pom.xml).

If you are using Gradle, check the [build.gradle](https://github.com/cucumber/cucumber-java-skeleton/blob/master/build.gradle) file in the cucumber-java-skeleton project.

## Java

### {java-}Dependency

If you are going to use the lambda expressions API to write the Step
Definitions, you need to add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java8</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Otherwise, to write them using annotated methods, you need to add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

While it's not required, we strongly recommend you include one of the
[Dependency Injection](/implementations/jvm/java-di/) modules as well. This allows
you to share state between [Step Definitions](/cucumber/#step-definitions)
without resorting to static variables (a common source of flickering Scenarios).

### Step Definitions

Java Step Definitions are written in regular classes which don't need to extend
or implement anything. They can be written either using lambda expressions or
method annotations:

#### Lambda Expressions (Java 8)

If you use the `cucumber-java8` module, you can write the [Step Definitions](/cucumber/#step-definitions)
using lambdas:

```java
package foo;

import cucumber.api.java8.En;

public class MyStepdefs implements En {
    public MyStepdefs() {
        Given("I have (\\d+) cukes in my belly", (Integer cukes) -> {
            System.out.format("Cukes: %n\n", cukes);
        });
    }
}
```

#### Annotated methods (Java 6 and onwards)

If you use the `cucumber-java` module, you can write them using annotated methods:

```java
package foo;

public class MyStepdefs {
    @Given("I have (\\d+) cukes in my belly")
    public void I_have_cukes_in_my_belly(int cukes) {
        System.out.format("Cukes: %n\n", cukes);
    }
}
```

#### One-dimensional lists

The simplest way to pass a `List<String>` to a Step Definition is to use commas:

```gherkin
Given the following animals: cow, horse, sheep
```

and declare the argument as a `List<String>`:

```java
@Given("the following animals: (.*)")
public void the_following_animals(List<String> animals) {
}
```

See the `@Delimiter` annotation for details about how to define a delimiter different than `,`.


If you prefer to use a [Data Table](/gherkin/#step-arguments) to define a list you can do that too:

```gherkin
Given the following animals:
  | cow   |
  | horse |
  | sheep |
```

Declare the argument as a `List<String>`, but don't define any capture groups in the pattern:

```java
@Given("the following animals:")
public void the_following_animals(List<String> animals) {
}
```

In this case, the `DataTable` is automatically flattened to a `List<String>`
by Cucumber (using `DataTable.asList(String.class)`) before invoking the Step
Definition.

## Groovy

### {groovy-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-groovy</artifactId>
    <version>{{% version "groovy" %}}</version>
    <scope>test</scope>
</dependency>
```

## Scala

### {scala-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-scala</artifactId>
    <version>{{% version "scala" %}}</version>
    <scope>test</scope>
</dependency>
```

## Clojure

### {clojure-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-clojure</artifactId>
    <version>{{% version "clojure" %}}</version>
    <scope>test</scope>
</dependency>
```

## Jython

### {jython-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-jython</artifactId>
    <version>{{% version "jython" %}}</version>
    <scope>test</scope>
</dependency>
```

## JRuby

### {jruby-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-jruby</artifactId>
    <version>{{% version "jruby" %}}</version>
    <scope>test</scope>
</dependency>
```

## Rhino JavaScript

### {rhino-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-rhino</artifactId>
    <version>{{% version "rhino" %}}</version>
    <scope>test</scope>
</dependency>
```

## Gosu

### {gosu-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-gosu</artifactId>
    <version>{{% version "gosu" %}}</version>
    <scope>test</scope>
</dependency>
```
