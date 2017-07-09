---
title: Getting Started with Cucumber-JVM
menu: main
---
This page provides a brief introduction to get you started with Cucumber-JVM.

You will need the following:

* [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html) 

* [Maven](https://maven.apache.org/index.html)

* Cucumber-JVM 

* An IDE editor, for example [IntelliJ  IDEA](https://www.jetbrains.com/idea/?fromMenu#chooseYourEdition) (which will be used in this
introduction)

* Cucumber plug-in for your chosen IDE

* A text editor

# Concepts

Cucumber helps you define what your application should do, not how it should do it.

Definitions for terms can be found under the Reference section.

# Overview

The following diagram illustrates the structure when using Cucumber:

  PLACEHOLDER _<insert Aslak's illustration of how everything fits together>_

Maven is a software project management and comprehension tool, based on the concept of a project object model (POM). Maven can manage a project's build, reporting and documentation from a central piece of information.

JUnit is a simple framework for writing repeatable tests. Cucumber is executed as a JUnit test using a JUnit runner. This means that Cucumber runs seamlessly with Maven.

Cucumber uses feature files to define the features that you require in your system. It also uses step definitions to define what needs to be done to test the feature.

The step definitions define the code required for your application to deliver on the agreed features.

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

* In the skeleton directory, you'll see a _pom.xml_ file 

  This Project Object Model (POM) defines the project and its configuration in a manner that is understood by Maven.

* Navigate to _src\main\java\skeleton_

  You'll see a single file called _Belly.java_.
  Delete the _Belly.java_ file

* Navigate to _src\test\resources\skeleton_

  You'll see a single file, called _belly.feature_. 

  Delete the _belly.feature_ file.

* Navigate to _src\test\java\skeleton_

  You'll see the _RunCukesTest.java_ file. This file is used to run the tests. 

  There is also a file called _Stepdefs.java_; delete this file.
  
Now, you have a clean project, but before we start let's rename the application.

Open the _POM.XML_ file in a text editor. At the top of the file, you will see the following:

```
    <groupId>cucumber</groupId>
    <artifactId>cucumber-java-skeleton</artifactId>
    <version>0.0.1</version>
    <packaging>jar</packaging>
    <name>Cucumber-Java Skeleton</name>
```

Change the `<groupId>`, `<artifactId>` and `<name>`.

## Creating a Package

Now, you need to create a package. 
 
To do this, right-click on the _src\test\java_ folder and select __New > Package__ from the context menu.
 
Enter a name for your new package. We'll call it shouty.

### Using pom.xml

The project object model (POM) file is an XML representation of a Maven project. It defines the project settings, dependencies and plug-ins.

You can edit the _pom.xml_ file in any text editor or in the IDE.

Take a look at the Maven [POM Reference](https://maven.apache.org/pom.html#Introduction) if you want to learn more.

Open the POM file in your preferred editor and we'll check that the defined versions agree with our installed stack and add dependencies for the shouty project.

### Check the Versions

The default file defines the following versions:

* Java 1.7
* Junit 4.12
* Cucumber 1.2.5
* Maven 3.3

To check the versions you have installed, open a command prompt and enter `mvn --version`. 

If your versions do not agree with the defaults in the skeleton POM file, update the properties accordingly and save the updated POM file.

### Adding Dependencies

The default POM contains definitions for the following dependencies:

* Cucumber Java
* Cucumber JUnit
* JUnit

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

How do you specify behaviour? By defining features and their scenarios. 

We'll do that now.

## Defining the Feature Directory

Features are defined in feature files, which are stored in the feature directory.

As we saw in the project structure, the _belly.feature_ file was stored under _src\test\resources\skeleton_; that's your feature directory.

We'll bring it into line with the new project name and rename the _skeleton_ folder to _shouty_, so now your feature directory is _src\test\resources\shouty_.

While we're doing this, we'll bring the other _skeleton_ folders - the ones under _src\test\java_ and _src\main\java_ - into line too. Rename both _skeleton_ folders to _shouty_.

## Creating a Feature

To create a feature file:

1. Open your project in your chosen IDE if necessary and right-click on the _src\test\resources\shouty_ folder

2. Select __New > File__

3. Enter a name for your feature file, ensuring that you use the _.feature_ extension. For example, _hear_shout.feature_

Files in this folder with an extension of _.feature_ are automatically recognised as feature files. Each feature file describes a single feature.

We are going to create tests for a new social networking application, shouty, especially good for marketing a small business. The basic idea is that someone "shouts" (or sends) their message and anyone in a specified distance will "hear" (or receive) their message.

Now, let's add some content to this file to define the feature. Open the feature file in your IDE and add the name of the feature. We'll add _`Feature: Hear Shout`_.

We don't want anyone with the application to hear the shout, only those within 1000m, so we'll add another line to the feature file with this rule. Add _Shouts have a range of approximately 1000m_.

Now we need to think of a way of testing against this rule. We do that using scenarios. 

## Creating a Scenario

Scenarios are added to the feature file. They define the conditions to test the feature. For our feature, there are two things we need to check; do people within 1000m hear the shout and do those outside 1000m not hear the shout.

We'll concentrate on the first of these conditions. Add the following to the feature file (don't worry, we'll walk through it in a minute):

```
  Scenario: Listener is within range
    Given Lucy is located 15m from Sean
    When Sean shouts “free bagels at Sean’s”
    Then Lucy hears Sean’s message
```

## Running a Feature

Time to see what difference adding the feature and scenario makes.

Open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`. 

That's a lot of output, we'll take it bit by bit starting at the top of the output. 

Scroll to the start of the output, you should see something like the following:

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

Ignore the rest of the output for now, we'll work through it.

You can see that we have one undefined Scenario and three undefined Steps.

To define the Scenario, you have to define all of the related steps. In our case, this is all three steps.

## Defining Steps

The steps you need to define to check that people within 1000m hear the shout are defined in the following lines:

* Given Lucy is located 15m from Sean
* When Sean shouts "free bagels at Sean's"
* Then Lucy hears Sean's message

These all have a keyword (Given, When and Then) followed by a step. The step is then matched to a _step definition_.

[Step definitions](https://cucumber.netlify.com/reference/step-definitions/) define the plain text step in code.

### Given/When/Then

The plain text steps are defined in the Gherkin language.

[Gherkin](https://cucumber.netlify.com/reference/gherkin/) allows technical and non-technical staff to describe and share the expected behaviour of the application. It does not describe the implementation.

The feature file contains the Gherkin source. In our feature, we use only the Given, When and Then keywords - there are others; you can read more on the [Wiki page](https://github.com/cucumber/cucumber/wiki/Gherkin).

The Given, When, Then structure is used in Agile developments to help when writing acceptance criteria or user stories.

The Given keyword precedes text defining the context. Our Scenario is that the listener is under 1000m from the shouter, we are using an example of a listener within this limit (15m) to set the context.

The When keyword precedes text defining an action.  Our action is that the shouter sends a message. 

The Then keyword precedes text defining the result of the action on the context. Our result is that the listener who is 15m away hears the shout.

## Running the Tests

You can keep amending your scenario and re-testing.

Running the test is always the same: open a command prompt, navigate to your project directory (the one containing the POM file) and enter `mvn clean test`. 

The end of the output includes a summary of the results; it'll look something like the following:

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

Your tests pass? Well done! Now, go write the code for this part of the application.

__Note:__ Passing these tests does not guarantee the implementation will be correct, just that the behaviour is as expected. You will need to test your code and your feature.

### Failed Tests

Tests fail if the behaviour is not as expected. If Lucy does not hear Sean's shout despite being within 1000m, the test will fail.

You need to re-examine your step definition. Once you have made changes, re-run the test.

You need to work round the define-test-redefine-retest loop until the test passes before you move onto coding.

### Pending Tests

Tests are pending when they are incomplete.

It is good practice to give unfinished step definitions a status of pending and to throw a `PendingException` when run. This will be replaced when the step definition is completed.

You shouldn't be surprised by any tests that are pending. After you have completed the step definition, a previously pending test should be passed or failed.

### Skipped Tests

Any tests following a test that was deemed to be Failed or Pending will be skipped.

The only way to run a Skipped test is to ensure all tests before it are deemed to be Passed.

### Snippets for Missing Steps

In our last test, we had one underfined Scenario and three undefined Steps, luckily, Cucumber has given us examples, or snippets, that we can use to define the steps.

Check the output from your clean test, it'll look something like the following:

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

In your chosen IDE, navigate to the _src\test\java_*\\<project>* folder and right-click to display the context menu. Select __New > Java Class__. Give the class a name and paste in the snippets.

IntelliJ will not recognise those symbols, so we'll need to add import statements. Put your cursor on the _@Given_ symbol and press __ALT__ + __ENTER__, then select __Import class__, do the same for the other symbols (shown in red).

__Note:__ If this does not work, select __Run > Edit Configurations__, select __Cucumber java__ from the __Defaults__ drop-down and add the project name to the __Glue__ field on the __Configuration__ tab.

Now, run the tests again.

This time, your step definitions will be found, and the first will be run. However, as we have defined a `PendingException`, it will skip the other steps.





















