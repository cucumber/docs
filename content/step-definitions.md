---
menu: gherkin
source: https://github.com/cucumber/cucumber/wiki/Step-Definitions/
title: Step Definitions
polyglot: true
---

When Cucumber executes a step in a scenario, it will look for a matching *step definition* to execute.
The step definitions map, or "glue", the Gherkin to the underlying programming language.

A step definition is
{{% text "java" %}}a method with a regular expression attached to it. They are defined in Java files.{{% /text %}}
{{% text "ruby" %}}a block of code with a regular expression attached to it. They are defined in Ruby files under `features/step_definitions/`.  Each filename should follow the pattern `\*\_steps.rb`.{{% /text %}}
{{% text "javascript" %}}a function with a Cucumber expression attached to it. They are defined in Javascript files.{{% /text %}}

 To illustrate how this works, look at the following Gherkin Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the step definition below:

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
to share state between steps!

```javascript
// Don't do this!
Given(/^I have (\d+) cukes in my belly$/, cukes => {
  console.log(`Cukes: ${cukes}`);
});
```

{{% /block %}}

# Step Definition Arguments

A step definition can optionally accept *arguments*; determined by the capture groups in a Regular Expression (`Regexp`).
The number and type of the arguments are defined in the step definition.

The step definition in the example above accepts just one argument, identified by the capture group
{{% text "ruby" %}}`(\d+)`.  When the step definition is executed, the argument is passed to the Ruby code as `cukes`.{{% /text %}}
{{% text "java" %}}`(\\d+)`.  When the step definition is executed, the argument is passed to the Java code as `cukes`.{{% /text %}}
{{% text "javascript" %}}`(\d+)`.  When the step definition is executed, the argument is passed to the JavaScript code as `cukes`.{{% /text %}}

{{% text "ruby" %}}
If you aren't comfortable with Regular Expressions, it's also possible to define step definitions using strings and variables, like this:
{{% /text %}}
```ruby
Given "I have $n cucumbers in my belly" do |cukes|
  # Some Ruby code here
end
```

{{% text "ruby" %}}
In this case, the String is compiled to a Regular Expression behind the scenes: `/^I have (.\*) cucumbers in my belly$/`.
{{% /text %}}

{{% text "java" %}}

## DataTables
To automatically transform DataTables in your feature file, you can change the DataTable to a List or Map:
List<YourType>, List<List<E>>, List<Map<K,V>> or Map<K,V> where E,K,V must be a scalar (String, Integer, Date, enum etc).
To transform to a List<YourType>, the field names for YourType must match the column names in your feature file (except for spaces and capitalization).
{{% /text %}}

# Steps

A step is analogous to a method call or function invocation.

For example:

```gherkin
Given I have 93 cucumbers in my belly
```

In this step, you're "calling" the above step definition with one argument: the value `93`.

Steps are declared in your {{% text "ruby" %}}`features/\*.feature`{{% /text %}}{{% text "java" %}}`*.feature`{{% /text %}}{{% text "javascript" %}}`*.feature`{{% /text %}} files.


# How Steps and Step Definitions work together

1. Cucumber matches a step against a Step Definition's `Regexp`
2. Cucumber gathers any capture groups or variables
3. Cucumber passes them to the step definition's {{% text "ruby" %}}`Proc` (or “function”){{% /text %}}{{% text "javascript" %}}function{{% /text %}}{{% text "java" %}}method{{% /text %}} and executes it

