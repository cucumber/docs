+++
title = "Feature Coupled Step Definitions (Antipattern)"
source = "https://github.com/cucumber/cucumber/wiki/Feature-Coupled-Step-Definitions-(Antipattern)/"
menu = ["all", "wiki"]
+++

Feature-coupled step definitions are step definitions that can't be used across features or scenarios. This is evil because it may lead to an explosion of step definitions, code duplication and high maintenance costs.

Example
-------

An imaginary resume application could have the following features and step files:

    features/
    +--edit_work_experience.feature
    +--edit_languages.feature
    +--edit_education.feature
    +--steps/
       +--edit_work_experience_steps.rb
       +--edit_languages_steps.rb
       +--edit_education_steps.rb

The <code>edit\_work\_experience.feature</code> could have the following scenario:

    Scenario: add description
      Given I have a CV and I'm on the edit description page
      And I fill in "Description" with "Cucumber BDD tool"
      When I press "Save"
      Then I should see "Cucumber BDD tool" under "Descriptions"

The <code>edit\_work\_experience\_steps.rb</code> could be implemented like this:

    Given /I have a CV and I'm on the edit description page/ do
      @employee = Employee.create!(:name => 'Sally')
      @employee.create_cv
      visits("/employees/#{@employee.id}/descriptions/new")
    end

How to fix
----------

\#\# Organise steps by domain concept. See \[\[Step Organization\]\].

\#\# Rename step.rb files to a domain-related name (rather than feature/scenario-related name).

\#\# Break up \[\[Conjunction Steps (Antipattern)\]\] steps into individual steps.
