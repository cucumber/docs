---
title: Behaviour-Driven Development
subtitle: The process Cucumber supports
weight: 1180
menu: main
iconClass: fas fa-comments
---

Behaviour-Driven Development (BDD) is the software development process that Cucumber was built to support.

There's much more to BDD than just using Cucumber.

# What is BDD?

BDD is a way for software teams to work that aims to close the gap between business people and technical people by:

* Encouraging collaboration across roles to build shared understanding of the problem to be solved
* Working in rapid, small iterations to increase feedback and flow of value
* Producing system documentation that is current, accurate and easy to understand.

We do this by focussing collaborative work around concrete, real-world, examples that illustrate how we want the system to behave. We use those examples to guide us from concept through to implementation.

## BDD and agile

We assume that your team are using some kind of agile methodology already, planning work in small increments of value like [User Stories]. BDD does not replace your existing agile process, it enhances it.

Think of BDD as a set of plugins for your existing process that will make your team more able to deliver on the promises of agile: timely, reliable releases of working software that meets your organisation’s evolving needs.

# Four practices

Essentially, day-to-day BDD activity is a three-step, iterative, process:

1. First, take a small upcoming change to the system -- a [User Story] -- and use conversations about examples to collaboratively explore and agree on the details of what's expected to be done.
2. Next, document those examples in a way that can be automated, and check for agreement.
3. Finally, implement the behaviour described by each documented example, starting with an automated test to guide the development of the code.

The idea is to make each change small, and repeat the whole discover-specify-automate loop as often as possible. Each time you go around the loop, you've added something valuable to your system, and you're ready to respond to feedback.

Over time, the documentation develops a symbiotic relationship with the implemention code that has grown alongside it. The code reflects the documentation, and the documentation reflects the code.

We call these practices _Discovery_, _Specification_, _Automation_ and finally _Habitation_.

 <figure>
  <img alt="diagram of how the three practices fit together" src="/img/BDD practices diagram.png" width="600px">
  <figcaption>The three practices of BDD</figcaption>
</figure> 

There's lots to learn about each of these practices, but we'll summarise each of them below.

## Discovery

> The hardest single part of building a software system is deciding precisely what to build.
>
> -- <cite>Fred Brooks, The mythical man-month</cite>

Although documentation and automated tests are produced by a BDD team, you can think of them as nice side-effects. The real goal is valuable, working software, and the fastest way to get there is through conversations between the people who are involved in imagining and delivering that software.

BDD helps teams to have the right conversations at the right time so you minimise the amount of time spent in meeting rooms whilst maximising the amount of valuable code you produce.

We use structured conversations, called [specification workshops], that focus around real-world examples of the system from the users' perspective. These conversations help us to grow our team's shared understanding of the needs of our users, of the rules that govern how the system should function, and of the scope of what needs to be done.

It may also reveal gaps in our understanding, where we need more information before we know what to do.

We can often use the scrutiny of a discovery session to find low-priority functionality that can be deferred the scope of a user story, helping to team to work in smaller increments and improving their flow.

If you're new to BDD, discovery is where you should start. It's useless to try the other two practices until you've mastered discovery.

## Specification

Taking the real-world examples of system behaviour from our discovery sessions, the technical folks on the team now try to express those examples as structured documentation. This gives us a quick way to confirm that their understanding of what to build matches what the business folks have envisaged.

In contrast to traditional documentation, we use a medium that can be read by both humans and computers, so that:

* We can get feedback from the business folks about whether we understand them correctly.
* We'll be able to automate these examples to guide our development of the implementation.

By collaborating with business folks to write this executable specification, we establish a shared language for talking about the system. This is really useful for programmers who are notoriously [bad at naming things](https://martinfowler.com/bliki/TwoHardThings.html).

## Automation

Now that we have our executable specification, we can use it to guide our development of the implementation.

Taking one example at a time, we automate it by connecting it to the system as a test. The test fails because we have not implemented the behaviour it describes yet. Now we develop the implementation code, using [lower-level examples of the behaviour of internal system components](https://anarchycreek.com/2009/05/20/theyre-called-microtests/) to guide us as required.

The automated examples work like guide-rails, helping us to keep our development work on track.

When we need to come back and maintain the system later, the automated examples will help us to understand what the system is currently doing, and to make changes safely without unintentionally breaking anything.

This rapid, repeatable feedback reduces the burden of manual testing, freeing people up to do more interesting work, like exploratory testing.

## Habitation

Over time, as your living documenation and codebase grow together, a symbiotic relationship develops betweemn them. The documentation reflects the behaviour of the code, giving the whole team confidence about exactly what the system does. The code reflects the documentation, with rapid feedback for the developers if the code's behaviour strays out of the boundry defined by the living documentation.

This habitation stage will involve some maintenance effort. The documentation needs to reflect the team's shared understanding of the propblem domain, and that understanding is constantly evolving. Just like code [needs to be refactored to reflect the team's emerging understanding of the problem](https://www.youtube.com/watch?v=Jp5japiHAs4), so does your documentation.

# Learn more

Read the topics below to dig deeper and learn more about BDD.

[specification workshops]: /docs/terms/specification-workshops/
[User Story]: /docs/terms/user-story/
[User Stories]: /docs/terms/user-story/
