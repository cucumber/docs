---
menu:
- junkyard
source: https://github.com/cucumber/cucumber/wiki/Autotest-Integration/
title: Autotest Integration
---

> TODO: Keep it or delete it? 

**<span style="color:red;">Warning: autotest plugin seems to not work with --drb (spork). See [lighthouse ticket](https://rspec.lighthouseapp.com/projects/16211-cucumber/tickets/365-cucumber-out-option-does-not-worj-with-drb) for details.</span>**

Cucumber comes with an autotest plugin that will hook into the regular autotest cycle to run the features after the tests/specs. The plugin is disabled by default but can be turned on by setting the AUTOFEATURE environment variable to 'true'. For example:

```
<code>$ AUTOFEATURE=true autospec</code>
```

or if you are not using RSpec or using RSpec 2:

```
<code>$ AUTOFEATURE=true autotest</code>
```

If you always want to have the plugin run then you can export the variable in your .bash_profile or other shell file like so:

POSIX shell:

```
<code>$ export AUTOFEATURE=true</code>
```

Windows command shell:

```
<code>> set AUTOFEATURE=true</code>
```

If AUTOFEATURE is not set you will get the warning: <code>(Not running features. To run features in autotest, set AUTOFEATURE=true.)</code>. Set AUTOFEATURE=false to silence this warning.

Options are declared in the [[cucumber.yml]] file (<strong>which must be present</strong> and have a default or autotest profile). To change the way the features are run with autotest create two profiles in your \[\[cucumber.yml]]:

- <code>autotest</code> : Used when Autotest wants to run only the failing scenarios.
- <code>autotest-all</code> : Used when Autotest wants to run all the scenarios (after a red->green transition).

For example, to turn color on when features are run, you would add the following to your [[cucumber.yml]] file:

```
<code>autotest: --color
autotest-all: --color</code>
```

Please see [[Running Features]] for more information about profiles, and the \[\[Ruby on Rails]] page for extra help when running in that context.

If you get an error like <code>When using several—format options only one of them can be without a file (RuntimeError)</code> when running features with autospec, you are probably accidentally requiring 'spec'. Read about the solution on [[Troubleshooting]].

### What does it do?

In autotest's normal flow, it runs all of your tests and remembers the
ones which fail. Each time you save a file, it reruns the failing
tests along with tests related to the code you just changed. Once
everything is green again, it reruns all of the tests over again to
make sure everything is green. Then it waits for more changes.

It looks like this:

1. Run red tests until they pass.
2. Run all tests.

Once you get all the tests to pass, you're ready to write a new test (or example) to implement.

With Cucumber, autotest does this:

1. Run red tests until they pass.
2. Run red scenarios until they pass.
3. Run all tests until they pass.
4. Run all features.

Here's the intended (but flexible) BDD workflow:

1. Write a new feature or scenario.
   - Autotest runs your features and finds pending steps. It remembers those scenarios.
2. Define pending steps.
   - Each time you save, autotest reruns the pending scenarios. Watch them turn red and blue.
3. Pick a red step. Write the spec which exercises the (unwritten) implementation behind that step.
   - Autotest sees your new red spec and remembers it.
4. Work on implementing the spec.
   - Each time you save, autotest reruns the red spec. No need to run any features until you're done with this. Autotest keeps you drilled down.
5. Finish implementing the spec.
   - When the spec turns green, you're done! Autotest pops the stack and reruns the scenarios you're working on.
6. Repeat from Step 3 until your scenarios are all green.
   - Now that you've done a chunk of work, Autotest pops the stack again and runs all your specs to make sure nothing's broken.
7. Fix any unit-level regressions.
   - Once your specs are green and the scenarios you were working on are running, Autotest runs your entire feature set.
8. Fix any integration-level regressions.
   - Now your features should all be green. Congratulations! Your iteration is done.!
9. Return to step 1.

If you like to write out lots of features at the beginning, you may want to keep them somewhere where they won't run and slowly introduce them, implementing them along the way. Future versions may provide a way to mark a scenario as "pending" to accomplish something similar.

### Customizing Autotest Behavior

When autotest runs your features, it looks for an `autotest` profile in your [[cucumber.yml]]. If it finds one, it uses that profile when running your features. It's useful to use the Pretty formatter in autotest to see exactly what's going on as your scenarios fail. However, the Pretty formatter may be too much information when autotest does its final run-through of all of your features. If you define an `autotest-all` profile, autotest will use this profile instead when it runs all of your features. You may want to use the Progress formatter for `autotest-all`. For more information on defining profiles, see \[\[Running Features]].

You can also customize a number of elements of autotest itself by adding a `.autotest` file to the root of your project and/or your home directory. Most of these features are more useful for customizing the way unit tests run; for instance, you can customize the mapping between code files and the tests which test them.

There is one autotest customization which can be very useful when using Cucumber. Normally, autotest reruns whatever you're working on when it notices a change in any file in the tree. If you're using Rails, some directories will be automatically ignored. To tell autotest not to watch some files for changes, add something like this to your project's `.autotest`:

```
Autotest.add_hook :initialize do |at|
  # Ignore files in tmp/
  at.add_exception %r%^\./tmp%
end
```

If you find that autotest runs your features continuously, your features may be changing a file which autotest is monitoring as they run. Use a setting like this to ignore such files. You'll likely need to set autotest to ignore "rerun.txt" as well.

For more information on configuring autotest, see the [ZenTest Documentation](http://zentest.rubyforge.org/ZenTest/).

### Why is it disabled by default?

Autotest is geared toward the Red~~<span style="text-align:right;">Green</span>~~>Refactor cycle on an object level (unit tests). These object level specs/tests are generally highly focused and isolated per object so breaks can be detected on a very detailed level. The suites are meant to run extremely fast to give the developer quick feedback. Cucumber on the other hand provides end-to-end application level testing. By executing the entire stack features can help find integration failures between objects and provide large coverage to prevent regressions. A side effect of this is that features are generally much slower than object level specs. Due to their relative slowness and non-focused nature they may not be realistic to run along side the object-level suite. Of course every project is different and every developer has different workflow preferences.

### Troubleshooting

#### Missing autotest-rails gem

Some people have reported problems running autotest. One known issue is an error similar to this:

```
<code>$ AUTOFEATURE=true autotest
> loading autotest/cucumber_rails
> Autotest style autotest/cucumber_rails doesn't seem to exist.
> Aborting. </code>
```

The error can occur because of a recent split of autotest code so that it misses a required library. Try

```
<code>$ sudo gem install autotest-rails
</code>
```

Sometimes having multiple versions of supporting gems might also cause this issue. Running the autotest within the bundle will solve this problem

```
<code>$ bundle exec autotest
</code>
```

#### Dirty database

If you use fixtures for your specs, rspec/rails will leave the fixture data in the database after your specs run. If you depend on a clean database for your features, you can use [DatabaseCleaner](http://github.com/bmabey/database_cleaner/tree/master) to wipe your DB before running any features by placing the following in your env.rb:

```
<code>require 'database_cleaner'
DatabaseCleaner.strategy = :truncation

DatabaseCleaner.clean</code>
```

Note that this must be after your environment is loaded, so DatabaseCleaner can find your database adapter.
