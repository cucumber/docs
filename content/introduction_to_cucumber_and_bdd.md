---
menu:
  main:
    weight: 10
title: Introduction to Cucumber and BDD
---

# What is Gherkin

Gherkin is the language that Cucumber understands. It is a [Business Readable,
Domain Specific Language](http://martinfowler.com/bliki/BusinessReadableDSL.html)
that lets you describe software's behaviour without detailing how that behaviour is
implemented.

Gherkin serves multiple purposes:

- Provide an unambiguous specification for developers
- Allow automated testing using Cucumber
- Document how the system *actually* behaves

The grammar exists in different flavours for many [spoken
languages](/gherkin/spoken-languages/) (60 at the time of writing), so that your team can use the
keywords in your own language.

There are a few conventions:

- Each Gherkin source file contains a description of a single Feature
- Each Gherkin source file uses the `.feature` extension

# What is Cucumber?

Cucumber is a [command-line
tool](https://en.wikipedia.org/wiki/Command-line_interface). When you run it, it
reads in your specifications from plain-language text files called Features,
examines them for Scenarios to test, and runs the Scenarios against your system.

Each Scenario is a list of Steps for Cucumber to work through. So that Cucumber
can understand these Feature files, they must follow some basic syntax rules.
The name for this set of rules is [Gherkin](/gherkin/).

Along with the [Features](/gherkin/#feature), you give Cucumber a set of [Step Definitions](/step-definitions/). These
files map (or "glue") each business-readable language step into programming code to carry
out what action should be performed by the Step.

In a mature test suite, the Step Definition itself will probably just be one or two lines of code that delegate to a library of support code, specific to the domain of your application.

Cucumber is also a collaboration tool.
Software teams work best when the developers and business stakeholders are
communicating clearly with one another. A great way to do that is to
collaboratively specify the work that’s about to be done using automated
acceptance tests.

Teams produce examples that describe desired behaviour before the software is implemented.
When the acceptance tests are written as examples, it stimulates people’s
imaginations and helps them see other Scenarios they hadn’t previously
considered.

When the team writes their acceptance tests collaboratively, they can develop
their own ubiquitous language for talking about their problem domain. This helps
 avoid misunderstandings.

After discovering examples as a team, developers and testers formalise those examples into Gherkin documents.

# How does Cucumber work with BDD?

Cucumber was designed specifically to ensure the acceptance tests can easily be
read and written by anyone on the team. This reveals the true value of
acceptance tests: as a communication and collaboration tool. The easy
readability of Cucumber tests draws business stakeholders into the process,
helping you really explore and understand the requirements.

Cucumber was designed specifically to help business stakeholders get involved in
writing acceptance tests.

Related test cases in Cucumber are grouped into *Features*. Each test case in a Feature is called a *Scenario*. Each Scenario contains several Steps.

The business-facing parts of a Cucumber test suite, stored in Feature files, must be written according to syntax rules—known as Gherkin—so that Cucumber can read them. Under the hood, Step Definitions translate the business-facing language of Steps into runnable programming code.

 <!-- ![Cucumber-stack](docs/images/Cucumber_Stack.png) -->

Here is an example of a Cucumber Feature:

```gherkin
Feature: Sign up Sign up should be quick and friendly**

Scenario: Successful sign up.  New users should get a confirmation email and greeted personally by the site once signed in.

Given I have chosen to sign up
When I sign up with valid details
Then I should receive a confirmation email
And I should see a personalized greeting message
```

```gherkin
Scenario: Duplicate email. Where someone tries to create an account for an email address that already exists.

Given I have chosen to sign up
But I specify an email address that has already registered
Then I should be told that the email is already registered
And I should be offered the option to recover my password
```

Anyone from the team can read this Feature file, understand what the system does, and how the system works. This helps to analyze a system's functionality, and in come up with more Scenarios where the system can be tested thoroughly.

In this way, we say that the story functions as a *living document*. As the
behavior of the system evolves over time, the team is forced to evolve the
documentation in parallel.

Acceptance tests written in this style become more than just *tests*; they are
*executable specifications*, as well as *living documentation*.

# Living Documentation

Cucumber tests share the benefit of traditional specification documents in that
they can be written and read by business stakeholders, but they have a distinct
advantage in that you can give them to a computer at any time to tell you how
accurate they are. In practice, this means that documentation, rather than
being something that's written once and then gradually becoming outdated, becomes a
[living document](https://en.wikipedia.org/wiki/Living_document) that reflects the true state of the project.

# Source of Truth

The whole team can use the Gherkin documents as a shared source of truth of how the software is supposed to work.
Having a single place to go for this information saves a lot of time that
is often wasted trying to keep requirements documents, tests, and code all in
sync. It also helps build trust within the team, because different parts of
the team no longer have their own personal versions of the truth.

# The Three Amigos

*The Three Amigos* is a meeting that takes user stories and turns them into clean, thorough Gherkin Scenarios. It involves three voices (at least):

- **The product owner** - This person is most concerned with the scope of the application. This involves translating user stories into a series of features. As the tester comes up with edge cases, the product owner is responsible for deciding what is within scope.
- **The tester** - This person will be generating lots of Scenarios, and lots of edge cases. How will the application break? What user stories have we not accounted for within these Features?
- **The developer** - This person will add many of the Steps to the Scenarios, and think of the details that go into each requirement. How will this application execute? What are some of the roadblocks or requirements behind the scenes?

These conversations can produce great tests, because each amigo sees
the product from a different perspective. For this reason it is *essential* that all of these roles have conversations to discover examples *together*.
[Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction) and Event Storming are great collaborative analysis techniques for discovering examples.

Finally, there is no reason to limit these meetings to three people—or to hold only one such meeting at the beginning of the project. Continually refine your features and collaborate with everyone to best understand how to talk about, develop, and test your application.

# Cucumber for non-programmers

Cucumber tests are written in terms of “Features”. Each Feature consists of one or more “Scenarios”.

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

Note that the Scenarios do not go into the details of what the software
(or, in this case, the coworker) will do. It stays focused on the perspective of
the person the Feature is intended to serve (in this case, “a non-programmer”).

Every Feature file has a single Feature description at the top, but can have any
number of Scenarios.

The `Feature` line names the Feature. This should be a short label.

`In order to` presents the reason/justification for having the Feature. In
general, this should match to one of the project’s core purposes or “business
values” such as:

- Protect revenue
- Increase revenue
- Manage cost
- Increase brand value
- Make the product remarkable
- Provide more value to your customers

`As a` describes the role of the people/users being served by the Feature.

`I want` is a one sentence explanation of what the Feature is expected to do.

So, those three lines cover Why, Who, and What. Then, the document gets into the “How” with Scenarios.

# Scenarios

You can have any number of Scenarios for a Feature.

Of course, if you have lots and lots of Scenarios in one Feature, you might
actually be describing *more* than one Feature. When that happens, we recommend
splitting up the document into separate Feature definitions. (The definition of
“lots and lots” here is subjective, and it's up to you determine when it's time to split up a Feature.)

The first line provides a short description of what the Scenario is intended to
cover. If you can’t describe your Scenario in a single sentence (and not a
run-on sentence), then it’s probably trying to cover too much, and should be
split into multiple Scenarios.

That is followed by some combination of “Steps”—lines that begin with the
keywords `Given`, `When`, and `Then` (typically in that order).

You can have many lines that use the same keyword (e.g., `Given there is something` followed by `Given I have another thing`). To increase the readability, you can substitute the keywords `And` or `But` (e.g., `Given there is something` followed by `And I have another thing`).

In general, any `Given` Step line should describe only one thing. If you have
words like “and” in the middle of a Step, you are probably describing more than
one Step, and should split it into multiple Steps.

For example:

```gherkin
	When I fill in the "Name" field and the "Address" field
```

Becomes:

```gherkin
	When I fill in the "Name" field
	And I fill in the "Address" field
```

Cucumber Features are best served by consistency. Don't say the same thing in
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

There are more details to writing and testing Cucumber Features
([Cucumber Backgrounder](/wiki/cucumber-backgrounder/)), but this basically
covers what a non-programmer needs to know.

# Writing Features

It is preferable that the first draft of any Feature be written by, or with, a
“domain expert”. This person is typically a non-programmer, and always someone who knows the Feature's domain from a user or business perspective.

Then the programmer(s) will go over the Scenarios, refining the Steps for
clarification and increased testability. The result is then reviewed by the domain expert to ensure the intent has not been compromised by the programmers’
reworking.

This cycle is repeated until everyone involved is satisfied that the
Scenarios accurately describe what is wanted in a testable manner.
