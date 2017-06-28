+++
title = "Continuous Integration"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Using Cucumber in a [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) (CI) environment is relatively straightforward.

The <code>cucumber</code> executable will exit with an [exit status](http://en.wikipedia.org/wiki/Exit_status) different from 0 if one or more scenarios are failing, and this is all your CI server needs to know.

First, you have to make sure your CI server executes cucumber. Most CI setups invoke some kind of build tool, typically [Rake](http://rake.rubyforge.org/), [Ant](http://ant.apache.org/) or [Maven](http://maven.apache.org/) and we recommend you execute cucumber from one of these.

Rake
----

If your CI server is \[\[using Rake\]\], just make sure it executes your cucumber task.

Ant, Maven and JUnit output
---------------------------

Many CI servers can interpret XML files produced by the [Ant JUnit task](https://ant.apache.org/manual/Tasks/junit.html) and display them as HTML. Some can even create reports over time.

If you're using such a CI server we recommend you use Cucumber with the <code>junit</code> formatter.

> Example. To get started using cucumber in [Jenkins](http://jenkins-ci.org/), just add a build step running
> '<code>cucumber -f junit --out WORKSPACE</code>' and then check the
> 'Publish JUnit test result report', and enter <code>\*.xml</code> in the 'Test report XMLs' field.
> Save and run. (Later improve by using a rake task and placing your output in a subfolder).

If you're using Ant, you can run cucumber with the [exec](http://ant.apache.org/manual/CoreTasks/exec.html) task. If you're using JRuby or [cuke4duke](http://wiki.github.com/cucumber/cuke4duke) you can also take a peek at cuke4duke's [Ant documentation](http://wiki.github.com/cucumber/cuke4duke/ant)

If you're using Maven, we recommend you follow cuke4duke's [Maven documentation](http://wiki.github.com/cucumber/cuke4duke/maven)
