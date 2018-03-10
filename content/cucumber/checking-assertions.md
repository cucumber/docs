---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/RSpec-Expectations/
title: Checking Assertions
polyglot:
  - java
  - javascript
  - ruby
---

Your `Then` steps should make assertions comparing expected results to actual results
from your application.

Cucumber does not come with an assertion library. Instead, use the assertion methods
from a unit testing tool.

{{% block "ruby" %}}

We recommend using RSpec for assertions.

Add the `rspec-expectations` gem to your `Gemfile`.
Cucumber will automatically load RSpec's matchers and expectation methods to be
available in your Step Definitions. For example:

```ruby
Given /^a nice new bike$/ do
  expect(bike).to be_shiny
end
```

If you want to configure RSpec, you'll need to also add the `rspec-core` gem
to your `Gemfile`. Then, you can add to your `features/support/env.rb`
configuration, such as:

```ruby
RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end
```

---

If you prefer to use `Test::Unit`'s `assert` methods you can mix them into
your [`World`](/wiki/a-whole-new-world).

```ruby
require 'test/unit/assertions'

World(Test::Unit::Assertions)
```

{{% /block %}}

{{% block "java" %}}

We recommend using [JUnit](http://junit.org/junit4/)'s `assert*` methods.

If you are using Maven, just add the following to your `pom.xml`:

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

{{% note "Cucumber version"%}}
Make sure to use the same version for `cucumber-junit` that you are using for `cucumber-java` or cucumber-java8`.
{{% /note %}}

{{% note "JUnit 5"%}}
At the moment, JUnit 5 is not yet supported by Cucumber.
{{% /note %}}

Below is an example using `assertEquals`:

```java
import static org.junit.Assert.*;

public class Example {

    @Then("^the result should be (.+)$")
    public void the_result_should_be(String expectedResult) {
        assertEquals(expectedResult, result);
    }
}
```

For more examples of how to use JUnit assertions, see the [JUnit Wiki](https://github.com/junit-team/junit4/wiki/Assertions).

---

You can also use [TestNG](http://testng.org/doc/)'s assertions'.

If you are using Maven, just add the following to your `pom.xml`:
```xml
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>{{ site.versions.testng }}</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-testng</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

TestNG assertions are similar JUnit.
For a more extensive example of how to use TestNG with Cucumber, see the [java-calculator-testng example](https://github.com/cucumber/cucumber-jvm/tree/master/examples/java-calculator-testng).

For more information on how to use TestNG assertions, see the [TestNG documentation](http://testng.org/doc/documentation-main.html#success-failure)
{{% /block %}}

{{% block "javascript" %}}
We recommend using Node.js' built-in [assert](https://nodejs.org/dist/latest-v8.x/docs/api/assert.html) module.

```javascript
const assert = require('assert')

Then('the result should be {word}', function (expected) {
  // this.actual is typically set in a previous step
  assert.equal(this.actual, expected)
})
```

---

You can use any other assertion library if you wish. Here is an example using [Chai](http://chaijs.com/):

```javascript
const expect = require('chai')

Then('the result should be {word}', function (expected) {
  expect(this.actual).to.eql(expected)
})
```

{{% /block %}}
