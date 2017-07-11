---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Custom-Formatters/
title: Custom Formatters
---

As Cucumber runs your features, it calls out to any number of listener objects to let them know how it's progressing. These listeners are notified at various points throughout the run of features. You can visualise this by using the 'debug' formatter. For example, take this simple scenario in Cucumber's own test suite:

```
$ head -7 examples/self_test/features/sample.feature
# Feature comment
@one
Feature: Sample

  @two @three
  Scenario: Missing
    Given missing
```

Here are the events fired to a listener when that scenario is run, shown using the debug formatter:

```
$ cucumber --format debug examples/self_test/sample.feature:6
before_features
  before_feature
    before_comment
      comment_line
    after_comment
    before_tags
      tag_name
    after_tags
    feature_name
    before_feature_element
      before_tags
        tag_name
        tag_name
      after_tags
      scenario_name
      before_steps
        before_step
          before_step_result
            step_name
          after_step_result
        after_step
      after_steps
    after_feature_element
  after_feature
after_features
```

If you want to write your own custom formatter, just create a class that implements any of the methods you see in the output from the debug formatter. Let's illustrate this with an example.

Maybe you want to create a formatter that posts a message to Twitter every time a step fails? (I'm sure that would get you a lot of followers).

Here is how you'd do that:

Save your custom formatter class in <code>features/support</code> (or if you want to put it elsewhere, put a file in that directory that <code>require</code>s your formatter class).

```
# features/support/twitter_formatter.rb
require 'rubygems'
require 'twitter'

module Silly
  class TwitterFormatter
    def initialize(step_mother, io, options)
      # We don't care about these - we're just twittering!
    end

    def step_name(keyword, step_match, status, source_indent, background, file_colon_line)
      if status == :failed
        step_name = step_match.format_args(lambda{|param| "*#{param}*"})
        message = "#{step_name} FAILED"
        Twitter::Base.new('your email', 'your password').post(message)
      end
    end
  end
end
```

Now you can run your features by passing <code>-~~format Silly::TwitterFormatter</code> to the <code>cucumber</code> command line, Rake task or even in <code>cucumber.yml</code>~~ see \[\[Running Features]] for all the options. You have more methods available than the ones used in this awesome example (but you only need to implement the ones you care about). Look at the sources for some of Cucumber's built-in formatters to discover more methods.

## If your formatter can't be found

If cucumber complains that it can't find your formatter, add an explicit <code>--require dir</code>, where <code>dir</code> is a parent directory of your formatter. You can also pass the full path to the ruby file where the formatter is defined.

The cucumber <code>--help</code> states:

bq.. Automatic loading is disabled when this option is specified, and all loading becomes explicit. Files under directories named "support" are always loaded first.

This means that you have to add your <code>support</code> folder to <code>--require dir</code> for it to be loaded.

## Other Formatters

1. TeamCity - prints cucumber results in a format for interpretation by a [TeamCity](http://www.jetbrains.com/teamcity/index.html) build agent.
   1. [teamcity_formatter](https://github.com/kevinrood/teamcity_formatter) - Compatible with Cucumber 2.
   2. [cucumber_teamcity](https://github.com/ankurcha/cucumber_teamcity/) - Tested with Cucumber 1.3.18 and TeamCity 8.x.
2. [TextmateFormatter](http://github.com/raldred/cucumber_textmate/) prints cucumber results as HTML with enhanced styling and Javascript for Textmate (Included in the cucumber core since 0.4.5)
3. [SlowHandCuke](http://github.com/moredip/SlowHandCuke) - Simple tweak to the Pretty formatter to display the currently running step as it is running
4. [timestamped-scenarios](https://github.com/moredip/timestamped-scenarios) - Append test run timestamps to each scenario name as it is being output.
5. [Fivemat](https://github.com/tpope/fivemat) - Cucumber formatter that gives each test file its own line of dots.
6. [Fuubar](http://github.com/martinciu/fuubar-cucumber) - The instafailing progress bar formatter
7. [Viewcumber](https://github.com/versapay/viewcumber) - Cucumber formatter which generates an HTML website to browse your scenarios and view screen capture of every single step.
8. [cucumber_timing_presenter](https://github.com/distributedlife/cucumber_timing_presenter) - formatter that calculates timing metrics as well as two graphs showing impact of step time on overall build time.
9. [Bilgerat](https://github.com/mdsol/bilgerat) - formatter that sends failure messages to [HipChat](https://www.hipchat.com/) rooms.
10. [cucumber_statistics](https://github.com/alienfast/cucumber_statistics) - Tracks timing and displays results in a single html page with outliers highlighted in a table sortable by various metrics.
11. [cucumber_characteristics](https://github.com/singram/cucumber_characteristics) - Generates html/json report on overall tests timings as well as timings and usage of steps, features and examples. Also lists unused and ambiguous (Cucumber 1.x) steps. Compatible with cucumber 1.x and 2.1+ and ruby 1.9+.
12. [allure-cucumber](https://github.com/allure-framework/allure-cucumber) - [Allure](https://github.com/allure-framework) adaptor for Cucumber. This formatter generates the XML files for Allure reporting framework.
