---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
title: Step Definitions
---

Step definitions are defined in ruby files under <code>features/step_definitions/\*\_steps.rb</code>. Here is a simple example:

```
Given /^I have (\d+) cucumbers in my belly$/ do |cukes|
  # Some Ruby code here
end
```

A step definition is analogous to a *method definition / function definition* in any kind of OO/procedural programming language. Step definitions can take 0 or more arguments, identified by groups in the Regexp (and an equal number of arguments to the Proc).

Some people are uncomfortable with Regular Expressions. It's also possible to define Step Definitions using strings and $variables like this:

```
Given "I have $n cucumbers in my belly" do |cukes|
  # Some Ruby code here
end
```

In this case the String gets compiled to a Regular Expression behind the scenes: <code>/^I have (.\*) cucumbers in my belly$/</code>.

Then there are Steps. Steps are declared in your <code>features/\*.feature</code> files. Here is an example:

```
Given I have 93 cucumbers in my belly
```

A step is analogous to a method or function *invocation*. In this example, you're "calling" the step definition above with one argument — the string "93". Cucumber matches the Step against the Step Definition's Regexp and takes all of the captures from that match and passes them to the Proc.

Step Definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**Given**, **When**, **Then**, **And**, **But**), and can be expressed in any of Cucumber's supported [spoken languages](/gherkin/spoken-languages/). All Step definitions are loaded (and defined) before Cucumber starts to execute the plain text.

When Cucumber executes the plain text, it will for each step look for a registered Step Definition with a matching Regexp. If it finds one it will execute its Proc, passing all groups from the Regexp match as arguments to the Proc.

The preposition/adverb has **no** significance when Cucumber is registering or looking for Step Definitions.

Also check out [[Multiline Step Arguments]] for more info on how to pass entire tables or bigger strings to your step definitions.

## Successful steps

When Cucumber finds a matching Step Definition it will execute it. If the block in the step definition doesn't raise an Exception, the step is marked as successful (green). What you return from a Step Definition has no significance what so ever.

## Undefined steps

When Cucumber can't find a matching Step Definition the step gets marked as yellow, and all subsequent steps in the scenario are skipped. If you use <code>--strict</code> this will cause Cucumber to exit with <code>1</code>.

## Pending steps

When a Step Definition's Proc invokes the <code>pending</code> method, the step is marked as yellow (as with undefined ones), reminding you that you have work to do. If you use <code>--strict</code> this will cause Cucumber to exit with <code>1</code>.

## Failed steps

When a Step Definition's Proc is executed and raises an error, the step is marked as red. What you return from a Step Definition has no significance what so ever. Returning nil or false will **not** cause a step definition to fail.

## Skipped steps

Steps that follow undefined, pending or failed steps are never executed (even if there is a matching Step Definition), and are marked cyan.

## String steps

Steps can be defined using strings rather than regular expressions. Instead of writing

```
Given /^I have (.*) cucumbers in my belly$/ do |cukes|
```

You could write

```
Given "I have $count cucumbers in my belly" do |cukes|
```

Note that a word preceded by a $ sign is taken to be a placeholder, and will be converted to match `.*`. The text matched by the wildcard becomes an argument to the block, and the word that appeared in the step definition is disregarded.

## Ambiguous steps

Consider these step definitions:

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

Cucumber can't make a decision about what Step Definition to execute, and will raise a <code>Cucumber::Ambiguous</code> error telling you to fix the ambiguity.

### Guess mode

Running the plain text step will match the Regexp of both step definitions and raise <code>Cucumber::Ambiguous</code>. However,
if you run Cucumber with <code>--guess</code>, it will guess that you were aiming for the step definition with 2 match groups.

There is ranking logic that gets invoked when the option is turned on:

1. The longest Regexp with 0 capture groups always wins.
2. The Regexp with the most capture groups wins (when there are none with 0 groups).
3. If there are 2+ Regexen with the same number of capture groups, the one with the shortest overall captured string length wins.
4. If there are still 2+ options then an Ambiguous error is raised.

So if you try <code>--guess</code> with the mice above, Cucumber will pick <code>/Three blind (.\*)/</code>, because "mice" is shorter than "blind".

Consider guess mode a workaround. We still recommend you try to have unambiguous regular expressions. When you have a lot of step definitions you quickly lose track of the situations where cucumber will apply guessing logic, and that can lead to some surprises.

## Redundant Step Definitions

In Cucumber you're not allowed to use a regexp more than once in a Step Definition (even across files, even with different code inside the Proc), so the following would cause a <code>Cucumber::Redundant</code> error:

```
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three (.*) mice/ do |disability|
  # some other code..
end
```
