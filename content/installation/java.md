---
title: Cucumber-JVM
subtitle: Java
svg: installation/java.svg
implementation: official
weight: 1110
---
Cucumber-JVM is published in the central Maven repository.
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

# Using Cucumber without a dependency manager

If you have not migrated to using a dependency manager, you can still download the jars separately from the Maven central repository.  Simply go to [the Cucumber section of the Maven central repository](http://repo1.maven.org/maven2/info/cukes/) and download the latest version of `cucumber-core`, `cucumber-java`, `cucumber-jvm-deps`, and `gherkin`.  Then add them to your classpath.  If you use it through JUnit, you may also want to add `cucumber-junit` and `cucumber-html`.  Be careful that the newest version may not be at the bottom of the file list, as 10 sorts alphabetically before 9.  Also be sure to download the same version for each of the Cucumber jars.

# JUnit-integration

It is also possible to use [cucumber-junit](/cucumber/api/#junit) to run your Cucumber test suite.

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
