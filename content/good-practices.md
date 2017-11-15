---
source: https://github.com/cucumber/cucumber/wiki/Step-Organization/
title: Good Practices
polyglot: true
---

How do you name your step definition files? What do you put in each step definition? What *don't* you put in there?

Here are some guidelines that will lead to better scenarios.

# Grouping steps

Technically it doesn't matter how you name your step definition files, or which step definitions you put in a file.
You *could* have one giant file and put all your step definitions in there. But that would get very *messy*, and hard to maintain.
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

If you follow this pattern you also avoid the [Feature-coupled step definitions](#anti-patterns) anti-pattern.

# Step state

It's possible to store object state in {{% text "ruby" %}}`variables`{{% /text %}}{{% text "java" %}}variables{{% /text %}}{{% text "javascript" %}}variables{{% /text %}} inside your Step Definitions.

{{% note "Be careful with state"%}}
State can make your steps more tightly coupled and harder to reuse.
{{% /note %}}

<!--- You can follow a longer discussion [here](http://www.mail-archive.com/rspec-users@rubyforge.org/msg06268.html).
TODO: summarize relevant information from this thread? --->

{{% text "java" %}}You might also want to have a look at [dependency injection](/implementations/jvm/java-di).{{% /text %}}


# Anti-patterns

There are several anti-patterns which we will describe here. We will also give you hints on how to avoid these.

## Feature-coupled step definitions (anti-pattern)

Feature-coupled step definitions are step definitions that **can't be reused** across features or scenarios.

This may lead to an explosion of step definitions, code duplication, and high maintenance costs.

### Example

An imaginary résumé application could have the following Feature and Step Definition files:

```java
features/
+--edit_work_experience.feature
+--edit_languages.feature
+--edit_education.feature
+--steps/
   +--edit_work_experience_steps.java
   +--edit_languages_steps.java
   +--edit_education_steps.java
```

```javascript
features/
+--edit_work_experience.feature
+--edit_languages.feature
+--edit_education.feature
+--steps/
   +--edit_work_experience_steps.js
   +--edit_languages_steps.js
   +--edit_education_steps.js
```

```ruby
features/
+--edit_work_experience.feature
+--edit_languages.feature
+--edit_education.feature
+--steps/
   +--edit_work_experience_steps.rb
   +--edit_languages_steps.rb
   +--edit_education_steps.rb
```

The `edit_work_experience.feature` could have the following Scenario:

```
Scenario: add description
  Given I have a CV and I'm on the edit description page
  And I fill in "Description" with "Cucumber BDD tool"
  When I press "Save"
  Then I should see "Cucumber BDD tool" under "Descriptions"
```
The{{% text "java" %}}`edit_work_experience_steps.java`{{% /text %}}
{{% text "javascript" %}}`edit_work_experience_steps.js`{{% /text %}}
{{% text "ruby" %}}`edit_work_experience_steps.rb`{{% /text %}}could be implemented like this:

```java
    @Given("^I have a CV and I'm on the edit description page$")
    public void I_have_a_CV_and_Im_on_the_edit_description_page() {
        Employee employee = new Employee("Sally");
        employee.createCV();
    }
```

```javascript
TODO: See Java or Ruby example
```

```ruby
Given /I have a CV and I'm on the edit description page/ do
  @employee = Employee.create!(:name => 'Sally')
  @employee.create_cv
  visits("/employees/#{@employee.id}/descriptions/new")
end
```

### How to decouple steps & step definitions

* Organise steps by domain concept.

* Rename step & step definition files to domain-related names (rather than feature- or scenario-related names).


## Conjunction steps (anti-pattern)

From the online Merriam-Webster dictionary:

> **con·junc·tion**: an uninflected linguistic form that joins together sentences, clauses, phrases, or words.

Don't use steps that combine a bunch of different things. This makes steps too specialised, and hard to reuse.
Cucumber has built-in support for conjunctions (`And`, `But`) for a reason!

### Example

```
Given I have shades and a brand new Mustang
```

### How to split conjunction steps

```
Given I have shades
And I have a brand new Mustang
```

### Support for conjunction steps

Sometimes you may want to combine several steps into one, to make your scenarios easier to read.

{{% block "ruby" %}}
It is possible to [call steps from step definitions](/implementations/ruby/calling-steps-from-step-definitions/).
{{% /block %}}

{{% block "java" %}}
In Cucumber-JVM calling steps from step definitions is not supported. This is *by design*; the best tool to achieve composition and reuse is the host programming language.
To use several (smaller) steps inside a bigger step, extract each small step to a regular method, and call these methods from the bigger step.
{{% /block %}}

{{% block "javascript" %}}
<!--- TODO Is / is not supported in cucumber-js? If not, what options does js provide?--->
{{% /block %}}


To make your life easier, strive to keep your steps atomic!

## More information
For more information on anti-patterns, see [Cucumber Anti-Patterns (blog)](http://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns).