---
title: 10 Minute Tutorial
polyglot: true
---
{{% block "java" %}}

To get started with Cucumber in Java, you will need the following:

- [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)

- [Maven](https://maven.apache.org/index.html)

- [Cucumber-JVM](https://github.com/cucumber/cucumber-jvm)

- An IDE editor, for example [IntelliJ IDEA](https://www.jetbrains.com/idea/?fromMenu#chooseYourEdition) (which will be used in this
  introduction)

- A Cucumber plugin for your chosen IDE

- A text editor

### Check the Versions!!

The default file defines the following versions:

- Java 1.7
- Junit 4.12
- Cucumber {% version "cucumber-jvm" %}
- Maven 3.3

# Add Cucumber to existing project

Add Cucumber to your project by adding the required dependencies to your `pom.xml`:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>{{% version "cucumberjvm" %}}</version>
    <scope>test</scope>
</dependency>
```

{{% note "POM"%}}
The Project Object Model (POM) file is an XML representation of a Maven project. It defines the project settings, dependencies, and plug-ins.
{{% /note %}}

{{% note "Gradle"%}}
If you prefer to use Gradle, have a look at the [installation with Gradle](/installation/#gradle).
{{% /note %}}

# Testing the Setup (Maven)

To make sure everything works correctly together, open a command prompt and navigate to your project directory (the one containing the pom.xml file) and enter `mvn clean test`.

You should see something like the following:

=> Check!
```
Running <project>.RunCuckesTest
No features found at [classpath:<project>]

0 Scenarios
0 Steps
<time>s

Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: <time> secs
results:

Tests run: 0, Failures: 0, Errors 0, Skipped: 0

[INFO] ---------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ---------------------------------------------------------------------
[INFO] Total time: <time> s
[INFO] Finished at: <date> <time>
[INFO] Final Memory: <X>M/<Y>M
[INFO] ---------------------------------------------------------------------
```

Your project builds correctly, but nothing can is tested yet as you have not specified any behaviour to test against.

{{% note "Creating a Clean Build"%}}
To create a clean build, enter `mvn clean install` at the command prompt.
{{% /note %}}

# Specifying Behaviour

You specify behaviour by defining features and scenarios.

## Defining the Feature Directory

Features are defined in feature files, which are stored in the `src/test/resources/feature` directory (or a subdirectory).

Here `feature` can also be replaced with name related to your project or domain.

## Creating a Feature

To create a feature file:

1. Open the project in your IDE and right-click on the `src/test/resources/feature` folder.

2. Select **New > File**

3. Enter a name for your Feature file, ensuring that you use the `.feature` extension.

Files in this folder with an extension of `.feature` are automatically recognised as feature files. Each feature file describes a single feature, or part of a feature.

## Creating a Scenario

Scenarios are added to the feature file. They define examples of the expected behaviour, which can be used to test the feature.

## Running the test

To run a feature from the command line, open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`.

When you scroll to the start of the output, you should see something like this:

```
[INFO] Scanning for projects...
[INFO] ---------------------------------------------------------------------
[INFO] BUILDING <project> <version>
[INFO] ---------------------------------------------------------------------

<progress messages....>

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running <project>.RunCukesTest
Feature: Hear Shout

  Scenario: Listener is within range
    Given Lucy is located 15m from Sean
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears Sean's message

1 Scenarios (1 undefined)
3 Steps (3 undefined)
<time>s
```

You can see that we have one undefined scenario and three undefined steps.

To define the scenario, you have to define all of its steps.

## Defining Steps

These all have a keyword (`Given`, `When`, and `Then`) followed by a step. The step is then matched to a [step definition](/step-definitions/) which map the plain text step to programming code.

### `Given`/`When`/`Then`

The plain text steps are defined in the Gherkin language.

[Gherkin](/gherkin/) allows developers and business stakeholders to describe and share the expected behaviour of the application. It does not describe the implementation.

The feature file contains the Gherkin source.

The `Given` keyword precedes text defining the context; the known state of the system (or precondition). 

The `When` keyword precedes text defining an action.  

The `Then` keyword precedes text defining the result of the action on the context (or expected result). 

### Snippets for Missing Steps

In our last test, we had one `undefined` Scenario and three `undefined` Steps. Luckily, Cucumber has given us examples, or snippets, that we can use to define the steps.

These will look something like this:

```
You can implement missing steps with the snippets below:

@Given("^Lucy is located (\\d+)m from Sean$")
public void lucy_is_located_m_from_Sean(int arg1) throws Throwable {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@When("^Sean shouts "free bagels at Sean's"$")
public void sean_shouts_free_bagels_at_Sean_s() throws Throwable {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@Then("^Lucy hears Sean's message$")
public void lucy_hears_Sean_s_message() throws Throwable {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}
```

In your IDE, navigate to the `src/test/java/<project>` folder and right-click to display the context menu. Select **New > Java Class**. Give the class a name and paste in the snippets.

Your IDE will not recognise those symbols, so we'll need to add `import` statements. 
In IntelliJ, put your cursor on the `@Given` symbol and press **ALT** + **ENTER**, then select **Import class**. Do the same for the other symbols (shown in red).

Now, when you run the test, your step definitions will be found and run.

{{% note "Run configurations"%}}
If this does not work, select **Run > Edit Configurations**, select **Cucumber java** from the **Defaults** drop-down, and add the project name to the **Glue** field on the **Configuration** tab.
{{% /note %}}

However, since we've defined a `PendingException`, Cucumber will skip the other steps. 
We will need to implement all steps to actually do something.

Once you have implemented your step definitions and the test passes, the summary of your results should look something like this:

```
Tests run: 5, Failures: 0, Errors: 0, Skipped: 4, Time elapsed: 0.656 sec

Results :

Tests run: 5, Failures: 0, Errors: 0, Skipped: 4

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 5.688 s
[INFO] Finished at: 2017-05-22T15:43:29+01:00
[INFO] Final Memory: 15M/142M
[INFO] ------------------------------------------------------------------------
```

# Starter project
If you prefer to get started with a working project, try the skeleton project, [which is available from GitHub](https://github.com/cucumber/cucumber-java-skeleton).
{{% /block %}}

{{% block "javascript" %}}
TO DO
{{% /block %}}

{{% block "ruby" %}}
TO DO
{{% /block %}}