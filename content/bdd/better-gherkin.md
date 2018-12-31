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
