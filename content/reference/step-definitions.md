+++
title = "Step Definitions"
menu = "main"
+++

{{< content-select "Java" "Ruby" "JavaScript" >}}

A step definition is
{{% text "Java" %}}an annotated method with a regular expression{{% /text %}}
{{% text "Ruby" %}}a regular expression and a block of code{{% /text %}}
{{% text "JavaScript" %}}a cucumber expression and a function{{% /text %}}

{{% block "Java" %}}
```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```
{{% /block %}}
{{% block "Ruby" %}}
```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
  puts "Cukes: #{cukes}"
end
```
{{% /block %}}
{{% block "JavaScript" %}}
```javascript
Given(/^I have (\d+) cukes in my belly$/, function (cukes) {
  console.log("Cukes: " + cukes);
});
```
{{% /block %}}
