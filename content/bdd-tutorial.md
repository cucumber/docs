---
title: BDD Tutorial
---
Behaviour-Driven Development (BDD) is a **collaborative** approach to software development that bridges the communication gap between business and IT. BDD helps teams communicate requirements with more precision, discover defects early and produce software that remains maintainable over time.

It helps teams create business requirements that can be understood by the whole team. Specifying examples uncovers misunderstanding people might not even be aware of. Teams that practice BDD focus on *preventing* defects rather than finding them. This leads to less rework and quicker time to market.

The two main practices in the BDD approach are **discovery workshops**, which bridge the communication gap between business and IT, and **executable specifications**.

# Discovery Workshops

Discovery workshops (or Specification workshops) are short and frequent meetings where business and IT meet to gain a **common understanding** of how the software should behave.

Business stakeholders and IT representatives (developers and testers) meet to discuss features or user stories. These roles are often called the "Three Amigos".
They have *conversations* about concrete *examples* that illustrate the business rules and acceptance criteria. The purpose of these examples is to trigger discovery through conversations, but also to define how the system should behave.

Conversations about concrete examples help expose ambiguities and misunderstandings between people with different perspectives. Some questions can be answered immediately; otherwise they can be written down and analysed further after the workshop. Discovering misunderstandings is one of the key goals of BDD! Discovering them *early* helps prevent defects.

Discovery workshops allows business stakeholders to verify that the developers have understood what they are supposed to build *before* they build it. It also gives business stakeholders better insight into the size and complexity of the story, based on the number of questions and examples. By getting testers involved before the software is written, they can focus their effort on helping developers prevent defects rather than finding them weeks or months later.

# Executable Specifications

The concrete examples that are created can be used as executable software specifications to automatically verify that the software behaves as intended.

With Cucumber, this means writing Given-When-Then scenarios to illustrate the examples.
These specifications (called scenarios) are then executed regularly by a tool like Cucumber - a free, open source product that can run executable specifications against the software being built. Other similar tools include FIT, Fitnesse, JBehave, Concordion, Robot Framework and Twist.

Teams run these specifications throughout development to get immediate feedback about how much is yet to be done, and whether the software meets the user’s requirements. The executable specifications tell them what needs to be implemented. Cucumber provides information in which parts of the specification are implemented correctly, and which parts are incomplete or defective. The build and design of the application is guided by failing tests, just like with TDD. The main difference is that Cucumber operates on a higher abstraction level, closer to the domain and farther away from classes and methods. BDD builds on TDD, while preserving a strong link between the business requirements and the technical solution.

This technique is called Outside-in because programmers typically start with the functionality that is closest to the user (the user interface, which is on the outside of the system) and gradually work towards the guts of the system (business logic, persistence, messaging and so on) as they discover more of what needs to be implemented.

Andrew Premdas, one of the first adopters of Cucumber, says it well:

    Your cucumber features should drive your implementation, not reflect it.

This means Cucumber features should be written before the code implementing the feature.

When you do BDD/Specification by Example and Outside-in, regression tests are a by-product of those activities. Testing isn't the activity itself.

These executable specifications also work as automated regression tests which reduces costly and time-consuming manual regression testing. Testers can use their time for more valuable things, like exploratory testing.

Keeping specifications, regression tests and documentation in a single place reduces the overhead of keeping multiple documents in sync - the Cucumber scenarios work as a shared source of truth for business and IT.

While many people focus on the value added by the automated "tests" you get out of BDD, the real value is actually the **shared understanding** we get at the beginning.