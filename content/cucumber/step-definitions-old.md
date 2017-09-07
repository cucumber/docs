---
menu: gherkin
title: Step Definitions Orig
---

When Cucumber executes a step in a Scenario, it will look for a matching *Step Definition* to execute.

A Step Definition is
{{% text "java" %}}a method with a regular expression{{% /text %}}{{% text "ruby" %}}a block of code with a regular expression{{% /text %}}{{% text "javascript" %}}a function with a Cucumber expression{{% /text %}}
 attached to it. To illustrate how it works, look at the following Gherkin Scenario:

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
