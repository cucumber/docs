---
title: Reporting
polyglot:
  - java
  - dot-net
---

Cucumber uses reporter plugins to produce reports that contain information about
what scenarios have passed or failed.

Some plugins are built-in, others have to be installed separately. You can also
build your own.

# Built-in reporter plugins

# Other reporter plugins

## Cucumber Pro

This {{% text "java" %}}Cucumber{{% /text %}}{{% text "dot-net" %}}SpecFlow{{% /text %}} plugin publishes 
results to [Cucumber Pro](https://cucumber.io/pro).

### Requirements

Your project must be stored in a Git repository, and you must be using one of the 
following CI servers:

* [Bamboo](https://www.atlassian.com/software/bamboo)
* [Circle CI](https://circleci.com/)
* [Jenkins](https://jenkins.io/)
* [Team Foundation Server (TFS)](https://www.visualstudio.com/tfs/)
* [Travis CI](https://travis-ci.org/)
* [Wercker](http://www.wercker.com/)

### Installation

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

{{% block "dot-net" %}}
Use NuGet to install the plugin into your SpecFlow project:

```shell
PM> Install-Package Cucumber.Pro.SpecFlowPlugin
```
{{% /block %}}

### Configuration

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

### Authentication

If you are publishing to https://app.cucumber.pro/ you also have to define
an environment variable named `CUCUMBERPRO_TOKEN` in your CI project. The value
should be your Cucumber Pro project's API token, avaiable from the project
settings page. Consult your CI server's documentation for details about how
to define environment variables.

Authentication is not required on a privately hosted Cucumber Pro Appliance.

### Activation

The plugin will activate itself automatically if it detects that it's running 
in one of the supported CI environments. When you run {{% text "java" %}}Cucumber{{% /text %}}{{% text "dot-net" %}}SpecFlow{{% /text %}} from your workstation the plugin will **not**
be activated, and will not publish results.

When you configure the plugin for the first time you can force-activate the plugin 
from your work station by defining the following environment variables:

* `GIT_COMMIT` - you can find it by running `git rev-parse HEAD`
* `GIT_BRANCH` - you can find it by running `git rev-parse --abbrev-ref HEAD`

This is useful for verifying that you have configured the plugin correctly.

### Profiles

If you run {{% text "java" %}}Cucumber{{% /text %}}{{% text "dot-net" %}}SpecFlow{{% /text %}}
several times as part of your build (with different options, 
perhaps different tags), you can specify a different *profile name* for each run. 
This allows Cucumber Pro to show separate results for each profile.

The profile name can be specified in the `CUCUMBERPRO_PROFILE` environment variable,
which you would typically define in a wrapper script that launches 
{{% text "java" %}}Cucumber{{% /text %}}{{% text "dot-net" %}}SpecFlow{{% /text %}}.

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

### Advanced configuration

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

You can make some of the settings global by creating a file wit global settings.
The plugin will load the configuration in all the following files (if they exist):

{{% block "java" %}}
* `/usr/local/etc/cucumber/cucumber.yml`
* `~/.cucumber/cucumber.yml`
* `~/cucumber.yml`
* `./cucumber.yml` (relative to the git root)
* `./.cucumber/cucumber.yml` (relative to the git root)
{{% /block %}}

{{% block "dot-net" %}}
* `C:\cucumber\cucumber.yml`
* `My Documents\.cucumber\cucumber.yml`
* `My Documents\cucumber.yml`
* `cucumber.yml` (relative to the git root)
* `.cucumber\cucumber.yml` (relative to the git root)
{{% /block %}}

Every setting can also be overridden with environment variables. For example, if you want
the plugin to log more verbosely:

```
# Linux / OS X
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
