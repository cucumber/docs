---
title:
---

Behaviour-Driven development (or BDD) is a software development technique that encourages collaboration between developers,
QA and non-technical or business participants in a software project.

BDD focuses on obtaining a clear understanding of desired software behaviour through discussion with stakeholders.
It extends [Test-Driven Development (or TDD)](#test-driven-development) by writing test cases in a natural language that
non-programmers can read. Behaviour-driven developers use their native language in combination with the ubiquitous language
of Domain-Driven Design (DDD) to describe the purpose and benefit of their code.
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

# Behaviour-Driven Development

When using BDD to drive your application development, follow a process similar to the TDD cycle described above.

## Implementing step definitions
We recommend implementing step definitions one by one. This will help you keep track of where you are with your implementation.

## A failing step
Once a new scenario or step definition is written, you should prove that it fails by running it against the, as yet,
non-existent application code. Then (and *only* then) should you write the least application code that gets your test to pass.

## Implementing the functionality
The application code that you write should literally be the minimum that will satisfy the requirement.
(particularly if this code is totally unsuited for production use). This way, you are
forced to add additional scenarios to drive out exactly what is acceptable. This pressure forces application code to
evolve strictly to meet those requirements.

If you pre-empt the design process by writing more sophisticated
code than is called for, then you will inevitably fail to provide Scenario coverage for some of that code. You will also
write code that will never *ever* be used. This *will* happen and it *will* bite you at some point.
Keep the *[YAGNI](http://en.wikipedia.org/wiki/You_ain%27t_gonna_need_it)* principle in mind at all times.
The value of this approach is that you will rarely (*never*) have untested
code anywhere in your application. More importantly, if you rigorously adhere to this methodology, then your application
will contain the minimal code that satisfies required features.
Whenever you find yourself led down this garden path to the creeping
*[featuritis](http://en.wikipedia.org/wiki/Feature_creep)* plant ask: ***If the user did not ask for it then exactly why are we writing it?***

Before writing any line of code, whether it be feature, step, or application, think carefully about what you are actually
trying to accomplish and keep in mind this statement by Dave Thomas of *The Pragmatic Programmer* fame.

> When faced with two or more alternatives that deliver roughly the same value, take the path that makes future change easier.

## A passing step
Now that you have a passing step, without changing the step definition's logic, change the test criteria within it to something that will fail,
and prove to yourself that it fails again! Once you have assured yourself that your test is passing for the right reason,
reset the criteria so that the test passes again. Once this cycle is complete, move on to the next step or scenario.

## Prevent regression
You may rest secure in the knowledge that if changes anywhere in your project break anything then you will know of this
immediately upon running your test suite.
More importantly, you will know exactly what is broken and where it is broken when you break it.