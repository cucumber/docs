---
title: Reporting
subtitle: "Built-in reporter plugins, Cucumber Pro, Third-party plugins"
polyglot:
- java
- dotnet
---

Cucumber uses reporter plugins to produce reports that contain information about
what scenarios have passed or failed.

Some plugins are built-in, others have to be installed separately. You can also
build your own.

This page documents built-in formatter plugins, the Cucumber Pro plugin, and some common third-party plugins.
Available plugins may vary per programming language.

# Built-in reporter plugins

There are several reporter plugins built into Cucumber:

* `progress`
* `pretty`
* `html`
* `json`
* `rerun`
* `junit`

# Cucumber Pro plugin

This {{% text "java" %}}Cucumber{{% /text %}}{{% text "dotnet" %}}SpecFlow{{% /text %}} plugin publishes
results to [Cucumber Pro](https://cucumber.io/pro).

## Requirements

Your project must be stored in a Git repository, and you must be using one of the
following CI servers:

* [Bamboo](https://www.atlassian.com/software/bamboo)
* [Circle CI](https://circleci.com/)
* [Jenkins](https://jenkins.io/)
* [Team Foundation Server (TFS)](https://www.visualstudio.com/tfs/)
* [Travis CI](https://travis-ci.org/)
* [Wercker](http://www.wercker.com/)

## Installation

{{% block "java" %}}
Add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>pro-plugin</artifactId>
    <version>{{% version "propluginjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

(If you're using Gradle or a different build system, declare a similar dependency).

Enable the plugin in the JUnit class you use to run Cucumber:

```java
@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"io.cucumber.pro.JsonReporter:default"})
public class RunCucumberTest {
}
```

If you're on Cucumber-JVM 1.2.5 or older, use `io.cucumber.pro.JsonReporter12:default`
instead of `io.cucumber.pro.JsonReporter:default`.

{{% /block %}}

{{% block "dotnet" %}}
Use NuGet to install the plugin into your SpecFlow project:

```shell
PM> Install-Package Cucumber.Pro.SpecFlowPlugin
```
{{% /block %}}

## Configuration

Create a file called `cucumber.yml` in the root directory of your git repository with
the following contents (replace `***` with actual values).

```yaml
cucumberpro:
  # The name of the Cucumber Pro project.
  # You can leave this blank if your Cucumber Pro project name is identical to the
  # CI project name, and you you're using one of Bamboo, Circle CI, TFS, Travis
  # or Wercker.
  projectname: ***
  # The URL of the Cucumber Pro server.
  # You can leave this blank if you are publishing to https://app.cucumber.pro/
  url: ***
```

## Authentication

If you are publishing to https://app.cucumber.pro/ you also have to define
an environment variable named `CUCUMBERPRO_TOKEN` in your CI project. The value
should be your Cucumber Pro project's API token, avaiable from the project
settings page. Consult your CI server's documentation for details about how
to define environment variables.

Authentication is not required on a privately hosted Cucumber Pro Appliance.

## Activation

The plugin will activate itself automatically if it detects that it's running
in one of the supported CI environments. When you run {{% text "java" %}}Cucumber{{% /text %}}{{% text "dotnet" %}}SpecFlow{{% /text %}} from your workstation the plugin will **not**
be activated, and will not publish results.

When you configure the plugin for the first time you can force-activate the plugin
from your work station by defining the following environment variables:

* `GIT_COMMIT` - you can find it by running `git rev-parse HEAD`
* `GIT_BRANCH` - you can find it by running `git rev-parse --abbrev-ref HEAD`

This is useful for verifying that you have configured the plugin correctly.

## Profiles

If you run {{% text "java" %}}Cucumber{{% /text %}}{{% text "dotnet" %}}SpecFlow{{% /text %}}
several times as part of your build (with different options,
perhaps different tags), you can specify a different *profile name* for each run.
This allows Cucumber Pro to show separate results for each profile.

The profile name can be specified in the `CUCUMBERPRO_PROFILE` environment variable,
which you would typically define in a wrapper script that launches
{{% text "java" %}}Cucumber{{% /text %}}{{% text "dotnet" %}}SpecFlow{{% /text %}}.

{{% block "java" %}}
The profile name can also be specified by appending a colon and a profile name to the
plugin class name:

```java
@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"io.cucumber.pro.JsonReporter:smoke"}, tags = "@ui and @smoke")
public class RunCucumberTest {
}
```

```java
@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"io.cucumber.pro.JsonReporter:default"}, tags = "not @ui and not @smoke")
public class RunCucumberTest {
}
```
{{% /block %}}

## Advanced configuration

The `cucumber.yml` configuration file has more options that can be overridden for
finer grained control. The defaults are as follows:

```yaml
cucumberpro:
  # The name of the Cucumber Pro project.
  projectname:

  # The project-specific authentication token. You can find it in the project settings (press `?` to display it).
  #
  # Rather than defining the value in this file we recommend defining the `CUCUMBERPRO_TOKEN` environment variable
  # in your CI server.
  #
  # Consult your CI server's documentation for details about defining per-project environment variables.
  # Some CI servers such as Travis and Circle CI allow you to define environment variables in a file checked into git.
  # *DO NOT DO THIS* - as it would allow anyone with read acceess to your repository to publish results.
  token:

  # The plugin sends your local environment variables to Cucumber Pro so it can detect the CI build number,
  # git branch/tag and other information about the build. This mask is a regular expression for filtering
  # out sensitive values that should not be sent to Cucumber Pro.
  envmask: SECRET|KEY|TOKEN|PASSWORD|PWD

  # Sets the log level to one of `DEBUG`, `INFO`, `WARN`, `ERROR` or `FATAL`. Defaults to `WARN`.
  # Setting it to `DEBUG` will also print the current configuration when the plugin runs.
  logging: INFO

  # Writes out the log messages to the specified file. Useful for debugging.
  logfile:

  # Override this if you are using a privately hosted Cucumber Pro Appliance.
  # We recommend setting this with a CUCUMBERPRO_URL environment variable defined globally on your build server.
  url: https://app.cucumber.pro/

  connection:
    # Set this to false if you want the build to break in case Cucumber Pro is unavailable.
    ignoreerror: true

    # If the http connection for publishing results takes longer than this (milliseconds),
    # time out the connection.
    timeout: 5000
```

You can make some of the settings global by creating a file with global settings.
The plugin will load the configuration in all the following files (if they exist):

{{% block "java" %}}
* `/usr/local/etc/cucumber/cucumber.yml`
* `~/.cucumber/cucumber.yml`
* `~/cucumber.yml`
* `./cucumber.yml` (relative to the git root)
* `./.cucumber/cucumber.yml` (relative to the git root)
{{% /block %}}

{{% block "dotnet" %}}
* `C:\cucumber\cucumber.yml`
* `My Documents\.cucumber\cucumber.yml`
* `My Documents\cucumber.yml`
* `cucumber.yml` (relative to the git root)
* `.cucumber\cucumber.yml` (relative to the git root)
{{% /block %}}

Every setting can also be overridden with environment variables. For example, if you want
the plugin to log more verbosely:

```
# Linux / MacOS
export CUCUMBERPRO_LOGGING=DEBUG

# Windows
SET CUCUMBERPRO_LOGGING=DEBUG
```

{{% block "java" %}}
Alternatively, you can specify a Java system property (in Maven, Gradle or other build tool):

```
-Dcucumberpro.logging=DEBUG
```
{{% /block %}}

# Third-party plugins
There are also many third-party plugins:

* Masterthought
* TeamCity - prints Cucumber results in a format for interpretation by a [TeamCity](http://www.jetbrains.com/teamcity/index.html) build agent.
   * [teamcity_formatter](https://github.com/kevinrood/teamcity_formatter) - Compatible with Cucumber 2.
   * [cucumber_teamcity](https://github.com/ankurcha/cucumber_teamcity/) - Tested with Cucumber 1.3.18 and TeamCity 8.x.
* [TextmateFormatter](https://github.com/raldred/cucumber_textmate/) prints Cucumber results as HTML with enhanced styling and Javascript for Textmate (Included in the Cucumber core since 0.4.5)
* [SlowHandCuke](https://github.com/moredip/SlowHandCuke) - Simple tweak to the Pretty formatter to display the currently running Step as it is running
* [timestamped-scenarios](https://github.com/moredip/timestamped-scenarios) - Append test run timestamps to each Scenario name as it is being output.
* [Fivemat](https://github.com/tpope/fivemat) - Cucumber formatter that gives each test file its own line of dots.
* [Fuubar](https://github.com/martinciu/fuubar-cucumber) - The insta-failing progress bar formatter
* [Viewcumber](https://github.com/versapay/viewcumber) - Cucumber formatter which generates an HTML website to browse your Scenarios and view screen capture of every single Step.
* [cucumber_timing_presenter](https://github.com/distributedlife/cucumber_timing_presenter) - formatter that calculates timing metrics as well as two graphs showing impact of Step time on overall build time.
* [Bilgerat](https://github.com/mdsol/bilgerat) - formatter that sends failure messages to [HipChat](https://www.hipchat.com/) rooms.
* [cucumber_statistics](https://github.com/alienfast/cucumber_statistics) - Tracks timing and displays results in a single HTML page with outliers highlighted in a table sortable by various metrics.
* [cucumber_characteristics](https://github.com/singram/cucumber_characteristics) - Generates HTML/JSON reports on overall test timings, as well as timings and usage of Steps, Features, and Examples. Also lists unused and ambiguous (Cucumber 1.x) Steps. Compatible with Cucumber 1.x and 2.1+ and Ruby 1.9+.
* [allure-cucumber](https://github.com/allure-framework/allure-cucumber) - [Allure](https://github.com/allure-framework) adaptor for Cucumber. This formatter generates the XML files for Allure reporting framework.
* [Cluecumber](https://github.com/trivago/cluecumber-report-plugin) - Maven plugin for clear and concise Cucumber reporting.