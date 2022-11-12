---
title: Cucumber-JVM
subtitle: Java
svg: installation/java.svg
implementation: official
weight: 1110
---

----
![Cucumber School Logo](/img/cucumber-school-logo.png)

Watch the Cucumber School video lesson on installing Cucumber for JVM languages [here](https://school.cucumber.io/courses/take/bdd-with-cucumber-java/lessons/9588454-install-cucumber).

----

Cucumber-JVM is published in the central Maven repository.
You can install it by adding dependencies to your project.

{{% note "Dependencies"%}}
Make sure the Cucumber version is the same for all Cucumber dependencies.
{{% /note %}}

# Maven

Add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

You can now run Cucumber [from the command line](/docs/cucumber/api/#from-the-command-line) or [run Cucumber with Maven](/docs/tools/java#maven).

# Gradle

If you are using Gradle **4.10.3 or older** add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

Similarly, if you want to use Gradle **5.0 or more recent** add the following dependencies to `build.gradle`:

```
dependencies {
    testImplementation 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    testImplementation 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

You can now run Cucumber [from the command line](/docs/cucumber/api/#from-the-command-line) to execute by [adding a cucumber task](/docs/tools/java#gradle) to `build.gradle`.

# JUnit 5 integration

It is also possible to use [cucumber-junit-platform-engine](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-junit-platform-engine) to run your Cucumber test suite.

# JUnit 4 integration

It is also possible to use [cucumber-junit](/docs/cucumber/api/#junit) to run your Cucumber test suite.

# Assertions

Cucumber does not come with an assertion library. Instead, use the assertion methods
from a [unit testing tool](/docs/cucumber/checking-assertions/#java).

# Dependency Injection

While it's not required, we strongly recommend you include one of the
[dependency injection](/docs/cucumber/state/#dependency-injection) modules as well. This allows
you to share state between [step definitions](/docs/cucumber/step-definitions)
without resorting to static variables (a common source of flickering scenarios).

