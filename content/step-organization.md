---
source: https://github.com/cucumber/cucumber/wiki/Step-Organization/
title: Step organization
polyglot: true
---

How do you name your step definition files? What do you put in each step definition? What *don't* you put in there?

Here are some guidelines that will lead to better scenarios.

# Grouping steps

Technically it doesn't matter how you name your step definition files, or which step definitions you put in a file.
You *could* have one giant file and put all your step definitions in there. But that would get very messy, and hard to maintain.
Instead, we recommend creating a separate {{% text "ruby" %}}`*_steps.rb`{{% /text %}}{{% text "java" %}}`Steps.java`{{% /text %}}{{% text "javascript" %}}`*_steps.js`{{% /text %}} file for each domain concept.

A good rule of thumb is to have one file for each major {{% text "ruby" %}}model/database table.{{% /text %}}{{% text "java" %}}domain object.{{% /text %}}{{% text "javascript" %}}domain object.{{% /text %}}

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
{{% block "javascript" %}}
- `employee_steps.js`
- `education_steps.js`
- `experience_steps.js`
- `authentication_steps.js`
{{% /block %}}

The first three files would define all the `Given`, `When`, and `Then` step definitions related to creating, reading, updating, and deleting the various {{% text "ruby" %}}models.{{% /text %}}{{% text "java" %}}types of objects.{{% /text %}}{{% text "javascript" %}}types of objects.{{% /text %}}
The last file would define step definitions related to logging in and out, and the different things a certain user is allowed to do in the system.

If you follow this pattern you also avoid the [Feature-coupled step definitions](/anti-patterns/#feature-coupled-step-definitions) anti-pattern.