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
