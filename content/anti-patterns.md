---
title: Anti-patterns
polyglot:
  - java
  - javascript
  - ruby
---

There are several anti-patterns, which we will describe here. We will also give you hints on how to avoid them!

# Feature-coupled step definitions

Feature-coupled step definitions are step definitions that **can't be reused** across features or scenarios.

This may lead to an explosion of step definitions, code duplication, and high maintenance costs.

**Example**

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
var { Given } = require('cucumber');

Given(/^I have a CV and I'm on the edit description page$/, function () {
  this.employee = new Employee('Sally');
  this.employee.createCV();
});
```

```ruby
Given /I have a CV and I'm on the edit description page/ do
  @employee = Employee.create!(:name => 'Sally')
  @employee.create_cv
  visits("/employees/#{@employee.id}/descriptions/new")
end
```

## How to decouple steps & step definitions

* Organise your steps by domain concept.

* Use domain-related names (rather than feature- or scenario-related names) for your step & step definition files.


# Conjunction steps

From the online Merriam-Webster dictionary:

> **con·junc·tion**: an uninflected linguistic form that joins together sentences, clauses, phrases, or words.

Don't use steps that combine a bunch of different things. This makes steps too specialised, and hard to reuse.
Cucumber has built-in support for conjunctions (`And`, `But`) for a reason!

**Example**

```
Given I have shades and a brand new Mustang
```

## How to split conjunction steps

```
Given I have shades
And I have a brand new Mustang
```

## Support for conjunction steps

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

# More information
For more information on anti-patterns, see [Cucumber Anti-Patterns (blog)](http://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns).