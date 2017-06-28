+++
title = "Given When Then (new)"
source = "https://github.com/cucumber/cucumber/wiki/Given-When-Then-(new)/
menu = ["all", "wiki"]
+++

The idea behind Cucumber is to test the behaviour of an application. This usually involves SMART user stories created with the stakeholders. Therefore, they must be non-technical, short and easily rearrangeable. But, they must also be testable. The Given-when-then keywords make sure scenarios are testable while providing great guidance to stakeholders.
## Given
The **Given** keyword is used to set up the starting condition of the scenario. This can be a webpage, a GUI window, a logged in user, some data to be used in the tests etc.

Examples:

`Given I am in the cucumber wiki`

`Given I have the following movies:
|title       |rating|
|Men in Black|PG-13 |`

`Given I am on the Invoice window`
## When
The **When** keyword specifies an action performed by the user in the given starting condition. It can involve following a link, clicking a button etc.

Examples:

`When I follow the "Add Page" link`

`When I press the "Find Movie" button`

`When I fill the quantity with 5`
## Then
The **Then** keyword defines the expected behaviour, i.e. what should happen when those conditions are met and this action is performed.

Examples:

`Then I should be on the "Add Page" page`

`Then I should see the movie titled "Men in Black"`

`Then my total should be updated`

Read More

[Step-Definitions](Step-Definitions)
***
sources:
FOX Armando, PATTERSON, David. _Introducing and Running Cucumber and Capybara_ in Engineering Long-Lasting Software
