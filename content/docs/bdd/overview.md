---
title: BDD Overview
subtitle: Basic principles and practices of BDD
---

Behaviour-Driven Development (BDD) is a set of practices that aim to reduce
some common wasteful activities in software development:

* Rework caused by misunderstood or vague requirements
* Technical debt caused by reluctance to refactor code
* Slow feedback cycles caused by silos and hand-overs

BDD aims to narrow the communication gaps between team members, foster better understanding of
the customer and promote continuous communication with real world *examples*.

Examples describe how the software is *intended to behave*, often illustrating a particular business rule or requirement.

{{% note "A simple example" %}}
> Liz should be asked to guess again when she guesses "joke"

This example is from a word guessing game. It's illustrating a rule
stipulating that a guess must be 5 letters.
{{% /note %}}

BDD can be split in two parts - *Deliberate Discovery* and *Test-Driven Development*.

# Deliberate Discovery

There are many reasons why software projects go wrong. A very common reason
is that different people in the organisation or on the team have very different
understandings of how the software should behave, and what problems it's trying
to solve.

> Ignorance is the single greatest impediment to throughput. - [Dan North](https://dannorth.net/2010/08/30/introducing-deliberate-discovery/)

Teams that *deliberately* seek to discover what they are ignorant about *before*
development starts are more productive, because there is less rework.

The most effective way to do this is through conversation and collaboration between
key stakeholders, such as:

* Product owners
* Business analysts
* Domain experts
* Users
* Programmers
* UX designers
* Testers
* Ops engineers
* And probably some others

The Cucumber way to do this is [Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction), a
simple technique for coming up with examples together.

When people in different roles have conversations about concrete examples
they will often discover a lot about the problem domain.

The examples they produce together can then become automated tests and living
documentation of how the system behaves.

# Test-Driven Development

Test-Driven Development (TDD) is a software development technique where automated tests are written
*before* the code. Developers use those tests to *drive* the development.

![Red-Green-Refactor diagram](/img/TDD-cycle.png)

TDD can be practiced at different levels of granularity, from acceptance tests
to unit tests. The BDD flavour of TDD uses natural language to describe tests.
They can be understood by non-programmers and are often based on examples created
collaboratively using Example Mapping.

[Gherkin](/docs/gherkin) is a simple syntax for such natural language tests, and
Cucumber is the tool that can execute them.

{{% note "Test after is not BDD" %}}
Many people write tests after the code is written, even with Cucumber. This is
not BDD or TDD, because the tests do not *drive* the implementation when they
are written afterwards.
{{% /note %}}

{{% note "TDD/BDD is not about testing" %}}
A common misunderstanding of TDD and BDD is that they are
testing techniques. They're not. As the name suggests, TDD and BDD are about software *development*.

It is the process of approaching your design and forcing you to think about the desired
outcome and API before you code.

Automated tests are a by-product of TDD and BDD.
{{% /note %}}
