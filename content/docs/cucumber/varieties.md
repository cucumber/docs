---
title: Cucumber Varieties
subtitle: "Varieties and Semantic versioning"

weight: 3
---

Every [Cucumber implementation](/docs/installation) has its own codebase, release cycle and [semver](https://semver.org/) version that is independent from other Cucumber implementations.

The Cucumber team also maintains a list of *varieties* which defines essential characteristics of various Cucumber versions. A Cucumber release may satisfy zero or more characteristics of a variety. If it satisfies all of them it is a member of that variety.

Marking Cucumber releases as part of a variety serves several purposes:

* Define stretch goals for upcoming Cucumber implementations
* Allow tool vendors to support particular varieties with more ease
* Documentation becomes easier to read and write as it applies to all releases in the variety

Varieties are named after Wikipedia's [list of Cucumber varieties](https://en.wikipedia.org/wiki/List_of_cucumber_varieties). Higher alphabetical order means more recent.

# Babylon

Characteristics               | [Cucumber-JVM 5.0.0-RC2] | [Cucumber.js master] | [Cucumber-Ruby 4.0.0.rc.2]
------------------------------|--------------------------|----------------------|--------------------------
[gherkin] 8.1.x               |                       ✅ |                   ❌ |            ✅ 
[cucumber-messages] 6.0.x     |                       ✅ |                   ❌ |            ✅ 
[cucumber-expressions] 6.0.x  |                       ✅ |                   ✅ |            ✅ 
[tag-expressions] 2.0.x       |                       ✅ |                   ✅ |            ✅ 
`protobuf` formatter          |                       ✅ |                   ❌ |            ❌ 

## Compatible tools

* [cucumber-html-formatter] 2.x
* [cucumber-json-formatter] 2.x

# Arola

Characteristics               | [Cucumber-JVM 4.8.0] | [Cucumber.js 6.0.0] | [Cucumber-Ruby 3.1.2]
------------------------------|----------------------|---------------------|---------------------------
[gherkin] 5.x                 |                   ✅ |                  ✅ |            ✅ 
[tag-expressions] 2.0.x       |                   ✅ |                  ✅ |            ❌ (`~> 1.1.0`) 
[cucumber-expressions] 6.0.x  |                   ✅ |                  ✅ |            ✅ 

<!--
Cucumber versions should ideally point to the latest stable (non-RC) release. 
If not, point to the latest RC release. If no RC release, point to master. 
-->
[Cucumber-JVM 5.0.0-RC2]: https://github.com/cucumber/cucumber-jvm/blob/master/CHANGELOG.md#500-rc2-YYYY-mm-dd
[Cucumber-JVM 4.8.0]: https://github.com/cucumber/cucumber-jvm/blob/master/CHANGELOG.md#480-2019-10-19

[Cucumber-Ruby 4.0.0.rc.2]: https://github.com/cucumber/cucumber-ruby/blob/master/CHANGELOG.md#400rc2-YYYY-mm-dd
[Cucumber-Ruby 3.1.2]: https://github.com/cucumber/cucumber-ruby/blob/master/CHANGELOG.md#312-2018-07-13

[Cucumber.js master]: https://github.com/cucumber/cucumber-js
[Cucumber.js 6.0.0]: https://github.com/cucumber/cucumber-js/blob/v6.0.2/CHANGELOG.md#602-2019-10-07

<!-- Libraries -->
[gherkin]: https://github.com/cucumber/cucumber/tree/master/gherkin
[cucumber-messages]: https://github.com/cucumber/cucumber/tree/master/cucumber-messages
[cucumber-expressions]: https://github.com/cucumber/cucumber/tree/master/cucumber-expressions
[tag-expressions]: https://github.com/cucumber/cucumber/tree/master/tag-expressions

<!-- Compatible tools -->
[cucumber-html-formatter]: https://github.com/cucumber/cucumber/tree/master/html-formatter
[cucumber-json-formatter]: https://github.com/cucumber/cucumber/tree/master/json-formatter
