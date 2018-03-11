---
title: Installation
---

# Java

Cucumber-JVM is published in the central Maven repository.
You can install it by adding dependencies to your project.

{{% note "Dependencies"%}}
Make sure the Cucumber version is the same for all Cucumber dependencies.
{{% /note %}}

## With Maven

If you are going to use the lambda expressions API (Java 8) to write the step
definitions, add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java8</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

Otherwise, to write them using annotated methods, add the following dependency to your  `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

If you plan to use Cucumber with JUnit, add the following dependency to the `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

## With Gradle

Add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

To use lambda expressions (Java 8) to write the step definitions, replace `java` with `java8`.

If you plan to use Cucumber with JUnit, add a JUnit dependency to `build.gradle`.

You can now use Cucumber's [CLI Runner](/cucumber/#from-the-command-line) to execute by adding a `cucumber` task to `build.gradle`.

For more information, see [Running Cucumber](/cucumber/#running-cucumber).

## Snapshot releases

To take advantage of functionality that has been committed to the git `master` branch, but hasn't been released to the central Maven repo yet, you can use `SNAPSHOT` builds from the [sonatype snapshot repo](https://oss.sonatype.org/content/repositories/snapshots/io/cucumber/).

If you are using Maven, add the sonatype repository to your `pom.xml`:

```xml
<repository>
    <id>sonatype-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
```

Then, add a dependency to the snapshot version to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm-snapshot" %}}</version>
    <scope>test</scope>
</dependency>
```

You can find the current snapshot version number [here](https://github.com/cucumber/cucumber-jvm/blob/master/pom.xml).

If you are using Gradle, check the [build.gradle](https://github.com/cucumber/cucumber-java-skeleton/blob/master/build.gradle) file in the cucumber-java-skeleton project.

## Dependency Injection

While it's not required, we strongly recommend you include one of the
[dependency injection](/cucumber/state/#dependency-injection-in-java) modules as well. This allows
you to share state between [step definitions](/cucumber/#step-definitions)
without resorting to static variables (a common source of flickering Scenarios).

# Javascript

Cucumber.js is available as an [NPM](https://www.npmjs.com) module. It works with both Node.js and browsers.

## With Node.js

Add `cucumber` as a development dependency:

```shell
npm install --save-dev cucumber
```

Or, if you prefer [Yarn](https://yarnpkg.com/en/):

```shell
yarn add --dev cucumber
```

# Ruby

Cucumber for Ruby is a ruby gem. Depending on your project structure there are several ways to install it:

## With Rubygems

Install from the command line:

```shell
gem install cucumber
```

## With Bundler

Add `cucumber` to your `Gemfile`:

```ruby
group :test do
  gem 'cucumber'
end
```

Install the gem:

```shell
bundle
```

Try it out:

```shell
cucumber --help
```

Then, initialize a `features/` directory:

```
cucumber --init
```

## With Ruby on Rails

[Cucumber-Rails](https://github.com/cucumber/cucumber-rails) is a generator that
generates and modifies files in a Rails project so it can be used with Cucumber.

Add `cucumber-rails` to your `Gemfile`:

```ruby
group :test do
  gem 'cucumber-rails', :require => false
  # database_cleaner is not mandatory, but highly recommended
  gem 'database_cleaner'
end
```

Install the gem:

```shell
bundle
```

Learn about the various options:

```shell
rails generate cucumber:install --help
```

Run the generator:

```shell
rails generate cucumber:install
```

# Cucumber versioning

Cucumber tries to follow the [SemVer](http://semver.org/) specification for
release numbers. Essentially, that means that:

- If only the right-hand (patch) number in the release changes, you don't need to worry.
- If the middle number (minor) number in the release changes, you don't need to worry.
- If the left-hand (major) number changes, you can expect that things might break.