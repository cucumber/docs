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

You can now run Cucumber [from the command line](/cucumber/#from-the-command-line) or [run Cucumber with Maven](/tools-java/#maven).

## With Gradle

If you are going to use the lambda expressions API (Java 8) to write the step
definitions, add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java8:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```


Otherwise, to write them using annotated methods, add the following dependencies to `build.gradle`:

```
dependencies {
    testCompile 'io.cucumber:cucumber-java:{{% version "cucumberjvm" %}}'
    testCompile 'io.cucumber:cucumber-junit:{{% version "cucumberjvm" %}}'
}

repositories {
    mavenCentral()
}
```

You can now run Cucumber [from the command line](/cucumber/#from-the-command-line) to execute by [adding a cucumber task](/tools-java/#gradle) to `build.gradle`.

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

## Assertion library

Cucumber does not come with an assertion library. Instead, use the assertion methods
from a [unit testing tool](/cucumber/checking-assertions/#java).

## Dependency Injection

While it's not required, we strongly recommend you include one of the
[dependency injection](/cucumber/state/#dependency-injection) modules as well. This allows
you to share state between [step definitions](/cucumber/#step-definitions)
without resorting to static variables (a common source of flickering Scenarios).

# Javascript

Cucumber.js is available as an [NPM](https://www.npmjs.com) module. It works with both [Node.js](https://nodejs.org/en/) and browsers.

## With Node.js

Add `cucumber` as a development dependency:

```shell
npm install --save-dev cucumber
```

## With Yarn

Or, if you prefer [Yarn](https://yarnpkg.com/en/):

```shell
yarn add --dev cucumber
```

# Ruby

Cucumber for Ruby is a Ruby gem. Depending on your project structure there are several ways to install it:

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

```shell
cucumber --init
```

[Bundler](http://gembundler.com/) is a utility gem that manages project specific RubyGem dependencies such that each
Rails project is unaffected by the gem requirements of another.
If you use Bundler to support multiple gem versions in multiple Rails projects on a single development host then you must
run Cucumber using the preface `bundle exec`. For example: `bundle exec cucumber -pnone features`.

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

Cucumber-Rails will detect whether the RSpec gems are installed. If so, then the rails generator builds the environment files to suit.
If not, it ignores RSpec and configures for test-unit instead.

# Cucumber versioning

Cucumber tries to follow the [SemVer](http://semver.org/) specification for
release numbers. Essentially, that means that:

- If only the right-hand (patch) number in the release changes, you don't need to worry.
- If the middle number (minor) number in the release changes, you don't need to worry.
- If the left-hand (major) number changes, you can expect that things might break.