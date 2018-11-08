---
title: Step Organization
subtitle: "How to organize your step"
polyglot:
 - java
 - javascript
 - ruby
 - kotlin

---

You can have all of your step definitions in one file, or in multiple files. When you start with your project, all your step definitions will probably be in one file.
As your project grows, it will be easiest to split them into meaningful groups in different files.
This will make your project easier to maintain.

# How Cucumber finds your features and step definitions
Be aware that, regardless of the directory structure employed, Cucumber effectively flattens the `features/` directory tree when running tests.
This means that anything ending in {{% text "java" %}}`.java`{{% /text %}}{{% text "kotlin" %}}`.kt`{{% /text %}}{{% text "javascript" %}}`.js`{{% /text %}}{{% text "ruby" %}}`.rb`{{% /text %}}
under the starting point for a Cucumber run is searched for `Feature` matches.
This is either the default case or the location specified with the {{% text "java,kotlin" %}}relevant{{% /text %}}{{% text "javascript" %}}relevant{{% /text %}}{{% text "ruby" %}}`-r`{{% /text %}} option.

# Grouping steps

Technically it doesn't matter how you name your step definition files, or which step definitions you put in a file.
You *could* have one giant file and put all your step definitions in there. But that would get very messy, and hard to maintain.
Instead, we recommend creating a separate{{% text "ruby" %}} `*_steps.rb`{{% /text %}}{{% text "java" %}} `Steps.java`{{% /text %}}{{% text "kotlin" %}} `Steps.kt`{{% /text %}}{{% text "javascript" %}} `*_steps.js`{{% /text %}} file for each domain concept.

A good rule of thumb is to have one file for each major {{% text "ruby" %}}model/database table.{{% /text %}}{{% text "java,kotlin" %}}domain object.{{% /text %}}{{% text "javascript" %}}domain object.{{% /text %}}

For example, in a Curriculum Vitae application, we might have:
{{% block "ruby" %}}
- `employee_steps.rb`
- `education_steps.rb`
- `experience_steps.rb`
- `authentication_steps.rb`
{{% /block %}}
{{% block "java" %}}
- `EmployeeSteps.java`
- `EducationSteps.java`
- `ExperienceSteps.java`
- `AuthenticationSteps.java`
{{% /block %}}
{{% block "kotlin" %}}
- `EmployeeSteps.kt`
- `EducationSteps.kt`
- `ExperienceSteps.kt`
- `AuthenticationSteps.kt`
{{% /block %}}
{{% block "javascript" %}}
- `employee_steps.js`
- `education_steps.js`
- `experience_steps.js`
- `authentication_steps.js`
{{% /block %}}

The first three files would define all the `Given`, `When`, and `Then` step definitions related to creating, reading, updating, and deleting the various {{% text "ruby" %}}models.{{% /text %}}{{% text "java" %}}types of objects.{{% /text %}}{{% text "javascript" %}}types of objects.{{% /text %}}
The last file would define step definitions related to logging in and out, and the different things a certain user is allowed to do in the system.

If you follow this pattern you also avoid the [Feature-coupled step definitions](/guides/anti-patterns#feature-coupled-step-definitions) anti-pattern.

# Writing step definitions
Don't write step definitions for steps that are not present in one of your scenarios.
These might end up as unused [cruft](http://en.wikipedia.org/wiki/Cruft) that will need to be cleaned up later.
Only implement step definitions that you actually need.

# Helper methods
Always keep in mind that Cucumber is simply a DSL wrapper around the programming language whose full expressiveness
remains available to you in the step definition files (*but not in feature files*).
On the other hand, do not lose sight that every step called as such in a step definition file is first parsed by
[Gherkin](/gherkin/) and therefore must conform to the same syntax as used in feature files.

In fact, it is recommended to refactor step definitions into helper methods for greater flexibility and easier reuse.
The method can reside in the same {{% text "java" %}}`.java`{{% /text %}}{{% text "kotlin" %}}`.kt`{{% /text %}}{{% text "javascript" %}}`.js`{{% /text %}}{{% text "ruby" %}}`.rb`{{% /text %}} file as the step definition.

This makes your project a lot easier to understand for people who join your project at a later date; which also makes your project easier to maintain.
