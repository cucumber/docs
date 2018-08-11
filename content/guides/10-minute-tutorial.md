---
title: 10 Minute Tutorial
subtitle: Get started in just 10 minutes
polyglot:
 - java
 - javascript
 - ruby

weight: 1100
---

In this quick tutorial you will learn how to:

* Install Cucumber
* Write your first Scenario using the Gherkin syntax
* Write your first step definition in {{% text "java" %}}Java{{% /text %}}{{% text "javascript" %}}JavaScript{{% /text %}}{{% text "ruby" %}}Ruby{{% /text %}}
* Run Cucumber
* Learn the basic workflow of Behaviour-Driven Development (BDD)

We'll use Cucumber to develop a small library that can figure out whether it's
Friday yet.

Before we begin, you will need the following:

{{% block "java" %}}

- [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html) (Java 9 is not yet supported by Cucumber)
- [Maven](https://maven.apache.org/index.html) - version 3.3.1 or higher
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (which will be used in this tutorial)
   - [IntelliJ IDEA Cucumber for Java plugin](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java)
- [Eclipse](https://www.eclipse.org/) (a good alternative if you don't use IntelliJ)
   - [Cucumber Eclipse](https://cucumber.github.io/cucumber-eclipse/)

{{% /block %}}

{{% block "javascript" %}}

- [Node.js](https://nodejs.org/)
- A text editor

Open a terminal to verify that Node.js is installed properly:

```shell
node -v
npm -v
```

Both of these commands should print a version number.

{{% /block %}}

{{% block "ruby" %}}

- [Ruby](https://www.ruby-lang.org/)
- [Bundler](http://bundler.io/)
- A text editor

Open a terminal to verify that Ruby is installed properly:

```shell
ruby -v
bundle -v
```

Both of these commands should print a version number.

{{% /block %}}

# Create an empty Cucumber project

{{% block "java" %}}
We'll start by creating a new project directory with the `cucumber-archetype` Maven plugin.
Open a terminal, go to the directory where you want to create your project, and run the following command:

```shell
mvn archetype:generate                      \
   -DarchetypeGroupId=io.cucumber           \
   -DarchetypeArtifactId=cucumber-archetype \
   -DarchetypeVersion={{% version "cucumberarchetype" %}}               \
   -DgroupId=hellocucumber                  \
   -DartifactId=hellocucumber               \
   -Dpackage=hellocucumber                  \
   -Dversion=1.0.0-SNAPSHOT                 \
   -DinteractiveMode=false
```

You should get something like the following result:
```shell
[INFO] Project created from Archetype in dir: <directory where you created the project>/cucumber
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

Change into the directory that was just created by running the following command:
```shell
cd hellocucumber
```

Open the project in IntelliJ IDEA:

* **File -> Open... -> (Select the pom.xml)**
* Select **Open as Project**

{{% /block %}}

{{% block "javascript" %}}
We'll start by creating a new directory and an empty Node.js project.

```shell
mkdir hellocucumber
cd hellocucumber
npm init --yes
```

Add Cucumber as a development dependency:

```shell
npm install cucumber --save-dev
```

Open `package.json` in a text editor and change the `test` section so it looks like this:

```json
{
  "name": "hellocucumber",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "cucumber-js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cucumber": "^{{% version "cucumberjs" %}}"
  }
}
```

Prepare the file structure:

```shell
mkdir features
mkdir features/step_definitions
```

Create a file called `cucumber.js` at the root of your project and add the following
content:

```javascript
module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`
}
```

Also, create a file called `features/step_definitions/stepdefs.js` with the
following content:

```javascript
const assert = require('assert');
const { Given, When, Then } = require('cucumber');
```

{{% /block %}}

{{% block "ruby" %}}
We'll start by creating a new directory and an empty Ruby project.

```shell
mkdir hellocucumber
cd hellocucumber
```

Create a `Gemfile` with the following contents:

```ruby
source "https://rubygems.org"

group :test do
  gem 'cucumber', '~> {{% version "cucumberruby" %}}'
  gem 'rspec', '~> {{% version "rspec" %}}'
end
```

Install Cucumber and prepare the file structure:

```shell
bundle install
cucumber --init
```

{{% /block %}}

You now have a simple project with Cucumber installed.

# Verify Cucumber installation

To make sure everything works together correctly, let's run Cucumber.

{{% block "java" %}}
```shell
mvn test
```
{{% /block %}}

{{% block "javascript" %}}
```shell
# Run via NPM
npm test

# Run standalone
./node_modules/.bin/cucumber-js
```
{{% /block %}}

{{% block "ruby" %}}
```shell
cucumber
```
{{% /block %}}

You should see something like the following:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
No features found at [classpath:hellocucumber]

0 Scenarios
0 Steps
0m0.004s

Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.541 sec

Results :

Tests run: 0, Failures: 0, Errors: 0, Skipped: 0

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

{{% /block %}}

{{% block "javascript" %}}
```shell
0 Scenarios
0 steps
0m00.000s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
0 scenarios
0 steps
0m0.000s
```
{{% /block %}}

Cucumber's output is telling us that it didn't find anything to run.

# Write a Scenario

When we do Behaviour-Driven Development with Cucumber we use *concrete examples*
to specify *what* we want the software to do. Scenarios are written *before*
production code. They start their life as an *executable specification*. As
the production code emerges, Scenarios take on a role as *living documentation* and
*automated tests*.

{{% tip "Example Mapping"%}}
Try running an [Example Mapping](/bdd/example-mapping) workshop in your team to
design examples together.
{{% /tip %}}

In Cucumber, an example is called a [Scenario](/gherkin/reference#example).
Scenarios are defined in `.feature` files, which are stored in the
{{% text "java" %}}`src/test/resources/hellocucumber`{{% /text %}}
{{% text "javascript" %}}`features`{{% /text %}}
{{% text "ruby" %}}`features`{{% /text %}}
directory (or a subdirectory).

One concrete example would be that *Sunday isn't Friday*.

Create an empty file called
{{% text "java" %}}`src/test/resources/hellocucumber/is_it_friday_yet.feature`{{% /text %}}
{{% text "javascript" %}}`features/is_it_friday_yet.feature`{{% /text %}}
{{% text "ruby" %}}`features/is_it_friday_yet.feature`{{% /text %}}
with the following contents:

```gherkin
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"
```

The first line of this file starts with the keyword `Feature:` followed by a name.
It's a good idea to use a name similar to the file name.

The second line is a brief description of the feature. Cucumber does not
execute this line, it's just documentation.

The fourth line, `Scenario: Sunday is not Friday` is a
[Scenario](/gherkin/reference#example), which is a *concrete example* illustrating how
the software should behave.

The last three lines starting with `Given`, `When` and `Then` are the
[steps](/gherkin/reference#example) of our scenario. This is what Cucumber will execute.

# See Scenario reported as undefined

Now that we have a scenario, we can ask Cucumber to execute it.

{{% block "java" %}}
```shell
mvn test
```

{{% /block %}}

{{% block "javascript" %}}
```shell
npm test
```
{{% /block %}}

{{% block "ruby" %}}

```shell
cucumber
```
{{% /block %}}

Cucumber is telling us we have one `undefined` scenario and three `undefined`
steps.  It's also suggesting some snippets of code that we can use to
**define** these steps:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # null
    When I ask whether it's Friday yet # null
    Then I should be told "Nope"       # null

1 Scenarios (1 undefined)
3 Steps (3 undefined)
0m0.040s
```

You can implement missing steps with the snippets below:

```java
@Given("^today is Sunday$")
public void today_is_Sunday() {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@When("^I ask whether it's Friday yet$")
public void i_ask_whether_is_s_Friday_yet() {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@Then("^I should be told \"([^\"]*)\"$")
public void i_should_be_told(String arg1) {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}
```
{{% /block %}}

{{% block "javascript" %}}
```shell
UUU

Warnings:

1) Scenario: Sunday is not Friday # features/is_it_friday_yet.feature:4
   ? Given today is Sunday
       Undefined. Implement with the following snippet:

         Given('today is Sunday', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When I ask whether it's Friday yet
       Undefined. Implement with the following snippet:

         When('I ask whether it\'s Friday yet', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then I should be told "Nope"
       Undefined. Implement with the following snippet:

         Then('I should be told {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


1 Scenario (1 undefined)
3 steps (3 undefined)
0m00.000s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday is not Friday       # features/is_it_friday_yet.feature:4
    Given today is Sunday              # features/is_it_friday_yet.feature:5
    When I ask whether it's Friday yet # features/is_it_friday_yet.feature:6
    Then I should be told "Nope"       # features/is_it_friday_yet.feature:7

1 scenario (1 undefined)
3 steps (3 undefined)
0m0.052s

You can implement step definitions for undefined steps with these snippets:

Given("today is Sunday") do
  pending # Write code here that turns the phrase above into concrete actions
end

When("I ask whether it's Friday yet") do
  pending # Write code here that turns the phrase above into concrete actions
end

Then("I should be told {string}") do |string|
  pending # Write code here that turns the phrase above into concrete actions
end
```
{{% /block %}}

Copy each of the three snippets for the undefined steps and paste them into
{{% text "java" %}}`src/test/java/hellocucumber/Stepdefs.java`{{% /text %}}
{{% text "javascript" %}}`features/step_definitions/stepdefs.js`{{% /text %}}
{{% text "ruby" %}}`features/step_definitions/stepdefs.rb`{{% /text %}}.

# See scenario reported as pending

Run Cucumber again. This time the output is a little different:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # Stepdefs.today_is_Sunday()
      cucumber.api.PendingException: TODO: implement me
	at hellocucumber.Stepdefs.today_is_Sunday(Stepdefs.java:12)
	at ✽.today is Sunday(hellocucumber/is_it_friday_yet.feature:5)

    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)

1 Scenarios (1 pending)
3 Steps (2 skipped, 1 pending)
0m0.188s

cucumber.api.PendingException: TODO: implement me
	at hellocucumber.Stepdefs.today_is_Sunday(Stepdefs.java:12)
	at ✽.today is Sunday(hellocucumber/is_it_friday_yet.feature:5)
```
{{% /block %}}

{{% block "javascript" %}}
```shell
P--

Warnings:

1) Scenario: Sunday is not Friday # features/is_it_friday_yet.feature:4
   ? Given today is Sunday # features/step_definitions/stepdefs.js:3
       Pending
   - When I ask whether it's Friday yet # features/step_definitions/stepdefs.js:8
   - Then I should be told "Nope" # features/step_definitions/stepdefs.js:13

1 Scenario (1 pending)
3 steps (1 pending, 2 skipped)
0m00.001s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday is not Friday       # features/is_it_friday_yet.feature:4
    Given today is Sunday              # features/step_definitions/stepdefs.rb:1
      TODO (Cucumber::Pending)
      ./features/step_definitions/stepdefs.rb:2:in `"today is Sunday"'
      features/is_it_friday_yet.feature:5:in `Given today is Sunday'
    When I ask whether it's Friday yet # features/step_definitions/stepdefs.rb:5
    Then I should be told "Nope"       # features/step_definitions/stepdefs.rb:9

1 scenario (1 pending)
3 steps (2 skipped, 1 pending)
0m0.073s
```
{{% /block %}}

Cucumber found our step definitions and executed them. They are currently marked as
*pending*, which means we need to make them do something useful.

# See scenario reported as failing

The next step is to do what the comments in the step definitions is telling us to do:

> Write code here that turns the phrase above into concrete actions

Try to use the same words in the code as in the steps.

{{% tip "Ubiquitous Language"%}}
If the words in your steps originated from conversations during an
[Example Mapping](/bdd/example-mapping) session, you're building a
[Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html),
which is a great way to make your production code and test easier to understand
and maintain.
{{% /tip %}}

Change your step definition code to this:

{{% block "java" %}}
```java
package hellocucumber;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import cucumber.api.java.en.Then;
import static org.junit.Assert.*;

class IsItFriday {
    static String isItFriday(String today) {
        return null;
    }
}

public class Stepdefs {
    private String today;
    private String actualAnswer;

    @Given("^today is Sunday$")
    public void today_is_Sunday() {
        this.today = "Sunday";
    }

    @When("^I ask whether it's Friday yet$")
    public void i_ask_whether_is_s_Friday_yet() {
        this.actualAnswer = IsItFriday.isItFriday(today);
    }

    @Then("^I should be told \"([^\"]*)\"$")
    public void i_should_be_told(String expectedAnswer) {
        assertEquals(expectedAnswer, actualAnswer);
    }
}
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

function isItFriday(today) {
  // We'll leave the implementation blank for now
}

Given('today is Sunday', function () {
  this.today = 'Sunday';
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
module FridayStepHelper
  def is_it_friday?(day)
  end
end
World FridayStepHelper

Given("today is Sunday") do
  @today = 'Sunday'
end

When("I ask whether it's Friday yet") do
  @actual_answer = is_it_friday?(@today)
end

Then("I should be told {string}") do |expected_answer|
  expect(@actual_answer).to eq(expected_answer)
end

```
{{% /block %}}

Run Cucumber again:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # Stepdefs.today_is_Sunday()
    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)
      java.lang.AssertionError: expected:<Nope> but was:<null>
	at org.junit.Assert.fail(Assert.java:88)
	at org.junit.Assert.failNotEquals(Assert.java:834)
	at org.junit.Assert.assertEquals(Assert.java:118)
	at org.junit.Assert.assertEquals(Assert.java:144)
	at hellocucumber.Stepdefs.i_should_be_told(Stepdefs.java:30)
	at ✽.I should be told "Nope"(hellocucumber/is_it_friday_yet.feature:7)


Failed scenarios:
hellocucumber/is_it_friday_yet.feature:4 # Sunday isn't Friday

1 Scenarios (1 failed)
3 Steps (1 failed, 2 passed)
0m0.404s
```
{{% /block %}}

{{% block "javascript" %}}
```shell
..F

Failures:

1) Scenario: Sunday is not Friday # features/is_it_friday_yet.feature:4
   ✔ Given today is Sunday # features/step_definitions/stepdefs.js:8
   ✔ When I ask whether it's Friday yet # features/step_definitions/stepdefs.js:12
   ✖ Then I should be told "Nope" # features/step_definitions/stepdefs.js:16
       AssertionError [ERR_ASSERTION]: undefined == 'Nope'
           at World.<anonymous> (/private/tmp/tutorial/hellocucumber/features/step_definitions/stepdefs.js:17:10)

1 Scenario (1 failed)
3 steps (1 failed, 2 passed)
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday is not Friday       # features/is_it_friday_yet.feature:4
    Given today is Sunday              # features/step_definitions/stepdefs.rb:4
    When I ask whether it's Friday yet # features/step_definitions/stepdefs.rb:8
    Then I should be told "Nope"       # features/step_definitions/stepdefs.rb:12

      expected: "Nope"
           got: nil

      (compared using ==)
       (RSpec::Expectations::ExpectationNotMetError)
      ./features/step_definitions/stepdefs.rb:13:in `"I should be told {string}"'
      features/is_it_friday_yet.feature:7:in `Then I should be told "Nope"'

Failing Scenarios:
cucumber features/is_it_friday_yet.feature:4 # Scenario: Sunday is not Friday

1 scenario (1 failed)
3 steps (1 failed, 2 passed)
0m0.092s
```
{{% /block %}}

That's progress! The first two steps are passing, but the last one is failing.

# See scenario reported as passing

Let's do the simplest possible thing to make the scenario pass. In this case,
that's simply to make our function return `Nope`:

{{% block "java" %}}
```java
static String isItFriday(String today) {
    return "Nope";
}
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
function isItFriday(today) {
  return 'Nope';
}
```
{{% /block %}}
{{% block "ruby" %}}
```ruby
def is_it_friday?(day)
  'Nope'
end
```
{{% /block %}}

Run Cucumber again:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # Stepdefs.today_is_Sunday()
    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)

1 Scenarios (1 passed)
3 Steps (3 passed)
0m0.255s
```
{{% /block %}}

{{% block "javascript" %}}
```shell
...

1 Scenario (1 passed)
3 steps (3 passed)
0m00.003s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday is not Friday       # features/is_it_friday_yet.feature:4
    Given today is Sunday              # features/step_definitions/stepdefs.rb:5
    When I ask whether it's Friday yet # features/step_definitions/stepdefs.rb:9
    Then I should be told "Nope"       # features/step_definitions/stepdefs.rb:13

1 scenario (1 passed)
3 steps (3 passed)
0m0.066s
```
{{% /block %}}

Congratulations! You've got your first green Cucumber scenario.

# Add another failing test
The next thing to test for would be that we also get the correct result when it *is* Friday.

Update the `is-it-friday-yet.feature` file:
```gherkin
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"

  Scenario: Friday is Friday
    Given today is Friday
    When I ask whether it's Friday yet
    Then I should be told "TGIF"
```

We'll need to add a step definition to set `today` to "Friday":

{{% block "java" %}}
```java
@Given("^today is Friday$")
    public void today_is_Friday() {
        this.today = "Friday";
    }
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
Given('today is Friday', function () {
  this.today = 'Friday';
});
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
Given("today is Friday") do
  @today = 'Friday'
end
```
{{% /block %}}


When we run this test, it will fail.

{{% block "java" %}}
```shell
    Given today is "Sunday"            # Stepdefs.today_is(String)
    When I ask whether is's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)

  Scenario: Friday is Friday           # hellocucumber/is_it_friday.feature:9
    Given today is "Friday"            # Stepdefs.today_is(String)
    When I ask whether is's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "TGIF"       # Stepdefs.i_should_be_told(String)
      org.junit.ComparisonFailure: expected:<[TGIF]> but was:<[Nope]>
	at org.junit.Assert.assertEquals(Assert.java:115)
	at org.junit.Assert.assertEquals(Assert.java:144)
	at hellocucumber.Stepdefs.i_should_be_told(Stepdefs.java:26)
	at ✽.I should be told "TGIF"(hellocucumber/is_it_friday.feature:12)


org.junit.ComparisonFailure:
Expected :TGIF
Actual   :Nope
 <Click to see difference>


	at org.junit.Assert.assertEquals(Assert.java:115)
	at org.junit.Assert.assertEquals(Assert.java:144)
	at hellocucumber.Stepdefs.i_should_be_told(Stepdefs.java:26)
	at ✽.I should be told "TGIF"(hellocucumber/is_it_friday.feature:12)
```
{{% /block %}}


That is because we haven't implemented the logic yet! Let's do that next.

# Make it pass
We should update our statement to actually evaluate whether or not `today` is equal to `"Friday"`.

{{% block "java" %}}
```java
static String isItFriday(String today) {
    if (today.equals("Friday")) {
        return "TGIF";
    }
    return "Nope";
}
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF"; 
  } else {
    return "Nope";
  }
}
```
{{% /block %}}

{{% block "ruby" %}}
```ruby
def is_it_friday(day)
  if day == 'Friday'
    'TGIF'
  else
    'Nope'
  end
end
```
{{% /block %}}

Run Cucumber again:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Friday is Friday           # hellocucumber/is_it_friday_yet.feature:4
    Given today is Friday              # Stepdefs.today_is_Sunday()
    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "TGIF"       # Stepdefs.i_should_be_told(String)

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # Stepdefs.today_is_Sunday()
    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)

2 scenarios (2 passed)
6 steps (6 passed)
0m0.255s
```
{{% /block %}}

{{% block "javascript" %}}
```shell
......
2 scenarios (2 passed)
6 steps (6 passed)
0m00.002s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday        # features/is_it_friday_yet.feature:4
    Given today is Sunday              # features/step_definitions/stepdefs.rb:8
    When I ask whether it's Friday yet # features/step_definitions/stepdefs.rb:17
    Then I should be told "Nope"       # features/step_definitions/stepdefs.rb:22

  Scenario: Friday is Friday           # features/is_it_friday_yet.feature:9
    Given today is Friday              # features/step_definitions/stepdefs.rb:12
    When I ask whether it's Friday yet # features/step_definitions/stepdefs.rb:17
    Then I should be told "TGIF"       # features/step_definitions/stepdefs.rb:22

2 scenarios (2 passed)
6 steps (6 passed)
0m0.040s
```
{{% /block %}}

# Using variables and examples
So, we all know that there are more days in the week than just Sunday and Friday. Let's update our scenario to use variables and evaluate more possibilities. We'll use variables and examples to evaluate Friday, Sunday, and anything else!

Update the `is-it-friday-yet.feature` file. Notice how we go from `Scenario` to `Scenario Outline` when we start using `Examples`.
```gherkin
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario Outline: Today is or is not Friday
    Given today is <day>
    When I ask whether it's Friday yet
    Then I should be told <answer>

  Examples:
    | day | answer |
    | "Friday" | "TGIF" |
    | "Sunday" | "Nope" |
    | "anything else!" | "Nope" |
```

{{% block "javascript" %}}
Update the `stepdefs.js` file to use the `<day>` and `<answer>` variables.
```javascript
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given('today is {string}', function (givenDay) {
  this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});

```
{{% /block %}}

{{% block "ruby" %}}
Update the `stepdefs.rb` file to use the `<day>` and `<answer>` variables.
```ruby
module FridayStepHelper
  def is_it_friday(day)
    if day == 'Friday'
      'TGIF'
    else
      'Nope'
    end  
  end
end

World FridayStepHelper

Given("today is {string}") do |given_day|
  @today = given_day
end

When("I ask whether it's Friday yet") do
  @actual_answer = is_it_friday(@today)
end

Then("I should be told {string}") do |expected_answer|
  expect(@actual_answer).to eq(expected_answer)
end
```
{{% /block %}}

Run Cucumber again:

{{% block "java" %}}
```shell
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running hellocucumber.RunCucumberTest
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario Outline: Today is or is not Friday # hellocucumber/is_it_friday_yet.feature:4
    Given today is <day>                      # hellocucumber/is_it_friday_yet.feature:5
    When I ask whether it's Friday yet        # hellocucumber/is_it_friday_yet.feature:6
    Then I should be told <answer>            # hellocucumber/is_it_friday_yet.feature:7

  Scenario: Sunday isn't Friday        # hellocucumber/is_it_friday_yet.feature:4
    Given today is Sunday              # Stepdefs.today_is_Sunday()
    When I ask whether it's Friday yet # Stepdefs.i_ask_whether_is_s_Friday_yet()
    Then I should be told "Nope"       # Stepdefs.i_should_be_told(String)

    Examples:
      | day              | answer |
      | "Friday"         | "TGIF" |
      | "Sunday"         | "Nope" |
      | "anything else!" | "Nope" |

3 scenarios (3 passed)
9 steps (9 passed)
0m0.255s
```
{{% /block %}}

{{% block "javascript" %}}
```shell
.........

3 scenarios (3 passed)
9 steps (9 passed)
0m00.001s
```
{{% /block %}}

{{% block "ruby" %}}
```shell
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario Outline: Today is or is not Friday # features/is_it_friday_yet.feature:4
    Given today is <day>                      # features/is_it_friday_yet.feature:5
    When I ask whether it's Friday yet        # features/is_it_friday_yet.feature:6
    Then I should be told <answer>            # features/is_it_friday_yet.feature:7

    Examples:
      | day              | answer |
      | "Friday"         | "TGIF" |
      | "Sunday"         | "Nope" |
      | "anything else!" | "Nope" |

3 scenarios (3 passed)
9 steps (9 passed)
0m0.021s
```
{{% /block %}}

# Refactoring
Now that we have working code, we should do some refactoring:

* We should move the {{% text "java" %}}`isItFriday` method{{% /text %}}{{% text "javascript" %}}`isItFriday` function{{% /text %}}{{% text "ruby" %}}`is_it_friday` function{{% /text %}} out from the test code into production code.

* We could at some point extract helper methods from our step definition, for functions we use in several places.

# Summary

In this brief tutorial you've seen how to install Cucumber, how to follow
the BDD process to develop a very simple function, and how to use that function to evaluate multiple scenarios!
