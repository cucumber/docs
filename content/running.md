---
source: https://github.com/cucumber/cucumber/wiki/Running-Features/
title: Running features
polyglot: true
---

There are several ways to run features with Cucumber.

It is possible to [configure](/configuration) how Cucumber should run features.

# From the command line
The most standard option is to run Cucumber from the command line.

{{% block "ruby" %}}
## Using the Gem's `cucumber` Command

The following command will run the `authenticate_user` feature. Any feature in a sub-directory of `features/` directory must `require` features.

```
cucumber --require features features/authentication/authenticate_user.feature
```

{{% /block %}}

{{% block "java" %}}
## CLI Runner
The Command-Line Interface Runner (CLI Runner) is an executable Java class that can be run from the command-line, or from any build tool (such as Maven, Gradle or Ant), or an IDE.

```
java cucumber.api.cli.Main
```
{{% /block %}}

{{% block "javascript" %}}
## CLI
Cucumber.js includes an executable file to run the features. After installing Cucumber in a project, you can run it with:

``` shell
$ ./node_modules/.bin/cucumber.js
```

The executable is also aliased as `cucumber-js` and `cucumberjs`.

{{% note "Windows users"%}}
Use `cucumber-js` or `cucumberjs` instead of `cucumber.js`.
The latter is causing the operating system to invoke JScript instead of Node.js,
because of the file extension.
{{% /note %}}

{{% note "Note on global installs"%}}
Cucumber does not work when installed globally because cucumber needs to be required in support files and globally installed modules cannot be required.
{{% /note %}}

{{% /block %}}

{{% block "java" %}}
# From a test framework
You can run features using a test framework. This will allow you to execute Cucumber at the same time as you execute 
your tests. It simplifies integration with your continuous integration build.

## JUnit Runner

The JUnit runner uses the JUnit framework to run Cucumber.

To use the JUnit runner you need to add the following dependencies:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

{{% note "Supported JUnit versions"%}}
Cucumber-JVM currently does not yet support JUnit5 (Jupiter)
{{% /note %}}

Create an empty class that uses the Cucumber JUnit runner.

```java
package mypackage;

import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
public class RunCukesTest {
}
```

This will execute all scenarios in same package as the runner; by default glue code is also assumed to be in the same
package.

You can use the `@CucumberOptions` annotation to provide
additional [configuration](/configuration/#list-configuration-options) to the runner.

You can run this test in the same way you run other JUnit tests, using
an IDE or a build tool (for example `mvn test`).


## TestNG Runner

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-calculator-testng)

## Android Runner

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/android).

## From you IDE / Third-party runners
Finally, you can run features from an IDE.

IntelliJ IDEA and Eclipse have plugins that can run features and scenarios from within an IDE:

- [IntelliJ IDEA](https://www.jetbrains.com/idea/help/cucumber.html)
- [Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse)

Please refer to the documentation for the third-party runner for details about how to pass configuration options to Cucumber.
{{% /block %}}

# From a build tool
You can also run features using a build tool.

{{% block "ruby" %}}
## Using Rake

From the command line:

```
rake features
```

This requires a `Rakefile` with a `Cucumber` task definition. For example:

```
require 'rubygems'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "--format pretty" # Any valid command line option can go here.
end
```

If you are using [Ruby on Rails](/implementations/ruby/ruby-on-rails/), this task is defined for you already.

For more information, please see the [detailed page about using `rake`.](/implementations/ruby/rake/)

## Using TextMate

See the [`Cucumber.tmbundle`](https://github.com/cucumber/cucumber-tmbundle) documentation.
{{% /block %}}

{{% block "java" %}}
## Maven Runner

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
4.  Run the following maven from the directory path where the `pom.xml` file is located:

    ```sh
    mvn clean install -DCucumberOptions="--glue package_name_of_step_definitions --plugin pretty path\to\featurefiles"
    ```

## Gradle Runner

To run Cucumber with [Gradle](https://gradle.org/):

- Gradle is installed
- The environment variable `GRADLE_HOME` is correctly configured
- The IDE is configured with the latest Gradle installation

Steps:

1.  Create a new Gradle project or look at  [java-gradle](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-gradle) example on Github
2.  Add the following dependency to `build.gradle`

    ```
    dependencies {
        testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    }
    ```

3.  Add feature `.feature` files and associated step mapping classes `.java` in `src/test/resources` and `src/test/java` respectively in a `gradle.cucumber` package.
4. Add the following Gradle `cucumber` task in `build.gradle`
    ```
    task cucumber() {
        dependsOn assemble, compileTestJava
        doLast {
            javaexec {
                main = "cucumber.api.cli.Main"
                classpath = configurations.cucumberRuntime + sourceSets.main.output + sourceSets.test.output
                args = ['--plugin', 'pretty', '--glue', 'gradle.cucumber', 'src/test/resources']
            }
        }
    }
    ```
4.  Run the following gradle task from the directory path where `build.gradle` file is located:

    ```sh
    gradle cucumber
    ```

{{% /block %}}

{{% block "javascript" %}}
## Javascript build tools
You can run cucumber-js with tools like yarn.
{{% /block %}}
