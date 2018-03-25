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

The grammar exists in different flavours for many [spoken languages](/gherkin/#spoken-languages) (60 at the time of writing), so that your team can use the
keywords in your own language.

There are a few conventions:

- Each Gherkin source file contains a description of a single [feature](/gherkin/#feature)
- Each Gherkin source file uses the `.feature` extension

# What is Cucumber?

Cucumber is a tool that supports *[Behaviour-Driven Development](/bdd/)* and *Executable Specifications*.
It can read your specifications from plain-language text files called features,
examine them for scenarios to test, and run the scenarios against your system.

Each scenario is a list of steps for Cucumber to work through. In order for Cucumber
to understand the feature files, they must follow some basic syntax rules, called [Gherkin](/gherkin/).

Along with the [features](/gherkin/#feature), you give Cucumber a set of [step definitions](/cucumber/#step-definitions). These
map (or "glue") each business-readable language step into runnable programming code to carry
out what action should be performed by the step.

In a mature test suite, the step definition itself will probably just be one or two lines of code that delegate to a library of support code, specific to the domain of your application.

Cucumber is also a *collaboration tool*.
Software teams work best when the developers and business stakeholders are
communicating clearly with one another. A great way to do that is to
collaboratively specify the work that’s about to be done using automated
acceptance tests.

Teams produce examples that describe desired behaviour before the software is implemented.
When the acceptance tests are written as examples, it stimulates people’s
imaginations and helps them see other scenarios they hadn’t previously
considered.

When the team writes their acceptance tests collaboratively, they can develop
their own ubiquitous language for talking about their problem domain. This helps
 avoid misunderstandings.

After discovering examples as a team, developers and testers formalise those examples into Gherkin documents.

# How does Cucumber work with BDD?

Cucumber was designed specifically to help business stakeholders get involved in
writing acceptance tests; the acceptance tests can easily be
read and written by anyone on the team. This reveals the true value of
acceptance tests: as a communication and collaboration tool. The easy
readability of Cucumber tests draws business stakeholders into the process,
helping you really explore and understand the requirements.

Related test cases in Cucumber are grouped into `Features`. Each test case in a feature is called a `Scenario`. Each scenario contains several steps.

The business-facing parts of a Cucumber test suite, stored in feature files, must be written according to syntax rules — known as [Gherkin](/gherkin/) — so that Cucumber can read them. Under the hood, step definitions translate the business-facing language of steps into runnable programming code.

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

Anyone from the team can read this feature file, understand what the system does, and how the system works. This helps to analyze a system's functionality, and in come up with more scenarios where the system can be tested thoroughly.

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
