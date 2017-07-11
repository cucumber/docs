---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Conjunction-Steps-(Antipattern)/
title: Conjunction Steps (Antipattern)
---

From the online Merriam-Webster dictionary:

> **con·junc·tion** :an uninflected linguistic form that joins together sentences, clauses, phrases, or words

Don't do this in steps. It makes steps too specialised and hard to reuse. Cucumber has built-in support for conjunctions (And, But) for a reason.

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

Sometimes you may want to combine several steps into one to make your scenarios easier to read. [[Calling Steps from Step Definitions]] makes this possible, but make your life simpler by making the called steps atomic.
