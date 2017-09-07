---
menu:
- junkyard
source: https://github.com/cucumber/cucumber/wiki/A-Whole-New-World/
title: A Whole New World
---

> TODO: Review, ruby specific


Cucumber runs scenarios in a `World`. By default, the `World` is just an instance of `Object`.

## Step Definitions

All [Step Definitions](/cucumber/step-definitions/) will run in the context of the current World instance. (A new instance is created for each scenario). This means that `self` in a Step Definition block will be the World instance. Any `@instance_variable` instantiated in a Step Definition will be assigned to the World, and can be accessed from other Step Definitions.

## A better world

If you want to add any behaviour to the world, perhaps some helper methods, or logging, or whatever you can do this in `support/env.rb`:

```
module CustomWorld
  def a_helper
    ...
  end
end

World(CustomWorld)
```

Now you can call `a_helper` from your step definitions. Note that every scenario is run in a separate instance of the world, so there is no implicit state-sharing from scenario to scenario.

You can also include modules in your World:

```
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
```

Several other frameworks such as Webrat or RSpec have modules that provide special methods that you can include in your World this way.

If you don't want to define your own World class (and just use the default `Object` instances), you can still include modules in your World instances without polluting `Object` with a global include:

```
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
```

This will `extend` each new World object with those modules.

If you use [Ruby on Rails](/implementations/ruby/ruby-on-rails/), there is already a World set up for you, so you will get an instance of `Cucumber::Rails::World`, which is a subclass of `ActionDispatch::IntegrationTest`. This gives you access to a lot of Rails' helper methods.

## Related blog posts

- [Building a better World](http://drnicwilliams.com/2009/04/15/cucumber-building-a-better-world-object/)
