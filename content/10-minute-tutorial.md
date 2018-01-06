---
title: 10 Minute Tutorial
polyglot: true
---
{{% block "java" %}}

To get started with Cucumber in Java, you will need the following:

- [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html) - Java 8 (Java 9 is not yet supported by Cucumber)

- [Maven](https://maven.apache.org/index.html) - Version 3.3.1 or higher

- An IDE editor, for example [IntelliJ IDEA](https://www.jetbrains.com/idea/?fromMenu#chooseYourEdition) (which will be used in this
  introduction)

- A Cucumber plugin for your IDE, for example [IntelliJ IDEA Cucumber for Java plugin](https://plugins.jetbrains.com/plugin/7212-cucumber-for-java) to go with IntelliJ IDEA

- [Cucumber-JVM](https://github.com/cucumber/cucumber-jvm) (which we will add as a dependency to our project)

- [JUnit 4](http://junit.org/junit4/) (which we will add as a dependency to our project)

# Setting up the project

First, we need to set up the project so we can use Cucumber.

## Create a Maven project

To create a new Maven project in IntelliJ, click the menu option **File > New > Project**.

In the **New project** dialog box, select **Maven** on the left (if it isn't already selected).

Make sure that the Project SDK is selected (for instance, Java 1.8) and click **Next**.

Specify a **GroupId** and **ArtifactId** for your project and click **Next**.

Specify a **Project name** and **Project location** for your project (if needed) and click **Finish**.

You should now have a project with the following structure:

```
├── pom.xml             (containing our Cucumber and JUnit dependencies)
└── src
    ├── main
    │   └── java        (marked as sources root)
    │   └── resources   (marked as resources root)
    └── test
        └── java        (marked as test sources root)
```

## Add Cucumber to your project

Add Cucumber to your project by adding a dependency to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-java</artifactId>
        <version>{{% version "cucumberjvm" %}}</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

In addition, you need the following dependencies to run Cucumber with JUnit:
```xml
<dependencies>
    ...
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-junit</artifactId>
        <version>{{% version "cucumberjvm" %}}</version>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

If you have IntelliJ configured to autoimport dependencies, it will automatically import them for you.
Otherwise, you can manually import them by opening the "**aven Projects** menu on the right and clicking the "Reimport all Maven Projects" icon on the top left of that menu.
To check if your dependencies have been downloaded, you can open the External Libraries in the left Project menu in IntelliJ.

If you prefer to use Gradle, have a look at the [installation with Gradle](/installation/#gradle).

To make sure everything works together correctly, open a command prompt and navigate to your project directory (the one containing the pom.xml file) and enter `mvn clean test`.

You should see something like the following:
```
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building cucumber-tutorial 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------

    <progress messages....>

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: <time> s
[INFO] Finished at: <date> <time>
[INFO] Final Memory: <X>M/<Y>M
[INFO] ------------------------------------------------------------------------

```

Your project builds correctly, but nothing is tested yet as you have not specified any behaviour to test against.

# Specifying Expected Behaviour

We specify the expected behaviour by defining features and scenarios.

## Creating the Feature Directory

Features are defined in feature files, which are stored in the `src/test/resources/` directory (or a subdirectory).

We need to create this directory, as it was not created for us.
In IntelliJ, right click on the Test folder, select **New > Directory** and name this directory `resources`.
Right click the folder and select **Mark directory as > Test Resources Root**.

You can add subdirectories as needed. Create a subdirectory for your project in `src/test/resources/`

Our project structure is now as follows:

```
├── pom.xml             (containing our Cucumber and JUnit dependencies)
└── src
    ├── main
    │   └── java        (marked as sources root)
    │   └── resources   (marked as resources root)
    └── test
        ├── java        (marked as test sources root)
        └── resources   (marked as test resources root)
                └── <project>
```

## Creating a Feature

To create a feature file:

1. Open the project in your IDE (if needed) and right-click on the `src/test/resources/<project>` folder.

2. Select **New > File**

3. Enter a name for your feature file, and use the `.feature` extension. For instance, `belly.feature`.

Files in this folder with an extension of `.feature` are automatically recognised as feature files. Each feature file describes a single feature, or part of a feature.

Open the file (double click it) and add the feature description, starting with the `Feature` keyword and an optional description.

For instance:
```gherkin
Feature: Belly
  Optional description of the feature
```

## Creating a Scenario

Scenarios are added to the feature file, to define examples of the expected behaviour. These scenarios can be used to test the feature.
Start a scenario with the `Scenario` keyword and add a brief description of the scenario. To define the scenario, you have to define all of its steps.

## Defining Steps

These all have a keyword (`Given`, `When`, and `Then`) followed by a step. The step is then matched to a [step definition](/step-definitions/) which map the plain text step to programming code.

The plain text steps are defined in the [Gherkin](/gherkin/) language.

Gherkin allows developers and business stakeholders to describe and share the expected behaviour of the application. It should not describe the implementation.

The feature file contains the Gherkin source.

The `Given` keyword precedes text defining the context; the known state of the system (or precondition).

The `When` keyword precedes text defining an action.

The `Then` keyword precedes text defining the result of the action on the context (or expected result).

For instance:
```gherkin
  Scenario: a few cukes
    Given I have 42 cukes in my belly
    When I wait 1 hour
    Then my belly should growl
```

# Running the test

You can run the test by right clicking the feature file, and selecting **Run 'Feature: tutorial'** from the context menu.

{{% note "Formatter error"%}}
If you are using Cucumber v2.0.0 or higher, when running the test for the first time you might get an error message that mentions `CucumberJvmSMFormatterUtil`.
If so, open your **Run Configurations** and remove the following argument `--plugin org.jetbrains.plugins.cucumber.java.run.CucumberJvm2SMFormatter`.
{{% /note %}}

You should get something like the following result:
```
1 Scenarios (1 undefined)
3 Steps (3 undefined)
0m0.015s


You can implement missing steps with the snippets below:

@Given("^I have (\\d+) cukes in my belly$")
public void i_have_cukes_in_my_belly(int arg1) throws Exception {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@When("^I wait (\\d+) hour$")
public void i_wait_hour(int arg1) throws Exception {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}

@Then("^my belly should growl$")
public void my_belly_should_growl() throws Exception {
    // Write code here that turns the phrase above into concrete actions
    throw new PendingException();
}


Process finished with exit code 0
```

## Snippets for Missing Steps

We now have one `undefined` scenario and three `undefined` steps. Luckily, Cucumber has given us examples, or snippets, that we can use to define the steps.

In your IDE, navigate to the `src/test/java/<project>` folder and right-click to display the context menu. Select **New > Java Class**. Give the class a name and paste in the snippets.

Your IDE will not recognise those symbols, so we'll need to add `import` statements.
In IntelliJ, put your cursor on the `@Given` symbol and press **ALT** + **ENTER**, then select **Import class**. Do the same for the other symbols (underlined in red).

Now, when you run the test, your step definitions will be found and run.

{{% note "Run configurations"%}}
If this does not work, select **Run > Edit Configurations**, select **Cucumber java** from the **Defaults** drop-down, and add the project name to the **Glue** field on the **Configuration** tab.
{{% /note %}}


Your result will include something like the following:
```
cucumber.api.PendingException: TODO: implement me
	at skeleton.Stepdefs.i_have_cukes_in_my_belly(Stepdefs.java:10)
	at ✽.I have 42 cukes in my belly(/Users/maritvandijk/IdeaProjects/cucumber-java-skeleton/src/test/resources/skeleton/belly.feature:4)

```

The reason for this is that we haven't actually implemented this step; it throws a `PendingException` telling you to implement the step.
We will need to implement all steps to actually do something.

## Implement the steps

The step can be implemented like this:
```java
    @Given("^I have (\\d+) cukes in my belly$")
    public void I_have_cukes_in_my_belly(int cukes) throws Throwable {
        Belly belly = new Belly();
        belly.eat(cukes);
    }
```

To make this step compile we also need to implement a class Belly with a method eat().
Implement the class in a package inside your src/main/java folder.

Now you run the test and implement the code to make the step pass. Once it does, move on to the next step and repeat.

## Result

Once you have implemented all your step definitions (and the expected behaviour in your application) and the test passes, the summary of your results should look something like this:

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

# Examples
If you prefer to get started with a working project, try the skeleton project [which is available from GitHub](https://github.com/cucumber/cucumber-java-skeleton).

For more examples of how to use Cucumber, have a look at the [examples on GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/examples).
{{% /block %}}

{{% block "javascript" %}}
TO DO
{{% /block %}}

{{% block "ruby" %}}
TO DO
{{% /block %}}