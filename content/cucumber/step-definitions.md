---
menu: gherkin
source: step-definitions-old.md
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
title: Step Definitions
polyglot: true
---

When Cucumber executes a Step in a Scenario, it will look for a matching *Step Definition* to execute.
The Step Definitions map, or "glue", the Gherkin to the underlying programming language.

A Step Definition is
{{% text "java" %}}a method with a regular expression attached to it. They are defined in Java files.{{% /text %}}
{{% text "ruby" %}}a block of code with a regular expression attached to it. They are defined in Ruby files under `features/step_definitions/`.  Each filename should follow the pattern `\*\_steps.rb`.{{% /text %}}
{{% text "javascript" %}}a function with a Cucumber expression attached to it. They are defined in Javascript files.{{% /text %}}

 To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the Step Definition below:

```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```

```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
  puts "Cukes: #{cukes}"
end
```

```javascript
Given(/^I have (\d+) cukes in my belly$/, function (cukes) {
  console.log(`Cukes: ${cukes}`);
});
```

{{% block "javascript" %}}
Please note that if you use arrow functions, you won't be able
to share state between Steps!

```javascript
// Don't do this!
Given(/^I have (\d+) cukes in my belly$/, cukes => {
  console.log(`Cukes: ${cukes}`);
});
```

{{% /block %}}

## Step Definition Arguments

A Step Definition can optionally accept *arguments*; determined by the capture groups in a Regular Expression (`Regexp`).
The number and type of the arguments are defined in the Step Definition.

The Step Definition in the example above accepts just one argument, identified by the capture group
{{% text "ruby" %}}`(\d+)`.  When the Step Definition is executed, the argument is passed to the Ruby code as `cukes`.{{% /text %}}
{{% text "java" %}}`(\\d+)`.  When the Step Definition is executed, the argument is passed to the Java code as `cukes`.{{% /text %}}
{{% text "javascript" %}}`(\d+)`.  When the Step Definition is executed, the argument is passed to the JavaScript code as `cukes`.{{% /text %}}

{{% text "ruby" %}}
If you aren't comfortable with Regular Expressions, it's also possible to define Step Definitions using strings and variables, like this:
{{% /text %}}
```ruby
Given "I have $n cucumbers in my belly" do |cukes|
  # Some Ruby code here
end
```

{{% text "ruby" %}}
In this case, the String is compiled to a Regular Expression behind the scenes: `/^I have (.\*) cucumbers in my belly$/`.
{{% /text %}}

## Steps

A Step is analogous to a method call or function invocation.

For example:

```
Given I have 93 cucumbers in my belly
```

In this Step, you're "calling" the above Step Definition with one argument: the value `93`.

Steps are declared in your {{% text "ruby" %}}`features/\*.feature`{{% /text %}}{{% text "java" %}}`*.feature`{{% /text %}}{{% text "javascript" %}}`*.feature`{{% /text %}} files.


## How Steps and Step Definitions work together

1. Cucumber matches a Step against a Step Definition's `Regexp`
2. Cucumber gathers any capture groups or variables
3. Cucumber passes them to the Step Definition's {{% text "ruby" %}}`Proc` (or “function”){{% /text %}}{{% text "javascript" %}}function{{% /text %}}{{% text "java" %}}method{{% /text %}} and executes it

Recall that Step Definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**). and can be expressed in any of Cucumber's supported [spoken languages](/gherkin/spoken-languages/).

All Step Definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each Step, Cucumber will look for a registered Step Definition with a matching `Regexp`. If it finds one, it will execute it, passing all capture groups and variables from the Regexp as arguments to the method or function.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up Step Definitions.

Also, check out Multiline [Step Arguments](/gherkin/gherkin-reference/#step-arguments) for more info on how to pass entire tables or bigger strings to your Step Definitions.

### Successful Steps

When Cucumber finds a matching Step Definition it will execute it. If the block in the Step Definition doesn't raise an error, the Step is marked as successful (green). Anything you `return` from a Step Definition has no significance whatsoever.

### Undefined Steps

When Cucumber can't find a matching Step Definition, the Step gets marked as yellow, and all subsequent steps in the Scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

### Pending Steps

When a Step Definition's method or function invokes the `pending` method, the Step is marked as yellow (as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

### Failed Steps

When a Step Definition's method or function is executed and raises an error, the step is marked as red. What you return from a Step Definition has no significance whatsoever.

Returning {{% text "ruby" %}}`nil`{{% /text %}}{{% text "java" %}}`null`{{% /text %}}{{% text "javascript" %}}`null`{{% /text %}} or `false` will **not** cause a Step Definition to fail.

### Skipped Steps

Steps that follow `undefined`, `pending`, or `failed` Steps are never executed,  even if there is a matching Step Definition. These Steps are marked as cyan.

{{% text "ruby" %}}
### String Steps (Ruby)

In Ruby, Step Definitions can be written using Strings rather than Regular Expressions.

Instead of writing:

```ruby
Given /^I have (.*) cucumbers in my belly$/ do |cukes|
```

You could write:

```ruby
Given "I have $count cucumbers in my belly" do |cukes|
```

When writing a Step Definition using the String form, any word preceded by a `$` is taken to be a placeholder. Behind the scenes, Cucumber will convert it to the Regular Expression `(.*)`.

The text matched by the wildcard becomes an argument to the block, and the word that appeared in the Step Definition is disregarded.
{{% /text %}}

## Ambiguous Steps

Step Definitions have to be unique for Cucumber to know what to execute.
If you use ambiguous Step Definitions, Cucumber will raise {{% text "ruby" %}}a `Cucumber::Ambiguous` error,{{% /text %}}{{% text "java" %}}an `AmbiguousStepDefinitionsException`,{{% /text %}}{{% text "javascript" %}}an error or exception,{{% /text %}} telling you to fix the ambiguity.

{{% text "ruby" %}}
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

In Cucumber, you're not allowed to use a `Regexp` more than once in a Step Definition—even across files, and even with different code inside the method or function.

Thus, the following would cause a `Cucumber::Redundant` error:

```
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three (.*) mice/ do |disability|
  # some other code..
end
```
{{% /text %}}