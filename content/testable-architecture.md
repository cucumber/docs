---
title: Testable Architecture
description: Designing for testability
---

Automated tests and executable specifications can only work with software that has a testable architecture.

A testable architecture enables fast and reliable tests that are easy to write, execute and maintain.

Having fast tests enable developers to stay focused. The tests will tell them that they are
building the right thing. In order to get into the flow, the tests need to give them really fast feedback.

When designing for testability, make sure that your products and services are composed of loosely-coupled,
well-encapsulated components or modules; follow the principles of
[SOLID design](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design))).

The following are essential for a testable architecture:
- decouple your domain logic from your infrastructure so that you can test at different levels, with maximum confidence and minimum cost.
- ports and adapters ([hexagonal architecture](http://alistair.cockburn.us/Hexagonal+architecture)), contract testing and the [test pyramid](https://martinfowler.com/bliki/TestPyramid.html)

More information:
https://www.nngroup.com/articles/response-times-3-important-limits/
https://cucumber.io/blog/2017/06/29/fast-tests
https://joecolantonio.com/testtalks/180-ten-years-cucumber-bdd-aslak-hellesoy/
https://www.joecolantonio.com/2017/11/30/3-ways-ui-based-cucumber-bdd-can-go-bad/
https://github.com/subsecondtdd/todo-subsecond
https://www.youtube.com/watch?v=Fk4rCn4YLLU&feature=youtu.be
https://speakerdeck.com/npryce/having-our-cake-and-eating-it-1
http://alistair.cockburn.us/Hexagonal+architecture
https://xp2017.sched.com/event/91jK/testable-architecture
https://skillsmatter.com/skillscasts/9971-testable-software-architecture-with-aslak-hellesoy
https://speakerdeck.com/aslakhellesoy/testable-architecture-at-devlin-2017
https://skillsmatter.com/skillscasts/9971-testable-software-architecture-with-aslak-hellesoy