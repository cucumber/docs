---
title: Parallel Execution
subtitle: Using multiple threads to reduce test times
polyglot:
 - java
 - kotlin
 
weight: 1800
---

Cucumber-JVM allows [parallel execution](https://cucumber.io/blog/announcing-cucumber-jvm-4-0-0/) across multiple threads since version 4.0.0. There are several options to incorporate this built-in feature in a Cucumber project.

- [JUnit](/docs/guides/parallel-execution/#junit)
- [TestNG](/docs/guides/parallel-execution/#testng)
- [CLI](/docs/guides/parallel-execution/#cli)

For each of these options, this tutorial will look at the project setup, configuration settings and execution commands.


# JUnit
Cucumber can be executed in parallel using **JUnit and Maven test execution plugins**. In JUnit the **feature files are run in parallel rather than scenarios**, which means **all the scenarios in a feature file will be executed by the same thread**. You can use either Maven Surefire or Failsafe plugin to execute the runners.

- Create a Maven project in your favorite IDE. Add `cucumber-java8` and `cucumber-junit` **dependencies** to the `POM`.

```shell
<dependency>
	<groupId>io.cucumber</groupId>
	<artifactId>cucumber-java8</artifactId>
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

- Create a **parallel** folder in `src/test/resources` path and add the two feature files (`scenarios.feature` and `scenariooutlines.feature`) inside it.

```gherkin
Feature: Scenarios feature file

  Scenario: Scenario Number One
    Given Step from 'Scenario 1' in 'scenarios' feature file

  Scenario: Scenario Number Two
    Given Step from 'Scenario 2' in 'scenarios' feature file
```

```gherkin
Feature: Scenario Outlines feature file

  Scenario Outline: <scen_out_row_num>
    Given Step from '<scen_out_row_num>' in 'scenariooutlines' feature file

    Examples: 
      | scen_out_row_num       |
      | Scenario Outline Row 1 |
      | Scenario Outline Row 2 |
```

- Add the **step definition class** to the `parallel` package in `src/test/java` folder.
{{% block "java" %}}

```java
package parallel;

import cucumber.api.java.BeforeStep;
import cucumber.api.java.en.Given;

public class Stepdefs {

	@BeforeStep
	public void beforeStep() throws InterruptedException {
		Thread.sleep(1000);
	}

	@Given("Step from {string} in {string} feature file")
	public void step(String scenario, String file) {
		System.out.format("Thread ID - %2d - %s from %s feature file.\n", Thread.currentThread().getId(), scenario,file);
	}
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package parallel

import cucumber.api.java8.En

class Stepdefs : En {
	
	init {
		BeforeStep() { ->
			Thread.sleep(1000)
		}
		
		Given("Step from {string} in {string} feature file") { scenario: String , file: String ->
            println("Thread ID - %2d - %s from %s feature file.".format(Thread.currentThread().id,scenario,file))
        }
	}
}
```
{{% /block %}}

- Add a cucumber **runner** using the `RunWith` annotation in the `parallel` package in the `src/test/java` folder.

{{% block "java" %}}

```java
package parallel;

import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
public class RunCucumberTest {
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package parallel

import cucumber.api.junit.Cucumber
import org.junit.runner.RunWith

@RunWith(Cucumber::class)
class RunCucumberTest {
}
```
{{% /block %}}

- Add the **Surefire plugin configuration** to the `build` section to the `POM`.

```shell
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>2.22.0</version>
	<configuration>
		<parallel>methods</parallel>
		<useUnlimitedThreads>true</useUnlimitedThreads>
	</configuration>
</plugin>
```

- Use the Maven `install` or a suitable command to **execute** the `POM`. This should run in parallel threaded mode. You should see a result similar to below. It is important to note that **both the scenarios in the file (`scenarios.feature`) are executed by thread with ID 14**. Similarly **both the rows of the scenario outline in the file (`scenariooutlines.feature`) are executed by thread with ID 13**.

```shell
Thread ID - 13 - Scenario Outline Row 1 from scenariooutlines feature file.
Thread ID - 13 - Scenario Outline Row 2 from scenariooutlines feature file.
Thread ID - 14 - Scenario 1 from scenarios feature file.
Thread ID - 14 - Scenario 2 from scenarios feature file.
```

- To execute using a Maven **Failsafe plugin include the below configuration** in the `build` section to the `POM`. Rename the runner class to `RunCucumberIT`.  You can find further details [here](/docs/community/not-cucumber/#maven-execution-plugin).

```shell
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-failsafe-plugin</artifactId>
	<version>2.22.0</version>
	<executions>
		<execution>
			<goals>
				<goal>integration-test</goal>
				<goal>verify</goal>
			</goals>
			<configuration>
				<parallel>methods</parallel>
				<useUnlimitedThreads>true</useUnlimitedThreads>
			</configuration>
		</execution>
	</executions>
</plugin>
```


To set the thread count to a **specific number** instead of `useUnlimitedThreads` use the below setting.
```shell
<parallel>methods</parallel>
<threadCount>4</threadCount>
```

The thread count in the above setting is **4 threads per core**. If you want this to be **4 threads across all cores** set the `perCoreThreadCount` to **false**.
```shell
<parallel>methods</parallel>
<threadCount>4</threadCount>
<perCoreThreadCount>false</perCoreThreadCount>
```

If you have **multiple runners** then you can set the parallel option to `classesAndMethods`, `methods` or `classes`. For a single runner the `classes` option would be similar to a sequential execution.

For a **visual representation** you can add the **timeline report** with the plugin option to a `CucumberOptions` annotation in the runner class. Scroll to the end for an image of the report.


# TestNG
Cucumber can be executed in parallel using **TestNG and Maven test execution plugins** by setting the **dataprovider parallel option to true**. In TestNG the **scenarios and rows in a scenario outline are executed in multiple threads**. One can use either Maven Surefire or Failsafe plugin for executing the runners.

- Create a Maven project in your favorite IDE. Add the `cucumber-java8` and `cucumber-testng` **dependencies** to the `POM`.

```shell
<dependency>
	<groupId>io.cucumber</groupId>
	<artifactId>cucumber-java8</artifactId>
	<version>{{% version "cucumberjvm" %}}</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>io.cucumber</groupId>
	<artifactId>cucumber-testng</artifactId>
	<version>{{% version "cucumberjvm" %}}</version>
	<scope>test</scope>
</dependency>
```

- Create a **parallel** folder in `src/test/resources` path and add the two feature files (`scenarios.feature` and `scenariooutlines.feature`) inside it as described in the JUnit section.

- Add the **step definition class** to the `parallel` package in `src/test/java` folder as described in the JUnit section.

- Add a cucumber **runner** by **extending** the `AbstractTestNGCucumberTests` class and **overriding the scenarios method** in the `parallel` package in `src/test/java` folder. Set the **parallel option value to true** for the DataProvider annotation.

{{% block "java" %}}
```java
package parallel;

import org.testng.annotations.DataProvider;
import cucumber.api.testng.AbstractTestNGCucumberTests;

public class RunCucumberTest extends AbstractTestNGCucumberTests{

	@Override
	@DataProvider(parallel = true)
	public Object[][] scenarios() {
		return super.scenarios();
	}
}
```
{{% /block %}}

{{% block "kotlin" %}}

```kotlin
package parallel

import org.testng.annotations.DataProvider;
import cucumber.api.testng.AbstractTestNGCucumberTests;

class RunCucumberTest : AbstractTestNGCucumberTests() {
	
	@DataProvider(parallel = true)
	override fun scenarios(): Array<Array<(Any)>>  {
		return super.scenarios()
	}	
}
```
{{% /block %}}

- Add the Maven **Surefire plugin configuration** to the `build` section of the `POM`.

```shell
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>2.22.0</version>
</plugin>
```

- Use the Maven `install` or a suitable command to **execute the POM**. This should run in parallel thread mode. You should see a result similar to below. The **scenarios and rows of the scenario outlines are executed in different threads**.

```shell
Thread ID - 15 - Scenario Outline Row 2 from scenariooutlines feature file.
Thread ID - 14 - Scenario Outline Row 1 from scenariooutlines feature file.
Thread ID - 16 - Scenario 1 from scenarios feature file.
Thread ID - 17 - [Scenario 2 from scenarios feature file.
```

- To execute using a Maven **Failsafe plugin**, setup the `POM` as described in the JUnit section. Remove the `parallel` and `useUnlimitedThreads` settings in the `configuration` part.


The default **thread count of the dataprovider** in parallel mode is **10**. To change this the `dataproviderthreadcount` property needs to be added to the `configuration` section of the Surefire or Failsafe plugin in the `POM`.
```shell
<configuration>
	<properties>
    	<property>
        	<name>dataproviderthreadcount</name>
        	<value>20</value>
    	</property>
	</properties>
</configuration>
```

If you have **multiple runners**, set the parallel configuration of `classes` to reduce execution times. In addition the `threadCount` can be set to to the desired value or `useUnlimitedThreads` can be set to true.
```shell
<configuration>
	<parallel>classes</parallel>
	<threadCount>4</threadCount>
</configuration>
```

For a **visual representation** you can add the **timeline report** with the plugin option to a `CucumberOptions` annotation in the runner class. Scroll to the end for an image of the report.


# CLI
The `Main class` in the `cucumber.api.cli package` is used to execute the feature files. You can run this class directly from the command line; in that case, there is no need to create any runner class. The usage options for this class is mentioned [here](https://github.com/cucumber/cucumber-jvm/blob/v4.0.0/core/src/main/resources/cucumber/api/cli/USAGE.txt). The `--threads` option needs to be set to a value **greater than 1** to run in parallel. When the parallel mode is used, the scenarios and rows in a scenario outline will be run in multiple threads.
 
Below is the basic command to start the execution.
```shell
java -cp <classpath> cucumber.api.cli.Main -g <steps package> --threads <thread count> <path to feature files>
```

Follow the steps below to **execute the command from a terminal**.

- Download the necessary cucumber jars from the cucumber.io Maven repository (links provided under version number) or, if available, copy from the local repository into a folder. These need to be provided in the **classpath**. The versions mentioned are compatible with the latest cucumber release 4.3.0.

	1.  `cucumber-core.jar` [`4.3.0`](http://central.maven.org/maven2/io/cucumber/cucumber-core/4.3.0/cucumber-core-4.3.0.jar)
	2.  `cucumber-java.jar` [`4.3.0`](http://central.maven.org/maven2/io/cucumber/cucumber-java/4.3.0/cucumber-java-4.3.0.jar)
	3.  `cucumber-java8.jar` [`4.3.0`](http://central.maven.org/maven2/io/cucumber/cucumber-java8/4.3.0/cucumber-java8-4.3.0.jar)
	4.  `cucumber-html.jar` [`0.2.7`](http://central.maven.org/maven2/io/cucumber/cucumber-html/0.2.7/cucumber-html-0.2.7.jar)
	5.  `gherkin.jar` [`5.1.0`](http://central.maven.org/maven2/io/cucumber/gherkin/5.1.0/gherkin-5.1.0.jar)
	6.  `cucumber-expressions.jar` [`6.2.2`](http://central.maven.org/maven2/io/cucumber/cucumber-expressions/6.6.2/cucumber-expressions-6.6.2.jar)
	7.  `datatable.jar` [`1.1.12`](http://central.maven.org/maven2/io/cucumber/datatable/1.1.12/datatable-1.1.12.jar)
	8.  `datatable-dependencies.jar` [`1.1.12`](http://central.maven.org/maven2/io/cucumber/datatable-dependencies/1.1.12/datatable-dependencies-1.1.12.jar)
	9.  `tag-expressions.jar` [`1.1.1`](http://central.maven.org/maven2/io/cucumber/tag-expressions/1.1.1/tag-expressions-1.1.1.jar)
	10. `typetools.jar` [`0.5.0`](http://central.maven.org/maven2/net/jodah/typetools/0.5.0/typetools-0.5.0.jar)
	
- Create a folder named `cukecli` and a folder `parallel` inside it, to keep the step definition classes and feature files.

- Create the **two feature files** (`scenarios.feature` and `scenariooutlines.feature`) inside the `parallel` folder as described in the JUnit section.

- Create the **step definition class** in the `parallel` folder as described in the JUnit section.

- Open up a **terminal window** and navigate to the source folder of the project, in our case `cukecli`.

{{% block "java" %}}
- Compile the step definition class. Add the **path to the folder containing cucumber jars to the classpath** using the **-cp** option.

```shell
javac -cp .;<path to cucumber jar folder>/* ./parallel/Stepdefs.java
```
{{% /block %}}

{{% block "kotlin" %}}
- Compile the step definition class. Add **path to each of the downloaded cucumber jars to the classpath** using the **-cp** option.

```shell
kotlinc -cp .;<path to each cucumber jar> -jvm-target 1.8 ./parallel/Stepdefs.java
```
{{% /block %}}

- Execute using the below command.

{{% block "java" %}}

```shell
java -cp .;<path to cucumber jar folder>/* cucumber.api.cli.Main --threads 4 -g parallel parallel
```
{{% /block %}}

{{% block "kotlin" %}}

```shell
java -cp .;<path to cucumber jar folder>/*;<path to kotlin lib folder>/* cucumber.api.cli.Main --threads 4 -g parallel parallel
```
{{% /block %}}

- You should get a console output similar to below.

```shell
Thread ID - 11 - Scenario Outline Row 1 from scenariooutlines feature file.
Thread ID - 14 - Scenario 2 from scenarios feature file.
Thread ID - 12 - Scenario Outline Row 2 from scenariooutlines feature file.
Thread ID - 13 - Scenario 1 from scenarios feature file.

4 Scenarios (4 passed)
4 Steps (4 passed)
0m1.396s
```

By running in parallel mode, using **4 threads**, the execution time has **reduced from 4 seconds to around 1 second**.

For a **visual representation** you can add the **timeline report** with the plugin option in the command.

```shell
java -cp <classpath> cucumber.api.cli.Main -p timeline:<report folder> --threads <thread count> -g <steps package> <path to feature files>
```

![Timeline report](/img/parallel-timeline-report.png)

