---
title: Myths about BDD
subtitle: Common misunderstandings and myths about BDD
---

Let's bust some of the most common myths and misunderstandings about BDD.

# You can pick and choose the practices in any order

Here's [Liz Keogh's take](https://lizkeogh.com/2014/01/22/using-bdd-with-legacy-systems/) on this:

> having conversations is more important than capturing conversations is more important than automating conversations.

Unless you've already done effective discovery work, trying to formulate scenarios is a waste of time.

Similarly, you can't automate examples when you haven't done the work to figure out the most important examples to automate, or got your business stakeholder's feedback in how to word them.

# You can automate scenarios after the code is implemented

Many people use Cucumber to do test automation, to check for bugs after the code has already been implemented. That's a perfectly reasonable way to do test automation, but it's not BDD.

# Discovery doesn't need a conversation

We see plenty of teams who try to leave the work of identifying examples and turning them into formulated scenarios to a single individual on the team.

That's not BDD. Discovery work needs to be done collaboratively, bringing together representatives of the different specialists who all need to share understanding about what will be built.

# Using Cucumber means you're doing BDD

Just because you're using Cucumber, doesn't mean you're doing BDD. [There's much more to BDD than using Cucumber](/docs/bdd).
