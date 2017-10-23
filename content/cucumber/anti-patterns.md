---
menu: reference
source: https://github.com/cucumber/cucumber/wiki/Feature-Coupled-Step-Definitions-(Antipattern)/
source: https://github.com/cucumber/cucumber/wiki/Conjunction-Steps-(Antipattern)/
source: https://stackoverflow.com/questions/22696646/how-to-call-a-step-from-another-step-in-cucumber-jvm
source: https://groups.google.com/forum/#!searchin/cukes/jvm$20steps$20programming/cukes/DzE_kGZx94I/5rf__N31qvAJ
title: Anti-patterns
polyglot: true
---

We describe a few anti-patterns and how to avoid them here.

For more information, see [Cucumber Anti-Patterns (blog)](http://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns).

## Feature Coupled Step Definitions (Anti-pattern)

Feature-coupled Step Definitions are Step Definitions that can't be used across Features or Scenarios. 

This may lead to an explosion of Step Definitions, code duplication, and high maintenance costs.

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

### How to decouple Steps & Step Definitions

* Organise Steps by domain concept. See [Step Organization](/cucumber/step-organization/).

* Rename Step & Step Definition files to a domain-related name (rather than a Feature- or Scenario-related name).


## Conjunction Steps (Anti-pattern)

From the online Merriam-Webster dictionary:

> **con·junc·tion**: an uninflected linguistic form that joins together sentences, clauses, phrases, or words.

Don't do this in Steps. It makes Steps too specialised, and hard to reuse. Cucumber has built-in support for conjunctions (`And`, `But`) for a reason!

### Example

```
Given I have shades and a brand new Mustang
```

### How to split Conjunction Steps

```
Given I have shades
And I have a brand new Mustang
```

### Support for Conjunction Steps

Sometimes you may want to combine several Steps into one, to make your Scenarios easier to read.

In Ruby, it is possible to [Call Steps from Step Definitions](/implementations/ruby/calling-steps-from-step-definitions/).

In Cucumber-JVM this is not supported. This is *by design*; the best tool to achieve composition and reuse is the host programming language.
To use several (smaller) steps inside a bigger step; extract each small step to a regular method, and call these methods from the bigger step.

To make your life easier, strive to keep your Steps atomic!