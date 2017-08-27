---
title: Cucumber JVM
nav: docs
menu:
  - implementations
# also linked from config.toml as Closure, for example
---

# Cucumber-JVM

Cucumber-JVM is a Cucumber implementation for the most popular JVM languages.

This document is the reference for features that are specific to Cucumber-JVM.

Please see the [general reference](/docs/reference) for features that are
common to all Cucumber implementations.

## Languages

Cucumber-JVM supports the following JVM languages:

* [Java](#java)
* [Groovy](#groovy)
* [Scala](#scala)
* [Clojure](#clojure)
* [Jython](#jythin)
* [JRuby](#jruby)
* [Rhino JavaScript](#rhino-javascript)
* [Gosu](#gosu)

## Installation

Cucumber-JVM consists of several modules (jars) that you can download from the [public maven repo](http://repo1.maven.org/maven2/info/cukes/).
There is no "setup" program for Cucumber-JVM---just jar files.

What jar files to add to your project classpath depends on what programming language you are using. If you
are using Java, you may want to add one of the jars for [dependency injection](/docs/reference/java-di) as well.

### Snapshot releases

If you want to take advantage of functionality that has been committed to the git master branch, but hasn't been released to the public maven repo yet, you can use `SNAPSHOT` builds from the [sonatype snapshot repo](https://oss.sonatype.org/content/repositories/snapshots/info/cukes/).

Just add the following to your `pom.xml`:

```xml
<repository>
    <id>sonatype-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
```

Then add a dependency to the snapshot version, for example:

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{ site.versions.cucumber_jvm }}-SNAPSHOT</version>
    <scope>test</scope>
</dependency>
```

You can find the current snapshot version number [here](https://github.com/cucumber/cucumber-jvm/blob/master/pom.xml).

## Running Cucumber

There are several ways to run scenarios with Cucumber-JVM:

* [JUnit Runner](#junit-runner)
* [CLI Runner](#cli-runner)
* [Android Runner](/docs/reference/android#runner)
* [Third party runners](#third-party-runners)

### JUnit Runner

The JUnit runner uses the JUnit framework to run Cucumber. All you need is a single
empty class with an annotation:

```java
package mypackage;

import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
public class RunCukesTest {
}
```

You can run this test in the same way you run your other JUnit tests, using
your IDE or your build tool (for example `mvn test`).

To use the JUnit runner you need to add the following dependencies:

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

### CLI Runner

The Command-Line Interface Runner (CLI Runner) is an executable Java class that
can be run from the command-line, or from any build tool such as Gradle or Ant.

```
java cucumber.api.cli.Main
```

This behaves similarly to the `cucumber` command from [Cucumber-Ruby](/docs/reference/ruby). Run it with `--help`
to see what the options are:

```
java cucumber.api.cli.Main --help
```

### Third party runners

IntelliJ IDEA and Eclipse have plugins that can run scenarios from within an IDE:

* [IntelliJ IDEA](https://www.jetbrains.com/idea/help/cucumber.html)
* [Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse)

Please refer to the documentation for the third party runner for details about how
to pass configuration options to Cucumber.

## Configuration

Cucumber has a set of configuration options that can be passed to each runner.
Configuration options can be passed to the [CLI Runner](#cli-runner) on the command-line.
For example:

```
java cucumber.api.cli.Main --version
```

The [JUnit Runner](#junit-runner) and [Android Runner](#android-runner) can also pick
up configuration options defined via the `@CucumberOptions` annotation. For example, if
 you want to tell Cucumber to use the two formatter plugins `pretty`
and `html`, you would specify it like this:

```java
package mypackage;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"})
public class RunCukesTest {
}
```

Configuration options can also be overridden and passed to *any* of the runners via the `cucumber.options`
Java system property. For example, if you are using Maven and want to run a subset of scenarios tagged
with `@smoke`:

```
mvn test -Dcucumber.options="--tags @smoke"
```

### List configuration options

To print out all the available configuration options, simply pass the `--help` option.
For example:

```
mvn test -Dcucumber.options="--help"
```

will print out:

```
Usage: java cucumber.api.cli.Main [options] [[[FILE|DIR][:LINE[:LINE]*] ]+ | @FILE ]

Options:

  -g, --glue PATH                        Where glue code (step definitions, hooks
                                         and plugins) are loaded from.
  -p, --plugin PLUGIN[:PATH_OR_URL]      Register a plugin.
                                         Built-in formatter PLUGIN types: junit,
                                         html, pretty, progress, json, usage, rerun,
                                         testng. Built-in summary PLUGIN types:
                                         default_summary, null_summary. PLUGIN can
                                         also be a fully qualified class name, allowing
                                         registration of 3rd party plugins.
  -f, --format FORMAT[:PATH_OR_URL]      Deprecated. Use --plugin instead.
  -t, --tags TAG_EXPRESSION              Only run scenarios tagged with tags matching
                                         TAG_EXPRESSION.
  -n, --name REGEXP                      Only run scenarios whose names match REGEXP.
  -d, --[no-]-dry-run                    Skip execution of glue code.
  -m, --[no-]-monochrome                 Don't colour terminal output.
  -s, --[no-]-strict                     Treat undefined and pending steps as errors.
      --snippets [underscore|camelcase]  Naming convention for generated snippets.
                                         Defaults to underscore.
  -v, --version                          Print version.
  -h, --help                             You're looking at it.
  --i18n LANG                            List keywords for in a particular language
                                         Run with "--i18n help" to see all languages

Feature path examples:
  <path>                                 Load the files with the extension ".feature"
                                         for the directory <path>
                                         and its sub directories.
  <path>/<name>.feature                  Load the feature file <path>/<name>.feature
                                         from the file system.
  classpath:<path>/<name>.feature        Load the feature file <path>/<name>.feature
                                         from the classpath.
  <path>/<name>.feature:3:9              Load the scenarios on line 3 and line 9 in
                                         the file <path>/<name>.feature.
  @<path>/<file>                         Parse <path>/<file> for feature paths generated
                                         by the rerun formatter.
```

Some of the runners provide additional mechanisms for passing options to Cucumber.

## Java

### {java-}Dependency

If you are going to use the lambda expressions API to write the Step
Definitions, you need:

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-java8</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

Otherwise, to write them using annotated methods, you need:

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

While it's not required, we strongly recommend you include one of the
[Dependency Injection](/docs/reference/java-di) modules as well. This allows
you to share state between [Step Definitions](/docs/reference#step-definitions)
without resorting to static variables (a common source of flickering scenarios).

### Step Definitions

Java Step Definitions are written in regular classes which don't need to extend
or implement anything. They can be written either using lambda expressions or
method annotations:

#### Lambda Expressions (Java 8)

If you use the `cucumber-java8` module, you can write the [Step Definitions](/docs/reference#step-definitions)
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

The simplest way to pass a `List<String>` to a step definition is to use commas:

```gherkin
Given the following animals: cow, horse, sheep
```

Simply declare the argument as a `List<String>`:

```java
@Given("the following animals: (.*)")
public void the_following_animals(List<String> animals) {
}
```

See the [@Delimiter](#) annotation for details about how to define a delimiter different than `,`.

If you prefer to use a [Data Table](/docs/reference#data-table) to define a list you can do that too:

```gherkin
Given the following animals:
  | cow   |
  | horse |
  | sheep |
```

Simply declare the argument as a `List<String>` (but do not define a capture group in the pattern):

```java
@Given("the following animals:")
public void the_following_animals(List<String> animals) {
}
```

In this case, the `DataTable` is automatically flattened to a `List<String>`
by Cucumber (using `DataTable.asList(String.class)`) before invoking the step
definition.

## Groovy

### {groovy-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-groovy</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## Scala

### {scala-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-scala</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## Clojure

### {clojure-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-clojure</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## Jython

### {jython-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-jython</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## JRuby

### {jruby-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-jruby</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## Rhino JavaScript

### {rhino-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-rhino</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

## Gosu

### {gosu-}Dependency

```xml
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-gosu</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```
