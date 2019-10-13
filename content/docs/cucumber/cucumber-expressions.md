---
title: Cucumber Expressions
subtitle: Using variables in your step definitions
polyglot:
 - java
 - javascript
 - ruby
 - kotlin

weight: 4
markup: mmark
---

Cucumber uses *expressions* to link a [Gherkin Step](/docs/gherkin/reference#steps)
to a [Step Definition](/docs/cucumber/step-definitions). You can use
[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) or *Cucumber Expressions*.

Cucumber Expressions offer similar functionality to Regular Expressions, with a syntax 
that is more human to read and write. Cucumber Expressions are also
extensible with *parameter types*.

# Introduction

Let's write a Cucumber Expression that matches the following Gherkin step (the `Given`
keyword has been removed here, as it's not part of the match).

    I have 42 cucumbers in my belly

The simplest Cucumber Expression that matches that text would be the text itself,
but we can also write a more generic expression, with an `int` *output parameter*:

    I have {int} cucumbers in my belly

When the text is matched against that expression, the number `42` is extracted
from the `{int}` output parameter and passed as an argument to the [step definition](/docs/cucumber/step-definitions).

The following text would not match the expression:

    I have 42.5 cucumbers in my belly

This is because `42.5` has a decimal part, and doesn't fit into an `int`.
Let's change the output parameter to `float` instead:

    I have {float} cucumbers in my belly

Now the expression will match the text, and the float `42.5` is extracted.

# Parameter types

Text between curly braces reference a *parameter type*. Cucumber comes with
the following built-in parameter types:

{.table .is-bordered}
Parameter Type  | Description
----------------|------------:
`{int}`         | Matches integers, for example `71` or `-19`.
`{float}`       | Matches floats, for example `3.6`, `.8` or `-9.2`.
`{word}`        | Matches words without whitespace, for example `banana` (but not `banana split`)
`{string}`      | Matches single-quoted or double-quoted strings, for example `"banana split"` or `'banana split'` (but not `banana split`). Only the text between the quotes will be extracted. The quotes themselves are discarded. Empty pairs of quotes are valid and will be matched and passed to step code as empty strings.
`{}` anonymous  | Matches anything (`/.*/`). 

{{% block "java,kotlin" %}}
On the JVM, there are additional parameter types for `biginteger`, `bigdecimal`,
`byte`, `short`, `long` and `double`. 

The anonymous parameter type will be converted to the parameter type of the step definition using an object mapper. 
Cucumber comes with a built-in object mapper that can handle most basic types. Aside from `Enum` it supports conversion 
to `BigInteger`, `BigDecimal`, `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double` and `String`.

To automatically convert to other types it is recommended to install an object mapper. See [configuration](/docs/cucumber/configuration)
to learn how.{{% /block %}}

# Custom Parameter types

Cucumber Expressions can be extended so they automatically convert
output parameters to your own types. Consider this Cucumber Expression:

    I have a {color} ball

If we want the `{color}` output parameter to be converted to a `Color` object,
we can define a custom parameter type in Cucumber's [configuration](/docs/cucumber/configuration).

{{% block "java" %}}
```java
typeRegistry.defineParameterType(new ParameterType<>(
    "color",           // name
    "red|blue|yellow", // regexp
    Color.class,       // type
    Color::new         // transformer function
))
```
{{% /block %}}

{{% block "kotlin" %}}
```kotlin
typeRegistry.defineParameterType(ParameterType<Color>(
    "color",                            // name
    "red|blue|yellow",                  // regexp
    Color::class.java,                  // type
    { s: String -> Color.getColor(s) }  // transformer function
))
```
{{% /block %}}

{{% block "javascript" %}}
```javascript
const { defineParameterType } = require('cucumber')

defineParameterType(new ParameterType<>(
    'color',           // name
    /red|blue|yellow/, // regexp
    Color,             // type
    s => new Color(s)  // transformer function
))
```

The `transformer` function may return a `Promise`.

{{% /block %}}

{{% block "ruby" %}}
```ruby
ParameterType(
  name:        'color',
  regexp:      /red|blue|yellow/,
  type:        Color,
  transformer: ->(s) { Color.new(s) }
)
```
{{% /block %}}

The table below explains the various arguments you can pass when defining
a parameter type.

{.table .is-bordered}
Argument      | Description
--------------|------------:
`name`        | The name the parameter type will be recognised by in output parameters.
`regexp`      | A regexp that will match the parameter. May include capture groups.
`type`        | The return type of the transformer {{% stepdef-body %}}.
`transformer` | A {{% stepdef-body %}} that transforms the match from the regexp. Must have arity 1 if the regexp doesn't have any capture groups. Otherwise the arity must match the number of capture groups in `regexp`.
{{% text "java,kotlin,javascript" %}}`useForSnippets`{{% /text %}}{{% text "ruby" %}}`use_for_snippets`{{% /text %}} | Defaults to `true`. That means this parameter type will be used to generate snippets for undefined steps. If the `regexp` frequently matches text you don't intend to be used as arguments, disable its use for snippets with `false`.
{{% text "java,kotlin,javascript" %}}`preferForRegexpMatch`{{% /text %}}{{% text "ruby" %}}`prefer_for_regexp_match`{{% /text %}} | Defaults to `false`. Set to `true` if you have step definitions that use regular expressions, and you want this parameter type to take precedence over others during a match.

# Optional text

It's grammatically incorrect to say *1 cucumbers*, so we should make the plural **s**
optional. That can be done by surrounding the optional text with parenthesis:

    I have {int} cucumber(s) in my belly

That expression would match this text:

    I have 1 cucumber in my belly

It would also match this text:

    I have 42 cucumbers in my belly

In Regular Expressions, parenthesis means capture group, but in Cucumber Expressions
it means *optional text*.

# Alternative text

Sometimes you want to relax your language, to make it flow better. For example:

    I have {int} cucumber(s) in my belly/stomach

This would match either of those texts:

    I have 42 cucumbers in my belly
    I have 42 cucumbers in my stomach

Alternative text only works when there is no whitespace between the alternative parts.

# Escaping

If you ever need to match `()` or `{}` literally, you can escape the
opening `(` or `{` with a backslash:

    I have 42 \{what} cucumber(s) in my belly \(amazing!)

This expression would match the following examples:

    I have 42 {what} cucumber in my belly (amazing!)
    I have 42 {what} cucumbers in my belly (amazing!)
    
You may have to escape the `\` character itself with another `\`, depending on your programming language.
For example, in Java, you have to use escape character `\` with another backslash.

    I have 42 \\{what} cucumber(s) in my belly \\(amazing!)
    
Then this expression would match the following example:

    I have 42 {what} cucumber in my belly (amazing!)
    I have 42 {what} cucumbers in my belly (amazing!)

There is currently no way to escape a `/` character - it will always be interpreted
as alternative text.
