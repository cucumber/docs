---
title: Parallel Execution
subtitle: Using multiple threads to reduce test times
polyglot:
 - java
 
weight: 1800
---

Cucumber-JVM allows [parallel execution](https://cucumber.io/blog/announcing-cucumber-jvm-4-0-0/) across multiple threads since version 4.0.0. There are several options to incorporate this inbuilt feature in a Cucumber project.

- [JUnit](/docs/guides/parallel-execution/#junit)
- [TestNG](/docs/guides/parallel-execution/#testng)
- [CLI](/docs/guides/parallel-execution/#cli)

For each of these options, this tutorial will look at the project setup, configuration settings, execution commands.


# JUnit
Cucumber can be executed in parallel using **JUnit and Maven test execution plugins**. In JUnit the **feature files are run in parallel rather than scenarios**, which means **all the scenarios in a feature file will be executed by the same thread**. One can use either Maven Surefire or Failsafe plugin for executing the runners.

- Create a Maven project in your favorite IDE. Add `cucumber-java8` and `cucumber-junit` **dependencies** to the `POM`.

```shell
<dependency>
	<groupId>io.cucumber</groupId>
	<artifactId>cucumber-java8</artifactId>
	<version>4.3.0</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>io.cucumber</groupId>
	<artifactId>cucumber-junit</artifactId>
	<version>4.3.0</version>
	<scope>test</scope>
</dependency>
```

- Create a **features** folder in `src/test/resources` path and add the two feature files (`scenarios.feature` and `scenariooutlines.feature`) inside it.

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

- Add a cucumber **runner** using the `RunWith` annotation.

```java
@RunWith(Cucumber.class)
@CucumberOptions(glue= {"parallel"}, features = {"src/test/resources/features"})
public class Runner {
}
```

- Add the **Surefire plugin configuration** to the `build` section to the `POM`. There is no need for the `includes` tag if the runner class follows the [default naming pattern](https://maven.apache.org/surefire/maven-surefire-plugin/examples/inclusion-exclusion.html) of Surefire plugin.

```shell
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>3.0.0-M3</version>
	<configuration>
		<includes>
			<include>**/Runner.java</include>
		</includes>
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

- To execute using a Maven **Failsafe plugin include the below configuration** in the `build` section to the `POM`. There is no need for the `includes` tag if the runner class follows the [default naming pattern](https://maven.apache.org/surefire/maven-failsafe-plugin/examples/inclusion-exclusion.html) of Failsafe plugin.

```shell
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-failsafe-plugin</artifactId>
	<version>3.0.0-M3</version>
	<executions>
		<execution>
			<goals>
				<goal>integration-test</goal>
				<goal>verify</goal>
			</goals>
			<configuration>
				<includes>
					<include>**/Runner.java</include>
				</includes>
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

To get a **visual representation** you can add the **timeline report** with the plugin option in the runner class. Scroll to the end for an image of the report.
