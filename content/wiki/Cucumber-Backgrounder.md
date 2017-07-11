---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Cucumber-Backgrounder/
title: Cucumber Backgrounder
---

## Or: How I Learned to Stop Worrying and <strike>Love Testing</strike> Start Behaving

### Introduction

Cucumber is a tool that implements a [Behaviour Driven Design (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development) [workflow](http://en.wikipedia.org/wiki/Workflow). This document deals principally with initial set up and first use of the <strong><em> Cucumber-Rails</em></strong> and <strong><em>Cucumber</em></strong> [Rubygems](http://en.wikipedia.org/wiki/RubyGems). It takes as its background the Ruby on Rails (RoR) [web application framework](http://en.wikipedia.org/wiki/Web_application_framework). Detailed discussion of [Behaviour Driven](http://en.wikipedia.org/wiki/Behavior_driven_development) (BDD), [Test Driven](http://en.wikipedia.org/wiki/Test-driven_development) (TDD), and [Panic Driven Development](http://en.wikipedia.org/wiki/SNAFU) (SNAFU aka [Cowboy Coding](http://cowboyprogramming.com/2007/01/11/delving-into-cowboy-programming/)) can be found elsewhere. Of course, there are still some [skeptics](http://steve-yegge.blogspot.ca/2006/09/good-agile-bad-agile_27.html) on this whole Agile thing; not to mention [heretics](http://pragdave.me/blog/2014/03/04/time-to-kill-agile/). But, if you are reading this then you probably are not one of them.

You will find some familiarity with the Ruby language helpful and of the RoR framework somewhat less so. This article is aimed at the near novice and is somewhat long in consequence. If you are familiar with BDD/TDD concepts or are an experienced Rubist you will find some of the contents so obvious as to question its utility. Others, particularly those new to Ruby, may not have your advantages and it is for these readers that this material is provided..

Details regarding installing the Cucumber Rubygem and its recommended support tools for RoR are found on this wiki under the heading \[\[Ruby on Rails]]. To experiment with Cucumber and Cucumber-Rails I recommend that you create a new RoR project and use the default SQLite3 database. The official guide to [Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html) is a useful introduction to RoR.

Note that in this document I often use the terms <em>testing</em> and <em>test</em> where [BDD practitioners](http://dannorth.net/introducing-bdd) prefer the terms <em>behaviour</em> and <em>expectation</em>. When I use the word test in a BDD context I am in fact discussing expressing and verifying expected behaviour.

### Where to Start?

Before anything else make sure that you have the <em>[cucumber-rails](https://github.com/cucumber/cucumber-rails</em>) installed properly into your RoR project. Now we can really get started.

```
<code>
Feature: Design and Build a Ruby on Rails web app using Behaviour Driven Development (BDD)
In order to reduce rework and produce a web app at low cost and high speed
A developer 
Should employ a BDD methodology and agile tools

Scenario: Cucumber should be installed and configured
Given I have installed the gem named "rails"
  And I have installed the gem named "cucumber-rails"
  And I have generated a RoR project named "my_project"
  And the present working directory is the Rails root directory of "my_project"
  And I have the file cucumber.yml in the config directory of "my_project"
  And the file cucumber.yml contains a valid default profile

When I run "rails g cucumber"

Then I should create the directory ./features
  And I should create the file ./features/features.feature
  And I should create the directory ./features/step_definitions
.  .  .
  And I should create the file ./config/environments/environment/cucumber.rb
  And I should create the file ./config/cucumber.yml
  And I should modify ./config/database.yml
  .  .  .
</code>
```

The foregoing gives a sample of the form that feature files often take ( <em>sadly</em> ). These lines, called feature or scenario <em>steps</em> or <em>statements</em>, are the user interface to Cucumber testing. Those given above are written in the [Imperative Style](http://www.benmabey.com/2008/05/19/imperative-vs-declarative-scenarios-in-user-stories/) simply for illustrative purposes. <strong>Never put statements that look anything like these in a feature file</strong> ( <em>but you will</em> ). In practice, all those Then/And statements should be subsumed into one simple Declarative Style statement. For example: <code>I should create the Cucumber environment</code>. The messy details of just what comprises a Cucumber environment are placed in the step definition files.

Instead, a feature should look more like this:

```
<code>
Feature: Design and Build a Ruby on Rails web app using Behaviour Driven Development (BDD)
In order to produce a web app at low cost and high speed
A developer 
Should employ Ruby on Rails with Cucumber BDD tools

Scenario: Cucumber-Rails should be installed and configured
  Given I am in a rails project root
    And I have installed cucumber-rails
    And I do not have a cucumber environment
  When I run the cucumber-rails generator
  Then I should have a cucumber environment
</code>
```

We will return to how to write features and steps later. For the moment we deal with the logical arrangement of Cucumber files within the context of an RoR project. The root level of the archetypal RoR-4.0 project directory tree looks like this:

```
<code>MyProject
.
├── app
├── bin
├── config
├── config.ru
├── db
├── Gemfile
├── Gemfile.lock
├── lib
├── log
├── public
├── Rakefile
├── README.rdoc
├── test
├── tmp
└── vendor
</code>
```

With Rails-3 and later, running <code>rails generate cucumber:install</code> adds this layout to the existing structure:

```
<code>
features
├── step_definitions
└── support
    └── env.rb
</code>
```

If you are not using Rails and Cucumber-Rails in your project then you can accomplish much the same thing by creating the directory tree from the command line (<code>mkdir -p features/step_definitions</code>) and similarly adding the support directory (<code>mkdir -p features/support</code>). People returning to Cucumber who are familiar with its early versions will note the absence of most of the files cucumber-rails used to provide leaving only <code>features/support/env.rb</code>. Conspicuous by its absence is <code>features/step_definitions/web_steps.rb</code>. [Since version 1.1.0 you are required to provide all of your web steps from your own resources.](http://aslakhellesoy.com/post/11055981222/the-training-wheels-came-off) (see [wayback machine archive](http://web.archive.org/web/20130424133851/http://aslakhellesoy.com/post/11055981222/the-training-wheels-came-off)). But the old, deprecated, step definitions can still be found if you read the referenced blog entry.

<em>It is a <strong>really</strong> good idea to read the contents of <code>./features/support/env.rb</code> before doing anything else with cucumber and again after every update to cucumber-rails.</em>

Once the features directory structure is in place then we are ready to begin testing with Cucumber.

### Where do I put Tests?

Cucumber divides testing into two parts, the outward facing feature <em>scenario steps</em> and the inward facing <em>step definitions</em>. Features are descriptions of desired outcomes (<strong>Then</strong>) following upon specific events (<strong>When</strong>) under predefined conditions (<strong>Given</strong>). They are typically used in conjunction with end-user input and, in some cases, may be entirely under end-user (in the form of a domain expert) control. Feature files are given the extension <code>.feature</code>.

\[\[Step definitions]], or <em>stepdefs</em>, are keyed by their snippets of text from the feature scenario statements and invoke blocks of Ruby and Rails code that usually contain api methods and assertion statements from whatever test system you have installed (MiniTest/TestUnit, RSpec, Shoulda, etc.). Given that Cucumber originally evolved out of RSpec stories it is unsurprising that the Cucumber-Rails generator once assumed that RSpec was available. This has long since ceased to be the case. What the generator does now is detect if the RSpec gems are installed. If so then the rails generator builds the environment files to suit and if not then it ignores RSpec and configures for test-unit instead. In fact, the availability of options is increasing over time. To see what is available in the version of Cucumber-Rails that you have installed use the command: <code>rails g cucumber:install --help</code> or <code>script/generate cucumber --help</code>.

A particular source of potential confusion is that the term <em><strong>steps</strong></em>, when used loosely, has two (closely related but vitally distinct) meanings, depending on context.

Inside <code>\*.feature</code> files, steps are the textual descriptions which form the body of a scenario. These are prefaced with the keywords <strong>Given</strong>, <strong>When</strong>, <strong>Then</strong>, <strong>And</strong> or <strong>But</strong> (note as well that the capitalization of these five names is significant). Alternatively, one may simply use the <strong>\*</strong> character to stand in place of any of the foregoing.

```
<code>
Scenario: Cucumber should be installed and configured
Given I have installed the gem named "rails"
    * I have installed the gem named "cucumber-rails"
    * I have generated a RoR project named "my_project"
. . .
</code>
```

Inside a <code>step_definitions.rb</code> file, steps (which strictly speaking should always be called step definitions and are now often simply called <em>stepdefs</em> or even just <em>defs</em>) refer to the <em>matcher</em> methods, which may be given any of the same names (Given, When, Then, And or But), each provided with a matcher <em>"string"</em> or <em>/regexp/</em> that corresponds to one or more feature steps. Note that the method name does NOT form part of the matcher. A Given feature clause can match a When step definition matcher. Over time, clauses from features have come to be referred to simply as <em>features</em> while <em>steps</em> now refers almost exclusively to step definitions.

As shown above, the generated <code>features/</code> directory tree is fairly shallow. One can put every feature into a single file in the <code>features/</code> directory, and every step in a single file in the <code>step_definitions/</code> directory (or even in the <code>features/</code> directory itself) if one so chooses. Alternatively, one can choose to have one or more feature files for each feature, together with one or more step files for each feature file, or any combination thereof.

However, Cucumber is programmed with the flexibility to support a much more expressive directory structure. For instance:

```
<code>|__ features
|   |__ entities
|   |   |__ entity.feature
|   |   |__ step_definitions
|   |       |__ anything.rb
|   |       |__ entity_steps.rb
|   |__ locations
|   |   |__ location.feature
|   |   |__ step_definitions
|   |       |__location_steps.rb
|   |__ sites
|   |   |__ step_definitions
|   |__ step_definitions
|   |   |__ local_assert_steps.rb
|   |   |__ local_crud_response_steps.rb
|   |   |__ local_email_steps.rb
|   |   |__ local_file_steps.rb
|   |   |__ local_script_steps.rb
|   |   |__ local_steps.rb
|   |   |__ local_web_steps.rb
`   |   |__ local_xml_file_steps.rb   
    |__ support
        |__ env.rb
        |__ local_env.rb
        |__ local_transforms.rb
</code>
```

In this case the bland initial setup has been divided into sub-directories, informed by model-centric testing. This could equally well have been broken up in to model/view/controller hierarchies:

```
<code>|__ features
|   |__ models
|   |  |__entities
|   |     |__entity.feature
|   |        |__step_definitions
|   |           |__anything.rb
|   |           |__entity_steps.rb
|   |__views
|   |  |__entity_new
|   |  |__step_definitions
|   |     |__entity_new_steps.rb
|   |__step_definitions
`   |  |__local_steps.rb
    |__ support
       |__env.rb
       |__local_env.rb
       |__local_transforms.rb
</code>
```

or this

```
<code>|__ features
|   |__invoicing.feature
|   |__product.feature
|   |__step_definitions
|   |  |__local_steps.rb
|   |  |__model_steps.rb
|   |  |__service_steps.rb
|   |  |__web_steps.rb
|   |__user.feature
`   |__user_auth.feature
    |__support
       |__env.rb
       |__local_env.rb
       |__local_transforms.rb
</code>
```

<strong>It is considered an anti-pattern to relate <code>step_definition</code> files to specific feature files.</strong> As is the case for many ( <em>most? all?</em> ) programming suggestions there are exceptions and contrary opinions respecting the orthodox position on the practice. Nonetheless, at the outset it is probably best to follow the recommendation that one avoid feature-specific step-definition files. Thereafter you may depart from it but only when you are experienced enough to evaluate the trade-offs between approaches.

Be aware that, regardless of the directory structure employed, Cucumber effectively flattens the features directory tree when running tests. By this I mean that anything ending in <code>.rb</code> under the start point for a Cucumber feature run (the default case) or specified with the <code>-r</code> option is searched for feature matches. Thus, a step contained in <code>features/models/entities/step_definitions/anything.rb</code> can be used in a feature file contained in <code>features/views/entity_new</code>, providing that cucumber is invoked on a root directory common to both, <code>./features</code> in this case; or explicitly required on the command line, <code>$ cucumber -r ./features features/views/entity_new</code>. Remember that step definition files can be called anything so long as they end in <code>.rb</code> and that anything ending in <code>.rb</code> anywhere under the root library directory for a Cucumber run will be treated as a step definition file.

Note that if the <code>-r</code> option is passed then <strong>ONLY</strong> that directory tree will be searched for step definition matches. You may specify the <code>-r</code> option multiple times if you need to include step definitions from directories that do not share a convenient root.

### How do I Write Tests?

Constructing ones first tests, or features as BDD purists prefer, is often accompanied by what can only be described as <em>[writer's block](http://en.wikipedia.org/wiki/Writer%27s_block</em>). The question of "Where to begin?" seems to be a particular roadblock for some. If you truly have no idea of where to start then I suggest that you consider what you are writing, presumably a web application, and what the initial point of contact between it and a user is, the home page. You can do worse than simply starting with:

```
<code>
Feature: An application to do whatever
  In order to generate revenue
  The users
  Should be able to visit our web site

Scenario: The application has a home page
  Given I do have a web application
  When I visit the home page
  Then I should see the home page
</code>
```

Once upon a time the easiest thing to do for the first time tester/behaviourist was to use Cucumber's built-in scaffold generator to create a feature scaffold for each new feature desired and modify the resulting files to suit.

```
<code>script/generate feature Frooble name color description
      exists  features/step_definitions
      create  features/manage_froobles.feature
      create  features/step_definitions/frooble_steps.rb
</code>
```

This might have been the <em>easiest</em> thing to do, but it was never the <em>best</em> thing to do. In my experience, framework-generated scaffolds of all types provide a novice user with nothing more than a comforting illusion of progress with lots of boilerplate code. And all too frequently, the generated code is, for all intents and purposes, worthless (save only as an example of proper syntax—and even then, the syntax is often of dubious quality).

In any case the whole point of BDD is that it is vitally important to write each test/feature scenario <em><strong>one stepdef at a time, preferably with a domain expert, and in plain language</strong></em>. In the BDD world there is no point to feature scaffolding generators to begin with. This fact eventually led to the feature generator's removal from cucumber-rails. Now, like step definitions, you have to write your own code ( <em>or steal somebody else's</em> ) from the outset.

[The use of plain language in the feature file is crucial to successful use of Cucumber](http://elabs.se/blog/15-you-re-cuking-it-wrong). What does “plain language” mean? Basically, it comes down to stating the result that you wish to obtain while avoiding specifying how you expect to get it. Detailed discussion of feature writing and step construction are provided elsewhere (see \[\[Given-When-Then]] and [Telling a Good Story](http://blog.josephwilk.net/ruby/telling-a-good-story-rspec-stories-from-the-trenches.html)).

For example, for an authentication scenario you should write:

```
<code>When "Bob" logs in</code>
```

and not:

```
<code>
  Given I visit "/login"
  When I enter "Bob" in the "user name" field
    And I enter "tester" in the "password" field
    And I press the "login" button
  Then I should see the "welcome" page
</code>
```

What is important about the difference in styles? The first example, <strong>When "Bob" logs in</strong>, is a functional requirement. The second, much longer, example is a procedural reference. Functional requirements are features but procedures belong in the implementation details. Ironically, given the propensity to use the word <strong>should</strong> in BDD/TDD, the real <strong>[Plain English](http://www.plainlanguage.gov/whatisPL/definitions/Kimble.cfm</strong>) folks advocate the use of <strong>must</strong> in place of should or shall.

In feature files, what you and your client should focus on is that which has to happen, not how you expect it to happen. That way when somebody later decides that challenge and response authentication schemes are passé then you simply need change the authentication process steps behind the scenes. Your outward facing feature files—the ones that your clients get to see—need not change at all. In fact, a good question to ask yourself when writing a feature clause is: <i>Will this wording need to change if the implementation does</i>?

If the answer is “Yes”, then the clause is poorly written, and you should rework it avoiding implementation specific details. As a side benefit, in consequence your scenarios will be a lot shorter and much easier to follow and understand.

After each new feature statement is added to its scenario, you should immediately create the corresponding step definition method. This is where the implementation details are put because, in the normal course of events, your users will never see them. Once your new step definition is written then you must prove to yourself that it fails by running it against the, as yet, non-existent application code. Then (and <em>only</em> then) should you write the least application code that gets your test/step definition to pass.

Now that you have a passing step, without changing the step definition's logic change the test criteria within it to something that cannot be and prove to yourself that it fails again. Once you have assured yourself that your test is passing for the right reason then reset the criteria so that the test passes again. Once this cycle is complete, move on to the next feature clause.

For example:

```
<code>
Scenario: Users can enter an invoice item
   .  .  .
   Then I enter a product quantity of 5
</code>
```

Now, immediately go to your step_definition file and do this:

```
<code>
When /enter a product quantity of (\d+)/ do |quantity|
  pending "TODO: Do we need to have a product code passed as well?"
end
</code>
```

Think about how you are going to express this behaviour in your application and how you can detect that it occurs. Go back and rework your feature and step until you are satisfied that it will indeed produce some testable result <strong>and</strong> that the test fails.

Now, go write the code to implement this requirement in your application.

### When do I Write Tests?

It is tempting, sometimes irresistibly so, to skip ahead to the analysis stage alone, and complete as many features, scenarios, and scenario statements as one can imagine. In some cases, limited access to domain experts and end users may require that many features have their scenario details completed long before coding the associated step definitions is undertaken. When this is avoidable it should be, and when it is not avoidable then every effort should be made to avoid it nonetheless. In the long run, the best results are achieved when you write feature statements and step definitions incrementally, using the absolute minimum of code to express the requirement. Immediately implement the new step requirement in the application using the absolute minimum code that will satisfy it.

You should, in fact, treat this part somewhat as a game. The application code that you write should literally be the minimum that will satisfy the requirement (particularly if this code is totally unsuited for production use). This way, you are forced to add additional feature scenarios to drive out exactly what is acceptable. This pressure forces application code to evolve strictly to meet those requirements. This might seem foolish and a waste of time, but if you preempt the design process by writing more sophisticated code than is called for, then you will inevitably fail to provide scenario coverage for some of that code. You will also write code that will never, ever, be used. This <em>will</em> happen and it <em>will</em> bite you at some point. Keep the <span style="text-align:left;">[strong>YAGNI</strong>](http://en.wikipedia.org/wiki/You_ain%27t_gonna_need_it)</span> principle in mind at all times.

This is a hard discipline to accept, but the value with this approach is that you will rarely (<em>never</em>) have untested code anywhere in your application. More importantly, if you rigorously adhere to this methodology then your application will contain the minimal code that satisfies required features. This is an often overlooked or undervalued consideration that contributes greatly to the efficiency of coding, to the robustness of the resulting code, and to the performance of the the resulting program. Avoiding diversions into coding adventures that are technically interesting but financially pointless concentrates your limited resources on the tasks that count and measurably reduces the overall complexity of the project. Whenever you find yourself led down this garden path to the creeping <span style="text-align:left;">[strong><em>featuritis</em></strong>](http://en.wikipedia.org/wiki/Feature_creep)</span> plant ask: <strong><em>If the user did not ask for it then exactly why are we writing it?</em></strong>

Strictly following this approach permits you to face significant design changes (<em>and gem updates</em>) with complete equanimity. Having built your code to reproducible performance measurements you may rest secure in the knowledge that if unanticipated changes anywhere in your project break anything then you will know of this immediately upon running your test suite (<em>Which is always running, right? Right??</em>). More importantly, you will know exactly what is broken and where it is broken.

As is the case with most professions, the real value that a skilled programmer provides lies not so much in knowing how to do something as in knowing when and where it must be done. The real challenge with maintaining code is simply discovering which piece of code to change. Finding the exact spots in an application that need attention is usually the biggest maintenance problem. By strictly coding to features backed by suitable step definitions you can simplify that task almost to the point of triviality.

If it happens that, on occasion, you do anticipate feature steps (<em>and we all do this on occasion no matter how much we try to avoid it</em>) then omitting any matcher for them in the step definitions files causes those steps to be reported as missing by cucumber. Not only does cucumber report them it also helpfully provides a suggested step matcher and argument to implement. If you end up writing stub step matchers prior to full implementation then you have an explicit <strong><em>pending</em></strong> method available to designate defined but pending/unspecified/stub step definitions. The <code>pending</code> method provides for specifying an optional message. Step definitions containing the <code>pending</code> method will display as defined but pending in your cucumber runs and will print any message that you provided it.

```
<code>
  Given /this step is not implemented yet/ do
    pending "your message goes here"
  end
</code>
```

By the way: never, ever, write a step definition for a clause that is not already present in one of your features. Do not anticipate where your features will lead you. Most speculative step definitions end up as unused [cruft](http://en.wikipedia.org/wiki/Cruft) that somebody (<em>probably you</em>) will, eventually, end up discarding anyway. And any of the few that are not simply discarded will likely need significant rework when they are finally employed. It is best to wait until the need for each step definition is both evident and pressing.

Before writing any line of code, whether it be feature, step or application, think carefully about what you are actually trying to accomplish and keep in mind this statement by Dave Thomas of <em>The Pragmatic Programmer</em> fame.

> When faced with two or more alternatives that deliver roughly the same value, take the path that makes future change easier.

### What are Features and Scenarios?

A <dfn>feature</dfn> can be conceptualized as an indivisible unit of functionality embedded in the project to which it belongs. For example, an authentication challenge and response user interface is usually considered a feature while an entire authentication system necessarily comprises many features. A single <strong><em>Feature</em></strong> is typically contained in its own file (ending in <code>.feature</code>). Each Feature is usually elaborated though multiple <strong><em>Scenarios</em></strong>.

A <dfn>Scenario</dfn> is a block of statements inside a feature file that describe some behaviour desired or deprecated in the feature to which it belongs. A scenario might check that the login interface provides input fields for the requisite responses, that failures are logged or otherwise reported, that user ids are locked out after a given number of failed attempts, and so forth. Each scenario exercises the implementation code to prove that for each anticipated condition the expected behaviour is indeed produced. Recall that scenarios specify <strong>What</strong> and should avoid answering the question: <strong>How</strong>?

Each Scenario consists of three classes of statements, <strong>Given</strong>, <strong>When</strong> and <strong>Then</strong> which effectively divide each scenario into three stages. Each stage of a scenario consists of one or more statements that are used to match to test step definitions. The conventional arrangement is:

```
<code>Feature: Some terse yet descriptive text of what is desired
In order that some business value is realized
An actor with some explicit system role
Should obtain some beneficial outcome which furthers the goal
To Increase Revenue | Reduce Costs | Protect Revenue  (pick one)

  Scenario:   Some determinable business situation
      Given some condition to meet
         And some other condition to meet
       When some action by the actor
         And some other action
         And yet another action
       Then some testable outcome is achieved
         And something else we can check happens too

  Scenario:  A different situation
      ...
</code>
```

For Cucumber features, the keywords used here are <strong>Feature</strong>, <strong>Scenario</strong>, <strong>Given</strong>, <strong>When</strong>, <strong>Then</strong>, and <strong>And</strong>. Feature is used to provide identification of the test group when results are reported.

To date ( <time datetime="2015-06-03">2015 Jun 05</time> ) the <code>Feature</code> statement and its descriptive text block are not parsed by Cucumber other than as an identifier and documentation. Nonetheless, the <code>Feature</code> statement arguably contains the most important piece of information contained in a feature file. It is here that you answer the question of just why this work is being done. And if you do not have a very good, defensible, reason that can be elucidated in a few sentences then you probably should not be expending any effort on this feature at all. First and foremost, <strong>BDD</strong> absolutely <strong>must</strong> have some concrete business value whose realization can be measured before you write a single line of code. <em>"(see popping the why? stack)":<http://www.mattblodgett.com/2009/01/pop-stack.html></em>

As with <code>Feature</code>, <code>Scenario</code> is used only for identification when reporting failures and to document a piece of the work. The clauses ( <em>steps</em> ) that make up a Scenario each begin with one of: Given, When, Then, And and But ( <em> and sometimes <strong>\*</strong></em> ). These are all \[\[Gherkin]] keywords / Cucumber methods that take as their argument the string that follows. They are the steps that Cucumber will report as passing, failing or pending based on the results of the corresponding step matchers in the step_definitions.rb files. The five keywords ( <em> and <strong>\*</strong></em> ) are all equivalent to one another and completely interchangeable.

### What are Step Definitions?

The string following the keyword in the feature file is compared against all the matchers contained in all of the loaded step_definitions.rb files. A step definition looks much like this:

```
<code>Given /there are (\d+) froobles/ do |n|
  Frooble.transaction do
    Frooble.destroy_all
    n.to_i.times do |n|
      Frooble.create! :name => "Frooble #{n}"
    end
  end
end
</code>
```

The significant things here are that the method (Given) takes as its argument a [regexp](http://en.wikipedia.org/wiki/Regexp) bounded by <code>/</code> ( <em>although a quoted "simple string" can be used instead</em> ) and that the matcher method is followed by a block. In other words, written differently in Ruby this matcher method could look like this:

```
<code>Given( /there are (\d+) froobles/ ) { |n|
.  .  .
}</code>
```

Among other things, this means that the step definition method blocks receive all of the matcher arguments as string values. Thus <code>n.to_i.times</code> and not simply <code>n.times</code> ( <em>but also look into Cucumber transforms</em> ). It also means that step matchers themselves can be followed by the special regexp modifiers, like <strong>i</strong> if you want to avoid issues involving capitalization.

In the feature example provided above we had the scenario statement: <code>And some other action</code>. This could be matched by any of the following step definition matchers if present in any <code>step_definitions.rb</code> file found under the features root directory.

```
<code>Given /some other action/ do
Then "some other action" do
When /some other Action/i do 
When /some other (Action)/i do |action|
Then /(\w+) other action/i do |prefix_phrase|
Given /(\w+) other (\w+)/i do |first_word,second_word|
But /(\w+) Other (.*)/i do |first_word,second_phrase|
And /(.*) other (.*)/i do |first_phrase,second_phrase|
</code>
```

The step definition match depends only upon the pattern given as the argument passed to the Given/When/Then method and not upon the step method name itself. I have therefore adopted the practice of only using <code>When /I have a match/ do</code> in my step definitions files as **When** has a more natural appearance, to me, for a matcher. Others find that the word "Given" has a more natural language feel in this context.

If Cucumber finds more than one matcher in all of the step definitions files matches a scenario statement then it complains that it has found multiple step definition matches for that step and forces you to distinguish them. You can instruct Cucumber to just choose one of the candidates instead by passing it the <code>--guess</code> option on the command line.

It is considered better form by some to surround with double quotation marks, <strong><code>" "</code></strong>, all of the elements in the feature step clauses that are meant to be taken as values for variables passed to the step definition. This is just a convention. However, if you choose to follow this road then you must adjust your step definition matchers accordingly if the <code>"</code> characters are now considered part of the literal matcher string. For example:

Feature statement:

```
<code>Given some determinable "business" situation
</code>
```

step definition:

```
<code>When /determinable "(.*)" situation/ do |s|
</code>
```

Finally, you can have step definitions call other step definitions, including those contained in other step definitions files. This is one ( <em>but not the recommended</em> ) means by which you can specify the procedural details by combining other steps. For example:

```
<code>When /some "(.*)" action/  do |act|
   .  .  .
end

When /in an invoiced non-shipped situation/ do
  step( "some \"invoiced\" action" )
  step( "some \"non-shipped\" action" )
  .  .  .
end
</code>
```

### Steps within Steps: An anti-pattern

If one step definition calls another step definition then the matcher argument to the called <strong>Given/When/Then</strong> method must be enclosed with string delimiters. Because of this, if you have adopted the practice of demarcating parameter values present in feature steps with double quotation marks, you must escape these quotation marks when calling another definition_steps.rb matcher from inside a step_definitions.rb file. You must take care not to include the quote marks in the step_definitions parameter matchers, for <code>"(.**)"</code> is not the same as <code>(.**)</code> or <code>(".\*")</code>. If you use quote delimited values in the <code>.feature</code> file steps and do not account for them in the corresponding <code>step_definition.rb</code> matcher regexp then you will obtain variables that contain leading and trailing quotes as part of their value.

```
<code>
Scenario: Quotes surround value elements
  Given some "required" action

# step_definitions
When /some (.*) action/ do |a|
  a => "required"

When /some "(.*)" action/ do |a|
  a => required
</code>
```

Once upon a time, one could simply nest <strong>Given</strong>, <strong>When</strong>, and <strong>Then</strong> matchers within step definitions and thereby directly call steps from within other steps. This practice led to increase coupling between <code>step_definition</code> files, then it was frowned upon, and finally the ability was removed (well, *strongly* deprecated). If you use nested steps then you must now call them using the <strong><code>step</code></strong> method. You may still encounter the following forms in step definition files created before this change:

```
When /my matcher named (.*)/ do |match|
  Then "my other matcher named \"#{match}\""
end

When /my matcher named (.*)/ do |match|
  When %Q(my other matcher named "#{match}")
end
```

When encountered these nested <strong>Then<strong> and <strong>When</strong> matcher statements should be replaced with the <code>step</code> method:

```
When /my matcher named (.*)/ do |match|
  step( "my other matcher named \"#{match}\"" )
end

When /my matcher named (.*)/ do |match|
  step %Q(my other matcher named "#{match}")
end
```

Using the %Q method (usually shortened to just <strong>%</strong>) within the step method removes the necessity to escape (<code>\\</code>) any embedded quotation characters (<code>"</code>). Multiple steps may be called <i>en bloc</i> using the <strong><code>steps</code></strong> (*note the plural form*) method which itself takes a string argument.

However, with the steps method, the Gherkin keywords deprecated in simple nested steps are still required:

```
<code>
When /my matcher named (.*)/ do |match|
  steps %Q{
    Then step my other matcher named "#{match}" 
     And the next matcher with value "{match}"
  }
end
</code>
```

Always keep in mind that Cucumber is simply a DSL wrapper around the Ruby language whose full expressiveness remains available to you in the step definition files (<em>but not in the feature files</em>). On the other hand, do not lose sight that every step called as such in a step definition file is first parsed by \[\[Gherkin]] and therefore must conform to the same syntax as used in feature files.

Returning to our example of "Bob" the user, one could define things in the <code>step_definitions</code> file like this:

```
When /"Bob" logs in/ do |user|
  steps( %Q(
    Then I visit "/login"
      And I enter "#{user}" in the "user name" field
      And I enter "#{user}-test-passwd" in the "password" field
      And I press the "login" button
  ) )
```

That is acceptable ( <em>barely</em> ) usage in your step_definitions because your users are never going to see how ugly it looks. Instead, given that the necessary classes and methods exist, "Bob" could, and should, be authenticated without recourse to the user interface thus:

```
<code>
When /"Bob" logs in/ do |user|
  @current_user = User.find_by_username!(user) # ! method raises exception on failure
  @current_session = UserSession.create!(@current_user)  # ! method raises exception on failure
  .  .  .
end
</code>
```

In fact, this step should be further refactored into a method. And said method can reside in the same <code>.rb</code> file as the step definition. This both simplifies the step and encourages the reuse of the resulting method.

It also adds immeasurably to easy comprehension for people unfamiliar with the project history who may later have cause to review your tests. Can you spell <strong>M-A-I-N-T-E-N-A-N-C-E</strong>?

```
<code>
When /"Bob" logs in/ do |user|
  create_new_user_session_for( user )
end
</code>

<code>
def create_new_user_session_for( user_in )
  # TODO create proper setter and getter methods for instance variables
  @current_user = User.find_by_username!( user_in ) # ! method raises exception on failure
  @current_session = UserSession.create!(@current_user)  # ! method raises exception on failure
  .  .  .
end
</code>
```

Of course, when you are testing the login user interface the ugly approach seems unavoidable, but in fact it is not. Providing for the purposes of testing that certain conventions are followed respecting user names and passwords the following works just as well and is much cleaner. Plus you have removed all inter-step dependencies.

feature statement:

```
<code>
When "Bob" logs on through the logon page
</code>
```

step definition:

```
<code>
When /"([\w[\d\w]+)" logs on through the logon page/ do |user_name|
  visit(logon_path)
  fill_in( "User Name", :with => user_name )
  fill_in( "Password", :with => user_name + "-test-passwd" )
  click_button( "Logon" )
end
</code>
```

Having just shown you how to do it now take heed that you do not write <strong>any</strong> step definitions that call other steps (<em>you will do this too, but try hard not to</em>). At times this will seem like the quickest solution to a troublesome bit of environment building. However, for anything beyond trivial use it is always better to implement a custom method using the <strong>api</strong> provided by Cucumber ( <em>or by any other libraries you have installed</em> ) and then call that method directly from your step. You can either keep these custom methods in the same file as the regular steps or stick them in any convenient file ending in <code>.rb</code> that is located in the support directory ( <em>well, anywhere that cucumber can find it really</em> ) in which case you must enclose your methods within the following block:

```
<code>
Cucumber::Rails::World.class_eval do
  def your_method(parm)
    .  .  .
  end
end
</code>
```

A cleaner way of doing this that avoids using the evil <strong><em>eval</em></strong> method is to create a class that contains only your add-on methods and then instantiate it inside the Cucumber World. Something like this:

```
<code>
# features/support/local_env.rb
. . .
class LocalHelpers
. . .
  def execute( command )    
    stderr_file = Tempfile.new( 'script_stdout_stderr' )
    stderr_file.close
    @last_stdout = `#{command} 2> #{stderr_file.path}`
    @last_exit_status = $?.exitstatus
    @last_stderr = IO.read( stderr_file.path )
  end
. . .
end
. . .
World do
  LocalHelpers.new
end
</code>
```

My rule of thumb is that if a step definition is called from another step definition then its contents probably should be extracted out into a custom method. For example a logon step definition is likely to be used repeatedly throughout many features. Turning it into a method is probably called for.

```
<code>
def logon_for_user( uname )
  visit(logon_path)
  fill_in( "User Name", :with => uname )
  fill_in( "Password", :with => uname + "-test-passwd" )
  click_button( "Logon" )
end

When /"([\w[\d\w]+)" logs on through the logon page/ do |user_name|
  logon_for_user( user_name )
end
</code>
```

Before you ask: Yes, these <em>helper</em> methods can go into the same step definitions file that uses them. I put them at the top above all the matchers. And they can be called from elsewhere in your step definitions so you need not repeat yourself.

### Before, After and Background

If all your feature's scenarios share the same 'set-up' feature steps, then Cucumber provides the <em>Background</em> section. Steps contained within a Background section are run before each of the scenarios.

```
Feature: .  .  .
  Background: .  .  .
  Scenario: .  .  .
```

Step definition files have a corresponding method available in the <code>before(condition) do . . .</code> method, which has however a matching <code>after(condition) do . . .</code> method as well. Recall that we are working in Ruby, and therefore the condition which enables the before/after block is anything that besides <code>false</code> or <code>nil</code> (like a <strong>tag</strong>, for instance). Also be aware that <strong>all</strong> eligible <code>before</code> methods are run before any scenario statements are processed, and that they are run in the order encountered. Likewise, every eligible <code>after</code> block will run at the completion of every scenario, again in the order that it is encountered.

These two methods are powerful tools, but be aware that if you use them excessively then you will hang yourself eventually.

### What is a good Step Definition?

Opinions vary of course, but for me a <strong><em>good</em></strong> step definition has the following attributes:

- The matcher is short.
- The matcher handles both positive and negative (true and false) conditions.
- The matcher has at most two value parameters
- The parameter variables are clearly named
- The body is less than ten lines of code
- The body does not call other steps

My template for a step definition presently looks like this:

```
<code>
# statement identifier expectation "value"
# statement identifier not expectation "value"
When /statement identifier( not)? expectation "([^\"]+)"/i do |boolean, value|
  actual = expectation( value )
  expected = !boolean           # this works because in ruby nil == false and !nil == true
  message = "expectation failed for #{value}" 
  assert( actual == expected, message )
end
</code>
```

For example ( admittedly contrived ):

```
<code>
When /product ([^\"]+) should( not)? belong to category ([^\"]+)/i do |product, boolean, category|
  actual = ( Product.find_by_stock_number!( product )category ) == category 
  expected = !boolean
  message = "Product '#{product}' should#{boolean} belong to category '#{category}'"
  assert( actual == expected, message )
end
</code>
```

Hunting through multiple files and directories for a multi-purpose step-definition matcher is considerably more tedious than looking for an invariant string of text. Therefore I recommend that you preface such steps with comments that cover the expected usage. For example:

```
<code>
# product should belong to category
# product should not belong to category
When /product ([^\"]+) should( not)? belong to category ([^\"]+)/i do |product, boolean, category|
. . .
</code>
```

Which can be conveniently <code>grep</code><em>ed</em> for ( <em>on \*nix systems at least</em> ) using:
<code>find features -name \\**rb | xargs grep "product .** should belong to category"</code>

### What are "tags"?

Cucumber provides a simple method to organize features and scenarios by user determined classifications. This is implemented using the convention that any space delimited string found in a feature file that is prefaced with the commercial at (<strong><code>`</code></strong>) symbol is considered a tag.  As distributed, Cucumber-Rails builds a Rake task that recognizes the <em><code>`wip</code></em> tag. However, any string may be used as a tag and any scenario or entire feature can have multiple tags associated with it. For example:

```
<code>
  @init
  Feature:  .  .  .
  .  .  .
  @wip @authent
  Scenario:  A user should authenticate before accessing any resource.
     Given I do have a user named "testuser"
      When the user visits the login page
         And the user named "testuser" authenticates successfully
     Then I should see .  .  .
         .   .  .
</code>
```

Given that the forgoing is contained in a file called <code>features/login/login.feature</code> and that the <code>cucumber-rails</code> gem is installed and configured then you can exercise this scenario, along with any others that are similarly tagged, in any of the following ways:

> <em>Note: You will probably need to preface command line instructions with</em>:
> <code>bundle exec</code>

```
$ rake cucumber:wip
$ cucumber --profile=my_profile --tags=@wip features
$ cucumber --profile=my_profile --tags=@authent features/login
$ cucumber --profile=my_profile --tags=@init 
```

However, the following will not work, unless you \[\[build a custom rake task|Using-Rake]] for it:

```
$ rake cucumber:authent
```

There is an obscure <em>gotcha</em> with this particular combination of tags. The default profile contained in the distributed <code>config/cucumber.yml</code> contains these lines:

```
<code>
<%
.  .  .
std_opts = "--format #{ENV['CUCUMBER_FORMAT'] || 'progress'} --strict --tags ~@wip"
%>
default: <%= std_opts %> features
.  .  .
</code>
```

Note the trailing option <code>--tags ~`wip</code>.  Cucumber provides for negating tags by prefacing the <code>--tags</code> argument with a tilde character(<strong><code>~</code></strong>).  This tells Cucumber to not process features and scenarios so tagged. If you do not specify a different profile ( <code>cucumber -p profilename</code> )then the default profile will be used.  If the default profile is used then the <code>--tags ~`wip</code> will cause Cucumber to skip any scenario that is so tagged. This will override the <code>--tags=@authen</code> option passed in the command line and so you will see this:

```
$ cucumber --tags=@authent
Using the default profile...

0 scenarios
0 steps
0m0.000s
```

Since version 0.6.0, one can no longer overcome this default setting by adding the <code>--tags=`wip</code> to the Cucumber argument list on the command line because now all <code>--tags</code> options are ANDed together.  Thus the combination of <code>--tags`wip</code> <strong>AND</strong> <code>--tags ~@wip</code> fails everywhere.

You either must create a special profile in <code>config/cucumber.yml</code> to deal with this or alter the default profile to suit your needs. Note as well that <code>`wip</code> tags are a special case. If any scenario tagged as <code>`wip</code> passes all of its steps without error and the <code>--wip</code> option is also passed then Cucumber reports the run as failing since scenarios that are marked as a work in progress are not supposed to pass. Note as well that the <code>--strict</code> and <code>--wip</code> options are mutually exclusive.

The number of occurrences of a particular tag in your feature set may be controlled by appending a colon followed by a number to the end of the tag name passed to the tags option, as in <code>$ cucumber --tags=@wip:3 features/log\*</code>. The existence of more than the specified number of occurrences of that tag in all the features that are exercised during a particular cucumber run will produce a warning message. If the <code>--strict</code> option is passed as well, as is the case with the default profile, then instead of a warning the run will fail.

Limiting the number of occurrences is commonly used in conjunction with the <code>@wip</code> tag to restrict the number of unspecified scenarios to manageable levels. Those following [Kanban](http://en.wikipedia.org/wiki/kanban) or [Lean Software Development](http://en.wikipedia.org/wiki/Lean_software_development) based methodologies will find this facility invaluable.

As outlined above, tags may be negated by prefacing the tag with the tilde (<strong><code>~</code></strong>) symbol. In other words, you can exclude all scenarios that have a particular tag (providing that tag is not elsewhere passed to cucumber as a parameter). For example, the following will only exercise all scenarios found in the directory tree rooted at <code>features/wip</code> that do not have the tag <em><code>@ignore</code></em>:

```
$ cucumber --require=features --tag=~@ignore features/wip
```

A convention that I have adopted is tagging all scenarios created to track down a specific defect with tags of the form <code>@issue\_### where ###</code> is the issue number assigned to the defect. This both handles multiple related scenarios and provides a convenient and self-documenting way to verify with cucumber that a specific defect either has been completely resolved or that a regression has occurred.

Be aware that tags are heritable within Feature files. Scenarios inherit tags from the Feature statement.

### What Way do I Run the Tests?

Unless you are knowledgeable enough that you can use [mocks and stubs](http://martinfowler.com/articles/mocksArentStubs.html) with flair then I consider it best to begin with creating a Rails migration file for the models you are testing (or expressing features for) followed by:

```
<code>rake db:migrate
rake db:test:prepare
</code>
```

As this is opinionated software my opinion is that, except for the most trivial of cases, you should always use test data obtained from actual production environments. You are, after all, embarked on a real-world adventure; namely to discover how to make something work. However, to discover what actually works requires more than a passing familiarity with what is real. And made-up data is not reality. Since your manufactured data necessarily originates in the same place as most of your errors will come from, your own limited understanding of the problem domain, it is always suspect.

That said, there remains an important environmental consideration to keep in mind when using an actual database for testing: Cucumber, by default, uses database transactions and these transactions are rolled back after each scenario. This makes out-of-process testing problematic (for that see the Cucumber [Aruba](http://github.com/cucumber/aruba) project) and may result in some unanticipated outcomes under certain scenarios. Transactions can be turned off, but then your features become responsible for ensuring that the database is in a condition suitable for testing. Cucumber provides hooks to accomplish this and the gem [Database-Cleaner](http://github.com/bmabey/database_cleaner) is configured in <code>support/env.rb</code> to assist ( <em>you have read <code>env.rb</code>, right?</em> ). In the normal case the end of any scenario results in the database being returned to a <code>nil</code> state.

Cucumber can be run in several ways. Be aware that <code>rake cucumber</code>, <code>cucumber features</code>, and <code>autotest</code> with <code>ENV AUTOFEATURE=true</code> do not necessarily produce the same results given the same features and step definitions.

Running <code>rake cucumber</code> from the command line provides the simplest, if not the speediest, method to run Cucumber tests. The rake script provided with cucumber performs much of the background magic required to get the test database and requisite libraries properly loaded. In fact, an important habit to acquire is to run cucumber as a <code>rake</code> task immediately after performing a migration. This step ensures that the test database schema is kept in sync with the development database schema. You can achieve the same effect by running <code>rake db:test:prepare</code> before your first cucumber run following a migration but developing the habit of just running <code>rake cucumber</code> or <code>rake cucumber:wip</code> is probably the better course.

As discussed above, the Cucumber Rake task recognises the <code>`wip</code> tag, so <code>rake cucumber:wip</code> will run only those scenarios tagged with <strong>`wip</strong>.

For example, given a feature file containing:

```
<code>
Feature: .  .  .

  Scenario: A

  @wip
  Scenario: B

  Scenario: C
</code>
```

Then running the command <code>rake cucumber:wip</code> will run the steps contained inside Scenario B only, while running <code>rake cucumber:ok</code> will run the steps within all Scenarios other than B.

Cucumber-Rails creates a <code>cucumber.yml</code> file in the project config directory containing a number of predefined profiles, one of which is the default profile. When Cucumber is run from the command line it is usually necessary to provide both the directory name containing the root directory of the tree containing feature files and the directory name containing references to the necessary library files. In the typical project <code>cucumber -r features features/some/path</code> will suffice. Repetitious usages can be added to user-defined profiles contained in the project's <code>cucumber.yml</code> file.

Finally, running <code>autotest</code> with the environment variable <code>AUTOFEATURE=true</code> will run ALL tests, including those in <code>/test</code> and (if present) <code>/rspec</code>. As this will load all the TestUnit and RSpec fixtures as well, your test database may be left in an indefinite state when the Cucumber features are run. It is wise, as always, to write Cucumber steps either so that they do not depend upon an empty database or they place the database in the requisite state.

### Customising the Cucumber Environment

I advise against putting local Cucumber customisation code in <code>support/env.rb</code> itself as that file is typically overwritten by <code>script/generate cucumber:install | rails g cucumber</code>. Regardless, there are some customisations that must be loaded before the rest of Cucumber initialises and these must be placed at the beginning of the <code>env.rb file</code>. Every file ending in <code>.rb</code> that is found in features/support is loaded by Cucumber. Therefore you may place local customisations in any so-named file in that directory and they will get loaded. However, be advised that Cucumber's <code>--dry-run</code> option only excludes files in <code>features/support</code> that match the regexp <code>/env\\..\*/</code> (<em>note that the trailing dot is significant</em>). So a file with local customisations called <code>my_locals.rb</code> will be loaded regardless.

If you do put custom files inside <code>features/support</code> that you do not wish loaded when you do a dry-run with Cucumber then those files must be prefaced with the string <code>env.</code>. For example <code>features/support/env.local.rb</code> will not be loaded when <code>cucumber --dry-run</code> is run but that <code>features/support/local_env.rb</code> will be. That might result in some very obscure errors if <code>features/support/local_env.rb</code>contains code dependent upon elements found in <code>env.rb</code>.

As a matter of good practice you should always run <code>script/generate cucumber | rails g cucumber:install</code> whenever you install an updated version of cucumber or cucumber-rails. However, this overwrites <code>features/support/env.rb</code>. And, unfortunately, there are some configuration options that simply <strong>must</strong> go into env.rb to have their desired effect as <code>env.rb</code> is always loaded by Cucumber first. So, check in your <code>env.rb</code> along with the rest of your version controlled files and be prepared to diff and merge changes to <code>env.rb</code> between versions of Cucumber-Rails.

### Ruby, Rails, Bundler, RVM, and RBenv

Software is frequently designed to run on different environments and new software may need to co-exist with earlier efforts whose dependencies are incompatible with current projects. To deal with this circumstance Ruby has the [Ruby Version Manager](http://rvm.io/) (RVM) and [RBenv](https://github.com/sstephenson/rbenv.git) ( <em>and likely other projects</em> ) that manage multiple separate Ruby vm environments running on a single host. Additionally, recent versions of Ruby on Rails ship with a dependency on [Bundler](http://gembundler.com/), a utility gem that manages project specific RubyGem dependencies such that each Rails project is unaffected by the gem requirements of another. All these tools are covered elsewhere but you should be aware of them from the outset of any new project.

The only consideration relating to these I will mention here is that if you use Bundler to support multiple gem versions in multiple Rails projects on a single development host then you must run Cucumber (*and rake, and any other library binary*) using the preface <code>bundle exec</code>. For example: <code>bundle exec cucumber -pnone features</code>.

For my convenience I define the following aliases in my user profile run commans file (~/.bashrc):

bc.

1. Ruby on Rails bundle exec shortcuts
   alias brake='bundle exec rake'
   alias bcuke='bundle exec cucumber'
   alias bexec='bundle exec

### Anything Else?

The terminology for elements of Behaviour Driven Development differs somewhat from that employed by Test Driven Development. This article, because of the introductory nature of its contents, tends to blur the semantic distinction between these two divergent philosophies.

Cucumber is still evolving, although the pace has slowed (<em>thankfully</em>). Originally, Cucumber was written for Ruby on Rails; but, as discussed above, this has long since ceased to be true. Besides Cucumber-Rails Cucumber now has another supplementary library, [Aruba](https://github.com/cucumber/aruba), which permits testing of Command Line Interface processes and shell scripts written in any language. This article is revised to Cucumber version 1.3.19 and Cucumber-Rails version 1.4.2 but it does not cover many of the ever expanding attributes of Cucumber and only mentions the JVM version, Cuke4Duke, here.

Because of this consideration it is not be wise to use any of the examples from this article as a recipe. Nevertheless, the essentials of this article remain applicable throughout all recent versions of Cucumber and Cucumber-Rails even where the implementation details may have changed since this review.

Cucumber supports tables in feature files. These are roughly analogous to [Framework for Integrated Test](http://fit.c2.com/) (FIT) tables. You can use these when you are specifying behaviour that changes at some data threshold or as a substitute for data fixtures. I tend to avoid using tables in feature files altogether and use them sparingly in step definition files. I do not have any explicit reason for this avoidance but, tables and feature statements just do not seem to go together in my head. Cucumber also provides for scenario outlines using an Example block to cut down on repetitive scenarios. You should also research the use of [transforms](http://www.engineyard.com/blog/2009/cucumber-step-argument-transforms/) in Cucumber.

If you are testing with intent then you should be using something similar to the [debugger gem](http://rubygems.org/gems/debugger/). Projects using Ruby-2.0+ can use the <strong>[ByeBug](https://rubygems.org/gems/byebug/</strong>) gem instead.

If you are working on a project that uses an older version of Ruby then a really neat method to drop into an interactive debugging session <em>inside a Cucumber step definition</em> using debugger's predecessor, ruby-debug, was provided by [Scott Taylor on the rspec mailing list](http://www.ruby-forum.com/topic/175732#769713) ( <em>The technique should still work with debugger but I have not yet tested it</em> ). Just put these statements inside the step definition at the point that you wish to debug: <code>require 'rubygems'; require 'debugger'; debugger</code>. When that code interrupts then type <code>irb</code> and you open an interactive debugging session wherein you can step forwards and backwards inside the code under test to determine exactly where the breakage is happening. Alternatively, you can add <code>require 'rubygems'; require 'debugger';</code> to your <code>support/local_env.rb</code> file (see below) and just put `debugger` wherever you desire it inside any step definition.

Realize that tests/assertions/expectations either “pass” or “fail” (raise an error), and that “fail” is <strong>not</strong> the same as “false”. Anything besides “fail” is a pass. When, in RSpec, <code>something.should_be 0</code> and it is not, then what is returned is an error exception and not a Boolean value. In raw Cucumber (pardon the pun) one writes <code>fail if false</code> and not simply <code>false</code>. A little reflection reveals why this is so, since false might be the expected successful outcome of a test, and thus not an error. However, the distinction between fail and false escaped me, until I tripped over it in an actual test suite (<em>and sadly I continue to do so from time to time</em>).

Sometimes however, we wish to test how our application handles an exception and therefore do not want that exception to be handled by Cucumber. For that situation use the <code>@allow-rescue</code> tag ( <em>and read the contents of <code>env.rb</code></em> )

Recall that Cucumber is an <strong><em>[integration](http://en.wikipedia.org/wiki/Integration_testing</em></strong>) test harness. It is designed to exercise the entire application stack from view down to the database. It is certainly possible to write features and construct step definitions in such a fashion as to conduct unit tests and no great harm will result. However, this is not considered best practice by many and may prove insupportable for very large projects due to the system overhead it causes and the commensurate delay in obtaining test results.

Cucumber-Rails is pre-configured with support for view integration testing using [Capybara](http://github.com/jnicklas/capybara) (<code>script/generate cucumber --capybara</code>). As of v0.5.0 support for [Webrat](http://github.com/brynary/webrat) (script/generate cucumber) was dropped. If you do not know what Capybara or Webrat are or do, and you are doing web application testing, then you should find out more about both. Unless instructed otherwise the Cucumber-Rails install generator will set up the necessary support files for Capybara. After a significant delay in release Webrat supports Rails-3.x as of v0.7.3 but further development to support Rails 4+ now seems unlikely. Since the release of Rails 3.0 Capybara captured sufficient mind-share in the Cucumber community that generator support for Webrat was dropped and Capybara is now the default for Cucumber-Rails.

While Capybara is the preferred testing method for HTML views in cucumber-rails it does not play well with Rails' own built-in <code>MiniTest/Test::Unit</code>. In particular, whenever Capybara is required into a Cucumber World then the <code>response.body</code> method of <code>Rails Test::Unit</code> is removed. This is an annoyance more than anything else but people converting from Webrat need to be aware of it. Capybara depends upon Nokigiri and Nokogiri prefers to use XML rather than CSS tags. This behaviour can be overridden in <code>./features/support/env.rb</code>. (I did mention that you should really read <code>env.rb</code>, did I not?)

Those of you that have used <code>growl</code> or <code>snarl</code> to provide desktop notifiers from autotest are advised that, as of this writing, Cucumber did not hook into the <code>:red</code> <code>:green</code> notifier capability of autotest; so, no pop-ups when a step fails. However, there is a project for adding similar functionality to Cucumber: see [Cucumber_Growler](http://github.com/paolodona/cucumber_growler/tree/master).

<code>autotest</code> is installed via the [ZenTest](http://www.zenspider.com/ZSS/Products/ZenTest/) gem. If you use autotest then take a look at the contents of <code>example_dot_autotest.rb</code> in the ZenTest gem root directory.

### Need Help?

The best place to go for help, that I know of, is the [Google Cucumber Group](http://groups.google.com/group/cukes). Another good place for support is [StackOverflow](http://stackoverflow.com/). On either venue take the time to observe what is acceptable as a question prior to posting one; and do not expect "qualtity-of-service" response times.

If you find a bug in Cucumber, or wish a new feature added, then you should open a ticket at [GitHub](https://github.com/cucumber/cucumber/issues) for it.

### A Note on Ruby Syntax

Cucumber is a Ruby code project at its heart and the syntax used in its user interface reflects that fact. Specifically, as noted above, you must be aware that all defined Ruby methods may be called containing their argument list within parenthesis or not; and all Ruby methods may be called with a following code block delimited by <code>do</code>. . .<code>end</code> or the symbolic equivalent <code>{</code>. . .<code>}</code>.

So, although <code>When /I have a match/i do . . . end</code> in a stepdef file may look like a language implementation it is really a semi-disguised Ruby method call that is functionally the same as <code>When( /I have a match/i ) { . . . }</code>. It might walk like a duck, and quack like a duck, but it is still Ruby.

See this discussion respecting the significance of Ruby's <span style="text-align:left;">[code>yield</code> statement](http://yehudakatz.com/2010/02/07/the-building-blocks-of-ruby/)</span>.

### Note Respecting cucumber-rails v0.5.0. <em>(2011 June 28)</em>

Rails-4+ requires Ruby-1.9.3+ while Cucumber and Cucumber-Rails have both passed their initial 1.0 release point. So this note of 2011 June 28 is now of passing historic interest only. However, if you are maintaining an application implemented with an older version of Rails that still uses Ruby-1.8.7; and you are employing testunit or Capybara; then one or both of the following may need to be added to the <code>support/env.rb</code> file produced by the rails generator:

```
<code># for testunit in Ruby-1.8.7
ENV["RAILS_ENV"] = "test"
if RUBY_VERSION =~ /1.8/
  require 'test/unit/testresult'
  Test::Unit.run = true
end</code>
<code># for capybara
require "capybara"
</code>
```

This requirement may no longer be case in releases of cucumber-rails v0.5.1 and later but I have not checked this against Ruby-1.8.7 as yet ( <em>and <strike>may</strike><strong>will never</strong> get around to it</em> ). As stated above, Rails-4 has dropped support for all versions of MRI Ruby prior to v1.9.3 and Rails-5 requires Ruby-2.2.2*. Do yourself a favour and just use Ruby-2.2.2* wherever possible.

### Revision History

- 2008 November 28 - J. B. Byrne initial
- 2010 January 17 - J. B. Byrne revised to 0.6.1
- 2010 May 28 - J. B. Byrne revised to 0.7.3
- 2010 July 13 - J. B. Byrne revised to 0.8.4
- 2010 October 11 - J. B. Byrne revised to 0.9.0
- 2010 November 06 - J. B. Byrne revised to 0.9.4
- 2011 March 29 - J. B. Byrne revised to 0.10.0
- 2011 May 13 - J. B. Byrne revised to 0.10.2
- 2011 June 28 - J. B. Byrne revised to 1.0.0
- 2012 October 19 - J. B. Byrne partially revised to 1.1.0
- 2012 November 29 - J. B. Byrne revised to 1.1.1
- 2013 February 26 - J. B. Byrne revised to 1.2.1
- 2013 July 10 - J. B. Byrne reviewed with minor corrections.
- 2013 December 16 - J. B. Byrne revised with minor corrections to 1.3.10.
- 2014 February 27 - J. B. Byrne reviewed with updates to embedded URLs and minor additions.
- 2015 February 15 - Zearin edited with minor tweaks to formatting and phrasing.
- 2015 June 05 - J. B. Byrne revised with minor corrections to 1.3.19.
- 2015 July 23 - J. B. Byrne reviewed for 2.0.2.

### Postscript

A caution, Cucumber is meant to facilitate expressing required behaviours. Indirection and excessive adherence to the principle of DRY, particularly in features, is at variance with the intent and defeats the major benefit of the tool. Requirement expression in features should remain as self evident to the non-technical reader and be as self contained as possible. Resist the temptation to <em>program</em> the features themselves using esoteric aspects of the DSL. [Features should remain patent statements of intent](http://mislav.uniqpath.com/2010/09/cuking-it-right/). If you feel the need to "<code>program</code>" a scenario in order to simplify writing a feature then you are likely doing something considerably at odds with the fundamental intent of BDD methodology. In such circumstances mentally step back and reconsider your approach to the problem.

Remind yourself, frequently, that some years hence somebody else is going to have to understand what you write today and that in all likelihood you will not be around to explain it ( <em>assuming that you still could</em> ). Do not be overly clever or needlessly terse either in Feature files or in Step Definition files. Recall that while brevity may the the soul of wit it is certainly the source of much misunderstanding. Save the [coding-fu](https://english.stackexchange.com/questions/3306/what-does-the-suffix-fu-mean) for the the code and leave your tests plain, unadorned, and easy to understand.

Since the original version of this article appeared, Cucumber has undergone repeated revisions and [re-factorings](http://en.wikipedia.org/wiki/Code_refactoring). Among these was the sensible decision to move portions of the implementation specific to particular programming frameworks into their own gems. Consequently, installing Cucumber for a framework now frequently starts with installing the specific framework Cucumber gem, which in turn pulls in the core Cucumber gem as a dependency. Cucumber provides support for a wide range of Ruby VMs such as JRuby, alternative application frameworks such as Sinatra, other programming languages such as Python, test environments such as Capybara, and provides i18n language support for feature and step files. Obtaining some of these features requires the installation of additional gems such as [cucumber-sinatra](http://rubygems.org/gems/cucumber-sinatra).

Readers should always consider that the information contained herein may be out of date and therefore incomplete or erroneous in some respects. However, any such defects will usually be confined to specific implementation details and should not detract greatly from the validity of the overall presentation. Nonetheless please make a note whenever you see code like <code>script/generate blah</code> in the examples and notes below that the Rails generator syntax has changed to <code>rails g blah</code> since RoR v.3.0. Also bear in mind that with post RoR-2 projects <strong><code>bundle exec</code></strong> generally must preface most, if not all, of the command line examples given.

<em>2015-07-22 - Eventually I found this so distracting that I added the following aliases to my ~/.bashrc file:</em>

```
<code># define aliases for Ruby on Rails Bundler exec for Rake and Cucumber
alias bcuke='bundle exec cucumber'
alias be='bundle exec'
alias bexec='bundle exec'
alias brails='bundle exec rails'
alias brake='bundle exec rake'

# and as we are always looking for /%?@*&!gd/ step matchers anyway
alias fragf='find ${RAILS_ROOT:-.}/features -name \*feature | xargs grep -in'
alias fragr='find ${RAILS_ROOT:-.}/features -name \*rb | xargs grep -in'
alias hg='history | grep'
</code>
```

A final word of advice: Get <span style="text-align:left;">[em>The Cucumber Book</em>](http://pragprog.com/book/hwcuc/the-cucumber-book)</span> from the Pragmatic Programmers and <strong><em>read it</em></strong>; carefully.
