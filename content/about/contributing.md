---
menu:
- about
source: https://github.com/cucumber/cucumber/wiki/Contributing/
title: Contributing
---

Please follow these guidelines if you want to contribute to Cucumber or help the Cucumber team reproduce a problem.

## You have found a bug

Before you [get in touch](/about/get-in-touch) and open a new Issue, make sure you have tried the latest gem. Also try to \[\[install]] the latest code from Git. This way you don't waste the developers' time by reporting a bug that has already been fixed.

If you are certain you have found a bug, just register a ticket. If you're not sure, please ask on the mailing list first.

### Help us fix it

The only way we can fix a bug is to reproduce it first. If reproducing the bug requires setting up a project, please write a [Cucumber Feature](/gherkin/feature-introduction/) that demonstrates the bug. When you have done that, mention it in your Issue or send a Pull Request.

Explain what gem you have (`gem list`), what command(s) you ran, what the output is, and so on.

## You want a new feature

Start by creating an Issue. Then, create a [Cucumber Feature](/gherkin/feature-introduction/) and start implementing it. It also helps if you add RSpec specs for the low level code.
