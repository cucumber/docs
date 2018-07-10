* Some resources to get started:
- Start with the docs (docs.cucumber.io) amd please let us know if anything is unclear or missing
- You can also try The Cucumber book (Ruby) or The Cucumber for Java book (Java)
- Finally there is Cucumber School (see page Videos on cucumber.io)
- The docs also have a page with links to blogs about Cucumber/BDD
- And ofcourse we're here to help (support options)

* How to call steps /generify
@Suvesh the general idea is that scenarios are independent; which means you wouldn't reuse one scenario inside another scenario
If your scenarios used same/similar steps, or steps use same/similar actions on your system (for example: login), you can extract helper methods to do those things
so for example if you want to reuse a login method, write a method for login

login(String user, String pass) {

// sendKeys to username field

// sendKeys to password fields

// click Login button

}


and call this method from your step definition
and you could even call several helpers from one stepdef
using the login example as most people will understand/be familiar
which helpers you need will depend on your app & domain :wink:



* Screenshot on fail
you can take a screenshot on fail (which you can configure in an after hook)

added this Plain Text snippet: Screenshot on error example (in Kotlin)

import cucumber.api.java8.En

import mu.KLogging

import org.openqa.selenium.OutputType

import org.openqa.selenium.TakesScreenshot

import org.openqa.selenium.WebDriver


I'd highly recommend making sure you won't need bug videos, i.e. your tests should be stable and should fail for a clear reason. having flaky tests will lead to a lot of maintenance and analysis, and you won't get the benefit of automated tests that way...
but that's the harder part of test automation tbh

Other:



    cannot find jvm v2.0 => group id has changed
    message that steps are not defined even though they are, due to glue path not being configured correctly
cucumber and excel (don't, explain why)
skipping steps (don't, explain why)
issues with runners / how to run



    Getting 'undefined steps' because glue is not found (where does it look for the glue by default, how to set where to find the glue) - so many StackOverflow questions...
    Running though CLI (how to) - see:

    https://groups.google.com/forum/#!topic/cukes/bM_ZHHwks8U
    https://www.jeroenreijn.com/2017/10/running-cucumber-from-the-command-line.html
    Taking a screenshot on fail (& explain taking screenshot every step is an antipattern)

Input for "Cucumber can't find my glue" (from @brasmusson on Slack): Cucumber-JVM will search for step definitions in the packages you told it to look in. Either you put your step definitions files in the default package where Cucumber-JVM searches, that is the package (or sub-packages) of the runner class - in your case the package com.Create_Customer_API, or you tell Cucumber-JVM explicitly which packages (which includes the sub-packages) to search with the glue = {"<package>", "<package>", "<etc>"} in the @CucumberOptions annotation - in your case glue = {"Create_Customer_API"

How to share state between steps: in JVM, use DI (needs more documentation anyway). Link to list of supported DI framework (currently here: https://cucumber.io/docs/reference/java-di). If your project already uses any of these framework (or you are familiar with one of them), it's easiest to use that. If you don't already use one, Picocontainer is the most light weight version you can use.
There's a little information in the Cucumber for Java book.

ANSI color thingy: cucumber/cucumber-java-skeleton#18

Details in scenarios: http://dhemery.com/pdf/writing_maintainable_automated_acceptance_tests.pdf

