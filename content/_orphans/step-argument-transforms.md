---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/Step-Argument-Transforms/
title: Parameters in Step Definitions
---

> TODO: Ruby specific feature. generalize.

Step argument Transforms keep your Step Definitions DRY. They allow you to refactor common operations that you perform on Step Definition arguments.

Before each of a Step Definition's captured matches is yielded as an argument to the Step Definition's block, Cucumber attempts to match them against registered `Transform` objects. If the captured match also matches the regular expression of a `Transform` object, its original string value is replaced with the result of what the `Transform` block yields.

# Registering a Transform

```ruby

1. features/step_definitions/user_steps.rb

Transform /^(-?\\d+)$/ do |number|
number.to_i
end
```

- Uses the keyword `Transform`
- Has a regular expression that is compared against all the captures of the Step Definition
- Implements a block whose result is sent to the Step Definition block as the matching argument

# Transforms during Execution

An example, the following Transform converts any Step Definition captures that match digits and converts them automatically to integers.

```ruby

# 1. features/step_definitions/user_steps.rb

Transform /^(-?\\d+)$/ do |number|
    number.to_i
end

Then /^a user, named '(\[^\']*)', should have (\\d*) followers$/ do |name,count|
    # Without the Transform, `count` would be a string, not a number
    count.should be_kind_of(Numeric)
    # ...
end

```

# Transforming Tables

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

## (Re-)Mapping Headers and Columns

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

## The Whole Table

Transforms can also be used with tables. Just as they do for Step Definitions, using a Transform with tables will keep your code DRY.

A table like this may occur again in a creation Step, and again in a validation Step.

A table Transform is matched via a comma-delimited list of the column headers prefixed with `table:`:

```ruby

# 1. features/step_definitions/user_steps.rb

Transform /^table:user,followers$/ do |table|
    table.map_headers! {|header| header.downcase.to_sym }
    table.map_column!(:user) {|user| User.find_by_name(user) }
    table.map_column!(:followers) {|count| count.to_i }
    table
end

Given /^the following users$/ do |table|
    table.hashes.each do |row|
        row[:user].followers = row[:followers]
    end
end

Then /^I expect the following users$/ do |table|
    table.hashes.each do |row|
        row[:user].should_not be_nil
        row[:user].followers.should == row[:followers]
    end
end
```

# Transform Wisdom

Transforms are powerful, and it is important to implement them with care. A mistake can often introduce strange and unexpected behavior.

**1. Transforms always require that you specify a block variable, _even if you do not specify any groups to capture_.**

With no capture groups specified, the entire value is returned as a string to the block. This is in contrast to how Step Definitions behave, and can be confusing.

Cucumber will fail execution with a warning when you fail to specify at least one variable.

```ruby

# 1. Valid - without the capture group () specified
Transform /^-?\\d+$/ do |number|
    number.to_i
end
```

```ruby
# 1. Invalid - Cucumber will raise an error when you execute the test suite
Transform /^-?\\d+$/ do
    number.to_i
end
```

When you specify capture groups, each capture will be yielded to the block (just as they would with Step Definitions).

```ruby

# 1. Converts the numeric abbreviation for KB/MB to the size
Transform /^(\\d+)\\s?(KB|MB)$/ do |quantity,unit|
    quantity.to_i \* (unit =~ /MB/ ? 1000000 : 1000)
end
```

**2. Ensure that you specify the caret (`^`) and dollar sign (`$`) at the start and end of the regular expression.**

The following Transform adds onto the integer conversion before it, treats an `'a'` or `'an'` as the integer value `1`. This may be useful in Step Definitions, where you might want to say something like `"a user"` instead of `"1 user"`.

```ruby

# 1. Convert 'a' or 'an' to the integer value 1
Transform /^(an?|-?\\d+)$/ do |amount|
    amount =~ /an?/ ? 1 : amount.to_i
end
```

However, removing the caret and dollar sign will allow this Step Definition to match **ANY** Step Definition captures that contain `"a"`. This will probably wreak havoc as the value `1` starts appearing in a large set of your Step Definitions.

**3. Capture contextual information in your Step Definitions to ensure that the correct Transform is used.**

```ruby
Transform /^a user,? named '(\[^\']+)',?$/ do |name|
    User.find_by_name(name)
end

# 1. i.e. Then a user, named 'aslakhellesoy', should have 317 followers
Then /^(a user, named '(?:\[^\']*)',) should have (\\d*) followers$/ do |user,count|
   user.should_not be_nil
   user.should be_kind_of(User)
   user.friends.should == count.to_i
end
```

Without a Transform, you might have only wanted to match the value in the single-quotes. However, matching only the name would likely open our Transform up to a large number of arguments, and we wouldn't be guaranteed that we were getting a user. So, when writing your Step Definitions, use additional contextual information in your matches, and let the Transforms filter the data further.

**4. Register a `Transform` close to where it will be used.**

The best strategy is to define your Transforms in the same file that they are used. When a Transform is used by a large number of Step Definitions, move the Transform to a unique file in the support directory (e.g. `step_definitions/support/numeric_transforms.rb`).

**5. The order in which Transforms are loaded matters; they will take precedence over previously defined Transforms.**

To avoid overly confusing dependencies, a Step argument may only be transformed once. The Transform defined last gets precedence over previously defined Transforms, giving you the ability to “override” previous Transforms. As a rule of thumb, define general Transforms first, and specific Transforms last.
