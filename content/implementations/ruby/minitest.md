---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/Using-MiniTest/
title: Using MiniTest
---

You can also use [minitest](https://github.com/seattlerb/minitest) <code>assert</code> methods by defining your own [World](/wiki/a-whole-new-world/) block:

### Minitest 5

```ruby
require 'minitest/spec'

class MinitestWorld
include Minitest::Assertions
attr\_accessor :assertions

def initialize
self.assertions = 0
end
end

World do
MinitestWorld.new
end
```

Or, if that causes problems, try:

```ruby
World(MultiTest::MinitestWorld)
```

### Older versions

```ruby
require 'mini/test'

World do |world|
world.extend(MiniTest::Assertions)
world
end
```

If it doesn't work, try this one:

```ruby
require 'minitest/unit'

World do
extend MiniTest::Assertions
end
```

Or

```ruby
require 'minitest/unit'
World(MiniTest::Assertions)
```

Also, if you wanted to use MiniTest::Spec, the snippet would look like this:

```ruby
require 'minitest/spec'
World(MiniTest::Assertions)
MiniTest::Spec.new(nil)
```

Also see the minitest cheat sheet [here](https://web.archive.org/web/20120701103558/http://cheat.errtheblog.com/s/minitest/1)
