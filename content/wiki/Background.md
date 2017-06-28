+++
title = "Background"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Background allows you to add some context to the scenarios in a single feature. A Background is much like a scenario containing a number of steps. The difference is when it is run. The background is run before each of your scenarios but after any of your Before \[\[Hooks\]\].

Example:

\`\`\`gherkin
Feature: Multiple site support
As a Mephisto site owner
I want to host blogs for different people
In order to make gigantic piles of money

Background:
Given a global administrator named "Greg"
And a blog named "Greg's anti-tax rants"
And a customer named "Dr. Bill"
And a blog named "Expensive Therapy" owned by "Dr. Bill"

Scenario: Dr. Bill posts to his own blog
Given I am logged in as Dr. Bill
When I try to post to "Expensive Therapy"
Then I should see "Your article was published."

Scenario: Dr. Bill tries to post to somebody else's blog, and fails
Given I am logged in as Dr. Bill
When I try to post to "Greg's anti-tax rants"
Then I should see "Hey! That's not your blog!"

Scenario: Greg posts to a client's blog
Given I am logged in as Greg
When I try to post to "Expensive Therapy"
Then I should see "Your article was published."
\`\`\`

For a less explicit alternative to background, check out Tagged \[\[Hooks\]\].

Good practices for using Background
-----------------------------------

### Don't use "Background" to set up **complicated state** unless that state is actually something the client needs to know.

For example, if the user and site names don't matter to the client, you should use a high-level step such as "Given that I am logged in as a site owner".

### Keep your "Background" section **short**.

You're expecting the user to actually remember this stuff when reading your scenarios. If the background is more than 4 lines long, can you move some of the irrelevant details into high-level steps? See \[\[Calling Steps from Step Definitions\]\].

### Make your "Background" section **vivid**.

You should use colorful names and try to tell a story, because the human brain can keep track of stories much better than it can keep track of names like "User A", "User B", "Site 1", and so on.

### Keep your scenarios **short**, and don't have too many.

If the background section has scrolled off the screen, you should think about using higher-level steps, or splitting the \*.features file in two.
