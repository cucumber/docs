---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Wire-Protocol/
title: Wire Protocol (Ruby)
---

Cucumber supports a wire protocol that allows it to invoke Step Definitions implemented on any platform.

To use the wire protocol, you install Cucumber and write and run your features as you normally would, but instead of writing Step Definition files in Ruby or another supported programming language, you write a simple `.wire` file (using the YAML format), which tells Cucumber where to find your Step Definitions:

```yaml
host: localhost
port: 98989
```

When you run your Features, Cucumber will then connect to this TCP socket, ask the service at the other end for its registered Step Definitions, and subsequently tell the service to invoke them if necessary.

It's perfectly feasible to have a mix of Step Definitions, some being implemented and invoked normally, and others implemented and invoked over the wire.

The details of the protocol are documented in [the Wire Protocol Features](https://github.com/cucumber/cucumber-ruby-wire/blob/v0.0.1/features/invoke_message.feature).

Please feel free to suggest enhancements to the protocol, or ask for help on the mailing list if you'd like to implement a new server.

# Implementations

- [Clucumber](https://github.com/antifuchs/clucumber) (Common Lisp)
- [Cuke4AS3](https://github.com/flashquartermaster/Cuke4AS3) (ActionScript / Flash)
- [Cucumber-CPP](https://github.com/cucumber/cucumber-cpp) (C++)
- [Cucumber-Lua](https://github.com/cucumber/cucumber-lua) (Lua)
- [OCCukes](https://github.com/royratcliffe/OCCukes) (Objective-C)
- [Unencumbered](https://github.com/atilaneves/unencumbered) (D)

# References

- <http://www.richardlawrence.info/2009/09/19/cuke4nuke-cucumber-for-net-teams/>
- <https://rspec.lighthouseapp.com/projects/16211/tickets/428-wire-protocol>
