---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Given-When-Then/
title: Given When Then
---

[Cucumber Scenarios](/gherkin/gherkin-reference/#scenario) consist of Steps (also known as `Given`'s, `When`'s, and `Then`'s).

Cucumber doesn't technically distinguish between these three kind of Steps. However, we strongly recommend that you do! These words have been carefully selected for their purpose, and you should know what the purpose is to get into the BDD mindset.
You can use them to make your Scenarios easier to read.

Robert C. Martin has written a [great post](https://sites.google.com/site/unclebobconsultingllc/the-truth-about-bdd) about BDD's Given-When-Then concept where he thinks of them as a finite state machine.

## `Given`

The purpose of `Given`'s is to **put the system in a known state** before the user (or external system) starts interacting with the system (in the `When` Steps).

Avoid talking about user interaction in `Given`'s. If you were creating use cases, `Given`'s would be your preconditions.

Examples:

- Create records (model instances) / set up the database state.
- It's okay to call into the layer "inside" the UI layer here (talking to the domain model).
- Log in a user (this is an exception to the no-interaction recommendation; things that "happened earlier" are okay).

And for all the Rails users out there - we recommend using a [`Given` with a multiline table argument](https://github.com/aslakhellesoy/cucumber-rails-test/blob/master/features/manage_lorries.feature) to [set up records](https://github.com/aslakhellesoy/cucumber-rails-test/blob/master/features/step_definitions/lorry_steps.rb) instead of fixtures. 
This way, you can read the Scenario and make sense out of it without having to look elsewhere (at the fixtures).

## `When`

The purpose of `When`'s is to **describe the key action** the user performs (or, using Robert C. Martin's metaphor, the state transition).

Examples:

- Interact with a web page (Webrat/Watir/Selenium *interaction* etc should mostly go into `When` steps).
- Interact with some other user interface element.
- Developing a library? Kicking off some kind of action that has an observable effect somewhere else.

## `Then`

The purpose of `Then`'s is to **observe outcomes**. The observations should be related to the business value/benefit in your Feature description.

The observations should also be on some kind of *output*. That is, something that comes *out* of the system (report, user interface, message), and not something deeply buried inside it (that has no business value).

Examples:

- Verify that something related to the `Given`+`When` is (or is not) in the output
- Check that some external system has received the expected message (was an email with specific content sent?)

While it might be tempting to implement `Then` steps to just look in the database - resist the temptation. You should only verify outcome that is observable for the user (or external system), and databases usually are not.

## `And`, `But`

If you have several `Given`s, `When`s, or `Then`s, you *could* write:

```gherkin
Scenario: Multiple Givens
Given one thing
Given another thing
Given yet another thing
When I open my eyes
Then I see something
Then I don't see something else
```

Or, you could make it read more fluidly by writing:

```gherkin
Scenario: Multiple Givens
Given one thing
And another thing
And yet another thing
When I open my eyes
Then I see something
But I don't see something else
```

To Cucumber Steps beginning with `And` or `But` are exactly the same kind of Steps as all the others.
