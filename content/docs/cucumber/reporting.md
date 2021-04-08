---
title: Reporting
subtitle: "Built-in reporter plugins, Custom formatters, Third-party plugins"
polyglot:
- java
- javascript
- ruby
- kotlin
---

Cucumber uses reporter plugins to produce reports that contain information about
what scenarios have passed or failed.

Some plugins are built-in, others have to be installed separately. You can also
build your own.

This page documents built-in formatter plugins, custom formatters and some common third-party plugins.
Available plugins may vary per programming language.

# Cucumber Reports Service

The easiest way to get started with reporting is to use the [Cucumber Reports](https://reports.cucumber.io/) service.

Watch [this video](https://smartbear.wistia.com/medias/nrgptu7825) for a quick introduction or read the introductory [blog post](https://cucumber.io/blog/open-source/cucumber-reports/) for more details.

Publishing to the Cucumber Reports service is currently supported in:

* Cucumber-JVM `6.7.0` and above
* Cucumber-Ruby `5.1.1` and above
* Cucumber-JS `7.0.0` and above

# Built-in reporter plugins

If you don't want to publish your reports to the [Cucumber Reports](https://reports.cucumber.io/) service, you can
generate local reports using one of the following built-in reporter plugins (also known as "formatters"):

{{% text "java,kotlin" %}}
* `message`
* `progress`
* `pretty`
* `html`
* `json`
* `rerun`
* `junit`
* `testng`
{{% /text %}}

{{% text "javascript" %}}
* `message`
* `html`
* `json`
* `progress`
* `rerun`
* `snippets`
* `usage`

There is also a "pretty" formatter available as an optional module [@cucumber/pretty-formatter](https://www.npmjs.com/package/@cucumber/pretty-formatter).
{{% /text %}}

{{% text "ruby" %}}
* `message`
* `progress`
* `pretty`
* `html`
* `json`
* `rerun`
* `junit`
{{% /text %}}

{{% note "JSON formatter" %}}
The built-in JSON formatter is deprecated and will be removed in a future release.
{{% /note %}}

# Custom formatters

Cucumber implementations are extensible so that you can write and use your own formatter, or use a third-party one published by someone else. This involves creating a class that implements/extends the standard formatter interface.

{{% text "javascript" %}}
Detailed documentation around how to use and write custom formatters in cucumber-js is available here:

* https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats
* https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
{{% /text %}}

{{% text "ruby" %}}
Once you add your formatter class in the `features/support` directory, you can reference it with the `--format` flag:

```
cucumber --format MyModule::CustomFormatter
```
{{% /text %}}

{{% text "java,kotlin" %}}
Once you add your formatter class, you can reference it with the `--format` flag:

```
cucumber --format CustomFormatter
```
{{% /text %}}

## Formatter API

Cucumber uses an event-based API for its formatters. These formatters respond to several defined events, which are common across all official implementations under the [Cucumber Messages](https://github.com/cucumber/cucumber/tree/master/messages) standard.

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
* [Serenity/JS](https://serenity-js.org/handbook/integration/serenityjs-and-cucumber.html) - An acceptance testing and reporting framework with in-depth HTML reports, Screenplay Pattern APIs, and support for every single version of Cucumber.js
