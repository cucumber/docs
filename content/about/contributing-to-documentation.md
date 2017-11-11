---
menu:
- about
source: https://github.com/cucumber/cucumber/docs
title: Contributing to Documentation
status: check and update content
---

The Cucumber documentation is open source and anyone is welcome to contribute.

Please make ALL contributions to the documentation in [docs.cucumber.io](https://github.com/cucumber/docs.cucumber.io).

# Process

First-time **contributors** will have to send a pull request.

Once your first pull request has been accepted, you will be promoted to a **committer** and
gain write access to the [GitHub](https://github.com/cucumber/docs.cucumber.io) repository.
As a **committer** you should still use pull requests.

Each pull request should only modify/add a single topic. Don't lump many unrelated document changes into the same pull request.

The title should explain which docs you are modifying/creating (and why).
For example `[docs] Add tags.md` or `[docs] Modify tags.md to explain boolean expressions`.

The more general contribution process is described in the [Cucumber Community Contributing Guide](https://github.com/cucumber/cucumber/blob/master/CONTRIBUTING.md).

# Discuss the documentation

It's great to get feedback on your writing. Start out with small changes, then wait for feedback from other contributors and committers in the pull request.

You can hop into the Cucumber [Slack](https://cucumber.io/support#slack) channel `#committers-docs` or [Gitter](https://cucumber.io/support#gitter) chat rooms to discuss.

Otherwise - there is always the friendly [Cucumber Google group](mailto:cukes-devs@googlegroups.com)

# What to contribute
A great way to start contributing is to answer a
[mailing list](https://groups.google.com/group/cukes) question by improving
the docs, and then reply on the mailing list with a link to your contribution.

If you are contributing for the first time we recommend you start by contributing to the [Reference](#reference-style) documentation. Once you get a hang of that you
can start contributing to [Learning](#learning-style) and [Tutorial](#tutorial-style) documentation.

# Different styles of documentation

This documentation has three different styles of documentation:

* Tutorial (step by step guides)
* Learning (book-style chapters)
* Reference (the dry, technical style)

In general, it should be brief and to the point.

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away - Antoine de Saint Exupéry

## General writing style

* Every page should start with an informational/motivational paragraph
* Paragraphs should be short enough to be readable, but long enough to develop an idea.
* Every page should start with a `h1` heading. Sections use `h2`. Subsections use `h3`
* Break long lines. Insert a new line at around column 80. This is important because review comments can only be added to a line.
* Write in present tense
* Use unemotional language, but try to make it a little entertaining (this is hard)
* Write in a platform-neutral way as much as possible
  * Cucumber is implemented in several languages, and the docs should not assume a particular platform
  * Some good examples of cross-platform/language docs are [Stripe](https://stripe.com/docs/api) and [.NET](https://msdn.microsoft.com/en-us/library/system.array(v=vs.110).aspx)
* Use [codetabs](https://github.com/GitbookIO/plugin-codetabs) for all code examples (except Gherkin)
  * If you're only familiar with one programming language - just add a single tab - someone
    else will fill the gaps for the other languages!
* All documents should use [British English](https://en.wikipedia.org/wiki/British_English)
  * Contributions in [American English](https://en.wikipedia.org/wiki/American_English) is fine - editors will do the translation.
* Use links to external sites sparingly
* Do not use copyrighted material (images, text or other)
* Illustrations are great, but please use lo-fi drawings. Cucumber's design team will recreate illustrations according to Cucumber's [brand guidelines](https://github.com/cucumber-ltd/brand).

## Tutorial writing style {#tutorial-style}

* Assume the reader has little or no knowledge of the topic
* Use a conversational style
* Don't go too deep - refer to Learning and Reference docs for depth

## Learning writing style {#learning-style}

* Go deeper than tutorials
* Investigate why and how, pros and cons

## Reference writing style {#reference-style}

* Use a `h2` section for every major feature.
* Append `(platform-consistent)` or `(platform-inconsistent)` to each header
  * `(platform-consistent)` means this works the same on all platforms, like Gherkin
  * `(platform-inconsistent)` means this currently works differently across platforms, like formatter outputs
    * (The Cucumber team is working to make the implementations more consistent, but this takes time)

# Toolchain
The documentation is written in [Markdown](http://toolchain.gitbook.com/syntax/markdown.html)
(simple markup).

The documentation is stored in [the cucumber/docs.cucumber.io GitHub repository](https://github.com/cucumber/docs.cucumber.io).

# Page structure

* YAML front matter (with title)
* Introduction paragraph
* Subtitles

The page's title from the YAML front-matter is rendered as a `<h1>` header
at the top of the page. Start the body with a paragraph, not a header. If you start with a header, the
top of the page will have a `h1` followed immediately by another header, which does not
look good.

# Polyglot pages

All pages with source code should be polyglot, meaning there should be source code
for all supported programming languages. See `themes/cucumber-hugo/layouts/partials/language-tabs.html`
for a list of supported languages.

The front-matter should also declare that this is a polyglot page so that the
programming language tabs are displayed at the top of the page:

```yaml
polyglot: true
```

When a tab is selected, only source code and language-specific text for the selected
language will be displayed.

## Source code

Use fenced code blocks to specify polyglot source code:

    ```ruby
    puts "hello"
    ```

    ```javascript
    console.log("hello")
    ```

    ```java
    System.out.println("hello")
    ```

## Language-specific text

Use the `{{% text %}}` shortcode around text fragments that should only be displayed for
a particular programming language:

    The preferred build tool is {{% text "ruby" %}}Rake{{% /text %}}{{% text "javascript" %}}Yarn{{% /text %}}{{% text "java" %}}Maven{{% /text %}}.

Use the `{{% block %}}` shortcode around paragraphs of text that should only be displayed for
a particular programming language:

{{% block "java" %}}
A block of text about Java that may also include code examples:
```java
// code example
```
And may also contain multiple paragraphs.
{{% /block %}}

These text blocks can also contain code blocks.

In order to show the correct text / blocks per language, the page should be marked as a [polyglot page](#polyglot-pages).

## Working locally

For information on how to work locally, please see the README.md in [docs.cucumber.io](https://github.com/cucumber/docs.cucumber.io).
