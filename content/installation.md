---
title: Installation
polyglot: false
---

# Java

Cucumber-JVM is published as several JAR files in the central Maven repository. Install by adding dependencies to build files:

{{% note "Dependencies"%}}
Make sure the Cucumber version is the same for all Cucumber dependencies.
{{% /note %}}

## With Maven

Add the following dependencies to the `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>

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

You can now use cucumber's [CLI Runner](/cucumber/#from-the-command-line) to execute by adding a `cucumber` task to `build.gradle`.

For more information, see [Running Cucumber](/cucumber/#running-cucumber).

# Ruby

Cucumber for Ruby is a ruby gem. Depending on your project structure there are
several ways to install it:

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

## With Ruby on Rails

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

# Javascript

Cucumber.js is available as an [NPM](https://www.npmjs.com) module. It works
with both Node.js and browsers.

## With Node.js

Add `cucumber` as a development dependency:

```shell
npm install --save-dev cucumber
```

Or, if you prefer [Yarn](https://yarnpkg.com/en/):

```shell
yarn add --dev cucumber
```

# Cucumber versioning

Cucumber tries to follow the [SemVer](http://semver.org/) specification for
release numbers. Essentially, that means that:

- If only the right-hand (patch) number in the release changes, you don't need to worry.
- If the middle number (minor) number in the release changes, you don't need to worry.
- If the left-hand (major) number changes, you can expect that things might break.
