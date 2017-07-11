---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/Using-RCov-with-Cucumber-and-Rails/
title: Using RCov with Cucumber and Rails
---

How to use RCov with Cucumber and Rails
---------------------------------------

This page serves as an easy way to learn how to use cucumber and RCov together.

### Quick example

It is recommended that you use [relevance's RCov](http://github.com/relevance/rcov/tree/master) instead of the 'official' one, as it currently segfaults too much for most people's taste. The relevance fork is the most maintained and stable one available.

    gem sources -a http://gems.github.com
    gem uninstall rcov
    gem install relevance-rcov

Second, you'll need to add the rcov config option to the rake task in <code>lib/tasks/cucumber.rake</code>.

    #lib/tasks/cucumber.rake
    $:.unshift(RAILS_ROOT + '/vendor/plugins/cucumber/lib')
    require 'cucumber/rake/task'
    Cucumber::Rake::Task.new(:features) do |t|
      t.cucumber_opts = "--format pretty"
      t.rcov = true
    end
    task :features => 'db:test:prepare'

Now when you run rake features, coverage information will be in rails\_root/coverage

### Other ways to run features

See [Running features](http://github.com/cucumber/cucumber/wikis/running-features)

### Options

You usually want to define a task to run all your features without RCov and then have an additional task to run with RCov. Also, you usually need to specify certain options to RCov, such as output directory, for cruise control and other build purposes. Below is an example cucumber.rake file showing how to set options and define multiple cucumber tasks:

    desc "Run all features"
    task :features => 'db:test:prepare'
    task :features => "features:all"
    require 'cucumber/rake/task' #I have to add this -mischa

    namespace :features do
      Cucumber::Rake::Task.new(:all) do |t|
        t.cucumber_opts = "--format pretty"
      end

      Cucumber::Rake::Task.new(:cruise) do |t|
        t.cucumber_opts = "--format pretty --out=#{ENV['CC_BUILD_ARTIFACTS']}/features.txt --format html --out=#{ENV['CC_BUILD_ARTIFACTS']}/features.html"
        t.rcov = true
        t.rcov_opts = %w{--rails --exclude osx\/objc,gems\/,spec\/}
        t.rcov_opts << %[-o "#{ENV['CC_BUILD_ARTIFACTS']}/features_rcov"]
      end

      Cucumber::Rake::Task.new(:rcov) do |t|    
        t.rcov = true
        t.rcov_opts = %w{--rails --exclude osx\/objc,gems\/,spec\/}
        t.rcov_opts << %[-o "features_rcov"]
      end
    end

(This was taken from [bmabey's cc.rb setup](http://gist.github.com/27281))

It is important to note that Cucumber's default RCov options are set to %w{--rails --exclude osx\\/objc,gems\\/}. So you can just append to rcov\_opts if those defaults work for your project.

### Focused Coverage

When retro-fitting features to legacy code, it's good to be able to focus the coverage from your scenarios on just one class at a time. You can so this by calling rcov and cucumber directly from the command line:

    rcov -t -x \.rb -i app/controllers/my_legacy_controller.rb ./vendor/plugins/cucumber/bin/cucumber -- features/visitor/see_my_shiny_page.feature features/user/see_my_shiny_page.feature

What do these options mean?

-   <code>-t</code> tells rcov to print out a little text summary
-   <code>-x \\.rb</code> tells rcov to ignore all ruby files, except...
-   <code>-i</code> tells rcov to watch coverage of the one file you want to focus on
-   <code>--</code> tells rcov to send the final arguments to cucumber, so these are your normal cucumber args, in this case listing the features we want to run to exercise the class we're testing.

As above, you'll have a full coverage report in <code>./coverage</code>. Open it using <code>open coverage/index.html</code>
