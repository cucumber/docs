---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Step-Argument-Transforms/
title: Parameters in Step Definitions
---

> TODO: Ruby specific feature. generalize.

Step argument transforms help your step definitions be more by DRY by allowing you to refactor common operations that you perform on step definition arguments. Before each match captured by a step definition is yielded as an argument to the step definition block, an attempt is made to match them against registered `Transform` objects. If one of those captured matches match the regular expression of one of a `Transform` objects, its original string value is replaced with the result of what the `Transform` block yields.

## Registering a Transform

```ruby

1. features/step_definitions/user_steps.rb

Transform /^(-?\\d+)$/ do |number|
number.to_i
end
```

- Uses the keyword `Transform`
- Has a regular expression that is compared against all the captures of the step definition
- Implements a block whose result is sent to the step definition block as the matching argument

## Transforms in Execution

An example, the following Transform converts any step definition captures that match digits and converts them automatically to integers.

```ruby

1. features/step_definitions/user_steps.rb

Transform /^(-?\\d+)$/ do |number|
number.to_i
end

Then /^a user, named '(\[^']*)', should have (\\d*) followers$/ do |name,count|
\# Without the transform your count object would be a string and not a number
count.should be_kind_of(Numeric)
\#...
end
```

## Transforming Tables

```gherkin

1. features/table.feature
   Feature: Users

Scenario: Creating Users
Given the following users:
| user | followers |
| aslakhellesoy | 317 |
| jberkel | 51 |
| bfaloona | 4 |
| mattwynne | 33 |
```

### (Re-)Mapping Headers and Columns

Table objects have two extremely useful methods: `map_column!` and `map_headers!`.

```ruby

1. features/step_definitions/user_steps.rb

Given /^the following customers$/ do |table|
\# Convert all headers to lower case symbol
table.map_headers! {|header| header.downcase.to_sym }

\# Convert all user strings to Users
table.map_column!(:user) {|user| User.find_by_name(user) }

\# Convert all the digits in the followers column to an Integer
table.map_column!(:followers) {|count| count.to_i }

table.hashes.each do |row|
row\[:user].followers = row\[:followers]
end
end
```

### The Whole Table

A table like this one may occur again in a creation step and again in a validation step. Using a Transform will keep you DRY. Transforms can also be used with tables. A table transform is matched via a comma-delimited list of the column headers prefixed with 'table:'

```ruby

1. features/step_definitions/user_steps.rb

Transform /^table:user,followers$/ do |table|
table.map_headers! {|header| header.downcase.to_sym }
table.map_column!(:user) {|user| User.find_by_name(user) }
table.map_column!(:followers) {|count| count.to_i }
table
end

Given /^the following users$/ do |table|
table.hashes.each do |row|
row\[:user].followers = row\[:followers]
end
end

Then /^I expect the following users$/ do |table|
table.hashes.each do |row|
row\[:user].should_not be_nil
row\[:user].followers.should == row\[:followers]
end
end
```

## Transform Wisdom

Transforms are powerful and it is important to take care how you implement them. A mistake with them can often introduce strange and unexpected behavior.

**1. Transforms always require that you specify a block variable even if you do not specify any groups to capture.**

With no capture groups specified the entire value is returned as a string to the block. This is contrast to how step definitions perform and can often trip you up. Cucumber will fail execution with a warning when you fail to specify at least one variable.

```ruby

1. Valid - without the capture group () specified
   Transform /^-?\\d+$/ do |number|
   number.to_i
   end

<!-- -->

1. Invalid - Cucumber will raise an error when you execute the test suite
   Transform /^-?\\d+$/ do
   number.to_i
   end
   ```

When you specify capture groups, each capture will be yielded to the block as you have likely come to expect from step definitions.

```ruby

1. Converts the numeric abbreviation for KB/MB to the size
   Transform /^(\\d+)\\s?(KB|MB)$/ do |quantity,unit|
   quantity.to_i \* (unit =~ /MB/ ? 1000000 : 1000)
   end
   ```

**2. Ensure that you specify the caret (^) and dollar sign ($) at the start and end of the regular expression.**

The following transform, adds onto the integer conversion before it, treats an 'a' or 'an' as the integer value of 1. This may be useful in step definitions where you might want to say something like *"a user"* instead of *"1 user"*.

```ruby

1. Convert 'a' or 'an' to the integer value 1
   Transform /^(an?|-?\\d+)$/ do |amount|
   amount =~ /an?/ ? 1 : amount.to_i
   end
   ```

However, removing the caret and dollar sign will allow this step definition to match **ANY** step definition captures that have the value *a* in it. This will likely wreak havoc as the value 1 starts appearing in a large set of your step definitions.

**3. Capture contextual information in your step definitions to ensure that the correct transform is used.**

```ruby
Transform /^a user,? named '(\[^']+)',?$/ do |name|
User.find_by_name(name)
end

1. i.e. Then a user, named 'aslakhellesoy', should have 317 followers
   Then /^(a user, named '(?:\[^']*)',) should have (\\d*) followers$/ do |user,count|
   user.should_not be_nil
   user.should be_kind_of(User)
   user.friends.should == count.to_i
   end
   ```

Without a transform you would have likely only wanted to match the value in the single-quotes. However, matching only the name would likely open our transform up to a large number of arguments and we wouldn't be assured that we were getting a user. So in your step definitions use additional contextual information in your matches and let your Transforms filter the data further.

**4. Register a `Transform` close to where it is being employed.**

The best strategy is to define your transforms in the same file that they are used. When a transform is used by a large number of step definitions move the transform to a unique file in the support directory (e.g. `step_definitions/support/numeric_transforms.rb`).

**5. The order that Transforms are loaded matter as they will take precedence over previously defined transforms.**

To avoid overly confusing dependencies, a step argument may only be transformed once. The Transform defined last gets matching order precedence over previously defined transforms, giving you the ability to “override” previous transforms. As a rule of thumb, define general transforms first and get more specific last.

## Further Examples

[Larry Diehl at Engine Yard](http://www.engineyard.com/blog/2009/cucumber-step-argument-transforms/)
