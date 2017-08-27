+++
title = "Fixtures"
source = "https://github.com/cucumber/cucumber/wiki/Fixtures/"
menu = ["all", "wiki"]
+++

If you are using Rails 2.x, paste this code snippet into env.rb to load all fixtures from spec/fixtures before each scenario.

```ruby
Before do
  Fixtures.reset_cache
  fixtures_folder = File.join(RAILS_ROOT, 'spec', 'fixtures')
  fixtures = Dir[File.join(fixtures_folder, '*.yml')].map {|f| File.basename(f, '.yml') }
  Fixtures.create_fixtures(fixtures_folder, fixtures)
end
```

If you are using Rails 3.1, paste this code snippet into env.rb instead:

```ruby
Before do
  ActiveRecord::Fixtures.reset_cache
  fixtures_folder = File.join(Rails.root, 'spec', 'fixtures')
  fixtures = Dir[File.join(fixtures_folder, '*.yml')].map {|f| File.basename(f, '.yml') }
  ActiveRecord::Fixtures.create_fixtures(fixtures_folder, fixtures)
end
```

If you are using Rails 4.x, paste this code snippet into env.rb instead:

```ruby
Before do
  ActiveRecord::FixtureSet.reset_cache
  fixtures_folder = File.join(Rails.root, 'spec', 'fixtures')
  fixtures = Dir[File.join(fixtures_folder, '*.yml')].map {|f| File.basename(f, '.yml') }
  ActiveRecord::FixtureSet.create_fixtures(fixtures_folder, fixtures)
end
```

If you are using transactional fixtures in Rails then instead of loading your fixtures before each scenario you can load it just once by placing the same code in your env.rb file.  This way will be much faster than loading the fixtures before each scenario. For example:

```ruby
# Sets up the Rails environment for Cucumber
ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + '/../../config/environment')
require 'cucumber/rails/world'
Cucumber::Rails::World.use_transactional_fixtures

#Seed the DB
Fixtures.reset_cache  
fixtures_folder = File.join(RAILS_ROOT, 'spec', 'fixtures')
fixtures = Dir[File.join(fixtures_folder, '*.yml')].map {|f| File.basename(f, '.yml') }
Fixtures.create_fixtures(fixtures_folder, fixtures)
```

For Rails 3.1 just replace ```Fixtures``` with ```ActiveRecord::Fixtures``` and ```RAILS_ROOT``` with ```Rails.root```

## Usage

Once you've done one of the two load methods above (please, don't do both ;-) you can access your fixture data from the database using *Model.find*.  Example to find the first User model you'd use User.find(:first).

## Fixture helper methods

If you want to also enable the fixture helper methods, such as *users(:admin)*, you need to add the following to your env.rb file (pretty much stolen straight from the Rails guts). This includes loading of the fixtures. For Rails 3.x:

```ruby
module FixtureAccess

  def self.extended(base)

    Fixtures.reset_cache
    fixtures_folder = File.join(Rails.root, 'spec', 'fixtures')
    fixtures = Dir[File.join(fixtures_folder, '*.yml')].map {|f| File.basename(f, '.yml') }
    fixtures += Dir[File.join(fixtures_folder, '*.csv')].map {|f| File.basename(f, '.csv') }

    Fixtures.create_fixtures(fixtures_folder, fixtures)    # This will populate the test database tables

    (class << base; self; end).class_eval do
      @@fixture_cache = {}
      fixtures.each do |table_name|
        table_name = table_name.to_s.tr('.', '_')
        define_method(table_name) do |*fixture_symbols|
          @@fixture_cache[table_name] ||= {}

          instances = fixture_symbols.map do |fixture_symbol|
            if fix = Fixtures.cached_fixtures(ActiveRecord::Base.connection, table_name).first.fixtures[fixture_symbol.to_s]
              @@fixture_cache[table_name][fixture_symbol] ||= fix.find  # find model.find's the instance
            else
              raise StandardError, "No fixture with name '#{fixture_symbol}' found for table '#{table_name}'"
            end
          end
          instances.size == 1 ? instances.first : instances
        end
      end
    end
  end

end
```
and then

```ruby
World(FixtureAccess)
```

For Rails 4.x rename any incidence of `Fixtures` above with `ActiveRecord::FixtureSet`.

Rails 2.x/3.x instructions work for Cucumber *0.2.3.2* and later. For older versions, view "forum post":http://www.ruby-forum.com/topic/187427#822479

Rails 4.x instructions tested with Cucumber 1.3.17.
