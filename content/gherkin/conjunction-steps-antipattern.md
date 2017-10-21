---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Conjunction-Steps-(Antipattern)/
title: Conjunction Steps (Anti-pattern)
---

From the online Merriam-Webster dictionary:

> **con·junc·tion** : an uninflected linguistic form that joins together sentences, clauses, phrases, or words.

Don't do this in Steps. It makes Steps too specialised, and hard to reuse. Cucumber has built-in support for conjunctions (`And`, `But`) for a reason!

## Example

```
Given I have shades and a brand new Mustang
```

## How to fix

```
Given I have shades
And I have a brand new Mustang
```

## When conjunction steps are OK

Sometimes you may want to combine several Steps into one, to make your Scenarios easier to read. 

[Calling Steps from Step Definitions](/implementations/ruby/calling-steps-from-step-definitions/) makes this possible. But to make your life simpler; strive to keep your Steps atomic!
