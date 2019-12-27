---
title: Writing better Gherkin
subtitle: "Some guidelines to writing better Gherkin"
---

There are several ways to make your Gherkin better.

# Describe behaviour

Your scenarios should describe the intended behaviour of the system, not the implementation.
In other words, it should describe *what*, not *how*.

For example, for an authentication Scenario, you should write:

```
When "Bob" logs in
```

instead of:

```
  Given I visit "/login"
  When I enter "Bob" in the "user name" field
    And I enter "tester" in the "password" field
    And I press the "login" button
  Then I should see the "welcome" page
```

The first example, **When "Bob" logs in**, is a *functional requirement*. The second, much longer, example is a *procedural reference*.
Functional requirements are features, but procedures belong in the implementation details.

That way, when the implementation of a feature changes, you'll only need to change the process steps behind the scenes.
The behaviour does not have to change just because the implementation does.
In fact, a good question to ask yourself when writing a feature clause is: “Will this wording need to change if the implementation does?”.

If the answer is “Yes”, then you should rework it avoiding implementation specific details.
As a side benefit, in consequence your scenarios will be a lot shorter and much easier to follow and understand.

# Consider a more declarative style

One way to make tests easier to maintain and less brittle is to use a declarative style. Declarative style describes the behaviour of the application, rather than the implementation details. They are more informative, they can help tests read better as "living documentation". They are less brittle, and let the test have a longer lifespan. A declarative style helps you focus on the value that the customer is getting, rather than the keystrokes they will use.

Imperative tests are communicative, and in some contexts, this style of test is appropriate. On the other hand, because they are so closely tied to the mechanics of the current UI, they are often more work to maintain. Any time the implementation changes, the tests need to be updated too.

Here's a more imperative style:
```
Feature: Subscribers see different sets of stock images based on their subscription level 

Scenario: Free subscribers see only the free articles
  Given users with a free subscription can access "FreeArticle1" but not "PaidArticle1" 
  When I type "freeFrieda@example.com" in the email field
  And I type "validPassword123" in the password field
  And I press the "Submit" button
  Then I see "FreeArticle1" on the home page
  And I do not see "PaidArticle1" on the home page

Scenario: Subscriber with a paid subscription can access "FreeArticle1" and "PaidArticle1"
  Given I am on the login page
  When I type "paidPattya@example.com" in the email field
  And I type "validPassword123" in the password field
  And I press the "Submit" button
  Then I see "FreeArticle1" and "PaidArticle1" on the home page  
```

Each step is a precise instruction. It is clear what is done, and the inputs and expected results are specified exactly. But it's easy to imagine changes to the application which would require changing these tests. The available options for free versus paid subscriptions can change. Even the means of logging in could change. What if, in the future, users log in with a voice interface or a thumbprint? 

A more declarative style hides the details of how the application's capabilities are implemented.

```
  Given Free Frieda has a free subscription
  When Free Frieda logs in with her valid credentials
  Then she sees a Free article on the home page

  Given Paid Patty has a basic-level paid subscription
  When Paid Patty logs in with her valid credentials
  Then she sees a Free article and a Paid article on the home page
``` 
With a declarative style, each step communicates an idea, but the exact values aren't specified. The details, such as what specific articles are free or paid, and the subscription level of different test users, are specified "behind the scenes" in the step definition code. The subscription packages can change in the future. The business can change what content is available to subscribers on free and paid plans, without having to change this test and other tests that use the same step definitions. If another subscription level is added later, it's easy to add a test for that. By avoiding terms like “click a button” that suggest implementation, the test is more resilient to implementation details of the UI. The intent of the test remains the same, even if the implementation changes later.
