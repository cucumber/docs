+++
title = "Gherkin"
source = "https://github.com/cucumber/cucumber/wiki/Gherkin/"
menu = ["all", "wiki"]
+++

Gherkin is the language that Cucumber understands. It is a [Business Readable, Domain Specific Language](http://martinfowler.com/bliki/BusinessReadableDSL.html) that lets you describe software's behaviour without detailing how that behaviour is implemented.

Gherkin serves two purposes — documentation and automated tests. The third is a bonus feature — when it yells in red it's talking to you, telling you what code you should write.

Gherkin's grammar is defined in the Treetop grammar that is part of the Cucumber codebase. The grammar exists in different flavours for many \[\[spoken languages\]\] (60 at the time of writing), so that your team can use the keywords in your own language.

There are a few conventions.

-   Single Gherkin source file contains a description of a single feature.
-   Source files have `.feature` extension.

Gherkin Syntax
--------------

Like Python and YAML, Gherkin is a line-oriented language that uses indentation to define structure. Line endings terminate statements (eg, steps). Either spaces or tabs may be used for indentation (but spaces are more portable). Most lines start with a keyword.

Comment lines are allowed anywhere in the file. They begin with zero or more spaces, followed by a hash sign (`#`) and some amount of text.

The parser divides the input into features, scenarios and steps. When you run the feature the trailing portion (after the keyword) of each step is matched to a Ruby code block called \[\[Step Definitions|step definitions\]\].

A Gherkin source file usually looks like this

     1: Feature: Some terse yet descriptive text of what is desired
     2:   Textual description of the business value of this feature
     3:   Business rules that govern the scope of the feature
     4:   Any additional information that will make the feature easier to understand
     5: 
     6:   Scenario: Some determinable business situation
     7:     Given some precondition
     8:       And some other precondition
     9:     When some action by the actor
    10:       And some other action
    11:       And yet another action
    12:     Then some testable outcome is achieved
    13:       And something else we can check happens too
    14: 
    15:   Scenario: A different situation
    16:       ...

First line starts the feature. Lines 2–4 are unparsed text, which is expected to describe the business value of this feature. Line 6 starts a scenario. Lines 7–13 are the steps for the scenario. Line 15 starts next scenario and so on.

Read more

-   \[\[Feature Introduction\]\] - general structure of a feature
-   \[\[Given-When-Then\]\] - steps
