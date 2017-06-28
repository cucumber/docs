+++
title = "Troubleshooting"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Cucumber not ripe? Can't find your peeler? These are some common problems people have experienced. -And how to address them.

Console output isn't right on Windows
-------------------------------------

Missing "a" characters in the output? Do your "æøå" characters print like garbled [Commodore 64 characters](http://kofler.dot.at/c64/?) There are four steps to fix this.

**First** - make sure your .feature files are saved in [UTF-8](http://en.wikipedia.org/wiki/UTF-8) format.

**Second** - add <code>require 'cucumber/formatter/unicode'</code> to your <code>features/support/env.rb</code> file.

**Third** - set your command window's font to a font that has the characters you're outputting - for example *Upper Left corner icon menu -&gt; Properties -&gt; Font -&gt; Lucida Console* - or another truetype (TT) font.

**Fourth** - in your command prompt, change the codepage:

    chcp 1252

If you want to do this permanently - [look here](http://codesnippets.joyent.com/posts/show/414).
Now you should be able to get aæøå in your output on Windows.

Note that [codepage 1252](http://en.wikipedia.org/wiki/Windows-1252) is not UTF-8 - it's essentially a superset of [ISO-8859-1](http://en.wikipedia.org/wiki/ISO/IEC_8859-1). Ideally you'd set it to 65001, which is UTF-8, but this has the [unfortunate side effect](http://www.google.no/search?q=chcp+65001+bat&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a) of temporarily neutering all your computer's bat files so they cannot be executed (including cucumber.bat and rake.bat).

For more info, see [Lighthouse issue \#81](http://rspec.lighthouseapp.com/projects/16211/tickets/81-windows-all-the-a-characters-in-the-output-have-gone-on-strike)

If you're running Cucumber thru JRuby, all you have to do is save your feature files in UTF-8 and change the codepage to 65001 as explained above.

<a name="selenium"></a>

Changes made to models while running features with Selenium, Watir, or other solutions requiring a separate server process are not visible from within step definitions code
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

When you run Cucumber with Selenium or a similar solution two processes are required: one for use by Cucumber/features and another one that's used by Selenium (the server process.) By default in Rails, all operations on the database are wrapped within a transaction, that is rolled back after running each scenario.

This feature, of using transactions, is only enabled when you have<code>Cucumber::Rails::World.use\_transactional\_fixtures</code> option in your <code>env.rb</code> file. To solve this problem, you need to comment out this option and handle table cleanup yourself, for example using the <code>Before</code> block. Please read \[\[Hooks\]\] to get an idea how to use it. You may also want to check out [DatabaseCleaner](http://github.com/bmabey/database_cleaner/tree/master) for cleaning the database when using Selenium.

Sqlite adapter throws SQLite3::BusyException when using Cucumber with Selenium
------------------------------------------------------------------------------

Cause and solution to this problem is exactly the same as with not being able to see changes made to database when using Cucumber with Selenium. In short, you need to comment out <code>Cucumber::Rails.use\_transactional\_fixtures</code> from your <code>env.rb</code> file.

gems/rspec-x/lib/spec/runner/options.rb:190:in \`parse\_format': When using several --format options only one of them can be without a file (RuntimeError)
----------------------------------------------------------------------------------------------------------------------------------------------------------

If you are seeing the above error when trying to run your features it means you are inadvertently requiring RSpec ('spec') somewhere in your Cucumber environment. This issues arises from RSpec automatically parsing the command line arguments. The only RSpec file your Cucumber env.rb should be requiring is 'spec/expectations' (the should methods and matchers). If you usually run your features with the cucumber command line, this can show up, somewhat confusingly, only when running your features with autospec. If you are not requiring 'spec' directly in your env.rb then another file is requiring spec. Some common culprits:

-   **require 'webrat/rspec-rails'** This is meant for using webrat with RSpec only, and not Cucumber. So, you don't need to require this file. If you are wanting to use RSpec and Webrat with Cucumber (in rails) you just need to have this in your env.rb:

<!-- -->

    require 'cucumber/rails/rspec'
    require 'webrat/core/matchers'

-   **config.gem "rspec", :lib =&gt; "spec" ...** If you are using Rails' config.gem to require rspec and/or rspec-rails in your environment.rb or test.rb this may be causing the problem. Try changing the :lib option to false.

If you can't track down where 'spec' is being required then you can adding this in your ib/spec/runner/options.rb file right before it blows up:

    begin
      raise "Just trying to see a backtrace..."
    rescue Exception => e
      puts e.backtrace
    end

With the full backtrace you should be able to hunt down the troublesome file that is requiring spec. If what you run into seems common enough, please add it to the list of culprits here on the wiki.
