---
title: Continuous Build
subtitle: Running Cucumber on a build server
menu:
  guides:
    weight: 60
---

Using Cucumber in a [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) (CI) environment is relatively straightforward.

The `cucumber` executable will exit with an [exit status](http://en.wikipedia.org/wiki/Exit_status)
different from `0` if one or more scenarios are failing. This is all your CI
server needs to know.

First, you have to make sure your CI server executes Cucumber.
Most CI setups invoke some kind of build tool. Common build tools are:

* [Rake](https://github.com/ruby/rake)
* [Ant](http://ant.apache.org)
* [Maven](http://maven.apache.org)

We recommend executing Cucumber from one of these on a CI server.

# Rake

If your CI server is [using Rake](/tools-ruby/#rake), just make sure
that Rake executes your Cucumber task.

# Ant JUnit output

Many CI servers can interpret XML files produced by the [Ant JUnit task](https://ant.apache.org/manual/Tasks/junit.html)
and display them as HTML. Some can even create reports over time.

If you're using such a CI server, we recommend you use Cucumber with the `JUnit` formatter.

> To get started using Cucumber in [Jenkins](http://jenkins-ci.org/), just add a build step running
> `cucumber -f junit --out WORKSPACE` and then check the
> 'Publish JUnit test result report', and enter `\*.xml` in the 'Test report XMLs' field.
> Save and run. (Later improve by using a Rake task and placing your output in a subfolder).

If you're using [Ant](http://ant.apache.org/), you can run Cucumber with the [`exec`](https://ant.apache.org/manual/Tasks/exec.html) task.

# Jenkins

A Jenkins plugin is available that produces beautiful Cucumber reports.

Follow the install instructions for [Cucumber Reports plugin](https://github.com/jenkinsci/cucumber-reports-plugin).

Overview Page:

![jenkins Cucumber report](https://github.com/masterthought/jenkins-cucumber-jvm-reports-plugin-java/raw/master/.README/feature-overview.png)

Report Page:

![jenkins Cucumber report](https://github.com/masterthought/jenkins-cucumber-jvm-reports-plugin-java/raw/master/.README/feature-passed.png)
