---
title: Cucumber-jvm
subtitle: Java
svg: installation/java.svg
implementation: official
weight: 1110
---
Cucumber-jvm is published in the central Maven repository.
You can install it by adding dependencies to your project.

{{% note "Dependencies"%}}
Make sure the Cucumber version is the same for all Cucumber dependencies.
{{% /note %}}

# Maven

If you are going to use the lambda expressions API (Java 8) to write the step
definitions, add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java8</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Otherwise, to write them using annotated methods, add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

You can now run Cucumber [from the command line](/cucumber/api/#from-the-command-line) or [run Cucumber with Maven](/tools/java#maven).

# Gradle

If you are going to use the lambda expressions API (Java 8) to write the step
definitions, add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java8:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

Otherwise, to write them using annotated methods, add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

You can now run Cucumber [from the command line](/cucumber/api/#from-the-command-line) to execute by [adding a cucumber task](/tools/java#gradle) to `build.gradle`.

# Snapshot releases

To take advantage of functionality that has been committed to the git `master` branch, but hasn't been released to the central Maven repo yet, you can use `SNAPSHOT` builds from the [sonatype snapshot repo](https://oss.sonatype.org/content/repositories/snapshots/io/cucumber/).

If you are using Maven, add the sonatype repository to your `pom.xml`:

```xml
<repository>
    <id>sonatype-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
```

Then, add a dependency to the snapshot version to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm-snapshot" %}}</version>
    <scope>test</scope>
</dependency>
```

You can find the current snapshot version number [here](https://github.com/cucumber/cucumber-jvm/blob/master/pom.xml).

If you are using Gradle, check the [build.gradle](https://github.com/cucumber/cucumber-java-skeleton/blob/master/build.gradle) file in the cucumber-java-skeleton project.

# Assertions

Cucumber does not come with an assertion library. Instead, use the assertion methods
from a [unit testing tool](/cucumber/checking-assertions/#java).

# Dependency Injection

While it's not required, we strongly recommend you include one of the
[dependency injection](/cucumber/state/#dependency-injection) modules as well. This allows
you to share state between [step definitions](/cucumber/step-definitions)
without resorting to static variables (a common source of flickering scenarios).
