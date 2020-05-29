---
title: Contributing to Documentation
subtitle: Help us make these docs better
weight: 40
---

The Cucumber documentation is open source and anyone is welcome to contribute. In fact, we'd really appreciate your help!

Each page provides a link to edit the content of that page. You can also make your changes to the [docs.cucumber.io project on Github](https://github.com/cucumber/docs.cucumber.io).

# Process

First-time **contributors** will have to send a pull request.

Once your first pull request has been accepted, you will be promoted to a **committer** and
gain write access to the [GitHub](https://github.com/cucumber/docs.cucumber.io) repository.
As a **committer** you should still use pull requests.

Each pull request should only modify/add a single topic. Please don't lump many unrelated document changes into the same pull request. If you want to modify or add multiple topics, please open one pull request per topic.

The title should explain which docs you are modifying/creating and why.
For example `[docs] Add tags.md` or `[docs] Modify tags.md to explain boolean expressions`.

The more general contribution process is described in the [Cucumber Community Contributing Guide](https://github.com/cucumber/cucumber/blob/master/CONTRIBUTING.md).

# Discuss the documentation

It's great to get feedback on your writing. Start out with small changes, then wait for feedback from other contributors on the pull request.

You can hop into the [Cucumber Slack](https://cucumber.io/support#slack) channel `#docs` to discuss or ask questions.

# What to contribute
A great way to start contributing is to answer a question on the [Cucumber Slack](https://cucumber.io/support#slack) or the [mailing list](https://groups.google.com/group/cukes).
You can add the answer to a question to the docs, if it is currently missing.

You can also add the question to the [FAQ page](https://docs.cucumber.io/community/faq/), with a link to the relevant part of the documentation.

Another option is to look for issues marked `Good first issue` and/or `Help wanted` in the [docs.cucumber.io project on GitHub](https://github.com/cucumber/docs.cucumber.io).
If you have any questions about these issues, you can add comment on the issue itself or contact us on Slack.

## General writing style
In general, the documentation should be brief and to the point.

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away - Antoine de Saint Exupéry

Some guidelines:

* Every page should start with an informational/motivational paragraph
* Paragraphs should be short enough to be readable, but long enough to develop an idea
* Every page should start with a `h1` heading. Sections use `h2`; subsections use `h3`
* Break long lines. Insert a new line at around column 80. This is important because review comments can only be added to a line.
* Write in present tense
* Use neutral language, but try to make it a little entertaining (this is hard!)
* Write in a platform-neutral way as much as possible. Cucumber is implemented in several languages, and the docs should not assume a particular platform
* Use [code blocks](#language-specific-source-code-and-paragraphs) for all code examples (except Gherkin) and paragraphs related to one or more specific languages
* Use [language blocks](#language-specific-text-fragments) for text that is only relevant for one or more specific languages
* Mark [polyglot pages](#polyglot-pages) as needed
* All documents should use [British English](https://en.wikipedia.org/wiki/British_English). Contributions in [American English](https://en.wikipedia.org/wiki/American_English) are fine - editors will do the translation.
* Use links to external sites sparingly
* Do not use copyrighted material (images, text or other)
* Illustrations are great, but please use lo-fi drawings; Cucumber's design team will recreate illustrations according to Cucumber's [brand guidelines](https://github.com/cucumber-ltd/brand)
* Try to keep your contribution *consistent* with the current documentation. For instance:
  * Use consistent wording and formatting
  * Use backticks around keywords; in this case keywords can be written with upper case, e.g. `Step Definition`
  * Use lower case when referring to concepts in a sentences: e.g. "step definition" instead of "Step Definition"

## Tutorial writing style {#tutorial-style}

* Assume the reader has little or no knowledge of the topic
* Use a conversational style
* Make sure each step in the tutorial is clearly described
* If needed, describe what the result of each step should be

# Toolchain
The documentation is written in [Markdown](https://en.wikipedia.org/wiki/Markdown).

The documentation is stored in the [docs.cucumber.io project on Github](https://github.com/cucumber/docs.cucumber.io).

# Menu structure
Pages are displayed in their own section; this is the directory where the file is located.
Pages in a section are in alphabetical order by default, but this can be overridden by specifying `weight`.

# Page structure
* YAML front matter (with title and summary)
  * Pages containing code or language-specific text, should be marked as [polyglot pages](#polyglot-pages)
  * Specify a `weight` to give their (relative) order in the menu (see #menu-structure)
* Introduction paragraph
* Paragraphs

The page's title from the YAML front-matter is rendered as a `<h1>` header
at the top of the page. Start the body with a paragraph, not a header. If you start with a header, the
top of the page will have a `h1` followed immediately by another header, which does not
look good.

# Polyglot pages

Pages can contain variations of the same content that conditionally displays
text or source code for a particular programming language.

A language select will be displayed if the page specifies the following in the front-matter:

 ```
 polyglot:
 - java
 - javascript
 - ruby
 - kotlin
 - scala
 - dotnet
 ```

The following languages are currently supported:

* Java
* JavaScript
* Ruby
* Kotlin (optional)
* Scala (optional)
* .Net (optional; some pages only)

* Whenever possible, we prefer to have information for Java, JavaScript and Ruby.
  * If you're only familiar with one programming language, add an example for that language; someone
    else will fill the gaps for the other languages!
  * You can ask for help with the other languages in the help channel for that language on Slack, or in your GitHub pull request / issue

## Language-specific source code and paragraphs

Wrap `{{%/* block %}}` shortcodes around paragraphs and fenced code blocks:

    {{% block "ruby" %}}
    Put this in your `hello.rb`:

    ```ruby
    puts "hello"
    ```
    {{% /block */%}}

    {{%/* block "javascript" %}}
    Put this in your `hello.js`:

    ```javascript
    console.log("hello")
    ```
    {{% /block */%}}

    {{%/* block "java" %}}
    Put this in your `Hello.java`:
    ```java
    System.out.println("hello")
    ```
    
    {{%/* block "kotlin" %}}
    Put this in your `Hello.kt`:
    ```kotlin
    println("hello")
    ```
    {{% /block */%}}

    {{%/* block "scala" %}}
    Put this in your `Hello.scala`:
    ```scala
    println("hello")
    ```
    {{% /block */%}}

Please note that you cannot use headers *inside* language blocks! If you are writing a page with content for a specific language,
perhaps it should be a separate page. Alternatively, you can use a header per language.

## Language-specific text fragments

Use the `{{%/* text */%}}` shortcode around text fragments that should only be displayed for
a particular programming language:

    The preferred build tool is
    {{%/* text "ruby" %}}Rake{{% /text %}}
    {{% text "javascript" %}}Yarn{{% /text %}}
    {{% text "java,kotlin,scala" %}}Maven{{% /text */%}}.

## Paragraphs or text that is valid for multiple programming languages    
Note that you can also use shortcodes for paragraphs or text that is valid for multiple languages, without repeating it for each individual language.
To do so, list the relevant languages separated by a comma (`,`):
    
    {{%/* text "java,kotlin,scala" %}}Maven{{% /text */%}}

## Additional shortcodes
Additional shortcodes are defined in `layouts/shortcodes`.

### Method vs function
A specific shortcode was created for the stepdef body:

    {{%/* stepdef-body */%}}

When using this shortcode, it will be replaced in the text with the word `method` or `function`, depending on the programming language.

### Expression parameter
A specific shortcode was created for the expression parameter:

    {{%/* expression-parameter */%}}

When using this shortcode, it will be replaced in the text with the words `capture group` or `output parameter`, depending on the programming language.

## Working locally

For information on how to work locally and build the project, please see the [README.md](https://github.com/cucumber/docs.cucumber.io).