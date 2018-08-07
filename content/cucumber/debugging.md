---
title: Debugging
subtitle: How to debug failing Cucumber steps
polyglot:
 - java
 - ruby

---
{{% block "ruby" %}}
(The code given below calls on [the logging facilities of Ruby on Rails](https://guides.rubyonrails.org/debugging_rails_applications.html#the-logger). If you're not using Rails, replace those calls with `puts` or `warn`.)

Adding the following as the contents of `features/support/debugging.rb` can be helpful in debugging failing steps:

```ruby
# rubocop:disable Lint/Debugger
class CucumberCounters
  @error_counter = 0
  @step_counter = 0
  @screenshot_counter = 0
  class << self
    attr_accessor :error_counter, :step_counter, :screenshot_counter
  end
end

# `LAUNCHY=1 cucumber` to open save screenshot after every step
After do |scenario|
  next unless (ENV['LAUNCHY'] || ENV['CI']) && scenario.failed?
  puts "Opening snapshot for #{scenario.name}"
  begin
    save_and_open_screenshot
  rescue StandardError
    puts "Can't save screenshot"
  end
  begin
    save_and_open_page
  rescue StandardError
    puts "Can't save page"
  end
end

# `FAST=1 cucumber` to stop on first failure
After do |scenario|
  Cucumber.wants_to_quit = ENV['FAST'] && scenario.failed?
end

# `DEBUG=1 cucumber` to drop into debugger on failure
Cucumber::Core::Test::Action.class_eval do
  ## first make sure we don't lose original accept method
  unless instance_methods.include?(:orig_failed)
    alias_method :orig_failed, :failed
  end

  ## wrap original accept method to catch errors in executed step
  def failed(*args)
    begin
      CucumberCounters.error_counter += 1
      file_name = format('tmp/capybara/error_%03d.png',
                         CucumberCounters.error_counter)
      Capybara.page.save_screenshot(file_name, full: true)
    rescue
      Rails.logger.info('[Cucumber] Can not make screenshot of failure')
    end
    binding.pry if ENV['DEBUG']
    orig_failed(*args)
  end
end

# Store the current scenario name as an instance variable, to make it
# available to the other hooks.
Before do |scenario|
  case scenario
  when Cucumber::Ast::Scenario
    @scenario_name = scenario.name
  when Cucumber::Ast::OutlineTable::ExampleRow
    @scenario_name = scenario.scenario_outline.name
  end
  Rails.logger.info("[Cucumber] starting the #{@scenario_name}")
end

# `STEP=1 cucumber` to pause after each step
AfterStep do |scenario|
  next unless ENV['STEP']
  unless defined?(@counter)
    puts "Stepping through #{@scenario_name}"
    @counter = 0
  end
  @counter += 1
  print "After step ##{@counter}/#{scenario.send(:steps).try(:count)}: "\
        "#{scenario.send(:steps).to_a[@counter].try(:name) ||
        '[RETURN to continue]'}..."
  STDIN.getc
end

AfterStep do |scenario|
  CucumberCounters.step_counter += 1
  step = CucumberCounters.step_counter
  file_name = format('tmp/capybara/step_%03d.png', step)
  Rails.logger.info("[Cucumber] after step: #{@scenario_name}, step: #{step}")
  next unless scenario.source_tag_names.include?('@intermittent')
  begin
    Capybara.page.save_screenshot(file_name, full: true)
    Rails.logger.info("[Cucumber] Screenshot #{step} saved")
  rescue
    Rails.logger.info("[Cucumber] Can not make screenshot of #{step}")
  end
end

AfterStep do
  begin
    execute_script "$(window).unbind('beforeunload')"
  rescue => e
    Rails.logger.error("An error was encountered and rescued")
    Rails.logger.error(e.backtrace)
  end
end

def dismiss_nav_warning
  execute_script "$(window).unbind('beforeunload')"
  wait_until_jquery_inactive
end

def wait_until_jquery_inactive
  Capybara.using_wait_time(Capybara.default_max_wait_time) do
    page.evaluate_script('jQuery.active').zero?
  end
end
```
By setting an environment variable, you can tell Cucumber to use various debugging tools, and you can combine them by setting multiple environment variables.
{{% /block %}}

{{% block "java" %}}
In order to debug your scenarios on the JVM, you can step through the the steps of each scenario in debug mode. 

1. Set a conditional breakpoint on the part of the code you want to debug.

This might be the line you are currently getting an Exception (see your stacktrace). 

Or, if you don't know where to start, you can set a breakpoint in the method [`cucumber.runtime.Utils#invoke`](https://github.com/cucumber/cucumber-jvm/blob/master/core/src/main/java/cucumber/runtime/Utils.java), at the line `return targetMethod.invoke(target, args)` (line 26 in `cucumber-jvm` master at the time of writing) and specify the following snippet as the condition: 

```java
Package pkg = target.getClass().getPackage();
  if (pkg == null) {
    return false;
  }
  return !target.getClass().getPackage().getName().startsWith("cucumber");
```
   
2. Run your [RunCukesTest](https://github.com/cucumber/cucumber-java-skeleton/blob/master/src/test/java/skeleton/RunCukesTest.java) in debug mode
3. Assuming you haven't set any other breakpoints, the execution will stop at `Utils#invoke`
4. Now you can either:
   - *Step into* to start debugging the method implementing the first step of the scenario
   - Or *Resume* the execution to run the current step and jump to the next one
5. And so on..

For more details on how to set a breakpoint in your IDE, see:

* [Breakpoints (IntelliJ)](https://www.jetbrains.com/help/idea/breakpoints.html)

* [Debugging (Eclipse)](https://www.eclipse.org/community/eclipse_newsletter/2017/june/article1.php)
{{% /block %}}
