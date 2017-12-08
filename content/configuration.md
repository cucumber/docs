---
source: https://github.com/cucumber/cucumber/wiki/Running-Features/
title: Configuration
polyglot: true
---


You can [configure](#configuration) how Cucumber should run your features.

There are several ways to run your features with Cucumber.

# From the command line
The most standard option is to run Cucumber from the command line.

{{% block "ruby" %}}
## Using the Gem's `cucumber` Command

The following command will run the `authenticate_user` Feature. Any Feature in a sub-directory of `features/` directory must `require` features.

```
cucumber --require features features/authentication/authenticate_user.feature
```

{{% /block %}}

{{% block "java" %}}
## CLI Runner
The Command-Line Interface Runner (CLI Runner) is an executable Java class that
can be run from the command-line, or from any build tool (such as Maven, Gradle or Ant), or your IDE.

```
java cucumber.api.cli.Main
```
{{% /block %}}

{{% block "javascript" %}}
## CLI
Cucumber.js includes a executable file to run the features. After installing Cucumber in your project, you can run it with:

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
Cucumber does not work when installed globally because cucumber
needs to be required in your support files and globally installed modules cannot be required.
{{% /note %}}

{{% /block %}}

# From a build tool
You can also run your features using a build tool.

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
- Your IDE is configured with latest Maven installation

Steps:

1.  Create a new Maven project or fork from cucumber-java examples on github
2.  Add the following dependency to your  `pom.xml`

    ```xml
    <dependency>
        <groupId>io.cucumber</groupId>
      	<artifactId>cucumber-java</artifactId>
      	<version>{{% version "cucumberjvm" %}}</version>
    </dependency>
    ```

3.  Add your feature `.feature` files and associated step mapping classes `.java` in `src/test/resources` and `src/test/java` folders respectively.
4.  Run the following maven from the directory path where your `pom.xml` file is located:

    ```sh
    mvn clean install -DCucumberOptions="--glue package_name_of_step_definitions --plugin pretty path\to\your\featurefiles"
    ```

{{% /block %}}

{{% block "javascript" %}}
## Javascript build tools
You can run cucumber-js with tools like npm or yarn.
{{% /block %}}

{{% block "java" %}}
# From a test framework
You can run your features using a test framework.

## JUnit Runner

The JUnit runner uses the JUnit framework to run Cucumber. All you need is a single class with an annotation:

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

## TestNG Runner

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-calculator-testng)

## Android Runner

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/android).

## From you IDE / Third party runners
Finally, you can run your features from your IDE.

IntelliJ IDEA and Eclipse have plugins that can run features and scenarios from within an IDE:

- [IntelliJ IDEA](https://www.jetbrains.com/idea/help/cucumber.html)
- [Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse)

Please refer to the documentation for the third party runner for details about how to pass configuration options to Cucumber.
{{% /block %}}

# Configuration
You can configure how Cucumber will run your features.
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

This will print out:

```
Usage: java cucumber.api.cli.Main [options] [[[FILE|DIR][:LINE[:LINE]*] ]+ | @FILE ]

Options:

  -g, --glue PATH                        Where glue code (step definitions, hooks
                                         and plugins) are loaded from.
  -p, --[add-]plugin PLUGIN[:PATH_OR_URL]
                                         Register a plugin.
                                         Built-in formatter PLUGIN types: junit,
                                         html, pretty, progress, json, usage, rerun,
                                         testng. Built-in summary PLUGIN types:
                                         default_summary, null_summary. PLUGIN can
                                         also be a fully qualified class name, allowing
                                         registration of 3rd party plugins.
                                         --add-plugin does not clobber plugins of that
                                         type defined from a different source.
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
  --junit,OPTION[,OPTION]*               Pass the OPTION(s) to the JUnit module.
                                         Use --junit,-h or --junit,--help to print the
                                         options of the JUnit module.

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


The [JUnit Runner](#junit-runner) and [Android Runner](#android-runner) can also pick
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

Usually, this class will be empty. You can, however, specify certain JUnit options.

{{% note "Supported JUnit annotations"%}}
Cucumber only supports `@ClassRule`,`@BeforeClass` and `@AfterClass` JUnit annotations.
{{% /note %}}
{{% /block %}}

{{% block "javascript" %}}
Use the `cucumber-js --help` command to see which arguments can be passed to the executable file.
{{% /block %}}

You can also use [Tags](/tags/) to specify what to run, or pass [Environment Variables](/cucumber/environment-variables/) to Cucumber.

{{% block "java" %}}
Configuration options can also be overridden and passed to *any* of the runners via the `cucumber.options` Java system property.

For example, if you are using Maven and want to run a subset of Scenarios tagged
with `@smoke`:

```
mvn test -Dcucumber.options="--tags @smoke"
```

Some of the runners provide additional mechanisms for passing options to Cucumber.
{{% /block %}}

{{% block "ruby" %}}
You can also define common command line options in a [`cucumber.yml`](/cucumber/cucumber.yml/) file.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to configure your options, have a look at the [cucumber-js docs on GitHub](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md).
{{% /block %}}