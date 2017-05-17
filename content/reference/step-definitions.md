+++
title = "Step Definitions"
menu = "main"
+++


Cucumber doesn't know how to execute your scenarios out-of-the-box. It needs _step definitions_
to translate plain text Gherkin steps into actions that will interact with the system.

When Cucumber executes a [Step](#steps) in a [Scenario](/#scenario) it will look for a matching _step definition_ to execute.

A step definition is
{{% text "java" %}}an annotated method with a regular expression{{% /text %}}{{% text "ruby" %}}a regular expression and a block of code{{% /text %}}{{% text "javascript" %}}a cucumber expression and a function{{% /text %}}.

The pattern is used to link the step definition to all the matching [Steps](#steps),
and the _code_ is what Cucumber will execute when it sees a Gherkin Step.

To understand how Step Definitions work, consider the following Scenario:

```gherkin
Scenario: Some cukes
  Given I have 48 cukes in my belly
```

The `I have 48 cukes in my belly` part of the step (the text following the `Given` keyword) will match the Step Definition below:

{{% block "java" %}}
```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```
{{% /block %}}
{{% block "ruby" %}}
```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
  puts "Cukes: #{cukes}"
end
```
{{% /block %}}
{{% block "javascript" %}}
```javascript
Given(/^I have (\d+) cukes in my belly$/, function (cukes) {
  console.log("Cukes: " + cukes);
});
```
{{% /block %}}
