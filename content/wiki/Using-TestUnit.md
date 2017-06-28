+++
title = "Using TestUnit"
source = "https://github.com/cucumber/cucumber/wiki/Using-TestUnit/
menu = ["all", "wiki"]
+++

Don't like RSpec's `should` methods for assertions? No problem, we won't force you to. You can use the familiar Test::Unit `assert` methods by mixing it into your [World](a-whole-new-world).

```ruby
require 'test/unit/assertions'

World(Test::Unit::Assertions)
```

You can see a full example under the [examples](http://github.com/cucumber/cucumber/tree/master/examples%2Ftest_unit)
