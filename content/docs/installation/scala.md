---
title: Cucumber-Scala
subtitle: Scala
svg: installation/scala.svg
implementation: unmaintained
weight: 1315
---

----

**This package is currently in need of new maintainers.**

Please see [Cucumber-Scala](https://github.com/cucumber/cucumber-jvm-scala).

----

Cucumber-Scala is published in the central Maven repository.
You can install it by adding dependencies to your project.

{{% note "Dependencies"%}}
Make sure the Cucumber version is the same for all Cucumber dependencies.
{{% /note %}}

# Maven

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-scala_2.13</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

You can now run Cucumber [from the command line](/docs/cucumber/api/#from-the-command-line) or [run Cucumber with Maven](/docs/tools/java#maven).

# Sbt

```scala
libraryDependencies += "io.cucumber" %% "cucumber-scala" % "{{% version "cucumberjvm" %}}" % Test
```

# JUnit-integration

It is also possible to use [cucumber-junit](/docs/cucumber/api/#junit) to run your Cucumber test suite.

# Assertions

Cucumber does not come with an assertion library. Instead, use the assertion methods
from a [unit testing tool](/docs/cucumber/checking-assertions/#java).

