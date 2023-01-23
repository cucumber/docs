---
title: User stories
subtitle: Small increments of value used in planning agile developent work
---

A *User Story* is a small piece of valuable functionality used for planning and prioritising work on an agile team.

A good *User Story* should:

- Deliver a demonstrable piece of functionality
- Have testable acceptance criteria

and be

- **I**ndependent
- **N**egotiable
- **V**aluable
- **E**stimatible
- **S**mall
- **T**estable

## Story Format

A good *User Story* should describe the **Who** (`<actor>`), **What** (`<feature>`) and **Why** (`<benefit>`).

    As an <actor>
    I want a <feature>
    So that <benefit>

Example:

    As an mobile bank customer
    I want to see balance on my accounts
    So that I can make better informed decisions about my spending

## Acceptance Criteria using Cucumber language

Acceptance Criteria are conditions that a (software) product must satisfy to be accepted by a user, customer or other stakeholder.

These are best written using the Cucumber language and [Gherkin syntax](https://cucumber.io/docs/gherkin/).

```gherkin
Feature: Some important feature

  Scenario: Get something
    Given I have something
    When I do something
    Then I get something else

  Scenario: Get something different
    Given I have something
    And I have also some other thing
    When I do something different
    Then I get something different
```

… etc., with more scenarios as required.

Example:

```gherkin
Feature: Some important feature

  Scenario: Do not show balance if not logged in
    Given I am not logged on to the mobile banking app
    When I open the mobile banking app
    Then I can see a login page
    And I do not see account balance

  Scenario: Show balance on the accounts page after logging in
    Given I have just logged on to the mobile banking app
    When I load the accounts page
    Then I can see account balance for each of my accounts
```

## Futher reading

- <https://cucumber.io/docs/gherkin/reference/>
- <https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/>
