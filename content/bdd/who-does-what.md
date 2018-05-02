---
title: Who Does What?
subtitle: Roles and responsibilities in a BDD team
menu:
  bdd:
    weight: 40
---

Who should be writing [Gherkin](/gherkin/) documents, and who should write
[step definitions](/cucumber/step-definitions)?

Product owners, business analysts, programmers and testers are often confused
about who should take on what responsibilities.

The answer depends on several factors, such as team structure, skills, culture,
process and more.

# The Three Amigos

*The Three Amigos* is a meeting that takes user stories and turns them into clean, thorough Gherkin scenarios. It involves three voices (at least):

- **The product owner** - This person is most concerned with the scope of the application. This involves translating user stories into a series of features. As the tester comes up with edge cases, the product owner is responsible for deciding what is within scope.
- **The tester** - This person will be generating lots of Scenarios, and lots of edge cases. How will the application break? What user stories have we not accounted for within these Features?
- **The developer** - This person will add many of the Steps to the Scenarios, and think of the details that go into each requirement. How will this application execute? What are some of the roadblocks or requirements behind the scenes?

These conversations can produce great tests, because each amigo sees
the product from a different perspective. For this reason it is *essential* that all of these roles have conversations to discover examples *together*.
[Example Mapping](/bdd/example-mapping) and Event Storming are great collaborative analysis techniques for discovering examples.

Finally, there is no reason to limit these meetings to three people—or to hold only one such meeting at the beginning of the project. Continually refine your features and collaborate with everyone to best understand how to talk about, develop, and test your application.

# Writing Gherkin

It is preferable that the first draft of any feature be written by, or with, a
“domain expert”. This person is typically a non-programmer, and always someone who knows the feature's domain from a user or business perspective.

Then the programmer(s) will go over the scenarios, refining the steps for
clarification and increased testability. The result is then reviewed by the domain expert to ensure the intent has not been compromised by the programmers’
reworking.

This cycle is repeated until everyone involved is satisfied that the
Scenarios accurately describe what is wanted in a testable manner.


# Writing Features

Cucumber tests are written in terms of “Features”. Each feature consists of one or more “Scenarios”.

Let’s start with an example Feature file:

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

Note that the scenarios do not go into the details of what the software
(or, in this case, the coworker) will do. It stays focused on the perspective of
the person the Feature is intended to serve (in this case, “a non-programmer”).

Every feature file has a single feature description at the top, but can have any
number of scenarios.

The `Feature` line names the feature. This should be a short label.

`In order to` presents the reason/justification for having the feature. In
general, this should match to one of the project’s core purposes or “business
values” such as:

- Protect revenue
- Increase revenue
- Manage cost
- Increase brand value
- Make the product remarkable
- Provide more value to your customers

`As a` describes the role of the people/users being served by the feature.

`I want` is a one sentence explanation of what the Feature is expected to do.

So, those three lines cover Why, Who, and What. Then, the document gets into the “How” with scenarios.

# Scenarios

You can have any number of scenarios for a feature.

Of course, if you have lots and lots of scenarios in one feature, you might
actually be describing *more* than one feature. When that happens, we recommend
splitting up the document into separate Feature definitions. (The definition of
“lots and lots” here is subjective, and it's up to you determine when it's time to split up a feature.)

The first line provides a short description of what the scenario is intended to
cover. If you can’t describe your scenario in a single sentence (and not a
run-on sentence), then it’s probably trying to cover too much, and should be
split into multiple scenarios.

That is followed by some combination of “Steps”—lines that begin with the
keywords `Given`, `When`, and `Then` (typically in that order).

You can have many lines that use the same keyword (e.g., `Given there is something` followed by `Given I have another thing`). To increase the readability, you can substitute the keywords `And` or `But` (e.g., `Given there is something` followed by `And I have another thing`).

In general, any `Given` step line should describe only one thing. If you have
words like “and” in the middle of a step, you are probably describing more than
one step, and should split it into multiple steps.

For example:

```gherkin
	When I fill in the "Name" field and the "Address" field
```

Becomes:

```gherkin
	When I fill in the "Name" field
	And I fill in the "Address" field
```

Cucumber features are best served by consistency. Don't say the same thing in
different ways — say it the same way every time.

For example:

```gherkin
	Given I am logged in
```

and

```Gherkin
	Given I have logged in to the site
```

have identical meaning, so it’s better to pick one and use the same line in
every Scenario where you need to be logged in.
