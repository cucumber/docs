---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Step-Organization/
title: Step Organization
---

How do you name step definition files? What to put in each step definition? What **not** to put in step definitions? Here are some guidelines that will lead to better scenarios. If you are new to steps and the general syntax, please read \[\[Feature Introduction\]\] first.

Grouping
--------

Technically it doesn't matter how you name your step definition files and what step definitions you put in what file. You *could* have one giant file called all\_steps.rb and put all your step definitions there. That would be messy.

We recommend creating a steps.rb file for each domain concept. For example, a good rule of thumb is to have one file for each major model/database table. In a Curriculum Vitae application we might have:

-   employee\_steps.rb
-   education\_steps.rb
-   experience\_steps.rb
-   authentication\_steps.rb

The first three would define all the \[\[Given-When-Then\]\] step definitions related to creating, reading, updating and deleting the various models. The last one would define step definitions related to logging in and out.

If you follow this pattern you also avoid the \[\[Feature-Coupled Step Definitions (Antipattern)\]\] antipattern.

Step state
----------

It's possible to keep object state in <code>`variables</code> inside your step definitions. Be careful about this as it might make your steps more tightly coupled and harder to reuse. There is no absolute rule here - sometimes it's ok to use <code>`variables</code>. You can follow a longer discussion [here](http://www.mail-archive.com/rspec-users@rubyforge.org/msg06268.html).
