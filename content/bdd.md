---
title: Behaviour-Driven Development
---

Behaviour-Driven development (or BDD) is a software development technique that encourages collaboration between developers,
QA and non-technical or business participants in a software project.

BDD focuses on obtaining a clear understanding of desired software behaviour through discussion with stakeholders.
It extends [Test-Driven Development (or TDD](#test-driven-development) by writing test cases in a natural language that non-programmers can read.
Behaviour-driven developers use their native language in combination with the ubiquitous language of Domain-Driven design
to describe the purpose and benefit of their code.
This allows the developers to focus on why the code should be created, rather than the technical details, and minimises
translation between the technical language in which the code is written and the domain language spoken by the business,
users, stakeholders, project management, etc.

**"Behaviour-driven development is about implementing an application by describing its behavior from the perspective of
its stakeholders"** -- Dan North

The main intention of a BDD framework is to avoid communication gaps between team members, foster better understanding of
the customer and promote continuous communication with real world examples.

# Test-Driven Development

Test-Driven development (TDD) is a software development process that relies on the repetition of a very short development cycle.
Requirements are turned into very specific test cases, then the software is improved to pass the new tests.
This is opposed to software development that allows software to be added that isn't proven to meet requirements.
Begin by writing a very small test for code that does not yet exist. Run the test and, naturally, it fails.
Now write just enough code to make that test pass. Once the test passes, observe the resulting design and re-factor as needed.
It is natural at this point to judge the design as too simple to handle all of the responsibilities this code will have.

As the code base gradually increases in size, more and more attention is consumed by the re-factoring step. The design is constantly evolving and under constant review, though it is not predetermined. This process is known as emergent design, and is one of the most significant by-products of Test Driven Development.

TDD follows this cycle:

  * **RED**: Write a test and run it (Test will fail, as it's not implemented yet)
  * **GREEN**: Write the simplest implementation to make the test pass
  * **REFACTOR**: Refactor the code to improve quality

**Note**: TDD is not about testing; it is the process of approaching your design and forcing you to think about the desired
outcome and API before you code.


