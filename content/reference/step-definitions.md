+++
title = "Step Definitions"
menu = "main"
+++

When Cucumber executes a step in a scenario it will look for a matching _step definition_ to execute.

A step definition is
{{% text "java" %}}a method with a regular expression{{% /text %}}{{% text "ruby" %}}a block of code with a regular expression{{% /text %}}{{% text "javascript" %}}a function with a cucumber expression{{% /text %}}
 attached to it. To illustrate how it works, look at the following Gherkin scenario:

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
  console.log("Cukes: " + cukes);
});
```
