+++
title = "Introduction to Cucumber for non programmers"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Cucumber tests are written in terms of “features”. Each feature consists of one or more “scenarios”.

Let’s start with an example feature file:
```Gherkin
Feature: Explaining Cucumber
  In order to gain an understanding of the Cucumber testing system
  As a non-programmer
  I want to have an overview of Cucumber that is understandable by non-geeks

  Scenario: A worker seeks an overview of Cucumber
    Given I have a coworker who knows a lot about Cucumber
    When I ask my coworker to give an overview of how Cucumber works
    And I listen to their explanation
    Then I should have a basic understanding of Cucumber
```

Note that the scenarios do not go into the nitty-gritty of what the software (or, in this case, the coworker) will do. It stays focused on the perspective of the person the feature is intended to serve (in this case, “a non-programmer”).

Every feature file has a single Feature description at the top, but can have any number of Scenarios.

The `Feature` line names the feature. This should be a short label.

`In order to` presents the reason/justification for having the feature. In general, this should match to one of the project’s core purposes or “business values” such as:
* Protect revenue
* Increase revenue
* Manage cost
* Increase brand value
* Make the product remarkable
* Provide more value to your customers

`As a` describes the role of the people/users being served by the feature.

`I want` is a one sentence explanation of what the feature is expected to do.

So, those three lines cover Why, Who and What. Then we get into the “How” with scenarios.

## Scenarios

You can have any number of scenarios for a feature. However, if you have a lot of scenarios, you might really be describing more than one feature and could consider splitting into separate feature definitions. (The definition of “a lot” here is subjective and left as an exercise for the reader.)

The first line provides a short description of what the scenario is intended to cover. If you can’t describe your scenario in a single sentence (and not a run-on sentence) it’s probably trying to cover too much and should be split into multiple scenarios.

That is followed by some combination of “steps” — lines that begin with the keywords `Given`, `When` and `Then`, generally in that order. You can have many lines for the same keyword (e.g., `Given there is something` followed by `Given I have another thing`). To increase the readability, you can substitute the keywords `And` or `But` (e.g., `Given there is something` followed by `And I have another thing`).

In general, any given step line should describe only one thing. If you have words like “and” in the middle of a step, you are probably describing more than one step and can split it into multiple step lines. E.g.:
```Gherkin
	When I fill in the "Name" field and the "Address" field
```
becomes:
```Gherkin
	When I fill in the "Name" field
	And I fill in the "Address" field
```

Cucumber features are best served by consistency. Don't say the same thing in different ways — say it the same way every time. For example:
```Gherkin
	Given I am logged in
```
and
```Gherkin
	Given I have logged in to the site
```
have identical meaning, so it’s better to pick one and use the same line in every scenario where you need to be logged in.

There are more details to writing and testing Cucumber features ([Cucumber-Backgrounder](Cucumber-Backgrounder)), but this basically covers what a non-programmer needs to know.

## Writing Features

It is preferable that the first draft of any feature be written by, or with, a “domain expert” — typically a non-programmer and always someone who knows the feature domain from a user or business perspective.

Then the programmer(s) will go over the scenarios, refining the steps for clarification and to increase testability. That then gets reviewed by the domain expert to ensure the intent has not been compromised by the programmers’ reworking. That cycle is repeated until all involved are satisfied that the scenarios accurately describe what is wanted in a testable manner.
