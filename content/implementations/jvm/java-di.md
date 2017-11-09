---
menu: reference
nav: docs
renderer: Cucumber::Website::Reference
title: Dependency Injection
---

If your programming language is Java you will be writing glue code
([Step Definitions](/cucumber/step-definitions/) and [Hooks](/hooks/)) in plain old Java classes.

Cucumber will create a new instance of each of your glue code classes before each Scenario.

If all of your glue code classes have an empty constructor, you don’t need anything else. However, most projects will benefit from a Dependency Injection module to organize your code better and to share state between Step Definitions.

The available Dependency Injection modules are:

- [PicoContainer](#picocontainer) (The recommended one if your app doesn't use another DI container)
- [Spring](#spring)
- [Guice](#guice)
- [OpenEJB](#openejb)
- [Weld](#weld)
- [Needle](#needle)

# PicoContainer

## {picocontainer-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/picocontainer).
For more information, please see [sharing state using Picocontainer](http://www.thinkcode.se/blog/2017/04/01/sharing-state-between-steps-in-cucumberjvm-using-picocontainer).

# Spring

## {spring-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-spring</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/spring).
For more information, please see [sharing state using Spring](http://www.thinkcode.se/blog/2017/06/24/sharing-state-between-steps-in-cucumberjvm-using-spring).

# Guice

## {guice-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-guice</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/guice).
For more information, please see [sharing state using Guice](http://www.thinkcode.se/blog/2017/08/16/sharing-state-between-steps-in-cucumberjvm-using-guice).
# OpenEJB

## {openejb-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-openejb</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/openejb).

# Weld

## {weld-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-weld</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/weld).

# Needle

## {needle-}Dependency

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-needle</artifactId>
    <version>{{ site.versions.cucumber_jvm }}</version>
    <scope>test</scope>
</dependency>
```

There is no documentation yet, but the code is on [GitHub](https://github.com/cucumber/cucumber-jvm/tree/master/needle).
