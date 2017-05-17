+++
title = "Step Definitions"
menu = "main"
+++


{{% tabs %}}

{{% tab "Java" %}}
```java
@Given("I have (\\d+) cukes in my belly")
public void I_have_cukes_in_my_belly(int cukes) {
    System.out.format("Cukes: %n\n", cukes);
}
```
{{% /tab %}}

{{% tab "Ruby" %}}
```ruby
Given(/I have (\d+) cukes in my belly/) do |cukes|
  puts "Cukes: #{cukes}"
end
```
{{% /tab %}}

{{% tab "JavaScript" %}}
```javascript
Given(/^I have (\d+) cukes in my belly$/, function (cukes) {
  console.log("Cukes: " + cukes);
});
```
{{% /tab %}}

{{% /tabs %}}
