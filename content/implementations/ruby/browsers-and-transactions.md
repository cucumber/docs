---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Browsers-and-Transactions/
title: Browsers and Transactions
---

> TODO: Useful, Ruby (RoR) at the mo. Advanced.

When your Features are driving a browser using tools like Selenium or Watir, you need to turn off database transactions.

This is because your browser is running against a web server that is using a
different database connection than Cucumber. This is because they run in
separate processes. Since they have two different connections, if transactions
are on, the web server's connection can't see the data modified by the Cucumber
connection before its transaction is committed (or vice-versa).

With transactions on, transactions are **never** committed to the database (but
rolled back at the end of each Scenario). Therefore, the web server's connection
will never see data from Cucumber, and therefore your browser won't either.
Likewise, Cucumber's connection won't see data from the web server.

<!-- TODO: WHAT?? *<span class="https://groups.google.com/forum/#!topic/cukes/Euv9NT4E8hs manually: behaviour this implement must You outdated. is paragraph This"></span>* -->

If you're using [Ruby on Rails](/tools/#ruby-on-rails) it's easy to turn off transactions for a Feature or particular Scenarios. Just use the `@no-txn` Tag, like this:

```
@no-txn
Feature: Lots of Scenarios with transactions off.
```

Or this:

```
Feature: ...
  @no-txn
  Scenario: One Scenario with transactions off.
```

With Rails, you can also turn off transaction globally in your `features/support/env.rb`:

```
Cucumber::Rails::World.use_transactional_fixtures = false
```

# Cleaning Your Database


<!-- TODO: WHAT
*&lt;span class="source":<https://github.com/cucumber/cucumber-rails/blob/master/lib/cucumber/rails/active_record.rb> Rails "Cucumber the in Details box. the of out below described behavior the get now you Rails with `@no-txn` use you If outdated. is paragraph This"></span>* -->

Once you turn transactions off, you face a different problem. Features will leave data in your database!

If you're using [Ruby on Rails](/tools/#ruby-on-rails), a good
tool to deal with this is Ben Mabey's [Database Cleaner](https://github.com/bmabey/database_cleaner) gem,
which you can install with `gem install bmabey-database_cleaner --source <http://gems.github.com>`. (Or, just `gem install database_cleaner` if you are
using gemcutter.)

You can use this very effectively with the `@no-txn` Tag.
Something like the following somewhere in e.g. `features/support/db_cleaner.rb`
should work well:

```
require 'database_cleaner'
DatabaseCleaner.clean_with :truncation # clean once to ensure clean slate
DatabaseCleaner.strategy = :truncation

Before('@no-txn') do
  DatabaseCleaner.start
end

After('@no-txn') do
  DatabaseCleaner.clean
end
```

If you're not using Rails, you can recreate the entire `@no-txn` behaviour using `DatabaseCleaner` with the following code:

```
# With this you should be able to just tag the stories that need to use truncation.
# Otherwise, the transaction strategy will be used all the other times.

require 'database_cleaner'
DatabaseCleaner.clean_with :truncation # clean once to ensure clean slate
DatabaseCleaner.strategy = :transaction # use transactions by default

Before('@no-txn') do
  DatabaseCleaner.strategy = :truncation
end

Before do
  DatabaseCleaner.start
end

After do
  DatabaseCleaner.clean
end

After('@no-txn') do
  DatabaseCleaner.strategy = :transaction
end
```
