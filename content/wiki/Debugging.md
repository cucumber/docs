+++
title = "Debugging"
source = "https://github.com/cucumber/cucumber/wiki/Debugging/"
menu = ["all", "wiki"]
+++

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

Before do |scenario|
  case scenario
  when Cucumber::Ast::Scenario
    @scenario_name = scenario.name
  when Cucumber::Ast::OutlineTable::ExampleRow
    @scenario_name = scenario.scenario_outline.name
  end
  Rails.logger.info("[Cucumber] starting the #{@scenario_name}")
end

AfterStep do |scenario|
  CucumberCounters.step_counter += 1
  step = CucumberCounters.step_counter
  file_name = format('tmp/capybara/step_%03d.png', step)
  Rails.logger.info("[Cucumber] after step: #{@scenario_name}, step: #{step}")
  next unless scenario.source_tag_names.include? '@intermittent'
  begin
    Capybara.page.save_screenshot(file_name, full: true)
    Rails.logger.info("[Cucumber] Screenshot #{step} saved")
  rescue
    Rails.logger.info("[Cucumber] Can not make screenshot of #{step}")
  end
end

# rubocop:disable Lint/HandleExceptions
AfterStep do
  begin
    execute_script "$(window).unbind('beforeunload')"
  rescue
  end
end
# rubocop:enable Lint/HandleExceptions

def dismiss_nav_warning
  execute_script "$(window).unbind('beforeunload')"
  loop_until_jquery_inactive
end

def loop_until_jquery_inactive
  Timeout.timeout(Capybara.default_max_wait_time) do
    loop until page.evaluate_script('jQuery.active').zero?
  end
end
```
By setting an environment variable, you can cause Cucumber to use various debugging tools, and you can combine them by setting multiple environment variables.
