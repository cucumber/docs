+++
title = "Wire Protocol"
source = "https://github.com/cucumber/cucumber/wiki/Wire-Protocol/"
menu = ["all", "wiki"]
+++

Cucumber supports a wire protocol that allows it to invoke step definitions implemented on any platform.

To use the wire protocol, you install Cucumber and write and run your features as you normally would, but instead of writing Step Definition files in Ruby or another supported programming language, you write a simple .wire file (using the YAML format), which tells Cucumber where to find your step definitions:

host: localhost
port: 98989

When you run your features, Cucumber will then connect to this TCP socket, ask the service at the other end about the the steps it has defined, and subsequently tell the service to invoke them if necessary. It's perfectly feasible to have a mix of step definitions - some implemented and invoked, in-process, in Ruby, as normal, and some implemented over the wire.

The details of the protocol are documented in [the Wire Protocol Features](https://github.com/cucumber/cucumber-ruby-wire/blob/v0.0.1/features/invoke_message.feature).

Please feel free to suggest enhancements to the protocol, or ask for help on the mailing list if you'd like to implement a new server.

Implementations
---------------

-   [Cuke4Nuke](http://github.com/richardlawrence/Cuke4Nuke/) (.NET)
-   [nStep](http://github.com/clearwavebuild/nStep) (.NET)
-   [Clucumber](http://github.com/antifuchs/clucumber) (Common Lisp)
-   [cuke4php](https://github.com/olbrich/cuke4php) (PHP)
-   [Cuke4AS3](https://github.com/flashquartermaster/Cuke4AS3) (ActionScript / Flash)
-   [Cucumber-CPP](https://github.com/cucumber/cucumber-cpp) (C**)
-   [Cucumber-Lua](https://github.com/cucumber/cucumber-lua) (Lua)
-   [OCCukes](https://github.com/OCCukes/OCCukes) (Objective-C)
-   [Unencumbered](https://github.com/atilaneves/unencumbered) (D)

References
----------

-   <http://www.richardlawrence.info/2009/09/19/cuke4nuke-cucumber-for-net-teams/>
-   <https://rspec.lighthouseapp.com/projects/16211/tickets/428-wire-protocol>
