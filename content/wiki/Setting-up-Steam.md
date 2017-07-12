---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Setting-up-Steam/
title: Setting up Steam
---

[Steam](http://github.com/svenfuchs/steam) is a set of ruby bindings to Java's HtmlUnit which allows you to run webrat-style step definitions against code which relies on javascript to work. It is similar to celerity/culerity but doesn't require an extra process as it is able to run inline thanks to RJB.

The easiest way to setup cucumber for steam is to use separate profiles for javascript tests and non-javascript tests.

Your cucumber.yml should look like this:

```
<code>
default: -r features/support -r features/step_definitions -r features/plain --tags ~@js features
steam: -r features/support -r features/step_definitions -r features/steam --tags @js features
</code>
```

I have common support files (like paths.rb) in features/support and then profile-specific ones such as env.rb in features/plain/support and features/steam/support. Use cucumber's normal generated env.rb for features/plain/support/env.rb and steam's [example env.rb](http://github.com/svenfuchs/steam/blob/master/example/cucumber/env.rb) for features/steam/support/env.rb.

To allow the webrat step definitions to function the same between webrat and steam you should replace cucumber's standard webrat_steps.rb file with one I've written to handle webrat and steam automatically: [webrat_compatible_steps.rb](http://github.com/svenfuchs/steam/blob/master/example/cucumber/webrat_compatible_steps.rb)

The features directory tree should look like this:

```
<code>
./manage_users.feature
./plain
./plain/support
./plain/support/env.rb
./steam
./steam/support
./steam/support/env.rb
./step_definitions
./step_definitions/item_steps.rb
./step_definitions/webrat_compatible_steps.rb
./support
./support/paths.rb
./support/version_check.rb
</code>
```

You don't need to change any existing webrat scenarios, the step definitions are exactly the same as the standard webrat_steps versions, just with the ability to run under steam if it's loaded.

In order to run a scenario under steam I simply tag it with @js.

Running cucumber as normal will use the default profile which will run my webrat scenarios. You can then use "cucumber -p steam" to run all the javascript scenarios.
