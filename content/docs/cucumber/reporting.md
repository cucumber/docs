---
title: Reporting
subtitle: "Built-in reporter plugins, Custom formatters, Third-party plugins"
polyglot:
- java
- javascript
- ruby
- kotlin
- dotnet
---

Cucumber uses reporter plugins to produce reports that contain information about
what scenarios have passed or failed.

Some plugins are built-in, others have to be installed separately. You can also
build your own.

This page documents built-in formatter plugins, custom formatters and some common third-party plugins.
Available plugins may vary per programming language.

# Cucumber Reports Service

The easiest way to get started with reporting is to use the [Cucumber Reports](https://reports.cucumber.io/) service.
Read the introductory [blog post](https://cucumber.io/blog/open-source/cucumber-reports/) for more details.

Publishing to the Cucumber Reports service is currently supported in:

* Cucumber-JVM `6.7.0` and above
* Cucumber-Ruby `5.1.1` and above
* Cucumber-JS `7.0.0-rc.0` and above

# Built-in reporter plugins

If you don't want to publish your reports to the [Cucumber Reports](https://reports.cucumber.io/) service, you can
generate local reports using one of the following built-in reporter plugins:

* `progress`
* `pretty`
* `html`
* `json`
* `rerun`
* `junit`

# Custom formatters
The Cucumber formatter API is readily extensible. A formatter can be any class implementing the event-based formatter
API. {{% text "ruby" %}}The formatter class should live in the `features/support` directory. {{% /text %}}To use your custom formatter, run Cucumber using the `--format` flag:
```
cucumber --format CustomFormatter
```

## Formatter API
Cucumber uses an event-based API for its formatters. These formatters respond to several defined events, with
event handlers defined in the formatter's constructor.
{{% block "ruby" %}}
A sample formatter could look like this:
```ruby
class CustomFormatter
  attr_reader :io

  def initialize(config)
    @io = config.out_stream

    # Using a block
    config.on_event :test_step_started do |event|
      io.puts 'Started test step'
    end

    # Passing in a method
    config.on_event :test_step_finished &method(:print_finished)
  end

  def print_finished(event)
    io.puts 'Finished test step'
  end
end
```
{{% /block %}}

### Configuration object
The formatter initializer is passed a {{% text "java,javascript,kotlin,dotnet" %}}Cucumber configuration{{% /text %}}{{% text "ruby" %}}`Cucumber::Configuration`{{% /text %}} object. This is the
[configuration for the test run](https://docs.cucumber.io/cucumber/configuration/),
including default configurations and [options](https://docs.cucumber.io/cucumber/api/) passed in at the command line.
It can be useful to access these options, so that your formatter can modify its behavior in response to user directives.

### Event objects
Every time an event is fired, an event object is passed to the corresponding handler. Each event object belongs to
a class corresponding to its name. {{% text "ruby" %}}For instance, the `gherkin_source_read` event creates a
`Cucumber::Events::GherkinSourceRead` object.{{% /text %}} Each of these objects provides a different API to access relevant
data such as Gherkin source, feature and step names, and passed/failed status of a step or test case. {{% text "ruby" %}}All events inherit the methods `#attributes`, `#event_id`, and `#to_h` from the parent class.{{% /text %}}

**Note:** Following are the event objects for Cucumber Ruby; other programming languages might have slightly different events.

#### gherkin_source_read
The `gherkin_source_read` event is fired after the contents of a new feature file have been read. It has two
attributes:
* `path`: The file path of the feature file that has been read
* `body`: The raw Gherkin contained in that file, as a string

#### step_definition_registered
The `step_definition_registered` event is fired after each step definition has been registered. It has one
attribute:
* `step_definition`: The `Cucumber::Glue::StepDefinition` object that has just been registered. This object responds
  to the following instance methods:
- `#backtrace_line`: The file, line, and step definition that will appear in a backtrace, as in:
      `features/step_definitions/cuke_steps.rb:5:in "this step passes"`
- `#expression`: The expression used in the step definition, as in `"I have {int} cukes in my belly"` (when a
      Cucumber expression is used) or `/^I have (\d+) cukes in my belly$/` (when a regular expression is used)
- `#file`: The file where the step definition occurs, as a string, as in `"features/step_definitions/cuke_steps.rb"`
- `#file_colon_line`: The file and line where the step definition occurs, as a string, as in
      `"features/step_definitions/cuke_steps.rb:5"`
- `#location`: Alias of `#file_colon_line`
- `#to_hash`: A hash of data about the step definition, such as `{:source=>{:type=>"cucumber expression", :expression=>"I fail"}, :regexp=>{:source=>"^I fail$", :flags=>""}}`

#### test_run_started
The `test_run_started` event is fired at the beginning of the test run. It has one attribute:
* `test_cases`: The test cases included in the test run. This is an array of `Cucumber::Core::Test::Case` objects. Each
  of these objects responds to the following instance methods:
- `#all_locations`: Returns an array with the location of each element (feature, scenario, and step) in the feature
      file for the test case.
- `#all_source`: Returns an array of the features, scenarios, and steps in the test case, as strings, without the keywords
- `#around_hooks`: Returns an array of the Around hooks associated with that test case
- `#feature`: Returns the name of the feature for the test case
- `#keyword`: Returns the Gherkin keyword associated with the test case (`"Feature"`, `"Scenario"`, etc.)
- `#language`: Returns the language indicated for the test case, as a `Gherkin::Dialect` object
- `#location`: Returns the location of the first scenario in the test case
- `#name`: Returns the name of the feature for the test case
- `#source`: Returns the names of the features and scenarios in the test case, as strings, without the keywords
- `#step_count`: Returns the integer number of steps in the test case
- `#tags`: Returns an array of tags for the test case
- `#test_steps`: Returns an array of the steps in the test case, without the keywords

#### test_run_finished
The `test_run_finished` event is fired after the test run has finished. It has no additional attributes or methods
defined beyond those defined on the base event class (i.e., `#attributes`, `#event_id` and `#to_h`), meaning you cannot
access test cases, Gherkin source, etc. from the handler for this event. This event can be used, for example, to print
the running time of the test suite.

#### test_case_started
The `test_case_started` event is fired when a `Cucumber::Core::Test::Case` is about to be executed. It has one attribute:
* `test_case`: The `Cucumber::Core::Test::Case` object (described above) that is about to be executed.

#### test_case_finished
The `test_case_finished` event is fired when a `Cucumber::Core::Test::Case` has finished executing. It has two attributes:
* `test_case`: The `Cucumber::Core::Test::Case` object (described above) that has just finished
* `result`: The result (passed, failed, pending, skipped) of the test case

#### step_activated
The `step_activated` event is fired when a test step has been activated. It has two attributes:
* `test_step`: The `Cucumber::Core::Test::Step` object (described above) that has been activated
* `step_match`: A `Cucumber::StepMatch` object. This object responds to the following instance methods:
- `#args`: The arguments passed to the step
- `#backtrace_line`: The backtrace line from the step definition including the file, line, and step expression
- `#format_args`: The text of the step
- `#location`: The step definition file where the step is defined
- `#step_arguments`: The arguments passed to the step
- `#step_definition`: The `Cucumber::Glue::StepDefinition` object (described above) corresponding to the step
- `#text_length`: The number of characters in the step text

#### test_step_started
The `test_step_started` event is fired just before each `Cucumber::Core::Test::Step` is started. It has one attribute:
* `test_step`: The `Cucumber::Core::Test::Step` object that has just started. This object responds to the following
  methods that may be useful for the purposes of your formatter:
- `#action_location`: The feature file in which the step appears and the location of its scenario within that file,
      in the form `features/file.feature:line`
- `#location`: The feature file in which the step appears and the location of the step within that file, in the same
      form as described under `#action_location`
- `#source`: The Gherkin source of the feature file in which the step appears, without keywords
- `#text`: The text of the step, without the Gherkin keyword

#### test_step_finished
The `test_step_finished` event is fired after each `Cucumber::Core::Test::Step` has finished running. It has two attributes:
* `test_step`: The `Cucumber::Core::Test::Step` object (described above) that has just executed
* `result` The result (passed, failed, pending, skipped) of the test case

# Third-party plugins
There are also many third-party plugins:

* Masterthought
* TeamCity - prints Cucumber results in a format for interpretation by a [TeamCity](https://www.jetbrains.com/teamcity/index.html) build agent.
   * [teamcity_formatter](https://github.com/kevinrood/teamcity_formatter) - Compatible with Cucumber 2.
   * [cucumber_teamcity](https://github.com/ankurcha/cucumber_teamcity/) - Tested with Cucumber 1.3.18 and TeamCity 8.x.
* [TextmateFormatter](https://github.com/raldred/cucumber_textmate/) prints Cucumber results as HTML with enhanced styling and Javascript for Textmate (Included in the Cucumber core since 0.4.5)
* [SlowHandCuke](https://github.com/moredip/SlowHandCuke) - A tweak to the Pretty formatter to display the currently running Step as it is running
* [timestamped-scenarios](https://github.com/moredip/timestamped-scenarios) - Append test run timestamps to each Scenario name as it is being output.
* [Fivemat](https://github.com/tpope/fivemat) - Cucumber formatter that gives each test file its own line of dots.
* [Fuubar](https://github.com/martinciu/fuubar-cucumber) - The insta-failing progress bar formatter
* [cucumber_timing_presenter](https://github.com/distributedlife/cucumber_timing_presenter) - formatter that calculates timing metrics as well as two graphs showing impact of Step time on overall build time.
* [Bilgerat](https://github.com/mdsol/bilgerat) - formatter that sends failure messages to [HipChat](https://www.hipchat.com/) rooms.
* [cucumber_statistics](https://github.com/alienfast/cucumber_statistics) - Tracks timing and displays results in a single HTML page with outliers highlighted in a table sortable by various metrics.
* [cucumber_characteristics](https://github.com/singram/cucumber_characteristics) - Generates HTML/JSON reports on overall test timings, as well as timings and usage of Steps, Features, and Examples. Also lists unused and ambiguous (Cucumber 1.x) Steps. Compatible with Cucumber 1.x and 2.1+ and Ruby 1.9+.
* [allure-cucumber](https://github.com/allure-framework/allure-cucumber) - [Allure](https://github.com/allure-framework) adaptor for Cucumber. This formatter generates the XML files for Allure reporting framework.
* [Cluecumber](https://github.com/trivago/cluecumber-report-plugin) - Maven plugin for clear and concise Cucumber reporting.
* [Cucelastic] (https://github.com/AshisRaj/cucelastic-maven-plugin) - Maven plugin to push test report data into Elastic Search to enable users to plugin UI agnostic tools like Kibana to visualize a dynamic and easy sharable report/dashboad with the possibility to filter and analyze the data, extend and share it across teams.
* [cucumber-reporting-plugin](https://gitlab.com/monochromata-de/cucumber-reporting-plugin) - A Cucumber plugin which produces pretty HTML reports using [cucumber-reporting](https://github.com/damianszczepanik/cucumber-reporting)
