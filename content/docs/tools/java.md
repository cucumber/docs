---
title: Java Tools
weight: 1100
---

This page describes tools commonly used with Java.

# IDEs

## IntelliJ IDEA

- [IntelliJ IDEA](https://www.jetbrains.com/idea/) has the [IntelliJ IDEA Cucumber for Java plugin](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)

You can find more information on using Cucumber with IntelliJ IDEA in the [IntelliJ IDEA Cucumber help pages](https://www.jetbrains.com/idea/help/cucumber.html)

## Eclipse

- [Eclipse](https://www.eclipse.org/) has the [Cucumber Eclipse plugin](https://cucumber.github.io/cucumber-eclipse/)

# Build tools
The most widely used build tools for Java are [Maven](#maven) and [Gradle](#gradle).

## Maven

To run Cucumber with [Maven](https://maven.apache.org/), make sure that:

- Maven is installed
- The environment variable `MAVEN_HOME` is correctly configured
- The IDE is configured with the latest Maven installation

Steps:

1.  Create a new Maven project or fork cucumber-java examples on Github
2.  Add the following dependency to the `pom.xml`

    ```xml
    <dependency>
        <groupId>io.cucumber</groupId>
      	<artifactId>cucumber-java</artifactId>
      	<version>{{% version "cucumberjvm" %}}</version>
    </dependency>
    ```

3.  Add feature `.feature` files and associated step mapping classes `.java` in `src/test/resources` and `src/test/java` folders respectively.
4.  Run the following Maven from the directory path where the `pom.xml` file is located:

    ```shell
    mvn clean install -Dcucumber.glue="package_name_of_step_definitions" \
       -Dcucumber.plugin="pretty path\to\featurefiles"
    ```

## Gradle

To run Cucumber with [Gradle](https://gradle.org/), make sure that:

- Gradle is installed
- The environment variable `GRADLE_HOME` is correctly configured
- The IDE is configured with the latest Gradle installation

Steps:

1.  Create a new Gradle project or look at [gradle-cucumber-runner](https://github.com/tsundberg/gradle-cucumber-runner) example on Github
2.  If you are going to use Gradle **4.10.3 or older**, add this dependency block to `build.gradle`.
    ```groovy
    dependencies {
        testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    }
    ```

    For Gradle **5.0 or more recent**, you can add the following dependency block to `build.gradle`.
    ```groovy
    dependencies {
        testImplementation 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    }
    ```

3. For Gradle **4.10.3 or older**, add the following configuration to `build.gradle`.
    ```groovy
    configurations {
        cucumberRuntime {
            extendsFrom testRuntime
        }
    }
    ```
    For Gradle **5.0 or more recent**, the following configuration must be added to `build.gradle`.
    ```groovy
    configurations {
        cucumberRuntime {
            extendsFrom testImplementation
        }
    }
    ```

4.  Add feature `.feature` files and associated step mapping classes `.java` in `src/test/resources` and `src/test/java` respectively in a `gradle.cucumber` package.
5.  Add the following Gradle `cucumber` task in `build.gradle`

    ```groovy
    task cucumber() {
        dependsOn assemble, testClasses
        doLast {
            javaexec {
                main = "io.cucumber.core.cli.Main"
                classpath = configurations.cucumberRuntime + sourceSets.main.output + sourceSets.test.output
                args = ['--plugin', 'pretty', '--glue', 'gradle.cucumber', 'src/test/resources']
            }
        }
    }
    ```

6.  Run the following gradle task from the directory path where `build.gradle` file is located:

    ```shell
    gradle cucumber
    ```
