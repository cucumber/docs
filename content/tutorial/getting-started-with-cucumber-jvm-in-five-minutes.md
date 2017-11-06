---
menu:
  junkyard:
    weight: 25
  old: null
title: Getting Started with Cucumber-JVM
---

This page provides a brief introduction to get you started with Cucumber-JVM.

You will need the following:

- [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)

- [Maven](https://maven.apache.org/index.html)

- [Cucumber-JVM](https://github.com/cucumber/cucumber-jvm)

- An IDE editor, for example [IntelliJ  IDEA](https://www.jetbrains.com/idea/?fromMenu#chooseYourEdition) (which will be used in this
  introduction)

- A Cucumber plugin for your chosen IDE

- A text editor

# Concepts

Cucumber helps you define what your application should do, not how it should do it.

Definitions for terms can be found under the Reference section.

# Overview

The following diagram illustrates the structure when using Cucumber:

  PLACEHOLDER *&lt;insert Aslak's illustration of how everything fits together>*

Maven is a software project management and comprehension tool, based on the concept of a Project Object Model (POM). Maven can manage a project's build, reporting and documentation from a central piece of information.

JUnit is a simple framework for writing repeatable tests. Cucumber is executed as a JUnit test using a JUnit runner. This means that Cucumber runs seamlessly with Maven.

Cucumber uses Feature files to define the Features that you require in your system. It also uses Step Definitions to define what needs to be done to test the Feature.

The Step Definitions define the code required for your application to deliver on the agreed Features.

# Creating a Project

For this introduction, we will use the skeleton project, [which is available from GitHub](https://github.com/cucumber/cucumber-java-skeleton).

## Project Structure

Let's take a quick look at the project structure:

```
   gradle  
   src  
   .cucumberproignore  
   .pitignore  
   .travis.yml  
   build.gradle  
   build.xml  
   gradelew  
   pom.xml  
   README.md  
   shouty.iml  
```

Now we'll look a bit closer at the following parts of the structure and tidy up a bit:

- In the skeleton directory, you'll see a `POM.XML` file.

  This Project Object Model (POM) defines the project and its configuration in a manner that is understood by Maven.

- Navigate to `src/main/java/skeleton`

  You'll see a single file called `Belly.java`.
  Delete the `Belly.java` file.

- Navigate to `src/test/resources/skeleton`

  You'll see a single file, called `belly.feature`.

  Delete the `belly.feature` file.

- Navigate to `src/test/java/skeleton`

  You'll see the `RunCukesTest.java` file. This file is used to run the tests.

  There is also a file called `Stepdefs.java`. Delete this file.

Now, you have a clean project! But before we start, let's rename the application.

Open the `POM.XML` file in a text editor. At the top of the file, you will see the following:

```
<groupId>cucumber</groupId>
    <artifactId>cucumber-java-skeleton</artifactId>
    <version>0.0.1</version>
    <packaging>jar</packaging>
    <name>Cucumber-Java Skeleton</name>
```

Change the `<groupId>`, `<artifactId>`, and `<name>`.

## Creating a Package

Now, you need to create a package.

To do this, right-click on the `src/test/java` folder and select **New > Package** from the context menu.

Enter a name for your new package. We'll call it shouty.

### Using `POM.XML`

The Project Object Model (POM) file is an XML representation of a Maven project. It defines the project settings, dependencies, and plug-ins.

You can edit the `POM.XML` file in any text editor, or in the IDE.

Take a look at the Maven [POM Reference](https://maven.apache.org/pom.html#Introduction) if you want to learn more.

Open the POM file in your preferred editor and we'll check that the defined versions agree with our installed stack and add dependencies for the shouty project.

### Check the Versions

The default file defines the following versions:

- Java 1.7
- Junit 4.12
- Cucumber 1.2.5
- Maven 3.3

To check the versions you have installed, open a command prompt and enter `mvn --version`.

If your versions do not agree with the defaults in the skeleton POM file, update the properties accordingly and save the updated POM file.

### Adding Dependencies

The default POM contains definitions for the following dependencies:

- Cucumber Java
- Cucumber JUnit
- JUnit

We'll have to add a dependency for Cucumber core, as follows:

```
 <dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-core</artifactId>
    <version>${cucumber.version}</version>
    <scope>test</scope>
 </dependency>
```

Save the updated POM file.

# Testing the Setup (Maven)

Time to make sure everything is hanging together correctly.

Open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`.

You should see something like the following:

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

You have a correctly built project, but nothing can be tested as you have not specified any behaviour to test against.

# Creating a Clean Build

To create a clean build, enter `mvn clean install` at the command prompt.

# Specifying Behaviour

How do you specify behaviour? By defining Features and their Scenarios.

We'll do that now.

## Defining the Feature Directory

Features are defined in Feature files, which are stored in the `feature/` directory.

As we saw in the project structure, the `belly.feature` file was stored under `src/test/resources/skeleton`. That's your Feature directory.

Bring it into line with the new project name, and rename the `skeleton/` folder to `shouty/`. Now, your Feature directory is `src/test/resources/shouty`.

While we're doing this, we'll bring the other `skeleton` folders - the ones under `src/test/java` and `src/main/java` - into line, too. Rename both `skeleton` folders to `shouty`.

## Creating a Feature

To create a Feature file:

1. Open your project in your chosen IDE if necessary and right-click on the `src/test/resources/shouty` folder.

2. Select **New > File**

3. Enter a name for your Feature file, ensuring that you use the `.feature` extension. For example, `hear_shout.feature`

Files in this folder with an extension of `.feature` are automatically recognised as Feature files. Each Feature file describes a single Feature.

We are going to create tests for a new social networking application, shouty, especially good for marketing a small business. The basic idea is that someone "shouts" (or sends) their message and anyone in a specified distance will "hear" (or receive) their message.

Now, let's add some content to this file to define the Feature. Open the Feature file in your IDE and add the name of the Feature: *`Feature: Hear Shout`*.

We don't want everyone with the application to hear the shout, only those within 1000m. So add another line to the Feature file with this rule. Add *`Shouts have a range of approximately 1000m`*.

Now we need to think of a way of testing against this rule. We do that using Scenarios.

## Creating a Scenario

Scenarios are added to the Feature file. They define the conditions to test the Feature. For our Feature, there are two things we need to check:

* Do people within 1000m hear the shout?, and
* Do people further than 1000m *not* hear the shout?

We'll concentrate on the first one for now.

Add the following to the Feature file (don't worry, we'll walk through it in a minute):

```
 Scenario: Listener is within range
  Given Lucy is located 15m from Sean
  When Sean shouts “free bagels at Sean’s”
  Then Lucy hears Sean’s message
```

## Running a Feature

Time to see what difference adding the Feature and Scenario makes.

Open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`.

That's a lot of output! We'll take it bit by bit, starting at the top of the output.

Scroll to the start of the output. You should see something like the following:

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

Ignore the rest of the output for now. We'll work through it.

You can see that we have one undefined Scenario and three undefined Steps.

To define the Scenario, you have to define all of its related Steps. In our case, this is all three Steps.

## Defining Steps

The Steps you need to define to check that people within 1000m hear the shout are defined in the following lines:

- Given Lucy is located 15m from Sean
- When Sean shouts "free bagels at Sean's"
- Then Lucy hears Sean's message

These all have a keyword (`Given`, `When`, and `Then`) followed by a Step. The Step is then matched to a *Step Definition*.

[Step Definitions](/cucumber/step-definitions/) define the plain text Step in code.

### `Given`/`When`/`Then`

The plain text Steps are defined in the Gherkin language.

[Gherkin](/gherkin/gherkin-intro/) allows technical and non-technical staff to describe and share the expected behaviour of the application. It does not describe the implementation.

The Feature file contains the Gherkin source. In our Feature, we use only the `Given`, `When`, and `Then` keywords. (There are other keywords, too. You can
read more about them on the [Wiki page](https://github.com/cucumber/cucumber/wiki/Gherkin).)

The `Given`, `When`, `Then` structure is used in Agile developments to help when writing acceptance criteria or user stories.

The `Given` keyword precedes text defining the context. Our Scenario is that the listener is under 1000m from the shouter. We are using an example of a listener within this limit (15m) to set the context.

The `When` keyword precedes text defining an action.  Our action is that the shouter sends a message.

The `Then` keyword precedes text defining the result of the action on the context. Our result is that the listener who is 15m away hears the shout.

## Running the Tests

You can keep amending your Scenario and re-testing.

Running the test is always the same: open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`.

The end of the output includes a summary of the results. It'll look something like the following:

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

### Passed Tests

Did your tests pass? Well done! Now, go write the code for this part of the application.

**Note:** Passing these tests does not guarantee the implementation will be correct—just that the behaviour is as expected. You will need to test your code and your Feature.

### `Failed` Tests

Tests fail if the behaviour is not as expected. If Lucy does not hear Sean's shout despite being within 1000m, the test will fail.

You need to re-examine your Step Definition. Once you have made changes, re-run the test.

You need to work round the define-test-redefine-retest loop until the test passes before you move onto coding.

### `Pending` Tests

Tests are `pending` when they are incomplete.

It is good practice to give unfinished Step Definitions a status of `pending` and to throw a `PendingException` when run. This will be replaced when the Step Definition is completed.

You shouldn't be surprised by any tests that are pending. After you have completed the Step Definition, a previously pending test should be either `passed` or `failed`.

### `Skipped` Tests

Any tests following a test that was deemed to be `failed` or `pending` will be `skipped`.

The only way to run a `skipped` test is to ensure all tests before it are deemed to be `passed`.

### Snippets for Missing Steps

In our last test, we had one `undefined` Scenario and three `undefined` Steps. Luckily, Cucumber has given us examples, or snippets, that we can use to define the Steps.

Check the output from your clean test. It'll look something like the following:

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

In your chosen IDE, navigate to the `src/test/java/<project>` folder and right-click to display the context menu. Select **New > Java Class**. Give the class a name and paste in the snippets.

IntelliJ will not recognise those symbols, so we'll need to add `import` statements. Put your cursor on the `@Given` symbol and press **ALT** + **ENTER**, then select **Import class**. Do the same for the other symbols (shown in red).

**Note:** If this does not work, select **Run > Edit Configurations**, select **Cucumber java** from the **Defaults** drop-down, and add the project name to the **Glue** field on the **Configuration** tab.

Now, run the tests again.

This time, your Step Definitions will be found, and the first will be run.

However, since we've defined a `PendingException`, Cucumber will skip the other Steps.
