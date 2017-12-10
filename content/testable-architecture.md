---
title: Testable Architecture
description: Designing for testability
---

Automated tests and executable specifications can only work with software that has a testable architecture.
A testable architecture enables fast and reliable tests that are easy to write, execute and maintain.
Fast tests enable the developers to run them and obtain fast feedback on what they are building, without loosing focus or flow.

When designing for testability, make sure that your products and services are composed of loosely-coupled,
well-encapsulated components or modules; following the principles of
[SOLID design](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)).

Decoupling your business logic from your infrastructure (the often slow and brittle components),
makes it possible to test at different levels, with maximum confidence and minimum cost.

* Ensure that you can run your tests underneath your UI. Do not depend solely on UI tests. They are slow, expensive, and hard to fix.
* Running tests against a database makes tests slow. And to make the tests behave consistently each time we run them,
we need to make sure the database is in the expected state for each test, so the tests don't interfere with one another.

We want our tests to use some kind of in-memory stub implementation, instead of an actual database.
From the perspective of the domain logic, the behavior looks exactly the same.
To make sure that the stub works in the same way as the real thing, we need to have confidence, which we can obtain using ‘contract tests’.

We can think of our database and our stub as two things that can be plugged into the same socket, or **port**.
The application containing the business logic doesn't need to know it's talking to a stub rather than the actual database; it's simply talking to this port
and storing and retrieving data. We can run our tests using both the stub and the real implementation. This gives us confidence that the stub behaves like the real thing.

The business logic is at the core of the application, completely decoupled from external devices and services. It doesn’t know anything about databases, message queues,
and web services because we’ve isolated them through these ports. Often, these ports are connected to adapters that interact with the real implementation. There will be an adapter for the database,
an adapter for the queue, and an adapter for the web service. There is also a port that defines how we can interact with our system, such as
a web server which plugs into this port and displays a UI in a browser. All the IO tends to happen outside of these ports.

This architectural patterns is called the **ports and adapters pattern** (or [hexagonal architecture](http://alistair.cockburn.us/Hexagonal+architecture)).
This pattern enables you to hook your scenarios and unit tests at a lower level, while he 'contract tests' give you the confidence to do that.

You’ll want to run *some* tests that go through the whole depth of your stack, to get complete confidence.
Diagnosing where the problem is in a full-stack, end-to-end test is really hard, because it can be anywhere.
These tests are brittle because one change can break all your tests. They are also slow,
as there is IO involved when going through a a browser, web service or database.

Focus on having different kinds of tests; lots and lots of unit tests.
A few tests that don’t go through all the heavy infrastructure components and just a few tests that go through the UI.
This is called the [test pyramid](https://martinfowler.com/bliki/TestPyramid.html).

More information:

https://sdjournal.org/bdd-like-jazz/

https://www.nngroup.com/articles/response-times-3-important-limits/

https://cucumber.io/blog/2017/06/29/fast-tests

https://joecolantonio.com/testtalks/180-ten-years-cucumber-bdd-aslak-hellesoy/

https://www.joecolantonio.com/2017/11/30/3-ways-ui-based-cucumber-bdd-can-go-bad/

https://github.com/subsecondtdd/todo-subsecond

https://xp2017.sched.com/event/91jK/testable-architecture

https://skillsmatter.com/skillscasts/9971-testable-software-architecture-with-aslak-hellesoy

https://speakerdeck.com/aslakhellesoy/testable-architecture-at-devlin-2017