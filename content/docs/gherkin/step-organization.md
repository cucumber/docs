---
title: Step Organization
subtitle: "How to organize your steps"
polyglot:
 - java
 - javascript
 - ruby
 - kotlin

---

You can have all of your step definitions in one file, or in multiple files. When you start with your project, all your step definitions will probably be in one file.
As your project grows, you should split your step definitions into meaningful groups in different files.
This will make your project more logical and easier to maintain.

# How Cucumber finds your features and step definitions
Be aware that, regardless of the directory structure employed, Cucumber effectively flattens the `features/` directory tree when running tests.
This means that anything ending in {{% text "java" %}}`.java`{{% /text %}}{{% text "kotlin" %}}`.kt`{{% /text %}}{{% text "javascript" %}}`.js`{{% /text %}}{{% text "ruby" %}}`.rb`{{% /text %}}
inside the directory in which Cucumber is run is treated as a step definition. In the same directory, Cucumber will search for a `Feature` corresponding to that step definition.
This is either the default case or the location specified with the {{% text "java,kotlin" %}}relevant{{% /text %}}{{% text "javascript" %}}relevant{{% /text %}}{{% text "ruby" %}}`-r`{{% /text %}} option.

# Grouping steps

Technically it doesn't matter how you name your step definition files, or which step definitions you put in a file.
You *could* have one giant file containing all your step definitions. However, as the project grows, the file can become messy and hard to maintain.
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

If you follow this pattern you also avoid the [Feature-coupled step definitions](/docs/guides/anti-patterns#feature-coupled-step-definitions) anti-pattern.

# Writing step definitions
Don't write step definitions for steps that are not present in one of your scenarios.
These might end up as unused [cruft](https://en.wikipedia.org/wiki/Cruft) that will need to be cleaned up later.
Only implement step definitions that you actually need.

# Helper methods
Always keep in mind that Cucumber is a DSL wrapper around the programming language whose full expressiveness
remains available to you in the step definition files (*but not in feature files*).
On the other hand, do not lose sight that every step called as such in a step definition file is first parsed by
[Gherkin](/docs/gherkin/) and therefore must conform to the same syntax as used in feature files.

In fact, it is recommended to refactor step definitions into helper methods for greater modularity and reuse.
The method can reside in the same {{% text "java" %}}`.java`{{% /text %}}{{% text "kotlin" %}}`.kt`{{% /text %}}{{% text "javascript" %}}`.js`{{% /text %}}{{% text "ruby" %}}`.rb`{{% /text %}} file as the step definition.

This makes your project more understandable for people who join your project at a later date; which also makes your project easier to maintain.

# Grouping step definitions

Avoid writing similar step definitions, as they can lead to clutter. While documenting your steps helps, making use of **helper methods** to abstract them can do wonders.

For example, take the following steps:

```
    Given I go to the home page
    Given I check the about page of the website 
    Given I get the contact details
```

If all of these steps open their respective web pages, you might be writing *redundant steps*. While the underlying code
for these steps could be different, their **behaviour** is essentially the same, i.e. *to open the Home, About or
Contact page*.

As such, you can use abstract helper methods to reduce them into a single step:

    Given I go to the {} page

And the following step definition:

```java
@Given("I go to the {string} page")
public void i_want_to_open_page(String webpage) {
  webpageFactory.openPage(webpage);
}
```

```javascript
 //TODO
```

```ruby
 Given 'I go to the {string} page' do |page|
   open_web_page page
 end
```

```kotlin
 //TODO
```

Your step definitions are the glue to the actual code (in this example, a factory method to decide which page to open).
They can also be used to hide implementation details by calling several reusable helper methods from one step
definition.

This helps in a number of ways:

* Increased maintainability.
* Increased scalability with reusable steps.
* More understandable tests.

You can handle other behaviours, like *validating a webpage, clicking a button, etc.*, the same way.

{{% text "java,kotlin" %}}We suggest taking a look at the [Factory Design Pattern]
(https://refactoring.guru/design-patterns/factory-method) as well.{{% /text %}} Using
[Data Tables](/docs/cucumber/api/#data-tables) for providing inputs to steps helps increase maintainability and
understandability.
