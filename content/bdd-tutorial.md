---
title: Behaviour-Driven Development
---

Behaviour-Driven development (or BDD) is a software development technique that encourages conversation and collaboration between developers, testers and business participants in a software project.

It's focus is obtaining a clear and mutual understanding of desired behaviour of the application through conversations.
The goal is to capture the outcome of the conversations in a meaningful way, using natural and domain language. The focus should be on
the intended behaviour, not on the implementation or technical details. It should create shared understanding, helping the developers to create the right things.

> **"Behaviour-driven development is about implementing an application by describing its behavior from the perspective of its stakeholders”** -- Dan North

The main intention of BDD is to collaborate and create a shared understanding of the intended behaviour of the system.
It is useful to record the outcome of these conversations, in order to share this understanding with others.
A by-product of this, is that they can be used to automate tests to drive the behaviour of the application.

In this way, it is similar to [TDD](#tdd) which also uses tests to drive the intended functionality.
The main difference is that BDD uses a natural language that also non-programmers can read.

# Test-Driven Development

Test-Driven development (TDD) is a software development process that relies on the repetition of a very short development cycle:

  * **RED**: Write a failing test (The test should fail as the functionality is not implemented yet)
  * **GREEN**: Write the simplest implementation to make the test pass
  * **REFACTOR**: Refactor the code (Improve code quality; do *not* change or add functionality)

The first step is actually the hardest; this is where you think about what to implement next and how. It is where you design your application.
In order to write your test, you also have to think about the interface of the application; how are you going to test for intended functionality.

The next step is to write *just enough* code to make the test pass. This guarantees that no unnecessary code or functionality is added.

Once your code does what it's supposed to do, take some time to improve the quality of the code (refactor): Are you using clear names for things? Is there any duplication? Etc.

Each cycle should drive the application further towards the intended functionality, in the smallest steps possible.
The design of the application emerges as you are implementing the functionality.

After each step, run your tests again to see that everything still works!

{{% note "Note"%}}TDD is not about testing; it is the process of designing your application as you build it.
{{% /note %}}

# More information
[Intro to BDD and TDD](https://cucumber.io/blog/2017/05/15/intro-to-bdd-and-tdd)

[Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction)