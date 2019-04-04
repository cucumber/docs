---
title: Things that are not Cucumber problems
subtitle: "Help with other tools"
polyglot:
 - java
 - javascript
 - ruby
 - kotlin
weight: 60
---

Cucumber is frequently used alongside other tools. As much as we would like to help you, if you are having trouble with any of these tools it's better to contact those communities directly.
This page lists some of the tools often used with Cucumber and where to find help for those tools.
If you cannot find the tool you are looking for, try the [related tools](/tools/related-tools) page.

# IDE Plugins
Note that if you are using a newer version of Cucumber, the plugin you are using might not have been updated yet.

## IntelliJ
{{% text "javascript,ruby" %}}IntelliJ is a Java IDE.{{% /text %}}
{{% block "java,kotlin" %}}
JetBrains are the creators of IntelliJ, and maintain the "Cucumber for Java" plugin, please check [YouTrack](https://youtrack.jetbrains.com) to see if your issue has been reported yet (and vote for it!).
If not, you can create an issue yourself. You need to

### IntelliJ and Cucumber v1.x
For "Cucumber java" check that you are using the "Program arguments:" of ```--plugin org.jetbrains.plugins.cucumber.java.run.CucumberJvmSMFormatter```

### IntelliJ and Cucumber v4.x
For "Cucumber java" check that you are using the "Program arguments:" of ```--plugin org.jetbrains.plugins.cucumber.java.run.CucumberJvm3SMFormatter```
Currently no output appears whilst cucumber is executing, you will only see "Running tests..." until all tests have completed. Stay with Cucumber v1.x if you require realtime feedback as tests execute.
{{% /block %}}

## Eclipse
{{% text "javascript,ruby" %}}Eclipse is a Java IDE.{{% /text %}}
{{% block "java,kotlin" %}}
You can find the [Cucumber Eclipse Plugin on GitHub](https://github.com/cucumber/cucumber-eclipse). It is an open source plugin.
{{% /block %}}

# Browser automation
For some help using Cucumber with browser automation, you can check the documentation on [browser automation](/guides/browser-automation).
If you are having trouble with a particular browser automation tool, you might need to contact the relevant community directly.

## Selenium
If you need help with Selenium, please try the [Selenium website](https://www.seleniumhq.org/), or contact the Selenium community on [Slack](https://seleniumhq.herokuapp.com/).

## Serenity BDD
{{% text "javascript,ruby" %}}Serenity only works with Java.{{% /text %}}

{{% block "java,kotlin" %}}
If you are using Serenity, you will be running your tests with the `CucumberWithSerenity.class` instead of the `Cucumber.class`.

A detailed tutorial on using Cucumber-JVM with Serenity can be found
[here](http://thucydides.info/docs/articles/an-introduction-to-serenity-bdd-with-cucumber.html), and more information on Serenity can be found on their [official website](http://serenity-bdd.info).

You can also find the [serenity-cucumber project on Github](https://github.com/serenity-bdd/serenity-cucumber).
{{% /block %}}

## Watir
{{% text "ruby" %}}
More information on [Watir](http://watir.com).
{{% /text %}}

{{% text "java,javascript,kotlin" %}}Watir only works with Ruby.{{% /text %}}

## Capybara
{{% text "ruby" %}}
More information on [Capybara](http://teamcapybara.github.io/capybara/).
{{% /text %}}

{{% text "java,javascript" %}}Capybara only works with Ruby.{{% /text %}}

# API automation

## RestAssured
RestAssured is an API automation tool for Java.

{{% block "java" %}}
For more information see the [official website](http://rest-assured.io/).
{{% /block %}}

## Karate
Karate is an API automation tool for Java.

{{% block "java" %}}
For more information see the [Karate project on GitHub](https://github.com/intuit/karate).
{{% /block %}}
