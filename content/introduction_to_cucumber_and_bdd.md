---
title: Introduction to Cucumber and BDD
menu:
  main:
    weight: 10
---

# What is Gherkin

Gherkin is the language that Cucumber understands. It is a [Business Readable,
Domain Specific
Language](http://martinfowler.com/bliki/BusinessReadableDSL.html) that lets you
describe software's behaviour without detailing how that behaviour is
implemented.

Gherkin serves two purposes — documentation and automated tests. The third is a
bonus feature — when it yells in red it's talking to you, telling you what code
you should write.

Gherkin's grammar is defined in the Treetop grammar that is part of the Cucumber
codebase. The grammar exists in different flavours for many spoken
languages (60 at the time of writing), so that your team can use the
keywords in your own language.

There are a few conventions.

-   Single Gherkin source file contains a description of a single feature.
-   Source files have `.feature` extension.

# What is Cucumber?

Cucumber is a [command-line
tool](https://en.wikipedia.org/wiki/Command-line_interface). When you run it, it
reads in your specifications from plain-language text files called features,
examines them for scenarios to test, and runs the scenarios against your system.
Each scenario is a list of steps for Cucumber to work through. So that Cucumber
can understand these feature files, they must follow some basic syntax rules.
The name for this set of rules is [Gherkin](docs/gherkin.md).

Along with the features, you give Cucumber a set of step definitions. These
files map each business-readable language step into programming code to carry
out what action shoule be performed by the step. In a mature test suite, the
step definition itself will probably just be one or two lines of code that
delegate to a library of support code, specific to the domain of your
application.

Software teams work best when the developers and business stakeholdersare
communicating clearly with one another. A great way to do that is to
collaboratively specify the work that’s about to be done using automated
acceptance tests.

When the acceptance tests are written as examples, they stimulate people’s
imaginations and help them see other scenarios they hadn’t previously
considered.

When the team write their acceptance tests collaboratively, they can develop
their own ubiquitous language for talking about their problem domain. This helps
them avoid misunderstandings.

# How does Cucumber work with BDD?

This is the most typical question for every enthusiastic personality would get.
What makes Cucumber to stand out from the crowd of other communication and
collaboration tools ?

Cucumber has designed specifically to ensure the acceptance tests can easily be
read and written by anyone on the team. This reveals the true value of
acceptance tests: as a communication and collaboration tool. The easy
readability of Cucumber tests draws business stakeholders into the process,
helping you really explore and understand the requirements.

Cucumber was designed specifically to help business stakeholders get involved in
writing acceptance tests.

Each test case in Cucumber is called a scenario, and scenarios are grouped into
features. Each scenario contains several steps. The business-facing parts of a
Cucumber test suite, stored in feature files, must be written according to
syntax rules—known as Gherkin—so that Cucumber can read them. Under the hood,
step definitions translate from the business-facing language of steps into
programming code.

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

Anyone from the team can go through the Feature file an can understand what is
the system for, And how it works(functionality).This helps in analyzing the
functionality of the system and come up with more scenarios where the
system/software can be tested thoroughly.

In this way, we say that the story functions as a living document. As the
behavior of the system evolves over time, the team is forced to evolve the
documentation in parallel.

Acceptance tests written in this style become more than just tests,they are
executable specifications along with living documentation.

# Living Documentation

Cucumber tests share the benefit of traditional specification documents in that
they can be written and read by business stakeholders, but they have a distinct
advantage in that you can give them to a computer at any time to tell you how
accurate they are. In practice, this means that your documentation, rather than
being something that's written once and then gradually goes out of date, becomes
a [living document](https://en.wikipedia.org/wiki/Living_document) that reflects
the true state of the project.

# Source of Truth

For many teams, they become the definitive source of truth as to what the system
does. Having a single place to go for this information saves a lot of time that
is often wasted trying to keep requirements documents, tests, and code all in
sync. It also helps to build trust within the team, because different parts of
the team no longer have their own personal versions of the truth.

# The Three Amigos

The Three Amigos is a meeting that takes user stories and turns them into clean
and thorough Gherkin scenarios. It involves three voices (at least):

+ **The product owner** - This person is most concerned with the scope of the application. This involves translating user stories into a series of features. As the tester comes up with edge cases, the product owner is responsible for deciding what is within scope.
+ **The tester** - This person will be generating lots of scenarios, and lots of edge cases. How will the application break? What user stories have we not accounted for within these features?
+ **The developer** - This person will add many of the steps to the scenarios, and think of the details that go into each requirement. How will this application execute? What are some of the roadblocks or requirements behind the scenes?

These conversations can produce great tests because each amigo is able to see
the product from a different angle. If the tests are being developed before the
application is built, these conversations will also be clarifying for all
parties going forward and help to develop a shared (ubiquitous) language for the
product.

Finally, there is no reason to limit these meetings to three people, or to only
hold one at the beginning of the project. Continually refine your features and
collaborate with everyone to best understand how to talk about, develop, and
test your application.
