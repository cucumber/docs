---
menu:
- gherkin
source: https://github.com/cucumber/cucumber/wiki/Conjunction-Steps-(Antipattern)/
source: https://stackoverflow.com/questions/22696646/how-to-call-a-step-from-another-step-in-cucumber-jvm
source: https://groups.google.com/forum/#!searchin/cukes/jvm$20steps$20programming/cukes/DzE_kGZx94I/5rf__N31qvAJ
title: Conjunction Steps (Anti-pattern)
---

From the online Merriam-Webster dictionary:

> **con·junc·tion**: an uninflected linguistic form that joins together sentences, clauses, phrases, or words.

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

## Support for conjunction steps

Sometimes you may want to combine several Steps into one, to make your Scenarios easier to read.

In Ruby, it is possible to [Call Steps from Step Definitions](/implementations/ruby/calling-steps-from-step-definitions/).

In Cucumber-JVM this is not supported. This is by design; the best tool to achieve composition and reuse is the host programming language.
To use several (smaller) steps inside a bigger step; extract each small step to a regular method, and call these methods from the bigger step.

To make your life easier; strive to keep your Steps atomic!