+++
title = "A Whole New World"
source = "https://github.com/cucumber/cucumber/wiki/A-Whole-New-World/"
menu = ["all", "wiki"]
+++

Cucumber runs scenarios in a <code>World</code>. By default, the <code>World</code> is just an instance of <code>Object</code>.

Step Definitions
----------------

All \[\[Step Definitions\]\] will run in the context of the current World instance. (A new instance is created for each scenario). This means that <code>self</code> in a Step Definition block will be the World instance. Any <code>@instance\_variable</code> instantiated in a Step Definition will be assigned to the World, and can be accessed from other Step Definitions.

A better world
--------------

If you want to add any behaviour to the world, perhaps some helper methods, or logging, or whatever you can do this in `support/env.rb`:

    <code>
    module CustomWorld
      def a_helper
        ...
      end
    end

    World(CustomWorld)
    </code>

Now you can call <code>a\_helper</code> from your step definitions. Note that every scenario is run in a separate instance of the world, so there is no implicit state-sharing from scenario to scenario.

You can also include modules in your World:

    module MyHelper
      def some_other_helper
        ...
      end
    end

    module CustomWorld
      include MyHelper

      def a_helper
        ...
      end
    end

    World(CustomWorld)

Several other frameworks such as Webrat or RSpec have modules that provide special methods that you can include in your World this way.

If you don't want to define your own World class (and just use the default <code>Object</code> instances), you can still include modules in your World instances without polluting <code>Object</code> with a global include:

    module MyHelper
      def some_other_helper
        ...
      end
    end

    module MyOtherHelpers
      def helper_b
        ...
      end
    end

    World(MyHelper, MyOtherHelpers)

This will <code>extend</code> each new World object with those modules.

If you use \[\[Ruby on Rails\]\], there is already a World set up for you, so you will get an instance of <code>Cucumber::Rails::World</code>, which is a subclass of <code>ActionDispatch::IntegrationTest</code>. This gives you access to a lot of Rails' helper methods.

Related blog posts
------------------

-   [Building a better World](http://drnicwilliams.com/2009/04/15/cucumber-building-a-better-world-object/)
