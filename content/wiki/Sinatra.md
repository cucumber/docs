+++
title = "Sinatra"
source = "https://github.com/cucumber/cucumber/wiki/Sinatra/"
menu = ["all", "wiki"]
+++

Cucumber-Sinatra Generator
--------------------------

The [Cucumber-Sinatra](http://github.com/bernd/cucumber-sinatra) gem will generate a <code>features</code> directory structure and <code>features/support/env.rb</code> in your Sinatra project pre-configured for testing with Cucumber, [RSpec](http://github.com/dchelimsky/rspec), and [Capybara](http://github.com/jnicklas/capybara).

This gem is inspired by the [Cucumber-Rails](http://github.com/cucumber/cucumber-rails) generator.

Webrat
------

You can use Cucumber with [Sinatra](http://github.com/sinatra/sinatra) and [Webrat](http://github.com/brynary/webrat/tree/master)!

Just make sure you have a <code>features/support/env.rb</code> file with the following:

    <code>app_file = File.join(File.dirname(__FILE__), *%w[.. .. app.rb])
    require app_file
    # Force the application name because polyglot breaks the auto-detection logic.
    Sinatra::Application.app_file = app_file

    require 'rspec/expectations'
    require 'rack/test'
    require 'webrat'

    Webrat.configure do |config|
      config.mode = :rack
    end

    class MyWorld
      include Rack::Test::Methods
      include Webrat::Methods
      include Webrat::Matchers

      Webrat::Methods.delegate_to_session :response_code, :response_body

      def app
        Sinatra::Application
      end
    end

    World{MyWorld.new}
    </code>

You may have to set the app\_file in your app file. Otherwise Sinatra (at least version 0.9.1.1) won't find the views or layouts (see [this irc log](http://irclogger.com/sinatra/2009-05-08)). You also need to specify the public directory, even if you're on default, otherwise stylesheets and javascripts won't be available to your Cucumber session e.g.,

    <code># In your main application file
    configure do
      set :views, "#{File.dirname(__FILE__)}/views"
      set :public, "#{File.dirname(__FILE__)}/public"
    end
    </code>

Sinatra/Test
------------

You can also use Cucumber with [Sinatra](http://github.com/sinatra/sinatra) using Sinatra's built-in [testing setup](http://www.sinatrarb.com/testing.html) and [Test Harness](http://www.sinatrarb.com/testing.html#using_). Make sure you have something like the the following, [tailored](http://www.sinatrarb.com/testing.html#frameworks) to Test::Unit, RSpec, Bacon or Test::Spec, in your <code>features/support/env.rb</code>.

    <code>require File.dirname(__FILE__) + "/../../your_sinatra_app"

    # RSpec matchers
    require 'rspec/expectations'

    # Required for RSpec to play nice with Sinatra/Test
    require 'rspec/interop/test'

    # Sinatra/Test
    require 'sinatra/test'

    Test::Unit::TestCase.send :include, Sinatra::Test

    World do
      Sinatra::TestHarness.new(Sinatra::Application)
    end
    </code>

Rack-Test
---------

You can also use Cucumber with [Sinatra](http://github.com/sinatra/sinatra) using Bryan Helkamp's [rack-test](http://www.github.com/brynary/rack-test) and [Webrat](http://www.github.com/brynary/webrat). You can check out the rspec examples in the [hancock application](http://github.com/atmos/hancock). Something like the following should be setup in your <code>features/support/env.rb</code>.

    <code>require File.expand_path(File.dirname(__FILE__)+'/../../spec_helper')
    require 'haml'

    MyApp::App.set :environment, :development

    World do
      def app
        @app = Rack::Builder.new do
          run MyApp::App
        end
      end
      include Rack::Test::Methods
      include Webrat::Methods
      include Webrat::Matchers
    end
    </code>
