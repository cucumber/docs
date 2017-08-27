+++
title = "Cucumber Feature"
source = "https://github.com/cucumber/cucumber/wiki/Cucumber-Feature/"
menu = ["all", "wiki"]
+++

Cucumber uses Cucumber. All new features and bug fixes should have a corresponding Cucumber feature on a separate Git branch. This is important if you are \[\[contributing\]\] or reporting a bug.

**Important:** If you are working on something Ruby on Rails related, please write your features in the [Cucumber Rails](http://github.com/cucumber/cucumber-rails) project.

Writing a Cucumber feature
--------------------------

Let's say you have entered a ticket named "Artificial intelligence for Step Definitions", and that it was assigned the number 982. Here is how you create a feature for it:

### Fork and clone the main repository

Go to the [main](http://github.com/cucumber/cucumber) Cucumber Github page and fork the repo. When that's done clone it so you get a copy on your machine. Follow one of the many [GitHub guides](http://github.com/guides) if you're new to this process.

### Create a branch

Instead of working on the master branch - consider creating a separate branch for your feature:

    git checkout -b 982-artificial-intelligence

By using a name that corresponds with the ticket it becomes much easier to follow what's going on.

### Write the feature

Cucumber has its own Step Definitions that make it relatively easy to write features for Cucumber itself. A good place to start is to look at the [features/exception\_in\_after\_block.feature](https://github.com/cucumber/cucumber/blob/master/features/docs/exception_in_after_hook.feature) file.

### Push it to your fork

When you're happy with the feature (it reproduces the bug you found, or the new feature you implemented is working), commit your code with a commit message that links your commit to the ticket, for example:

    git commit -m "Implemented artificial intelligence [#982 state:open]"

You can read more about commit messages [here](https://web.archive.org/web/20080415045655/http://hoth.entp.com/2008/4/11/github-and-lighthouse-sitting-in-a-tree)

Now, push your commits back to your repo on GitHub:

    git push origin 982-artificial-intelligence
