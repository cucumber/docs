---
title: Testable Architecture
subtitle: How to have fast and reliable tests
weight: 1400
---

Automated tests and executable specifications can only work with software that has a testable architecture.
A testable architecture enables fast and reliable tests that are easy to write, execute and maintain.

# Fast feedback
Fast tests enable the developers to run them frequently to obtain fast feedback on what they are building, without
losing focus or flow.

# Testability
When designing for testability, make sure that your products and services are composed of loosely-coupled,
well-encapsulated components or modules.

Decoupling your business logic from your infrastructure (the often slow and brittle components),
makes it possible to test at different levels, with maximum confidence and minimum cost.

* Ensure that you can run your tests without going through the user interface (UI). They are slow, brittle, expensive,
and hard to fix. Do not depend solely on UI tests.
* Running tests against a database makes tests slow. We need to make sure the database is in the expected state before
each test in order to make the tests behave consistently.
This will ensure that tests don't interfere with each other and can be executed in any order.

We want most of our tests to use some kind of in-memory stub implementation, instead of an actual database.
From the perspective of the domain logic, the behavior looks exactly the same.
To make sure that the stub works in the same way as the real thing, we need to have confidence, which we can obtain using [contract tests](https://martinfowler.com/bliki/IntegrationContractTest.html).

# Ports and adapters
We can think of our database and our stub as two things that can be plugged into the **port**.
The application containing the business logic doesn't need to know if it's talking to a stub or the actual database; it's simply talking to this port
and storing and retrieving data. We can run our tests using both the stub and the real implementation. This gives us confidence that the stub behaves like the real thing.

The business logic is at the core of the application, completely decoupled
from external devices and services. It doesn’t know anything about databases, message queues,
or web services, because we have isolated them through these ports. Often,
these ports are connected to adapters that interact with the real implementation.
There will be an adapter for the database, an adapter for the queue, and an adapter for the web service.
The user interface defines how we can interact with our system. It will also have an adapter, such as
a web server that plugs into a port to display a UI in a browser. All the IO tends to happen outside of these ports.
By testing the core business logic directly though the ports, we can eliminate a lot of slow and brittle IO.

This architectural patterns is called **ports and adapters pattern** (or [hexagonal architecture](https://web.archive.org/web/20180822100852/http://alistair.cockburn.us/Hexagonal+architecture)).
It enables you to connect your scenarios and unit tests at a lower level, while the contract tests give you the confidence to do that.

# Full stack
You’ll want to run *some* tests that go through the whole depth of your stack, to get complete confidence.
Diagnosing where the problem is in a full-stack, end-to-end test is really hard, because it can be anywhere.
These tests are brittle because one change can break all of them. They are also slow,
as there is IO involved when going through a a browser, web service or database.

# Test Pyramid
Focus on having different kinds of tests; lots and lots of unit tests.
A few tests that don’t go through all the heavy infrastructure components and just a few tests that go through the UI.
This is called the [test pyramid](https://martinfowler.com/bliki/TestPyramid.html).

# More information

For an example of how to implement fast tests (in node.js), see [subsecondtdd on GitHub](https://github.com/subsecondtdd/todo-subsecond).

Or have a look at Aslak's [talk at Devlin 2017](https://skillsmatter.com/skillscasts/9971-testable-software-architecture-with-aslak-hellesoy)
- or the [slides](https://speakerdeck.com/aslakhellesoy/testable-architecture-devlin-2017) - about this subject.
