---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Browsers-and-Transactions/
title: Browsers and Transactions
---

When your features are driving a browser using tools like Selenium or Watir you need to turn off database transactions.

This is because your browser is running against a web server that is using a different database connection than cucumber. This is because they run in separate processes. Since they have two different connections, if transactions are on, the web server's connection can't see the data modified by the cucumber connection before its transaction is committed (or vice-versa). With transactions on, transactions are **never** committed to the database (but rolled back at the end of each scenario). Therefore, the web server's connection will never see data from cucumber, and therefore your browser won't either. Likewise, cucumber's connection won't see data from the web server.

*<span class="https://groups.google.com/forum/#!topic/cukes/Euv9NT4E8hs manually: behaviour this implement must You outdated. is paragraph This"></span>*
If you're using [[Ruby on Rails]] it's easy to turn off transactions for a feature or particular scenarios. Just use the <code>@no-txn</code> tag, e.g.

```
@no-txn
Feature: Lots of scenarios with transactions off.
```

or

```
Feature: ...
  @no-txn
  Scenario: One scenario with transactions off.
```

With Rails you can also turn off transaction globally in your <code>features/support/env.rb</code>:

```
Cucumber::Rails::World.use_transactional_fixtures = false
```

## Cleaning Your Database

*&lt;span class="source":<http://github.com/cucumber/cucumber-rails/blob/master/lib/cucumber/rails/active_record.rb> Rails "Cucumber the in Details box. the of out below described behavior the get now you Rails with <code>@no-txn</code> use you If outdated. is paragraph This"></span>*

Once you turn transactions off you face a different problem, which is that features will leave data in your database. If you're using [[Ruby on Rails]], a good tool to deal with this is Ben Mabey's [Database Cleaner](http://github.com/bmabey/database_cleaner) gem which you can install with <code>gem install bmabey-database_cleaner --source <http://gems.github.com/></code>. (Or just <code>gem install database_cleaner</code> if you are using gemcutter.) You can use this very effectively with the <code>@no-txn</code> tag. Something like the following somewhere in e.g. <code>features/support/db_cleaner.rb</code> should work well:

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

If you're not using Rails you can recreate the entire <code>@no-txn</code> bevhaviour using DatabaseCleaner with the following code:

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
