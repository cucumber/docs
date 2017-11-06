---
menu:
- about
source: https://github.com/cucumber/cucumber/wiki/Contributing/
title: Contributing
polyglot: true
---

Please follow these guidelines if you want to contribute to Cucumber or help the Cucumber team reproduce a problem.

# You have a question

Before you [get in touch](/about/get-in-touch), try searching the [mailing list](https://groups.google.com/forum/#!forum/cukes) for similar questions and possible solutions.
Or have a look on [StackOverflow](https://stackoverflow.com/questions/tagged/cucumber). Similar questions come up now and again. You might be able to find the answer yourself.

It's impossible to give a meaningful answer to "Cucumber doesn't work - what's wrong?" -style questions. You have to tell us [more](#help-us-help-you).

# You have found a bug

Before you file an [Issue on Github](https://github.com/cucumber/cucumber/issues/), make sure you have tried the latest version.
This way you don't waste time by reporting a bug that has already been fixed.

{{% text "ruby" %}}Try the latest released gem:{{% /text %}}
``` ruby
gem update cucumber
```

If you are certain you have found a bug, just register a ticket with the relevant project. If you're not sure, please [get in touch](/about/get-in-touch).

## Help us help you

You will likely use Cucumber combined with various web frameworks, many different dependencies and your own code.
You can [run Features](/cucumber/running-features/) in different ways, and many things can go wrong - and quite often it has nothing to do with Cucumber at all.

When asking a question, or filing a bug report, please tell us:

- Which version of Cucumber you are using: `cucumber --version`.
- Any other dependencies you have.
- How you are running Cucumber and which options you provided (i.e. which commands you ran)
- What the output, error message and full {{% text "ruby" %}}backtrace{{% /text %}}{{% text "java" %}}stacktrace{{% /text %}}{{% text "javascript" %}}stacktrace{{% /text %}} was.
{{% text "ruby" %}}Feed Cucumber with `--backtrace --verbose` and rake with `--trace`.{{% /text %}}
- What your expected output is.
- What relevant code you have. Don't *describe* your code; show your actual code. You can use <http://gist.github.com/>, rather than pasting code in emails.

The only way to fix a bug, is to reproduce it first. At the very least, provide the steps to reproduce the issue.
If you can, write a Unit Test or a [Cucumber Feature](/gherkin/feature-introduction/) that demonstrates the bug.
On occasion, we might ask you to provide a [Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve) (preferably in the form of a Github project).

If you file a Github issue without providing following these quidelines, your ticket may be closed. If that happens, please provide the missing information in the ticket to have it reopened.

Whenever possible, please provide a Pull Request yourself that fixes the issue and/or consider adding your solution to the documentation.

# You want a new feature

Start by creating a ticket, explaining what you would like to achieve and how. Then, create a [Cucumber Feature](/gherkin/feature-introduction/) and start implementing it. It also helps if you add unit tests for the low level code.
Note that Cucumber is developed and maintained by volunteers. If you don't implement the feature yourself, it's not sure that someone else will.

# You want to update the documentation

If you would like to contribute to the documentation, please see [Contributing to documentation](/about/contributing-to-documentation/).

# You want to contribute but don't know how

If you enjoy using Cucumber, consider [Investing in Cucumber](https://cucumber.io/blog/2017/10/03/invest-in-cucumber).
