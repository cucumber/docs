---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Feature-Coupled-Step-Definitions-(Antipattern)/
title: Feature Coupled Step Definitions (Anti-pattern)
polyglot: true
---

> TODO: Move to Step Definitions

Feature-coupled Step Definitions are Step Definitions that can't be used across Features or Scenarios. 

This is considered an anti-pattern, as it may lead to an explosion of Step Definitions, code duplication, and high maintenance costs.

## Example

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

```java
The `edit_work_experience_steps.java` could be implemented like this:
```
```javascript
TODO: See Java or Ruby example
```
```ruby
The `edit_work_experience_steps.rb` could be implemented like this:
```

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

## How to fix

* Organise Steps by domain concept. See [Step Organization](/cucumber/step-organization/).

* Rename Step & Step Definition files to a domain-related name (rather than a Feature- or Scenario-related name).

* Break up [Conjunction Steps (Antipattern)](/gherkin/conjunction-steps-antipattern/) Steps into individual Steps.
