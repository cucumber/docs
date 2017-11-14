---
title: Behaviour-Driven Development
---

Behaviour-Driven development (or BDD) is a software development technique that encourages conversation and collaboration between developers, testers and business participants in a software project.

BDD focuses on obtaining a clear and mutual understanding of desired behaviour of the application through conversations.
It complements [TDD](#tdd) by writing test cases in a natural language that also non-programmers can read.
The goal is to capture the outcome of the conversations in a meaningful way, using natural and domain language. The focus should be on
the intended behaviour, not the implementation or technical details. It should create shared understanding, helping the developers to create the right things.

> **"Behaviour-driven development is about implementing an application by describing its behavior from the perspective of its stakeholders”** -- Dan North

The main intention of BDD is to collaborate and create a shared understanding of the intended behaviour of the system.
It is useful to record the outcome of these conversations, in order to share this understanding with others.
A by-product of this, is that they can be used to automate tests to drive the behaviour.

# Test-Driven Development

Test-Driven development (TDD) is a software development process that relies on the repetition of a very short development cycle:
  * **RED**: Write a failing test (The tests should fail as the functionality is not implemented yet)
  * **GREEN**: Write the simplest implementation to make the test pass
  * **REFACTOR**: Refactor the code (Improve code quality; do *not* change or add functionality)

The first step is actually the hardest; this is where you think about what to implement next and how. It is where you design your application.
The next step is to write just enough code to make the test pass. This guarantees that no unnecessary code is added.
Finally, you take the time to improve the quality of the code. Are you using clear names for things? is there any duplication? Etc.
Each cycle should drive the application further towards the intended functionality, in the smallest steps possible.
The design of the application emerges as you are implementing the functionality.
After each step, run your tests again to see that everything still works.

{{% note "Note"%}}TDD is not about testing; it is the process of designing your application and it's interface as you implement it.
{{% /note %}}

# More information
[Intro to BDD and TDD](https://cucumber.io/blog/2017/05/15/intro-to-bdd-and-tdd)
[Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction)