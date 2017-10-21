---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Step-Organization/
title: Step Organization
---

> TODO: integrate with step definitions

How do you name Step Definition files? What to put in each Step Definition? What **not** to put in Step Definitions? 

Here are some guidelines that will lead to better Scenarios. 

If you are new to Steps and the general syntax, please read [[Feature Introduction](/gherkin/feature-introduction/) first.

## Grouping

Technically it doesn't matter how you name your Step Definition files, or which Step Definitions you put in a file. You *could* have one giant file called `all_steps.rb` and put all your Step Definitions there. 

But that would be so *messy*. Instead, we recommend creating a separate `*_steps.rb` file for each domain concept. 

A good rule of thumb is to have one file for each major model/database table. 

For example, in a Curriculum Vitae application, we might have:

- `employee_steps.rb`
- `education_steps.rb`
- `experience_steps.rb`
- `authentication_steps.rb`

The first three would define all the [Given-When-Then](/gherkin/given-when-then/) Step Definitions related to creating, reading, updating, and deleting the various models. The last one would define Step Definitions related to logging in and out.

If you follow this pattern you also avoid the [Feature-Coupled Step Definitions (Antipattern)](/cucumber/anti-patterns/) anti-pattern.

## Step state

It's possible to store object state in `variables` inside your Step Definitions. 

**Be careful with this!**  It can make your Steps more tightly coupled and harder to reuse. But there is no absolute rule here; sometimes it's okay to use `variables`. 

You can follow a longer discussion [here](http://www.mail-archive.com/rspec-users@rubyforge.org/msg06268.html).
