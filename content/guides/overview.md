---
title: Introduction
subtitle: New to Cucumber? Start here!
weight: 1000
---

{{% note "Before you get started" %}}
If you're new to Behaviour-Driven Development (BDD) (or if you think it's a testing technique 😏) read
our [BDD introduction](/bdd) first.
{{% /note %}}

Ok, now that you know that BDD is about discovery, collaboration and examples
(and not testing), let's take a look at Cucumber.

# What is Cucumber?

Cucumber is a tool that supports [Behaviour-Driven Development(BDD)](/bdd).

Cucumber reads executable specifications written in plain text and validates that the
software does what those specifications say. The specifications consists of multiple
*examples*, or *scenarios*. For example:

```gherkin
Scenario: Breaker guesses a word
  Given the Maker has chosen a word
  When the Breaker makes a guess
  Then the Maker is asked to score
```

Each scenario is a list of *steps* for Cucumber to work through. Cucumber verifies
that the software conforms with the specification and generates a report indicating
✅ success or ❌ failure for each scenario.

In order for Cucumber
to understand the scenarios, they must follow some basic syntax rules, called [Gherkin](/gherkin/).

# What is Gherkin?

Gherkin is a simple set of grammar rules that makes plain text structured enough
for Cucumber to understand. The scenario above is written in Gherkin.

Gherkin serves multiple purposes:

- Unambiguous executable specification
- Automated testing using Cucumber
- Document how the system *actually* behaves

![Single source of Truth](/img/single-source-of-truth-256x256.png)

The Cucumber grammar exists in different flavours for many [spoken languages](/gherkin/reference#spoken-languages)
so that your team can use the keywords in your own language.

Gherkin documents are stored in `.feature` text files and are typically versioned in source control
alongside the software.

See the [Gherkin reference](/gherkin) for more details.

{{% note "Who should write Gherkin?" %}}
It's usually best to let developers write Gherkin if the team is practicing BDD (test first).

If Cucumber is used solely as a test automation tool (test after) it can be done by
testers or developers.

It is usually counterproductive to let product owners and business analysts write Gherkin.
Instead, we recommend they participate in [Example Mapping](/bdd/example-mapping) sessions
and **approve** the Gherkin documents after a developer or tester has translated it to Gherkin.
{{% /note %}}

# Step Definitions

In addition to [feature files](/gherkin/reference#feature), Cucumber needs a set of [step definitions](/cucumber/step-definitions). Step definitions map (or "glue") each
Gherkin step to programming code to carry out the  action that should be performed by the step.

Step definitions hard-wire the specification to the implementation.

<!-- TODO: Illustration (Feature) - (Step Defs) -> (System) -->

Step definitions can be written in many programming languages. Here is an example
using JavaScript:

```javascript
When("{maker} starts a game", function(maker) {
  maker.startGameWithWord({ word: "whale" })
})
```

{{% note "Who should write step definitions?" %}}
The same people who write Gherkin should be writing step definitions. This is another reason the Gherkin is best written by developers and/or testers.
{{% /note %}}
