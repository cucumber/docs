---
title: Tools
polyglot:
polyglot:
  - java
  - javascript
  - ruby
---

Using Cucumber in your project is easier with the right tools.

# Editors and IDEs

Most popular text editors support Gherkin syntax highlighting.

Some IDEs also have advanced support for Cucumber, such as running Cucumber
from within the IDE, displaying results, navigating between Gherkin steps and
step definitions and so on.

{{% block "java" %}}

**IntelliJ IDEA**

- [IntelliJ IDEA](https://www.jetbrains.com/idea/) has the [IntelliJ IDEA Cucumber for Java plugin](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)

You can find more information on using Cucumber with IntelliJ IDEA in the [IntelliJ IDEA Cucumber help pages](https://www.jetbrains.com/idea/help/cucumber.html)

**Eclipse**

- [Eclipse](https://www.eclipse.org/) has the [Cucumber Eclipse plugin](https://cucumber.github.io/cucumber-eclipse/)

{{% /block %}}

## Editors

### Atom

[Atom](https://github.com/atom/atom) is a text editor for macOS, Windows or Linux.

It offers several [packages](https://atom.io/packages/search?q=cucumber) you can use with Cucumber.

### TextMate

[TextMate](https://macromates.com/) is a text editor for macOS.
See the [`Cucumber.tmbundle`](https://github.com/cucumber/cucumber-tmbundle) documentation.

### Visual Studio Code
[Visual Studio Code](https://code.visualstudio.com/) is a code editor for Windows, Linux, or macOS.

You can use it with a [Cucumber (Gherkin) plugin](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete).

# Build Tools
You can run Cucumber using build tools, rather than from the command line.

{{% block "java" %}}
The most widely used build tools for Java are Maven and Gradle.

**Maven**

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
    mvn clean install -DCucumberOptions="--glue package_name_of_step_definitions \
       --plugin pretty path\to\featurefiles"
    ```

**Gradle**

To run Cucumber with [Gradle](https://gradle.org/), make sure that:

- Gradle is installed
- The environment variable `GRADLE_HOME` is correctly configured
- The IDE is configured with the latest Gradle installation

Steps:

1.  Create a new Gradle project or look at [java-gradle](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-gradle) example on Github
2.  Add the following dependency to `build.gradle`

```
dependencies {
    testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
}
```

3.  Add feature `.feature` files and associated step mapping classes `.java` in `src/test/resources` and `src/test/java` respectively in a `gradle.cucumber` package.
4.  Add the following Gradle `cucumber` task in `build.gradle`

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

5.  Run the following gradle task from the directory path where `build.gradle` file is located:

```shell
gradle cucumber
```

{{% /block %}}

{{% block "ruby" %}}

Cucumber can be run in several ways.
Be aware that `rake cucumber`, `cucumber features`, and `autotest` with `ENV AUTOFEATURE=true` do not necessarily produce
the same results given the same features and step definitions.

**Rake**

Running `rake cucumber` from the command line provides the simplest method to run Cucumber tests.

Using Rake requires a `Rakefile` with a `features` task definition. For example:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "--format pretty" # Any valid command line option can go here.
end
```

This will run all the Features with the pretty formatter.

Note, how we use the `cucumber_opts` accessor to define our arguments passed to Cucumber.

If you are using Ruby on Rails, this task is defined for you already.

Now you can run Cucumber with Rake:

```shell
rake features
```

The rake script provided with Cucumber performs much of the background magic required to get the test database and requisite
libraries properly loaded.
In fact, an important habit to acquire is to run Cucumber as a `rake` task immediately after performing a migration.
This ensures that the test database schema is kept in sync with the development database schema.
You can achieve the same effect by running `rake db:test:prepare` before your first Cucumber run following a migration
but developing the habit of just running `rake cucumber` or `rake cucumber:wip` is probably the better course.

The Cucumber Rake task recognises the `@wip` Tag, so `rake cucumber:wip` will run only those scenarios tagged with **@wip**.

For example, given a feature file containing:

```
Feature: .  .  .

  Scenario: A

  @wip
  Scenario: B

  Scenario: C
```

Then running the command `rake cucumber:wip` will run the Steps contained inside Scenario B only,
while running `rake cucumber:ok` will run the Steps within all Scenarios other than B.

**Using Profiles in Rake Tasks**

For complex Feature runs that are tested often, it is nice to save the command line arguments as [Cucumber profiles](/cucumber/configuration/#defining-profiles).

Once you have some profiles defined, you can use them in your Rake tasks, like so:

```ruby
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'

namespace :features do
  Cucumber::Rake::Task.new(:non_js) do |t|
    t.profile = "webrat"
  end

  Cucumber::Rake::Task.new(:selenium) do |t|
    t.profile = "selenium"
  end
end
```

**Guarding Your production machines From Cucumber**

Since Rake tasks are used on development and productions systems, it is generally a good idea to place a guard around your Cucumber task so your productions boxes don't need to install Cucumber.

Below is an example of how to do this. This example is the Rake task that Cucumber generates for Rails projects, but the same idea applies to any project using Cucumber and Rake:

```ruby
require 'rubygems'

begin
  require 'cucumber'
  require 'cucumber/rake/task'

  Cucumber::Rake::Task.new(:features) do |t|
    t.cucumber_opts = "--format pretty"
  end

  task :features => 'db:test:prepare'
rescue LoadError
  desc 'Cucumber rake task not available'
  task :features do
    abort 'Cucumber rake task is not available. Be sure to install cucumber as a gem or plugin'
  end
end
```

**Ruby-on-Rails**

**Rails 3.x and above**

Go to Cucumber-Rails' [README](https://github.com/cucumber/cucumber-rails/blob/master/README.md) for installation instructions.

As of Cucumber-Rails version 0.5.0 and above, Cucumber-Rails **only** supports Rails 3.x and above (Rails 2 is **not** supported).

{{% /block %}}