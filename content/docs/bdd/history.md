---
title: History of BDD
subtitle: Origins of BDD and Cucumber
---

Behavior-driven development was pioneered by [Daniel Terhorst-North](https://dannorth.net) back in the early 00s, as he explained in a 2006 article called [Introducing BDD](http://dannorth.net/introducing-bdd/). It grew from a response to test-driven development (TDD), as a way to help programmers on new agile teams "get straight to the good stuff" of knowing how to approach testing and coding, and minimize misunderstandings. BDD has evolved into both analysis and automated testing at the acceptance level. [Liz Keogh](https://lizkeogh.com), another BDD pioneer, started writing and speaking about it extensively beginning in 2004.

# Early tools supporting BDD

In 2003, Daniel Terhorst-North started writing a replacement for JUnit called JBehave, using vocabulary based on "behaviour" rather than "test". Liz Keogh and Chris Matts also started contributing early on. Influenced by the idea of ubiquitous language introduced in Eric Evans' [Domain-Driven Design](https://domainlanguage.com/ddd/), and also focusing on business value, the "Given/When/Then" template was developed to capture a story's acceptance criteria in an executable form. It grew partly from the "As a..., I ..., So that..." template for writing user stories, created by [Rachel Davies](http://rachelcdavies.github.io/) at Connextra that had become a recognized standard.  

In 2005, the [RSpec](https://rspec.info/) project, which supported BDD in the Ruby language, was founded by [Dave Astels](http://daveastels.com/), [Steven Baker](https://stevenrbaker.com/), [Aslak Hellesøy](https://twitter.com/aslak_hellesoy) and [David Chelimsky](https://twitter.com/dchelimsky). 

# Origins of Cucumber

As he helped improve RSpec, Aslak had a lot of ideas for improvements in areas like error messages, step definition snippets, and result reporting. RSpec was designed for programmers, whereas the RSpec Story Runner was for the whole team, including non-coding stakeholders. 

He started a new project, intending to make a better version of Story Runner. He initially called it _Stories_, but asked his then-fiancée for a catchier name. She thought of _Cucumber_, and it stuck.
