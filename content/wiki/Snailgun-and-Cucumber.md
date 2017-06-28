+++
title = "Snailgun and Cucumber"
source = "https://github.com/cucumber/cucumber/wiki/Snailgun-and-Cucumber/
menu = ["all", "wiki"]
+++

**N.B. Snailgun's functionality overlaps significantly with \[\[Spork and --drb\]\]. You may wish to try them both out and see which works for you.**

snailgun drastically reduces the startup time of each test run, by preloading a process with Rails and your chosen gems, and then forking it for each run so that only your application files are loaded. Note that it only works under Unix/Linux systems.

snailgun-1.0.5 now supports cucumber with an "fcucumber" shortcut. Install with `sudo gem install snailgun`. Example:

    <code>snailgun --rails cucumber
    fcucumber -q
    </code>

That's all you need. The first line preloads a process with RAILS\_ENV=cucumber; the second starts cucumber by forking this process. You can also use `frake cucumber`.

NOTE: to make your model classes be loaded afresh on each run you need to set `config.cache_classes = false` in config/environments/cucumber.rb. Cucumber will give a big warning saying that this is known to be a problem with transactional fixtures. Take care if this is important to you.

For a substantial reduction in startup time, remove `:lib=>false` settings from config/environments/cucumber.rb so that cucumber, webrat, nokogiri etc are preloaded.

If you use regular unit and functional tests as well as cucumber, then

    <code>snailgun --rails cucumber,test
    </code>

will start two processes, and `frake test` will use the one preloaded with RAILS\_ENV=test.

Snailgun is also useful for more than testing. If you do

    <code>snailgun --rails cucumber,test,development
    </code>

then you can also use `fconsole` for a quick-start development console, and `fruby script/server` for a quick-start web server.

More info at [the github snailgun page](http://github.com/candlerb/snailgun)
