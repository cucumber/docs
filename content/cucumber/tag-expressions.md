---
menu:
- reference
source: https://github.com/cucumber/cucumber/edit/master/tag-expressions/README.md
---

# Tag Expressions - Internal Design

The implementation is based on a modified version of Edsger Dijkstra's
[Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
that produces an expression tree instead of a postfix notation.

For example this expression:

    expression = "not @a or @b and not @c or not @d or @e and @f"

Would parse into this expression tree:

    # Get the root of the tree - an Expression object.
    expressionNode = parser.parse(expression)

                or
              /    \
            or      and
           /  \    /   \
         or  not  @e    @f
        /  \    \
      not  and   @d
     /    /   \
    @a   @b   not
                 \
                  @c

The root node of tree can then be evaluated for different combinations of tags.
For example:

    result = expressionNode.evaluate(["@a", "@c", "@d"]) # => false
