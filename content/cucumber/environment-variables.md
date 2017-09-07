---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Environment-Variables/
title: Environment Variables
---

> TODO: Make more general

When [Running Features](/cucumber/running-features/), it can sometimes be handy to pass special
values to Cucumber for your [Step Definitions](/cucumber/step-definitions/) to use.

You can easily do this on the command line:

```
cucumber FOO=BAR --format progress features
```

You can now pick up `ENV\['FOO']` in Ruby (for example, in `env.rb`, or a Step Definition) and perform actions according to the value.

You can also do this in [`cucumber.yml`](/cucumber/cucumber.yml/). 

For example, the following sets up a profile that runs a tag and sets an environment variable

```
baz: --tags @mytag FOO=BAR
```

See [Debugging](/implementations/ruby/debugging/) for an example of using environment variables to trigger several debugging options.
