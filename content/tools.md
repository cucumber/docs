---
title: Tools
---

Using Cucumber in your project is easier with the right tools.

# Editors and IDEs

Most popular text editors support Gherkin syntax highlighting.

Some IDEs also have advanced support for Cucumber, such as running Cucumber
from within the IDE, Displaying results, navigating between Gherkin steps and
Step Definitions and so on.

## Java IDEs

### IntelliJ IDEA

- [IntelliJ IDEA](https://www.jetbrains.com/idea/help/cucumber.html)

### Eclipse

- [Cucumber-Eclipse](https://github.com/cucumber/cucumber-eclipse)

## Editors

### Atom

[Atom](https://atom.io/) is a text editor for macOS 10.9 or later.
It offers several [packages](https://atom.io/packages/search?q=cucumber) you can use with Cucumber.

### TextMate

[TextMate](https://macromates.com/) is a text editor for macOS.
See the [`Cucumber.tmbundle`](https://github.com/cucumber/cucumber-tmbundle) documentation.

### Visual Studio Code
[Visual Studio Code](https://code.visualstudio.com/) is a code editor for Windows, Linux, or macOS.
You can use it with a [Cucumber (Gherkin) plugin](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete).

# Build Tools
You can run Cucumber using build tools, rather than from the command line.

## Java build tools
The most widely used build tools for Java are Maven and Gradle.

### Maven

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

    ```shell
    mvn clean install -DCucumberOptions="--glue package_name_of_step_definitions --plugin pretty path\to\featurefiles"
    ```

### Gradle

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

```shell
gradle cucumber
```

## Ruby build tools

### Rake

Using Rake requires a `Rakefile` with a `features` task definition.  For example:

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

If you are using [Ruby on Rails](/implementations/ruby/ruby-on-rails/), this task is defined for you already.

Now you can run Cucumber with Rake:

```shell
rake features
```

# Using Profiles in Rake Tasks

For complex Feature runs that are tested often, it is nice to save the command line arguments as [Cucumber profiles](/cucumber/cucumber.yml).

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

# Guarding Your Production Boxes From Cucumber

Since Rake tasks are used on development and productions systems, it is generally a good idea to place a guard around your Cucumber task so your productions boxes don't need to install Cucumber.

Below is an example of how to do this.  This example is the Rake task that Cucumber generates for Rails projects, but the same idea applies to any project using Cucumber and Rake:

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

