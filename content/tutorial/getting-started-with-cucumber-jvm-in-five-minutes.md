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

  __<insert Alsak's illustration of how everything fits together>__

Maven a software project management and comprehension tool, based on the concept of a project object model (POM). Maven can manage a project's build, reporting and documentation from a central piece of information.

JUnit is a simple framework for writing repeatable tests. Cucmber is executed as a JUnit test using a JUnit runner. This means that Cucumber runs seamlessly with Maven.

Cucumber uses feature files to define the features that you require in your system. It also uses step definitions to define what needs to be done to test the feature.

The step definitions define the code required for your application to deliver on the agreed features.

# Creating a Project

For this introduction, we will use the skeleton project, [which is available from GitHub](https://github.com/cucumber/cucumber-java-skeleton).

## Project Structure

Let's take a quick look at the project structure:

'''project structure  
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
'''

Now we'll look a bit closer at the following parts of the structure and tidy up a bit:

* In the shouty directory, you'll see a _POM.XML_ file 
  This Project Object Model (POM) defines the project and its configuration in a manner that is understood by Maven.
* Navigate to _src\main\java\skeleton_
  You'll see a single file called _Belly.java_.
  Delete the _Belly.java_ file
* Navigate to _src\test\resources\skeleton_
  You'll see a single file, called _belly.feature_. 
  Delete the -belly.feature_ file.
* Navigate to _src\test\java\skeleton_
  You'll see the _RunCukesTest.java_ file. This file is used to run the tests. 
  There is also a file called _Stepdefs.java_; delete this file.
  
Now, you have a clean project, but before we start let's rename the application.

Open the _POM.XML_ file in a text editor. At the top of the file, you will see the following:

'''
<groupId>cucumber</groupId>
    <artifactId>cucumber-java-skeleton</artifactId>
    <version>0.0.1</version>
    <packaging>jar</packaging>
    <name>Cucumber-Java Skeleton</name>
'''

Change the '<groupId>', '<artifactId>' and '<name>'.

# Creating a Project

For this introductions, we will use the shouty project, [which is available from GitHub](https://slack-redir.net/link?url=http%3A%2F%2Fgithub.com%2Fcucumber-ltd%2Fshouty.java&v=3). 

## Project Structure

This will describe the structure of the project 

## Creating a Package

This will describe how to create the package for your first
Cucumber files

### Using POM.XML

This will describe the project object model (POM) and how to
edit the POM.XML file

### Adding Dependencies

This will describe adding dependencies to your package

# Testing the Setup (Maven)

This will describe running mvn clean test to ensure the structure
is valid 

# Creating a Clean Build

This will describe how to create a clean build from which to
start

# Specifying Behaviour (Cucumber-JVM)

This will introduce the location, hierarchy and structure of
the feature file

## Defining the Feature Directory

This will describe the feature directory and its creation

## Creating a Feature

This will describe how to write a feature 

*<if required, can
include information on adding Background, but I suggest that is left for the
next stage>*

## Creating a Scenario

This will describe how to write a scenario

*<if required, can
include information on adding code before and after a scenario or using
scenario outlines, but I suggest that is left for the next stage>*

## Running a Feature

This will describe how to run the feature file using mvn clean
test and what to expect

## Defining Steps

This will describe how to add steps from the three amigo discussions,
user stories or acceptance criteria

### Given/When/Then

This will describe the definition of each step and ensuring
correct coverage

*<if required, can
include information on using data tables, expressions and tags, but I suggest
that is left for the next stage>*

## Running the Tests (Maven)

This will describe how to run the Cucumber project in Maven
and explain the possible results, issues and resolutions

### Passed Tests

This will describe what it means if tests pass and what to
do next

### Failed Tests

This will describe what it means if tests fail and what to
do next

### Pending Tests

This will describe what it means if tests are not run and
what to do next

### Skipped Tests

This will describe when tests will be skipped and what to do
next

### Snippets for Missing Steps

This will describe the snippets produced by cucumber for
pending tests and how to use them

*<if required, can
include information on writing glue code, but I suggest that is left for the
next stage>*








