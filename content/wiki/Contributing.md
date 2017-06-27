+++
title = "Contributing"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Please follow these guidelines if you want to contribute to Cucumber or help the cucumber team reproduce a problem.

You have found a bug
--------------------

Before you \[\[get in touch\]\] and file a ticket in the issue tracker, make sure you have tried the latest gem. Also try to \[\[install\]\] the latest code from Git. This way you don't waste the developers' time by reporting a bug that has already been fixed.

If you are certain you have found a bug, just register a ticket. If you're not sure, please ask on the mailing list first.

### Help us fix it

The only way we can fix a bug is to reproduce it first. If reproducing the bug requires setting up a project, please write a \[\[Cucumber Feature\]\] that demonstrates the bug. When you have done that, mention it in your ticket or send a pull request.

Explain what gem you have (<code>gem list</code>), what command(s) you ran, what the output is etc.

You want a new feature
----------------------

Start by creating a ticket. Then, create a \[\[Cucumber Feature\]\] and start implementing it. It also helps if you add RSpec specs for the low level code.
