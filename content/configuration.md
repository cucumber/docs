---
source: https://github.com/cucumber/cucumber/wiki/Running-Features/
title: Configuration
polyglot: true
---

You can configure how Cucumber will run features.

# Command-line

Configuration options can be passed to on the command-line.

{{% block "ruby" %}}
For example:

* To run the Scenario defined at line 44 of the `authenticate_user` Feature, format it as HTML, and pipe it to the `features.html` file for viewing in a browser:

```
cucumber features/authenticate_user.feature:44 --format html > features.html
```

* To run the Scenario(s) named `"Failed login"`:

```
cucumber features --name "Failed login"
```
{{% /block %}}
{{% block "java" %}}
For example, to get the Cucumber version:

```
java cucumber.api.cli.Main --version
```
{{% /block %}}


## List configuration options
You can list the options available for the Cucumber version you are using.

{{% block "ruby" %}}
Assuming you've installed Cucumber as a gem, run this at a command prompt to see the options for running features:

```
cucumber --help
```
{{% /block %}}

{{% block "java" %}}
Pass the `--help` option to print out all the available configuration options:

```
java cucumber.api.cli.Main --help
```

Or:

```
mvn test -Dcucumber.options="--help"
```

The [JUnit Runner](/running/#junit-runner) and [Android Runner](/running/#android-runner) can also pick
up configuration options defined via the `@CucumberOptions` annotation.

For example, if you want to tell Cucumber to use the two formatter plugins `pretty` and `html`, you can specify it like this:

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

Usually, this class will be empty. You can, however, specify several JUnit rules.

{{% note "Supported JUnit annotations"%}}
Cucumber supports JUnits `@ClassRule`, `@BeforeClass` and `@AfterClass` annotations.
These will executed before and after all scenarios. Using these is not recommended, as it limits the portability between different runners;
they may not execute correctly when using the commandline, [IntelliJ IDEA](https://www.jetbrains.com/help/idea/cucumber.html) or
[Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse). Instead it is recommended to use Cucumbers `Before`
+and `After` [hooks](/hooks/).
{{% /note %}}

The Cucumber runner acts like a suite of a JUnit tests. As such other JUnit features such as Categories, Custom JUnit
Listeners and Reporters can all be expected to work.

For more information on JUnit, see the [JUnit web site](http://www.junit.org).
{{% /block %}}

{{% block "javascript" %}}
Use the `cucumber-js --help` command to see which arguments can be passed to the executable file.
{{% /block %}}

You can also use [tags](/tags/) to specify what to run, or pass [environment variables](/cucumber/environment-variables/) to Cucumber.

{{% block "java" %}}
Configuration options can also be overridden and passed to *any* of the runners via the `cucumber.options` Java system property.

For example, if you are using Maven and want to run a subset of scenarios tagged
with `@smoke`:

```
mvn test -Dcucumber.options="--tags @smoke"
```

Some of the runners provide additional mechanisms for passing options to Cucumber.
{{% /block %}}

{{% block "ruby" %}}
You can also define common command-line options in a [`cucumber.yml`](/cucumber/cucumber.yml/) file.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to configure options, have a look at the [cucumber-js docs on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md).
{{% /block %}}