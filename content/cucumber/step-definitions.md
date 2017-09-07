---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
title: Step Definitions
polyglot: true
---


## What is a Step Definition?

Each Step Definition is similar to a *method* or *function* in a typical
OO/procedural programming language. 

Here's a simple example:

```
Given /^I have (\d+) cucumbers in my belly$/ do |cukes|
  # Some Ruby code here
end
```



## _Where_ are Step Definitions?

Step Definitions are defined in Ruby files under `features/step_definitions/`.  Each filename should follow the pattern `\*\_steps.rb`. 


### Step Definition Arguments

A Step Definition can optionally accept *arguments*. If it accepts any arguments, then they are determined by the capture groups of a `Regexp` (and an equal number of arguments to the Proc).

In the example above, the Step Definition accepts just one argument, identified by the capture group `(\d+)`.  When the Step Definition is executed, the argument is passed to Ruby code as `cukes`.

If you aren't comfortable with Regular Expressions, it's also possible to define Step Definitions using strings and `$variables`, like this:

```
Given "I have $n cucumbers in my belly" do |cukes|
  # Some Ruby code here
end
```

In this case, the String is compiled to a Regular Expression behind the scenes: `/^I have (.\*) cucumbers in my belly$/`.


## What is a _Step_?

Then there are Steps. A Step is analogous to a method or function *invocation*.

Here is an example:

```
Given I have 93 cucumbers in my belly
```

In this Step, you're "calling" the above Step Definition with one argument: the string `"93"`. 

## _Where_ are Steps?

Steps are declared in your `features/\*.feature` files. 


## How Steps and Step Definitions work together

1. Cucumber matches a Step against a Step Definition's `Regexp`
2. Cucumber gathers any captures or variables
3. Cucumber passes them to the Step Definition's `Proc` (or “function”) and executes it


Recall that Step Definitions start with a [preposition][preposition] or an [adverb][adverb] (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**). and can be expressed in any of Cucumber's supported [spoken languages](/gherkin/spoken-languages/). 

All Step Definitions are loaded (and defined) before Cucumber starts to execute the plain text.  

Once plain text execution begins, for each Step, Cucumber will look for a registered Step Definition with a matching `Regexp`. If it finds one, it will execute its Proc, passing all capture groups from the Regexp as arguments to the Proc.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up Step Definitions.

Also, check out [[Multiline Step Arguments]] for more info on how to pass entire tables or bigger strings to your Step Definitions.

[preposition]: http://www.merriam-webster.com/dictionary/given
[adverb]: http://www.merriam-webster.com/dictionary/when

## Successful Steps

When Cucumber finds a matching Step Definition it will execute it. If the block in the Step Definition doesn't raise an error, the Step is marked as successful (green). Anything you `return` from a Step Definition has no significance whatsoever.

## Undefined Steps

When Cucumber can't find a matching Step Definition, the Step gets marked as yellow, and all subsequent steps in the Scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

## Pending Steps

When a Step Definition's Proc invokes the `pending` method, the Step is marked as yellow (as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

## Failed Steps

When a Step Definition's Proc is executed and raises an error, the step is marked as red. What you return from a Step Definition has no significance whatsoever. 

Returning `nil` or `false` will **not** cause a Step Definition to fail.

## Skipped Steps

Steps that follow `undefined`, `pending`, or `failed` Steps are never executed,  even if there is a matching Step Definition. These Steps are marked as cyan.

## String Steps

Step Definitions can be written using strings rather than regular expressions. 

Instead of writing:

```
Given /^I have (.*) cucumbers in my belly$/ do |cukes|
```

You could write:

```
Given "I have $count cucumbers in my belly" do |cukes|
```

When writing a Step Definition using the string form, any word preceded by a `$` is taken to be a placeholder. Behind the scenes, Cucumber will convert it to the regular expression `(.*)`. 

The text matched by the wildcard becomes an argument to the block, and the word that appeared in the Step Definition is disregarded.


## Ambiguous Steps

Consider these Step Definitions:

```
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three blind (.*)/ do |animal|
  # some other code..
end
```

And a plain text step:

```
Given Three blind mice
```

Cucumber can't make a decision about what Step Definition to execute, and will raise a `Cucumber::Ambiguous` error telling you to fix the ambiguity.


### Guess mode

Running the plain text step will match the Regexp of both Step Definitions and raise `Cucumber::Ambiguous`. 

However, if you run Cucumber with `--guess`, it will guess that you were aiming for the Step Definition with 2 match groups.

There is ranking logic that gets invoked when the option is turned on:

1. The longest `Regexp` with 0 capture groups always wins.
2. The `Regexp` with the most capture groups wins (when there are none with 0 groups).
3. If there are 2+ `Regex` with the same number of capture groups, the one with the shortest overall captured string length wins.
4. If there are still 2+ options, then a `Cucumber::Ambiguous` error is raised.

So if you try `--guess` with the mice above, Cucumber will pick `/Three blind (.\*)/`, because `"mice"` is shorter than `"blind"`.

*Consider guess mode to be a workaround.* We still recommend that you have unambiguous regular expressions. When you have a lot of Step Definitions, it's easy to lose track of the situations where Cucumber's guess mode occurs, and that can lead to some surprises.

## Redundant Step Definitions

In Cucumber, you're not allowed to use a `Regexp` more than once in a Step Definition—even across files, and even with different code inside the Proc. 

Thus, the following would cause a `Cucumber::Redundant` error:

```
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three (.*) mice/ do |disability|
  # some other code..
end
```
