# Contributing to the documentation

## Page structure

* YAML front matter (with title)
* Introduction paragraph
* Subtitles

The page's title from the YAML front-matter is rendered as a `<h1>` header
at the top of the page. Only use `##`, `###` and `####` headers in the document
body - do not use `#` headers as we only want a single `h1` header per page.

Start the body with a paragraph, not a header. If you start with a header, the
top of the page will have a `h1` followed immediately by a `h2`, which does not
look good.

## Polyglot pages

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

### Source code

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

### Language-specific text

Use the `{{% text %}}` shortcode around text that should only be displayed for
a particular programming language:

    The preferred build tool is {{% text "java" %}}Rake{{% /text %}}{{% text "java" %}}Yarn{{% /text %}}{{% text "java" %}}Maven{{% /text %}}.

### Htmlproofer CI
During the build, internal and external links are checked by htmlproofer CI.
Occasionally, the build will fail due to external links being unavailable or giving a timeout.
When that happens, please check if these external links are available and if so, 'Retry build' on Netlify.