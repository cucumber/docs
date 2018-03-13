---
menu:
- junkyard
source: https://github.com/cucumber/cucumber/wiki/Cucumber-Backgrounder/
title: Cucumber Backgrounder
---

> TODO: Blog post intro or some such

# Or: How I Learned to Stop Worrying and ~~Love Testing~~ Start Behaving

## Introduction

Cucumber is a tool that implements a [Behaviour Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development)
[workflow](http://en.wikipedia.org/wiki/Workflow).
This document deals principally with initial set up and first use of the ***Cucumber-Rails*** and
***Cucumber*** [Rubygems](http://en.wikipedia.org/wiki/RubyGems). It takes as its background the Ruby on Rails
[web application framework](http://en.wikipedia.org/wiki/Web_application_framework).
Detailed discussion of [Behaviour Driven Development (BDD)](http://en.wikipedia.org/wiki/Behavior_driven_development) and
[Test Driven Development (TDD)](http://en.wikipedia.org/wiki/Test-driven_development) can be found elsewhere.

You will find some familiarity with the Ruby language helpful and of the Rails framework somewhat less so.
This article is aimed at the near novice and is somewhat long in consequence.
If you are familiar with BDD/TDD concepts or are an experienced Rubist you will find some of the contents so obvious as to question its utility.
Others, particularly those new to Ruby, may not have your advantages and it is for these readers that this material is provided.

Details regarding installing the Cucumber Rubygem and it's recommended support tools for Rails are found under the heading [Ruby on Rails](/tools/#ruby-on-rails).
To experiment with Cucumber and Cucumber-Rails, we recommend that you create a new Rails project and use the default SQLite3 database.
The official guide to [Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html) is a useful introduction to Rails.

Note that in this document we often use the terms *testing* and *test* where [BDD practitioners](http://dannorth.net/introducing-bdd) prefer the terms *behaviour* and *expectation*.
When we use the word test in a BDD context, we am in fact discussing expressing and verifying expected behaviour.

## Getting started with Cucumber in Ruby on Rails

Make sure that you have the [cucumber-rails](https://github.com/cucumber/cucumber-rails) installed properly into your Rails project.

Let's get started with the logical arrangement of Cucumber files within the context of an Rails project. The root level of the archetypal Rails-4.0 project directory tree looks like this:

```
MyProject
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
```

With Rails-3 and later, running `rails generate cucumber:install` adds this layout to the existing structure:

```
features
├── step_definitions
└── support
    └── env.rb
```

If you are not using Rails and Cucumber-Rails in your project, then you can accomplish much the same thing by creating the directory tree from the command line (`mkdir -p features/step_definitions`) and adding the support directory (`mkdir -p features/support`).

Once the `features/` directory structure is in place, you're ready to begin testing with Cucumber.

## Creating your tests

Cucumber divides testing into two parts:

1. The business-facing feature files, which contain scenarios, and
2. the code-facing step definitions.

`Scenarios` are descriptions of desired outcomes (`Then`) following upon specific events (`When`) under predefined conditions (`Given`).
They are typically used in conjunction with end-user input and, in some cases, may be entirely under end-user (in the form of a domain expert) control. Feature files are given the extension `.feature`.

[Step Definitions](/cucumber/#step-definitions), or *stepdefs*, are keyed by their snippets of text from the Scenario's statements, and invoke blocks of code that usually contain methods and assertion statements from your assertion library.

The Cucumber-Rails will detect whether the RSpec gems are installed. If so, then the rails generator builds the environment files to suit. If not, it ignores RSpec and configures for test-unit instead.

To see what is available in the version of Cucumber-Rails that you have installed use the command: `rails g cucumber:install --help` or `script/generate cucumber --help`.

A particular source of potential confusion is that the term **step**, when used loosely, has two (closely related but vitally distinct) meanings, depending on context.

Inside `*.feature` files, steps are the textual descriptions which form the body of a scenario. These are prefaced with the keywords `Given`, `When`, `Then`, `And`, or `But`. Alternatively, you can use `*` character to stand in place of any of these keywords.

```
Scenario: Cucumber should be installed and configured
Given I have installed the gem named "rails"
    * I have installed the gem named "cucumber-rails"
    * I have generated a Rails project named "my_project"
. . .
```

Inside a `step_definitions.rb` file, refer to the *matcher* methods, translate each step from your scenario to the corresponding actions in your programming language.

You can have all of your step definitions in one file, or in multiple files. Over time, it will be easiest to split them into meaningful groups in different files.

**It is considered an anti-pattern to relate `step_definition` files to specific feature files!**

As always, there are exceptions and contrary opinions to the “standard” or “orthodox” practice. Nonetheless, it is probably best to start out following the recommendation against feature-specific step definition files. Thereafter, you may depart from it, but only when you are experienced enough to evaluate the trade-offs between approaches.

Be aware that, regardless of the directory structure employed, Cucumber effectively flattens the `features/` directory tree when running tests. By this I mean that anything ending in `.rb` under the start point for a Cucumber Feature run (the default case) or specified with the `-r` option is searched for Feature matches.

Thus, a Step contained in `features/models/entities/step_definitions/anything.rb` can be used in a Feature file contained in `features/views/entity_new`, provided that:

- Cucumber is invoked on a root directory common to both (`./features`, in this case); OR
- explicitly required on the command line (e.g., `$ cucumber -r ./features features/views/entity_new`).

**Remember:** Step Definition files can be called anything, so long as they end in `.rb`.  Cucumber will treat anything ending in `.rb` under the root library directory as a Step Definition file.

Note that if the `-r` option is passed, then **ONLY** that directory tree will be searched for Step Definition matches. You may specify the `-r` option multiple times if you need to include Step Definitions from directories that do not share a convenient root.

## How do I Write Tests?

Constructing ones first tests (or `Scenario`) is often accompanied by what can only be described as *[writer's block](http://en.wikipedia.org/wiki/Writer%27s_block)*. The question of "Where to begin?" seems to be a particular roadblock for some.

If you truly have no idea where to start, I suggest that you consider what you are writing, presumably a web application, and what the initial point of contact between it and a user is, the home page. You can do worse than simply starting with:

```
Feature: An application to do whatever
  In order to generate revenue
  The users
  Should be able to visit our web site

Scenario: The application has a home page
  Given I do have a web application
  When I visit the home page
  Then I should see the home page
```

Once upon a time, the easiest thing to do for the first time tester/behaviourist was to use Cucumber's built-in scaffold generator to create a Feature scaffold for each new Feature desired, and modify the resulting files to suit.

```
script/generate feature Frooble name color description
      exists  features/step_definitions
      create  features/manage_froobles.feature
      create  features/step_definitions/frooble_steps.rb
```

This might have been the *easiest* thing to do, but it was never the *best* thing to do. In my experience, framework-generated scaffolds of all types provide a novice user with nothing more than a comforting illusion of progress with lots of boilerplate code. And all too frequently, the generated code is, for all intents and purposes, worthless (save only as an example of proper syntax—and even then, the syntax is often of dubious quality).

In any case, the whole point of BDD is that it is vitally important to write each test Feature/Scenario ***one Step Definition at a time, preferably with a domain expert, and in plain language***. In the BDD world, there is no point to Feature scaffolding generators to begin with. This fact eventually led to the Feature generator's removal from `cucumber-rails`. Now, like Step Definitions, you have to write your own code (*or steal somebody else's*) from the outset.

[The use of plain language in the Feature file is crucial to successful use of Cucumber](http://elabs.se/blog/15-you-re-cuking-it-wrong). What does “plain language” mean? Basically, it comes down to stating the result that you wish to obtain while avoiding specifying *how* you expect to get it. Detailed discussion of Feature writing and Step construction are provided elsewhere (see [Gherkin](/gherkin/) and [Telling a Good Story](http://blog.josephwilk.net/ruby/telling-a-good-story-rspec-stories-from-the-trenches.html)).

For example, for an authentication Scenario, you should write:

```
When "Bob" logs in
```

And NEVER, EVER write:

```
  Given I visit "/login"
  When I enter "Bob" in the "user name" field
    And I enter "tester" in the "password" field
    And I press the "login" button
  Then I should see the "welcome" page
```

What is important about the difference in styles?

The first example, **When "Bob" logs in**, is a *functional requirement*. The second, much longer, example is a *procedural reference*.

Functional requirements are features, but procedures belong in the implementation details. Ironically, given the propensity to use the word **should** in BDD/TDD, the real **[Plain English](http://www.plainlanguage.gov/whatisPL/definitions/Kimble.cfm)** folks advocate the use of “must” in place of “should” or “shall”.

In Feature files, what you and your client should focus on is that which has to happen, not *how* you expect it to happen. That way, when somebody later decides that challenge and response authentication schemes are passé, you need only change the authentication process Steps behind the scenes. Your outward facing Feature files—the ones your clients see—need not change at all. In fact, a good question to ask yourself when writing a Feature clause is: “Will this wording need to change if the implementation does?”.

If the answer is “Yes”, then the clause is poorly written, and you should rework it avoiding implementation specific details. As a side benefit, in consequence your Scenarios will be a lot shorter and much easier to follow and understand.

After each new statement is added to a Scenario, you should immediately create the corresponding Step Definition method. This is where the implementation details are put because, in the normal course of events, your users will never see them. Once your new Step Definition is written, then you must prove to yourself that it fails by running it against the, as yet, non-existent application code. Then (and *only* then) should you write the least application code that gets your test/Step Definition to pass.

Now that you have a passing Step, without changing the Step Definition's logic, change the test criteria within it to something that cannot be, and prove to yourself that it fails again! Once you have assured yourself that your test is passing for the right reason, reset the criteria so that the test passes again. Once this cycle is complete, move on to the next Feature clause.

For example:

```
Scenario: Users can enter an invoice item
   .  .  .
   Then I enter a product quantity of 5
```

Now, immediately go to your Step Definition file and do this:

```
When /enter a product quantity of (\d+)/ do |quantity|
  pending "TODO: Do we need to have a product code passed as well?"
end
```

Think about how you are going to express this behaviour in your application and how you can detect that it occurs. Go back and rework your Feature and Step until you are satisfied that it will indeed produce some testable result **and** that the test fails.

Now, go write the code to implement this requirement in your application.

## When do I Write Tests?

It is tempting, sometimes irresistibly so, to skip ahead to the analysis stage alone, and complete as many Features, Scenarios, and Steps as one can imagine. In some cases, limited access to domain experts and end users may require that many Features have their Scenario details completed long before coding the associated Step Definitions is undertaken. When this is avoidable it should be, and when it is not avoidable then every effort should be made to avoid it nonetheless. In the long run, the best results are achieved when you write Steps and Step Definitions incrementally, using the absolute minimum of code to express the requirement. Immediately implement the new Step requirement in the application using the absolute minimum code that will satisfy it.

You should, in fact, treat this part somewhat as a game. The application code that you write should literally be the minimum that will satisfy the requirement (particularly if this code is totally unsuited for production use). This way, you are forced to add additional Scenarios to drive out exactly what is acceptable. This pressure forces application code to evolve strictly to meet those requirements.

This might seem like a foolish waste of time at first, but if you pre-empt the design process by writing more sophisticated code than is called for, then you will inevitably fail to provide Scenario coverage for some of that code. You will also write code that will never *ever* be used. This *will* happen and it *will* bite you at some point. Keep the *[YAGNI](http://en.wikipedia.org/wiki/You_ain%27t_gonna_need_it)* principle in mind at all times.

This is a hard discipline to accept, but the value with this approach is that you will rarely (*never*) have untested code anywhere in your application. More importantly, if you rigorously adhere to this methodology, then your application will contain the minimal code that satisfies required features. This is an often overlooked or undervalued consideration that contributes greatly to the efficiency of coding, to the robustness of the resulting code, and to the performance of the the resulting program. Avoiding diversions into coding adventures that are technically interesting but financially pointless concentrates your limited resources on the tasks that count and measurably reduces the overall complexity of the project. Whenever you find yourself led down this garden path to the creeping *[featuritis](http://en.wikipedia.org/wiki/Feature_creep)* plant ask: ***If the user did not ask for it then exactly why are we writing it?***

Strictly following this approach permits you to face significant design changes (*and gem updates*) with complete equanimity. Having built your code to reproducible performance measurements you may rest secure in the knowledge that if unanticipated changes anywhere in your project break anything then you will know of this immediately upon running your test suite (*Which is always running, right? Right??*). More importantly, you will know exactly what is broken and where it is broken.

As is the case with most professions, the real value that a skilled programmer provides lies not so much in knowing how to do something as in knowing when and where it must be done. The real challenge with maintaining code is simply discovering which piece of code to change. Finding the exact spots in an application that need attention is usually the biggest maintenance problem. By strictly coding to Features backed by suitable Step Definitions you can simplify that task almost to the point of triviality.

If it happens that, on occasion, you do anticipate Steps (*and we all do this on occasion no matter how much we try to avoid it*), then omitting any matcher for them in the Step Definition files causes those Steps to be reported as missing by Cucumber.

Not only does Cucumber report them, it also helpfully provides a suggested Step matcher and argument to implement. If you end up writing stub Step matchers prior to full implementation, then you have an explicit ***pending*** method available to designate defined but pending/unspecified/stub Step Definitions.

The `pending` method provides for specifying an optional message. Step Definitions containing the `pending` method will display as defined but pending in your Cucumber runs, and will print any message that you provided it.

```
  Given /this step is not implemented yet/ do
    pending "your message goes here"
  end
```

By the way: never, ever, write a Step Definition for a clause that is not already present in one of your Features. Do not anticipate where your Features will lead you. Most speculative Step Definitions end up as unused [cruft](http://en.wikipedia.org/wiki/Cruft) that somebody (*probably you*) will, eventually, end up discarding anyway. And any of the few that are not simply discarded will likely need significant rework when they are finally employed. It is best to wait until the need for each Step Definition is both evident and pressing.

Before writing any line of code, whether it be Feature, Step, or application, think carefully about what you are actually trying to accomplish and keep in mind this statement by Dave Thomas of *The Pragmatic Programmer* fame.

> When faced with two or more alternatives that deliver roughly the same value, take the path that makes future change easier.

## What are Features and Scenarios?

A <dfn>Feature</dfn> can be conceptualized as an indivisible unit of functionality embedded in the project to which it belongs. For example, an authentication challenge and response user interface is usually considered a feature while an entire authentication system necessarily comprises many features. A single ***Feature*** is typically contained in its own file (ending in `.feature`). Each Feature is usually elaborated though multiple ***Scenarios***.

A <dfn>Scenario</dfn> is a block of statements inside a Feature file that describe some behaviour desired or deprecated in the Feature to which it belongs. A Scenario might check that the login interface provides input fields for the requisite responses, that failures are logged or otherwise reported, that user ids are locked out after a given number of failed attempts, and so forth. Each Scenario exercises the implementation code to prove that for each anticipated condition the expected behaviour is indeed produced. Recall that Scenarios specify **What** and should avoid answering the question: **How**?

Each Scenario consists of three classes of statements, **Given**, **When** and **Then** which effectively divide each Scenario into three stages. Each stage of a Scenario consists of one or more statements that are used to match to test Step Definitions. The conventional arrangement is:

```
Feature: Some terse yet descriptive text of what is desired
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
```

For Cucumber Features, the keywords used here are **Feature**, **Scenario**, **Given**, **When**, **Then**, and **And**. Feature is used to provide identification of the test group when results are reported.

To date ( <time datetime="2015-06-03">2015 Jun 05</time> ) the `Feature` statement and its descriptive text block are not parsed by Cucumber other than as an identifier and documentation. Nonetheless, the `Feature` statement arguably contains the most important piece of information contained in a Feature file. It is here that you answer the question of just why this work is being done. And if you do not have a very good, defensible, reason that can be elucidated in a few sentences then you probably should not be expending any effort on this Feature at all. First and foremost, **BDD** absolutely **must** have some concrete business value whose realization can be measured before you write a single line of code. See [Pop the 'Why?' Stack](http://www.mattblodgett.com/2009/01/pop-stack.html).

As with `Feature`, `Scenario` is used only for identification when reporting failures and to document a piece of the work. The clauses (*Steps*) that make up a Scenario each begin with one of: Given, When, Then, And and But (and sometimes **\***). These are all [Gherkin](/gherkin/) keywords / Cucumber methods that take as their argument the string that follows. They are the Steps that Cucumber will report as passing, failing or pending based on the results of the corresponding Step matchers in the `step_definitions.rb` files. The five keywords (and **\***) are all equivalent to one another and completely interchangeable.

## What are Step Definitions?

The string following the keyword in the Feature file is compared against all the matchers contained in all of the loaded `step_definitions.rb` files. A Step Definition looks much like this:

```
Given /there are (\d+) froobles/ do |n|
  Frooble.transaction do
    Frooble.destroy_all
    n.to_i.times do |n|
      Frooble.create! :name => "Frooble #{n}"
    end
  end
end
```

The significant things here are that the method (`Given`) takes as its argument a [`regexp`](http://en.wikipedia.org/wiki/Regexp) bounded by `/` ( *although a quoted "simple string" can be used instead* ), and that the matcher method is followed by a block.

In other words, written differently in Ruby this matcher method could look like this:

```
Given( /there are (\d+) froobles/ ) { |n|
.  .  .
}
```

Among other things, this means that the Step Definition blocks receive all of the matcher arguments as string values. Thus, `n.to_i.times` and not simply `n.times` ( *but also look into Cucumber transforms* ). It also means that Step matchers themselves can be followed by the special regexp modifiers, like **`i`** if you want to avoid issues involving capitalization.

In the Feature example provided above, we had the Scenario statement: `And some other action`. This could be matched by any of the following Step Definition matchers if present in any `step_definitions.rb` file found under the Features root directory.

```
Given /some other action/ do
Then "some other action" do
When /some other Action/i do
When /some other (Action)/i do |action|
Then /(\w+) other action/i do |prefix_phrase|
Given /(\w+) other (\w+)/i do |first_word,second_word|
But /(\w+) Other (.*)/i do |first_word,second_phrase|
And /(.*) other (.*)/i do |first_phrase,second_phrase|
```

The Step Sefinition match depends only upon the pattern given as the argument passed to the Given/When/Then method and not upon the step method name itself. I have therefore adopted the practice of only using `When /I have a match/ do` in my step definitions files as **When** has a more natural appearance, to me, for a matcher. Others find that the word "Given" has a more natural language feel in this context.

If Cucumber finds more than one matcher in all of the Step Definitions files matches a Step, then it complains that it has found multiple Step Definition matches for that Step and forces you to distinguish them. You can instruct Cucumber to just choose one of the candidates instead by passing it the `--guess` option on the command line.

It is considered better form by some to surround with double quotation marks, **`" "`**, all of the elements in the Step clauses that are meant to be taken as values for variables passed to the Step Definition. This is just a convention. However, if you choose to follow this road then you must adjust your Step Definition matchers accordingly if the `"` characters are now considered part of the literal matcher string.

For example, consider this Step:

```
Given some determinable "business" situation
```

And this Step Definition:

```
When /determinable "(.*)" situation/ do |s|
```

Finally, you can have Step Definitions call other Step Definitions, including those contained in other Step Definition files. This is one ( *but not the recommended* ) means by which you can specify the procedural details by combining other steps.

For example:

```
When /some "(.*)" action/  do |act|
   .  .  .
end

When /in an invoiced non-shipped situation/ do
  step( "some \"invoiced\" action" )
  step( "some \"non-shipped\" action" )
  .  .  .
end
```

## Steps within Steps: An anti-pattern

If one Step Definition calls another Step Definition, then the matcher argument to the called **Given/When/Then** method must be enclosed with string delimiters.

Because of this, if you have adopted the practice of demarcating parameter values present in Steps with double quotation marks, you must escape these quotes when calling another `definition_steps.rb` matcher from inside a `step_definitions.rb` file.

You must take care not to include the quote marks in the `step_definitions` parameter matchers, because `"(.**)"` is not the same as `(.**)` or `(".\*")`. If you use quote-delimited values in the `.feature` Steps and do not account for them in the corresponding `step_definition.rb` matcher regexp, then you will obtain variables that contain leading and trailing quotes as part of their value.

```
Scenario: Quotes surround value elements
  Given some "required" action

# step_definitions
When /some (.*) action/ do |a|
  a => "required"

When /some "(.*)" action/ do |a|
  a => required
```

Once upon a time, one could simply nest **Given**, **When**, and **Then** matchers within Step Definitions and thereby directly call Dteps from within other Steps.

This created increased coupling between `step_definition` files, which was frowned upon, and finally removed (well, *strongly* deprecated).

If you use nested steps, then you must now call them using the **`step`** method. You may still encounter the following forms in Step Definition files created before this change:

```
When /my matcher named (.*)/ do |match|
  Then "my other matcher named \"#{match}\""
end

When /my matcher named (.*)/ do |match|
  When %Q(my other matcher named "#{match}")
end
```

When encountered, these nested **Then** and **When** matcher statements should be replaced with the `step` method:

```
When /my matcher named (.*)/ do |match|
  step( "my other matcher named \"#{match}\"" )
end

When /my matcher named (.*)/ do |match|
  step %Q(my other matcher named "#{match}")
end
```

Using the `%Q` method (usually shortened to just **`%`**) within the Step Definition method removes the necessity to escape (`\\`) any embedded quotation characters (`"`). Multiple Step Definitions may be called *en bloc* using the **`steps`** method (*note the plural form*), which itself takes a string argument.

However, with the `steps` method, the Gherkin keywords deprecated in simple nested steps are still required:

```
When /my matcher named (.*)/ do |match|
  steps %Q{
    Then step my other matcher named "#{match}"
     And the next matcher with value "{match}"
  }
end
```

Always keep in mind that Cucumber is simply a DSL wrapper around the Ruby language whose full expressiveness remains available to you in the Step Definition files (*but not in Feature files*). On the other hand, do not lose sight that every Step called as such in a Step Definition file is first parsed by [Gherkin](/gherkin/) and therefore must conform to the same syntax as used in Feature files.

Returning to our example of "Bob" the user, one could define things in the `step_definitions` file like this:

```
When /"Bob" logs in/ do |user|
  steps( %Q(
    Then I visit "/login"
      And I enter "#{user}" in the "user name" field
      And I enter "#{user}-test-passwd" in the "password" field
      And I press the "login" button
  ) )
```

That is acceptable ( *barely* ) usage in your Step Definitions because your users are never going to see how ugly it looks. Instead, given that the necessary classes and methods exist, "Bob" could, and should, be authenticated without recourse to the user interface thus:

```
When /"Bob" logs in/ do |user|
  @current_user = User.find_by_username!(user) # ! method raises exception on failure
  @current_session = UserSession.create!(@current_user)  # ! method raises exception on failure
  .  .  .
end
```

In fact, this Step Definition should be further refactored into a method. The method can reside in the same `.rb` file as the Step Definition. This both simplifies the step, and encourages the reuse of the resulting method.

This makes your project a lot easier to understand for people who join your project at a later date; which also makes your project easier to maintain.

```
When /"Bob" logs in/ do |user|
  create_new_user_session_for( user )
end

def create_new_user_session_for( user_in )
  # TODO create proper setter and getter methods for instance variables
  @current_user = User.find_by_username!( user_in ) # ! method raises exception on failure
  @current_session = UserSession.create!(@current_user)  # ! method raises exception on failure
  .  .  .
end
```

Of course, when you are testing the login user interface the ugly approach seems unavoidable, but in fact it is not. Providing for the purposes of testing that certain conventions are followed respecting user names and passwords the following works just as well and is much cleaner. Plus you have removed all inter-Step dependencies.

Step:

```
When "Bob" logs on through the logon page
```

Step Definition:

```
When /"([\w[\d\w]+)" logs on through the logon page/ do |user_name|
  visit(logon_path)
  fill_in( "User Name", :with => user_name )
  fill_in( "Password", :with => user_name + "-test-passwd" )
  click_button( "Logon" )
end
```

Having just shown you how to do it now take heed that you do not write **any** Step Definitions that call other Step Definitions (*you will do this too, but try hard not to*).

At times, this will seem like the quickest solution to a troublesome bit of environment building. However, for anything beyond trivial use, it is always better to implement a custom method using the **API** provided by Cucumber ( *or by any other libraries you have installed* ), and then call that method directly from your Step Definition. You can either keep these custom methods in the same file as Steps Definitions, or stick them in any convenient file ending in `.rb` that is located in the `support/` directory ( *well, anywhere that Cucumber can find it, really* ), in which case you must enclose your methods within the following block:

```
Cucumber::Rails::World.class_eval do
  def your_method(parm)
    .  .  .
  end
end
```

A cleaner way of doing this that avoids using the evil ***`eval`*** method is to create a class that contains only your add-on methods, and then instantiate it inside the Cucumber World. Something like this:

```
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
```

My rule of thumb is that if a Step Definition is called from another Step Definition, then its contents probably should be extracted out into a custom method.

For example, a logon Step Definition is likely to be used repeatedly throughout many Features. Turning it into a method is probably called for.

```
def logon_for_user( uname )
  visit(logon_path)
  fill_in( "User Name", :with => uname )
  fill_in( "Password", :with => uname + "-test-passwd" )
  click_button( "Logon" )
end

When /"([\w[\d\w]+)" logs on through the logon page/ do |user_name|
  logon_for_user( user_name )
end
```

Before you ask: Yes, these *helper* methods can go into the same Step Definitions file that uses them. I put them at the top, above all the matchers. And they can be called from elsewhere in your Step Definitions, so you need not repeat yourself.

## Before, After, and Background

If all your Feature's Scenarios share the same 'set-up' Steps, then Cucumber provides the *Background* section. Steps contained within a Background section are run before each Scenario.

```
Feature: .  .  .
  Background: .  .  .
  Scenario: .  .  .
```

Step Definition files have a corresponding method available in the `before(condition) do . . .` method, which has however a matching `after(condition) do . . .` method as well.

Recall that we are working in Ruby, and therefore the condition which enables the before/after block is anything that besides `false` or `nil` (like a **Tag**, for instance).

Also, be aware that **all** eligible `before` methods are run before any Scenario statements are processed, and that they are run in the order encountered. Likewise, every eligible `after` block will run at the completion of every Scenario, again in the order that it is encountered.

These two methods are powerful tools, but be aware that if you use them excessively then you will hang yourself eventually.

## What is a good Step Definition?

Opinions vary of course, but for me a ***good*** Step Definition has the following attributes:

- The matcher is short.
- The matcher handles both positive and negative (true and false) conditions.
- The matcher has at most two value parameters
- The parameter variables are clearly named
- The body is less than ten lines of code
- The body does not call other Steps

My template for a Step Definition presently looks like this:

```
# statement identifier expectation "value"
# statement identifier not expectation "value"
When /statement identifier( not)? expectation "([^\"]+)"/i do |boolean, value|
  actual = expectation( value )
  expected = !boolean           # this works because in ruby nil == false and !nil == true
  message = "expectation failed for #{value}"
  assert( actual == expected, message )
end
```

For example ( admittedly contrived ):

```
When /product ([^\"]+) should( not)? belong to category ([^\"]+)/i do |product, boolean, category|
  actual = ( Product.find_by_stock_number!( product )category ) == category
  expected = !boolean
  message = "Product '#{product}' should#{boolean} belong to category '#{category}'"
  assert( actual == expected, message )
end
```

Hunting through multiple files and directories for a multi-purpose Step-Definition matcher is considerably more tedious than looking for an invariant string of text. Therefore I recommend that you preface such Steps with comments that cover the expected usage. For example:

```
# product should belong to category
# product should not belong to category
When /product ([^\"]+) should( not)? belong to category ([^\"]+)/i do |product, boolean, category|
. . .
```

Which can be conveniently `grep`*ed* for ( *on \*nix systems at least* ) using:
`find features -name \\**rb | xargs grep "product .** should belong to category"`

## What are "Tags"?

Cucumber provides a simple method to organize Features and Scenarios by user determined classifications. This is implemented using the convention that any space delimited string found in a Feature file that is prefaced with the commercial at (**`@`**) symbol is considered a Tag.  As distributed, Cucumber-Rails builds a Rake task that recognizes the *`@wip`* Tag. However, any string may be used as a Tag and any Scenario or entire Feature can have multiple Tags associated with it. For example:

```
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
```

Given that the forgoing is contained in a file called `features/login/login.feature` and that the `cucumber-rails` gem is installed and configured then you can exercise this Scenario, along with any others that are similarly tagged, in any of the following ways:

> *Note: You will probably need to preface command line instructions with*:
> `bundle exec`

```
$ rake cucumber:wip
$ cucumber --profile=my_profile --tags=@wip features
$ cucumber --profile=my_profile --tags=@authent features/login
$ cucumber --profile=my_profile --tags=@init
```

However, the following will not work, unless you [build a custom rake task](/tools/#rake) for it:

```
$ rake cucumber:authent
```

There is an obscure *gotcha* with this particular combination of Tags. The default profile contained in the distributed `config/cucumber.yml` contains these lines:

```
<%
.  .  .
std_opts = "--format #{ENV['CUCUMBER_FORMAT'] || 'progress'} --strict --tags ~@wip"
%>
default: <%= std_opts %> features
.  .  .
```

Note the trailing option `--tags ~@wip`.  Cucumber provides for negating Tags by prefacing the `--tags` argument with a tilde character (**`~`**).  This tells Cucumber to not process Features and Scenarios so tagged. If you do not specify a different profile (`cucumber -p profilename`), then the default profile will be used.  If the default profile is used, then the `--tags ~@wip` will cause Cucumber to skip any Scenario that is so tagged. This will override the `--tags=@authen` option passed in the command line, and so you will see this:

```
$ cucumber --tags=@authent
Using the default profile...

0 scenarios
0 steps
0m0.000s
```

Since version 0.6.0, one can no longer overcome this default setting by adding the `--tags=@wip` to the Cucumber argument list on the command line, because now all `--tags` options are ANDed together.  Thus the combination of `--tags @wip` **AND** `--tags ~@wip` fails everywhere.

You either must create a special profile in `config/cucumber.yml` to deal with this, or alter the default profile to suit your needs.

The `@wip` tags are a special case. If any Scenario tagged as `@wip` passes all of its Steps without error, and the `--wip` option is also passed, Cucumber reports the run as failing (because Scenarios that are marked as a work in progress are not *supposed* to pass!)

Note as well that the `--strict` and `--wip` options are mutually exclusive.

The number of occurrences of a particular Tag in your Features may be controlled by appending a colon followed by a number to the end of the tag name passed to the `--tags` option, like so:

```
$ cucumber --tags=@wip:3 features/log\*
```

The existence of more than the specified number of occurrences of that Tag in all the Features that are exercised during a particular Cucumber run will produce a warning message. If the `--strict` option is passed as well, as is the case with the default profile, then instead of a warning the run will fail.

Limiting the number of occurrences is commonly used in conjunction with the `@wip` Tag to restrict the number of unspecified Scenarios to manageable levels. Those following [Kanban](http://en.wikipedia.org/wiki/kanban) or [Lean Software Development](http://en.wikipedia.org/wiki/Lean_software_development) based methodologies will find this facility invaluable.

As outlined above, Tags may be negated by prefacing the Tag with the tilde (**`~`**) symbol. In other words, you can exclude all Scenarios that have a particular Tag (providing the tag is not elsewhere passed to Cucumber as a parameter). For example, the following will only exercise all Scenarios found in the directory tree rooted at `features/wip` that do not have the Tag *`@ignore`*:

```
$ cucumber --require=features --tag=~@ignore features/wip
```

A convention that I use is to tag all Scenarios created to track down a specific defect with the Tag form `@issue\_###`  (where `###` is the Issue number assigned to the defect). This both handles multiple related Scenarios and provides a convenient and self-documenting way to verify with Cucumber that a specific defect either has been completely resolved or that a regression has occurred.

Be aware that Tags are heritable within Feature files. Scenarios inherit Tags from the Feature statement.

## What Way do I Run the Tests?

Unless you are knowledgeable enough that you can use [mocks and stubs](http://martinfowler.com/articles/mocksArentStubs.html) with flair then I consider it best to begin with creating a Rails migration file for the models you are testing (or expressing Features for) followed by:

```
rake db:migrate
rake db:test:prepare
```

As this is opinionated software my opinion is that, except for the most trivial of cases, you should always use test data obtained from actual production environments. You are, after all, embarked on a real-world adventure; namely to discover how to make something work. However, to discover what actually works requires more than a passing familiarity with what is real. And made-up data is not reality. Since your manufactured data necessarily originates in the same place as most of your errors will come from, your own limited understanding of the problem domain, it is always suspect.

That said, there remains an important environmental consideration to keep in mind when using an actual database for testing: Cucumber, by default, uses database transactions and these transactions are rolled back after each Scenario. This makes out-of-process testing problematic (for that see the Cucumber [Aruba](https://github.com/cucumber/aruba) project) and may result in some unanticipated outcomes under certain Scenarios. Transactions can be turned off, but then your Features become responsible for ensuring that the database is in a condition suitable for testing. Cucumber provides hooks to accomplish this and the gem [Database-Cleaner](https://github.com/bmabey/database_cleaner) is configured in `support/env.rb` to assist ( *you have read `env.rb`, right?* ). In the normal case the end of any Scenario results in the database being returned to a `nil` state.

Cucumber can be run in several ways. Be aware that `rake cucumber`, `cucumber features`, and `autotest` with `ENV AUTOFEATURE=true` do not necessarily produce the same results given the same Features and Step Definitions.

Running `rake cucumber` from the command line provides the simplest, if not the speediest, method to run Cucumber tests. The rake script provided with Cucumber performs much of the background magic required to get the test database and requisite libraries properly loaded. In fact, an important habit to acquire is to run Cucumber as a `rake` task immediately after performing a migration. This Step ensures that the test database schema is kept in sync with the development database schema. You can achieve the same effect by running `rake db:test:prepare` before your first Cucumber run following a migration but developing the habit of just running `rake cucumber` or `rake cucumber:wip` is probably the better course.

As discussed above, the Cucumber Rake task recognises the `@wip` Tag, so `rake cucumber:wip` will run only those Scenarios tagged with **@wip**.

For example, given a Feature file containing:

```
Feature: .  .  .

  Scenario: A

  @wip
  Scenario: B

  Scenario: C
```

Then running the command `rake cucumber:wip` will run the Steps contained inside Scenario B only, while running `rake cucumber:ok` will run the Steps within all Scenarios other than B.

Cucumber-Rails creates a `cucumber.yml` file in the project config directory containing a number of predefined profiles, one of which is the default profile. When Cucumber is run from the command line, it is usually necessary to provide both the directory name containing the root directory of the tree containing Feature files and the directory name containing references to the necessary library files. In the typical project, `cucumber -r features features/some/path` will suffice. Repetitious usages can be added to user-defined profiles contained in the project's `cucumber.yml` file.

Finally, running `autotest` with the environment variable `AUTOFEATURE=true` will run ALL tests, including those in `/test` and (if present) `/rspec`. As this will load all the TestUnit and RSpec fixtures as well, your test database may be left in an indefinite state when the Cucumber Features are run. It is wise, as always, to write Cucumber Steps either so that they do not depend upon an empty database or they place the database in the requisite state.

## Customising the Cucumber Environment

I advise against putting local Cucumber customisation code in `support/env.rb` itself as that file is typically overwritten by `script/generate cucumber:install | rails g cucumber`. Regardless, there are some customisations that must be loaded before the rest of Cucumber initialises and these must be placed at the beginning of the `env.rb file`.

Every file ending in `.rb` that is found in features/support is loaded by Cucumber. Therefore, you may place local customisations in any so-named file in that directory and they will get loaded. However, be advised that Cucumber's `--dry-run` option only excludes files in `features/support` that match the regexp `/env\\..\*/` (*note that the trailing dot is significant*). So a file with local customisations called `my_locals.rb` will be loaded regardless.

If you do put custom files inside `features/support` that you do not wish loaded when you do a dry-run with Cucumber, then those files must be prefaced with the string `env.`. For example, `features/support/env.local.rb` will not be loaded when `cucumber --dry-run` is run, but that `features/support/local_env.rb` will be. That might result in some very obscure errors if `features/support/local_env.rb`contains code dependent upon elements found in `env.rb`.

As a matter of good practice you should always run `script/generate cucumber | rails g cucumber:install` whenever you install an updated version of Cucumber or cucumber-rails. However, this overwrites `features/support/env.rb`. And, unfortunately, there are some configuration options that simply **must** go into `env.rb` to have their desired effect as `env.rb` is always loaded by Cucumber first. So, check in your `env.rb` along with the rest of your version controlled files and be prepared to diff and merge changes to `env.rb` between versions of Cucumber-Rails.

## Ruby, Rails, Bundler, RVM, and RBenv

Software is frequently designed to run on different environments and new software may need to co-exist with earlier efforts whose dependencies are incompatible with current projects. To deal with this circumstance Ruby has the [Ruby Version Manager](http://rvm.io/) (RVM) and [RBenv](https://github.com/sstephenson/rbenv.git) ( *and likely other projects* ) that manage multiple separate Ruby vm environments running on a single host. Additionally, recent versions of Ruby on Rails ship with a dependency on [Bundler](http://gembundler.com/), a utility gem that manages project specific RubyGem dependencies such that each Rails project is unaffected by the gem requirements of another. All these tools are covered elsewhere but you should be aware of them from the outset of any new project.

The only consideration relating to these I will mention here is that if you use Bundler to support multiple gem versions in multiple Rails projects on a single development host then you must run Cucumber (*and rake, and any other library binary*) using the preface `bundle exec`. For example: `bundle exec cucumber -pnone features`.

For my convenience I define the following aliases in my user profile run commands file (`~/.bashrc`):

bc.

1. Ruby on Rails bundle exec shortcuts
   alias brake='bundle exec rake'
   alias bcuke='bundle exec cucumber'
   alias bexec='bundle exec

## Anything Else?

The terminology for elements of Behaviour Driven Development differs somewhat from that employed by Test Driven Development. This article, because of the introductory nature of its contents, tends to blur the semantic distinction between these two divergent philosophies.

Cucumber is still evolving, although the pace has slowed (*thankfully*). Originally, Cucumber was written for Ruby on Rails; but, as discussed above, this has long since ceased to be true. Besides Cucumber-Rails Cucumber now has another supplementary library, [Aruba](https://github.com/cucumber/aruba), which permits testing of Command Line Interface processes and shell scripts written in any language. This article is revised to Cucumber version 1.3.19 and Cucumber-Rails version 1.4.2 but it does not cover many of the ever expanding attributes of Cucumber and only mentions the JVM version, Cuke4Duke, here.

Because of this consideration it is not be wise to use any of the examples from this article as a recipe. Nevertheless, the essentials of this article remain applicable throughout all recent versions of Cucumber and Cucumber-Rails even where the implementation details may have changed since this review.

Cucumber supports tables in Feature files. These are roughly analogous to Framework for Integrated Test](https://en.wikipedia.org/wiki/Framework_for_integrated_test) (FIT) tables. You can use these when you are specifying behaviour that changes at some data threshold or as a substitute for data fixtures. I tend to avoid using tables in Feature files altogether and use them sparingly in Step Definition files. I do not have any explicit reason for this avoidance but, tables and Feature statements just do not seem to go together in my head. Cucumber also provides for Scenario Outlines using an Example block to cut down on repetitive Scenarios. You should also research the use of transforms in Cucumber.

If you are testing with intent then you should be using something similar to the [debugger gem](http://rubygems.org/gems/debugger/). Projects using Ruby-2.0+ can use the **[ByeBug](https://rubygems.org/gems/byebug/)** gem instead.

If you are working on a project that uses an older version of Ruby then a really neat method to drop into an interactive debugging session *inside a Cucumber Step Definition* using debugger's predecessor, ruby-debug, was provided by [Scott Taylor on the rspec mailing list](http://www.ruby-forum.com/topic/175732#769713) ( *The technique should still work with debugger but I have not yet tested it* ). Just put these statements inside the Step Definition at the point that you wish to debug: `require 'rubygems'; require 'debugger'; debugger`. When that code interrupts then type `irb` and you open an interactive debugging session wherein you can step forwards and backwards inside the code under test to determine exactly where the breakage is happening. Alternatively, you can add `require 'rubygems'; require 'debugger';` to your `support/local_env.rb` file (see below) and just put `debugger` wherever you desire it inside any Step Definition.

Realize that tests/assertions/expectations either “pass” or “fail” (raise an error), and that “fail” is **not** the same as `false`. Anything besides “fail” is a pass.

When, in RSpec, `something.should_be 0` and it is not, then what is returned is an error exception, not a Boolean value. In raw Cucumber (pardon the pun) one writes `fail if false` and not simply `false`. A little reflection reveals why this is so, since `false` might be the expected successful outcome of a test, and thus not an error. However, the distinction between fail and `false` escaped me, until I tripped over it in an actual test suite (*and sadly I continue to do so from time to time*).

Sometimes however, we wish to test how our application handles an exception and therefore do not want that exception to be handled by Cucumber. For that situation use the `@allow-rescue` Tag ( *and read the contents of `env.rb`* )

Recall that Cucumber is an ***[integration](http://en.wikipedia.org/wiki/Integration_testing)*** test harness. It is designed to exercise the entire application stack from view down to the database. It is certainly possible to write Features and construct Step Definitions in such a fashion as to conduct unit tests and no great harm will result. However, this is not considered best practice by many and may prove insupportable for very large projects due to the system overhead it causes and the commensurate delay in obtaining test results.

Cucumber-Rails is pre-configured with support for view integration testing using [Capybara](https://github.com/jnicklas/capybara) (`script/generate cucumber --capybara`). As of v0.5.0 support for [Webrat](https://github.com/brynary/webrat) (script/generate cucumber) was dropped. If you do not know what Capybara or Webrat are or do, and you are doing web application testing, then you should find out more about both. Unless instructed otherwise the Cucumber-Rails install generator will set up the necessary support files for Capybara. After a significant delay in release Webrat supports Rails-3.x as of v0.7.3 but further development to support Rails 4+ now seems unlikely. Since the release of Rails 3.0 Capybara captured sufficient mind-share in the Cucumber community that generator support for Webrat was dropped and Capybara is now the default for Cucumber-Rails.

While Capybara is the preferred testing method for HTML views in cucumber-rails it does not play well with Rails' own built-in `MiniTest/Test::Unit`. In particular, whenever Capybara is required into a Cucumber World then the `response.body` method of `Rails Test::Unit` is removed. This is an annoyance more than anything else but people converting from Webrat need to be aware of it. Capybara depends upon Nokigiri and Nokogiri prefers to use XML rather than CSS tags. This behaviour can be overridden in `./features/support/env.rb`. (I did mention that you should really read `env.rb`, did I not?)

Those of you that have used `growl` or `snarl` to provide desktop notifiers from autotest are advised that, as of this writing, Cucumber did not hook into the `:red` `:green` notifier capability of autotest; so, no pop-ups when a Step fails. However, there is a project for adding similar functionality to Cucumber: see [Cucumber_Growler](https://github.com/paolodona/cucumber_growler/tree/master).

`autotest` is installed via the [ZenTest](http://www.zenspider.com/projects/zentest.html) gem. If you use autotest then take a look at the contents of `example_dot_autotest.rb` in the ZenTest gem root directory.

## Need Help?

The best place to go for help, that I know of, is the [Google Cucumber Group](http://groups.google.com/group/cukes). Another good place for support is [StackOverflow](http://stackoverflow.com/). On either venue take the time to observe what is acceptable as a question prior to posting one; and do not expect "qualtity-of-service" response times.

If you find a bug in Cucumber, or wish a new Feature added, then you should open a ticket at [GitHub](https://github.com/cucumber/cucumber/issues) for it.

## A Note on Ruby Syntax

Cucumber is a Ruby code project at its heart and the syntax used in its user interface reflects that fact. Specifically, as noted above, you must be aware that all defined Ruby methods may be called containing their argument list within parenthesis or not; and all Ruby methods may be called with a following code block delimited by `do`. . .`end` or the symbolic equivalent `{`. . .`}`.

So, although `When /I have a match/i do . . . end` in a Step Definition file may look like a language implementation it is really a semi-disguised Ruby method call that is functionally the same as `When( /I have a match/i ) { . . . }`. It might walk like a duck, and quack like a duck, but it is still Ruby.

See this discussion respecting the significance of Ruby's [`yield` statement](http://yehudakatz.com/2010/02/07/the-building-blocks-of-ruby/).

## Note Respecting cucumber-rails v0.5.0. *(2011 June 28)*

Rails-4+ requires Ruby-1.9.3+ while Cucumber and Cucumber-Rails have both passed their initial 1.0 release point. So this note of 2011 June 28 is now of passing historic interest only. However, if you are maintaining an application implemented with an older version of Rails that still uses Ruby-1.8.7; and you are employing testunit or Capybara; then one or both of the following may need to be added to the `support/env.rb` file produced by the rails generator:

```
# for testunit in Ruby-1.8.7
ENV["RAILS_ENV"] = "test"
if RUBY_VERSION =~ /1.8/
  require 'test/unit/testresult'
  Test::Unit.run = true
end
# for capybara
require "capybara"
```

This requirement may no longer be case in releases of cucumber-rails v0.5.1 and later but I have not checked this against Ruby-1.8.7 as yet (and ~~may~~ **will never** get around to it). As stated above, Rails-4 has dropped support for all versions of MRI Ruby prior to v1.9.3 and Rails-5 requires Ruby-2.2.2*. Do yourself a favour and just use Ruby-2.2.2* wherever possible.

## Revision History

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

## Postscript

A caution, Cucumber is meant to facilitate expressing required behaviours.
Indirection and excessive adherence to the principle of DRY, particularly in
Features, is at variance with the intent and defeats the major benefit of the
tool. Requirement expression in Features should remain as self evident to the
non-technical reader and be as self contained as possible. Resist the temptation
to *program* the Features themselves using esoteric aspects of the DSL.

Features should remain patent statements of. If you feel the need to "program"
a Scenario in order to simplify writing a Feature then you are likely doing
something considerably at odds with the fundamental intent of BDD methodology.
In such circumstances mentally step back and reconsider your approach to the
problem.

Remind yourself, frequently, that some years hence somebody else is going to
have to understand what you write today and that in all likelihood you will not
be around to explain it ( *assuming that you still could* ). Do not be overly
clever or needlessly terse either in Feature files or in Step Definition files.
Recall that while brevity may the the soul of wit it is certainly the source of
much misunderstanding. Save the
[coding-fu](https://english.stackexchange.com/questions/3306/what-does-the-suffix-fu-mean)
for the the code and leave your tests plain, unadorned, and easy to understand.

Since the original version of this article appeared, Cucumber has undergone
repeated revisions and
[re-factorings](http://en.wikipedia.org/wiki/Code_refactoring). Among these was
the sensible decision to move portions of the implementation specific to
particular programming frameworks into their own gems. Consequently, installing
Cucumber for a framework now frequently starts with installing the specific
framework Cucumber gem, which in turn pulls in the core Cucumber gem as a
dependency. Cucumber provides support for a wide range of Ruby VMs such as
JRuby, alternative application frameworks such as Sinatra, other programming
languages such as Python, test environments such as Capybara, and provides i18n
language support for Feature and Step Definition. Obtaining some of these features
requires the installation of additional gems such as
[cucumber-sinatra](http://rubygems.org/gems/cucumber-sinatra).

Readers should always consider that the information contained herein may be out of date and therefore incomplete or erroneous in some respects. However, any such defects will usually be confined to specific implementation details and should not detract greatly from the validity of the overall presentation. Nonetheless please make a note whenever you see code like `script/generate blah` in the examples and notes below that the Rails generator syntax has changed to `rails g blah` since Rails v.3.0. Also bear in mind that with post Rails-2 projects **`bundle exec`** generally must preface most, if not all, of the command line examples given.

*2015-07-22 - Eventually I found this so distracting that I added the following aliases to my ~/.bashrc file:*

```
# define aliases for Ruby on Rails Bundler exec for Rake and Cucumber
alias bcuke='bundle exec cucumber'
alias be='bundle exec'
alias bexec='bundle exec'
alias brails='bundle exec rails'
alias brake='bundle exec rake'

# and as we are always looking for /%?@*&!gd/ step matchers anyway
alias fragf='find ${RAILS_ROOT:-.}/features -name \*feature | xargs grep -in'
alias fragr='find ${RAILS_ROOT:-.}/features -name \*rb | xargs grep -in'
alias hg='history | grep'
```

A final word of advice: Get [*The Cucumber Book*](http://pragprog.com/book/hwcuc/the-cucumber-book) from the Pragmatic Programmers and ***read it*** carefully.