Recall that step definitions start with a [preposition](http://www.merriam-webster.com/dictionary/given) or an [adverb](http://www.merriam-webster.com/dictionary/when) (**`Given`**, **`When`**, **`Then`**, **`And`**, **`But`**). and can be expressed in any of Cucumber's supported [spoken languages](/gherkin/spoken-languages/).

All step definitions are loaded (and defined) before Cucumber starts to execute the plain text in the feature file.

Once execution begins, for each step, Cucumber will look for a registered step definition with a matching `Regexp`. If it finds one, it will execute it, passing all capture groups and variables from the Regexp as arguments to the method or function.

The specific preposition/adverb used has **no** significance when Cucumber is registering or looking up Step Definitions.

Also, check out [Multiline step arguments](/gherkin/#step-arguments) for more info on how to pass entire tables or bigger strings to your step definitions.


## Step Results

### Successful Steps

When Cucumber finds a matching step definition it will execute it. If the block in the step definition doesn't raise an error, the step is marked as successful (green). Anything you `return` from a step definition has no significance whatsoever.

### Undefined Steps

When Cucumber can't find a matching step definition, the step gets marked as yellow, and all subsequent steps in the scenario are skipped. If you use `--strict`, this will cause Cucumber to exit with `1`.

### Pending Steps

When a step definition's method or function invokes the `pending` method, the step is marked as yellow (as with `undefined` ones), indicating that you have work to do. If you use `--strict`, this will cause Cucumber to exit with `1`.

### Failed Steps

When a step definition's method or function is executed and raises an error, the step is marked as red. What you return from a step definition has no significance whatsoever.

Returning {{% text "ruby" %}}`nil`{{% /text %}}{{% text "java" %}}`null`{{% /text %}}{{% text "javascript" %}}`null`{{% /text %}} or `false` will **not** cause a step definition to fail.

### Skipped Steps

Steps that follow `undefined`, `pending`, or `failed` steps are never executed,  even if there is a matching step definition. These steps are marked as cyan.

{{% text "ruby" %}}

### String Steps (Ruby)

In Ruby, step definitions can be written using Strings rather than Regular Expressions.

Instead of writing:

```ruby
Given /^I have (.*) cucumbers in my belly$/ do |cukes|
```

You could write:

```ruby
Given "I have $count cucumbers in my belly" do |cukes|
```

When writing a step definition using the String form, any word preceded by a `$` is taken to be a placeholder. Behind the scenes, Cucumber will convert it to the Regular Expression `(.*)`.

The text matched by the wildcard becomes an argument to the block, and the word that appeared in the step definition is disregarded.
{{% /text %}}

### Ambiguous Steps

Step definitions have to be unique for Cucumber to know what to execute.
If you use ambiguous step definitions,{{% text "ruby" %}}Cucumber will raise a `Cucumber::Ambiguous` error,{{% /text %}}
{{% text "java" %}} Cucumber will raise an `AmbiguousStepDefinitionsException`,{{% /text %}}
{{% text "javascript" %}}the step / scenario will get an "Ambiguous" result,{{% /text %}}
telling you to fix the ambiguity.

{{% text "ruby" %}}

### Guess mode

In Ruby, running the plain text step will match the `Regexp` of both step definitions and raise `Cucumber::Ambiguous`.

However, if you run Cucumber with `--guess`, it will guess that you were aiming for the step definition with 2 match groups.

There is ranking logic that gets invoked when the option is turned on:

1. The longest `Regexp` with 0 capture groups always wins.
2. The `Regexp` with the most capture groups wins (when there are none with 0 groups).
3. If there are 2+ `Regexp` with the same number of capture groups, the one with the shortest overall captured string length wins.
4. If there are still 2+ options, then a `Cucumber::Ambiguous` error is raised.

So if you try `--guess` with the mice above, Cucumber will pick `/Three blind (.\*)/`, because `"mice"` is shorter than `"blind"`.

*Consider guess mode to be a workaround.* We still recommend that you have unambiguous regular expressions. When you have a lot of step definitions, it's easy to lose track of the situations where Cucumber's guess mode occurs, and that can lead to some surprises.
{{% /text %}}

### Redundant Steps

In Cucumber, you're not allowed to use a `Regexp` more than once in a step definition—even across files, and even with different code inside the method or function.
Note that the keywords (`Given`, `When`, `Then`, `And` and `But`) are not part of the `Regexp`; 
this means you also cannot have the same step definition, but with different keywords.

{{% text "ruby" %}}
Thus, the following would cause a `Cucumber::Redundant` error:

```ruby
Given /Three (.*) mice/ do |disability|
  # some code
end

Given /Three (.*) mice/ do |disability|
  # some other code..
end
```
{{% /text %}}

### Nested Steps

In an effort to keep from [repeating yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), you may be tempted to utilize Cucumber's feature of calling step definitions from other steps: **DON'T**. While this may seem like a useful feature to utilize, it creates bad code smells and will be deprecated in the future. In places where you're calling steps from other steps, use those as opportunities to refactor your code to create helper methods.

{{% text "ruby" %}}
Instead of:

```ruby
Given('a starting amount of ${int}') do |int|
  steps %(
    Given a customer account with ID: 'foo123'
    Given a balance of 100 dollars
    Given the customer has authenticated with pin 1234
  )
end
```

Create accounts and user helper classes/methods, which would allow you to refactor your step to the following:

```ruby
Given('a starting amount of ${int}') do |starting_amount|
  @starting_balance = starting_amount
  @user = User.new(0)
  @account = Account.new('foo123', @starting_balance, 1234)
end
```

Now that your code has been refactored you can access these helper methods anywhere in your code, instead of calling a step. Benefits:

* Increased flexibility
* Increased readabilitiy
* Increased usability
* You won't be writing code that's planned to be deprecated

{{% /text %}}