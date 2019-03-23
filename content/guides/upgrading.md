---
title: Upgrading
subtitle: Versioning, changes per version
polyglot:
  - java
  - javascript
  - ruby
  - kotlin
weight: 1700
---
We try to add new features to Cucumber periodically. This means you may want to upgrade to a newer version to take advantage of these new features, as well as any bug fixes.

# Versioning
Cucumber tries to follow the [SemVer](http://semver.org/) specification for release numbers.
Essentially, this means that:

* If only the right-hand (patch) number in the release changes, you don't need to worry.
* If the middle number (minor) number in the release changes, you don't need to worry.
* If the left-hand (major) number changes, you can expect that things might break.

# Changelog
You can read the history file to learn about the changes in every release:

[cucumber changelog](https://github.com/cucumber/cucumber/blob/master/History.md)

{{% block "ruby" %}}
[cucumber-ruby changelog](https://github.com/cucumber/cucumber-ruby/blob/master/CHANGELOG.md)
{{% /block %}}

{{% block "java,kotlin" %}}
[cucumber-jvm changelog](https://github.com/cucumber/cucumber-jvm/blob/master/CHANGELOG.md)
{{% /block %}}

{{% block "javascript" %}}
[cucumber-js changelog](https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md)
{{% /block %}}

# Migration guides
We don't have any migration guides at the moment, but blog post announcing new versions usually contain an overview of the changes made in that particular version.
This includes information about any breaking changes when a new major version is released.

{{% block "java,kotlin" %}}
The following blog posts describe the changes made per release:

* [Announcing Cucumber-JVM 2.0.0](https://cucumber.io/blog/2017/08/29/announcing-cucumber-jvm-2-0-0)

* [Announcing Cucumber-JVM 2.2.0](https://cucumber.io/blog/2017/12/05/announcing-cucumber-jvm-2-2-0)

* [Announcing Cucumber-JVM 2.3.0](https://cucumber.io/blog/2017/12/11/announcing-cucumber-jvm-2-3-0)

* [Announcing Cucumber-JVM 3.0.0](https://cucumber.io/blog/2018/05/19/announcing-cucumber-jvm-3-0-0)

* [Announcing Cucumber-JVM 4.0.0](https://cucumber.io/blog/2018/09/24/announcing-cucumber-jvm-4-0-0)

* [Announcing Cucumber-JVM 4.2.0](https://cucumber.io/blog/2018/10/31/announcing-cucumber-jvm-4-2-0)

Details can be found in the [changelog](https://github.com/cucumber/cucumber-jvm/blob/master/CHANGELOG.md).
{{% /block %}}