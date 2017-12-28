---
title: Installation
polyglot: true
---

{{% block "java" %}}

Cucumber-JVM is published as several JAR files in the central Maven repository. Installation is simply a matter of adding dependencies to build files:

{{% note "Dependencies"%}}
Make sure the version of cucumber dependencies is the same for all.
{{% /note %}}

# Maven

Add the following dependencies to your `pom.xml`:

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

# Gradle

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

You can use now cucumber's [CLI Runner](/configuration/#configuration) to execute by adding the following `cucumber` task to `build.gradle`. See [Configuration](/configuration):

{{% /block %}}

{{% block "ruby" %}}
Cucumber for Ruby is a ruby gem. Depending on your project structure there are
several ways to install it:

# Rubygems

Install from the command line:

```shell
gem install cucumber
```

# Bundler

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

# Ruby on Rails

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
{{% /block %}}

{{% block "javascript" %}}

Cucumber.js is available as an [NPM](https://www.npmjs.com) module. It works
with both Node.js and browsers.

# Node.js

Add `cucumber` as a development dependency:

```shell
npm install --save-dev cucumber
```

Or, if you prefer [Yarn](https://yarnpkg.com/en/):

```shell
yarn add --dev cucumber
```

{{% /block %}}
