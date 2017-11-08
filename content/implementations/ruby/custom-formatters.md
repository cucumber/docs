---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Custom-Formatters/
title: Custom Formatters
---

> TODO: fix link

As Cucumber runs your Features, it calls out to any number of listener objects
to let them know how it's progressing. These listeners are notified at various
points throughout the run of Features.

https://app.cucumber.pro/projects/cucumber-ruby/documents/master/features/docs/extending_cucumber/custom_formatter.feature

# Other Formatters

1. TeamCity - prints Cucumber results in a format for interpretation by a [TeamCity](http://www.jetbrains.com/teamcity/index.html) build agent.
   1. [teamcity_formatter](https://github.com/kevinrood/teamcity_formatter) - Compatible with Cucumber 2.
   2. [cucumber_teamcity](https://github.com/ankurcha/cucumber_teamcity/) - Tested with Cucumber 1.3.18 and TeamCity 8.x.
2. [TextmateFormatter](https://github.com/raldred/cucumber_textmate/) prints Cucumber results as HTML with enhanced styling and Javascript for Textmate (Included in the Cucumber core since 0.4.5)
3. [SlowHandCuke](https://github.com/moredip/SlowHandCuke) - Simple tweak to the Pretty formatter to display the currently running Step as it is running
4. [timestamped-scenarios](https://github.com/moredip/timestamped-scenarios) - Append test run timestamps to each Scenario name as it is being output.
5. [Fivemat](https://github.com/tpope/fivemat) - Cucumber formatter that gives each test file its own line of dots.
6. [Fuubar](https://github.com/martinciu/fuubar-cucumber) - The insta-failing progress bar formatter
7. [Viewcumber](https://github.com/versapay/viewcumber) - Cucumber formatter which generates an HTML website to browse your Scenarios and view screen capture of every single Step.
8. [cucumber_timing_presenter](https://github.com/distributedlife/cucumber_timing_presenter) - formatter that calculates timing metrics as well as two graphs showing impact of Step time on overall build time.
9. [Bilgerat](https://github.com/mdsol/bilgerat) - formatter that sends failure messages to [HipChat](https://www.hipchat.com/) rooms.
10. [cucumber_statistics](https://github.com/alienfast/cucumber_statistics) - Tracks timing and displays results in a single HTML page with outliers highlighted in a table sortable by various metrics.
11. [cucumber_characteristics](https://github.com/singram/cucumber_characteristics) - Generates HTML/JSON reports on overall test timings, as well as timings and usage of Steps, Features, and Examples. Also lists unused and ambiguous (Cucumber 1.x) Steps. Compatible with Cucumber 1.x and 2.1+ and Ruby 1.9+.
12. [allure-cucumber](https://github.com/allure-framework/allure-cucumber) - [Allure](https://github.com/allure-framework) adaptor for Cucumber. This formatter generates the XML files for Allure reporting framework.
