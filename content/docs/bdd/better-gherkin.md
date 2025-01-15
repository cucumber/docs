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

One way to make scenarios easier to maintain and less brittle is to use a declarative style. Declarative style describes the behaviour of the application, rather than the implementation details. Declarative scenarios read better as "living documentation". A declarative style helps you focus on the value that the customer is getting, rather than the keystrokes they will use.

## Imperative style

Imperative tests communicate details, and in some contexts this style of test is appropriate. On the other hand, because they are so closely tied to the mechanics of the current UI, they often require more work to maintain. Any time the implementation changes, the tests need to be updated too.

Here's an example of a feature in an imperative style:
```
Feature: Subscribers see different articles based on their subscription level 

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

Each step is a precise instruction. The inputs and expected results are specified exactly. But it's easy to imagine changes to the application which would require changing these tests. The available options for free versus paid subscriptions can change. Even the means of logging in could change. What if, in the future, users log in with a voice interface or a thumbprint? 

## Declarative style

A more declarative style hides the details of how the application's capabilities are implemented.

```
Feature: Subscribers see different articles based on their subscription level
 
Scenario: Free subscribers see only the free articles
  Given Free Frieda has a free subscription
  When Free Frieda logs in with her valid credentials
  Then she sees a Free article

Scenario: Subscriber with a paid subscription can access both free and paid articles
  Given Paid Patty has a basic-level paid subscription
  When Paid Patty logs in with her valid credentials
  Then she sees a Free article and a Paid article
``` 
With a declarative style, each step communicates an idea, but the exact values aren't specified. The details of *how* the user interacts with the system, such as which specific articles are free or paid, and the subscription level of different test users, are specified in the step definitions (the automation code that interacts with the system). The subscription packages could change in the future. The business could change what content is available to subscribers on free and paid plans, without having to change this scenario and other scenarios that use the same step definitions. If another subscription level is added later, it's easy to add a scenario for that. By avoiding terms like “click a button” that suggest implementation, the scenario is more resilient to implementation details of the UI. The intent of the scenario remains the same, even if the implementation changes later. In addition, having too many implementation details in a scenario, makes it harder to understand the intended behaviour it illustrates.

## A third style 

There is a style that is intermediate between these two. The exact values are specified in the scenario, but the way the user interacts with the system is not. This style uses data tables with domain terms as the column headers. The step definitions can be reused for multiple scenarios with different data in the table. In this example, the scenarios for free and paid subscribers use the same step definitions.  The following example separates the login scenario from the display scenarios. 

```Gherkin 

Scenario:  Logon 
Given the users are 
  | User Name               | Password          | Subscription  |
  | freeFrieda@example.com  | validPassword123  | Free          |
  | paidPattya@example.com  | validPassword456  | Free          |
When a user logs in
  | User Name  | freeFrieda@example.com |
  | Password   | validPassword123       |
Then the user is logged in with 
  | Subscription | 
  | Free         |

Scenario: Free subscribers see only the free articles
Given the articles are: 
  | Title           | For Subscription  |
  | Free Article 1  | Free              |
  | Paid Article 1  | Paid              |
And the user is logged in as:
  | Subscription  |
  | Free          |
When the articles are displayed 
Then the displayed articles are:
  | Title           |
  | Free Article 1  | 

Scenario: Subscriber with a paid subscription can access both free and paid articles
Given the articles are: 
  | Title           | For Subscription  |
  | Free Article 1  | Free              |
  | Paid Article 1  | Paid              |
And the user is logged in as:
  | Subscription  |
  | Paid          |
When the articles are displayed 
Then the displayed articles are:
  | Title           | 
  | Free Article 1  | 
  | Paid Article 1  | 
```

The Given of the last two scenarios could be put into a Background scenario, if desired. These scenarios could be executed in three ways - automated using the core components, automated using a UI automation framework, or manually executed. The logic is checked with the first way, the plumbing between the UI and the core is checked with the second way, and the ease of use is checked with the third way. 

