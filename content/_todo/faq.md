---
title: FAQ
subtitle: "Frequently Asked Questions"
polyglot:
 - java
 - javascript
 - ruby
---

# How can I get started with Cucumber?
If you'd like to just get started, try the [10-minute tutorial](/guides/10-minute-tutorial).
{{% block "java" %}}
If you'd prefer to get started with a working project (or if you are having trouble getting the tutorial to work),
you can get started with the [cucumber java-skeleton](). This project is designed to work "out of the box".
{{% /block %}}

You can read these docs to learn more about [Gherkin](/gherkin/reference),[Cucumber](/cucumber/api) and [BDD](/bdd/overview).
There are also links to several [blog posts](/community/blog-posts) about Cucumber and BDD.

# Where can I get more in depth information?
If you'd like to go more in depth, try one of the following:

- [Books](/professional/books) 

- [Cucumber School (online training)](/professional/school)

- [BDD Kickstart (classroom training)](/professtional/training)

# Where can I get help?
For questions, you can [get in touch](/community/get-in-touch) with the community.

# How to call other steps or scenarios?
The general idea is that scenarios are independent; which means you wouldn't reuse one scenario inside another scenario.
If your scenarios use the same or similar steps, or steps use the same or similar actions on your system, you can extract helper methods to do those things.

For example, let's say you need to login to your application. 
If you want to (re)use this action, as a step or part of another step, write a method for login:

```java
public void login(String user, String pass) {

  // sendKeys to username field

  // sendKeys to password fields

  // click Login button

}
```

You can call this method from your step definition. You could even call several helper methods from one step definition.
Ofcourse, which helper methods you'll need will depend on your application and your domain.

# Screenshot on fail / every step
Taking a screenshot on fail (& explain taking screenshot every step is an antipattern)
To take a screenshot on failure, you can configure an after hook.

```kotlin
import cucumber.api.java8.En

import mu.KLogging

import org.openqa.selenium.OutputType

import org.openqa.selenium.TakesScreenshot

import org.openqa.selenium.WebDriver

// todo: copy the rest of the example

```


I'd highly recommend making sure you won't need bug videos, i.e. your tests should be stable and should fail for a clear reason. having flaky tests will lead to a lot of maintenance and analysis, and you won't get the benefit of automated tests that way...
but that's the harder part of test automation tbh

Other:

# Upgrading / latest version
Cannot find jvm v2.0 or v3.0 => group id has changed

# Cucumber says my steps are undefined, but I have defined them
This means that Cucumber cannot find your step definitions. You'll need to make sure to specify the path to your step definitions (glue path) correctly.
Getting 'undefined steps' because glue is not found (where does it look for the glue by default, how to set where to find the glue) - so many StackOverflow questions...

Cucumber-JVM will search for step definitions in the packages you told it to look in. 
Either you put your step definitions files in the default package where Cucumber-JVM searches, that is the package (or sub-packages) of the runner class, or you tell Cucumber-JVM explicitly which packages (which includes the sub-packages) to search with the glue = {"<package>", "<package>", "<etc>"} in the @CucumberOptions annotation - in your case glue = {"Create_Customer_API"


# How do I specify my test cases in Excel and have Cucumber read them?
cucumber and excel (don't, explain why)

# How can I make Cucumber conditionally skip steps
skipping steps (don't, explain why)

# How do I run Cucumber?
issues with runners / how to run
Running though CLI (how to) - see:
https://groups.google.com/forum/#!topic/cukes/bM_ZHHwks8U
https://www.jeroenreijn.com/2017/10/running-cucumber-from-the-command-line.html
    
# How do I share state between steps?
How to share state between steps: in JVM, use DI. 
Link to list of supported DI framework. If your project already uses any of these framework (or you are familiar with one of them), it's easiest to use that. 
If you don't already use one, Picocontainer is the most light weight version you can use.
There's a little information in the Cucumber for Java book.

# Weird characters in my output
ANSI color thingy: cucumber/cucumber-java-skeleton#18

# How detailed should my scenarios be?
We recommend too much incidental detail in your scenarios.
The intention is to describe the *behaviour* of the system, not the *implementation*.
For example, let's say the outcome of a process is that the user will be notified. 
At the moment that might be implemented as sending them an email, but that might change in the future.
You can specify the step as follows:
```gherkin
Then the user will be notified
```
This way, if the implementation of how the user is notified changes, you will only have to change the step definition (or the helper method called by that step definition),
rather than the step itself **and** all underlying code.

Details in scenarios: http://dhemery.com/pdf/writing_maintainable_automated_acceptance_tests.pdf