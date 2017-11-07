---
menu:
  main:
    weight: 10
title: Code Highlight Sample
---

This page is temporary

```gherkin
# Comment
@tag
Feature: Hello
  Some description

  Scenario: Hi
    Given blah is 2 cukes
      | a | b |
      | 1 | 2 |
```

```java
// Comment
public static class Main {
  /**
   * @foo bar
   */
  public void foo(String ok) {
    System.out.println("Hello");
    int x = 9;
    int y = 6.0;
  }
}
```

```javascript
// Comment
const xyz = require('xyz')

const bar = (arg) => 23

/**
 * @foo bar
 */
function foo() {
  console.log('ll')
}
```

```ruby
require 'fff'

class Hello
  def bar
    x = 3 + 3
  end
end
```
