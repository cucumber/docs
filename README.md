# Cucumber Documentation

This is the Cucumber Documentation website. It is currently live at
[https://cucumber.netlify.com](https://cucumber.netlify.com), and the plan
is to move it to [https://docs.cucumber.io](https://docs.cucumber.io) once
the documentation on that site has been migrated.

## Contributing Content

The easiest way to contribute content is to add or modify content in the
[Netlify CMS](https://cucumber.netlify.com/admin).

Alternatively, you can clone this repo and edit Markdown files in a text
editor on your local machine

## Working locally

If you want to modify layout, or prefer to work in a text editor you need to
install some software.

### Get the source code

    git clone https://github.com/cucumber/docs.cucumber.io.git
    cd docs.cucumber.io

### Install the software (Mac)

    brew install git hugo

### Run the site locally

Start the server:

    hugo server --buildDrafts

Open a browser:

    http://localhost:1313

### Modify content

Simply edit Markdown files under `content`.

Whenever you make a change to the content, the server will automatically rebuild the site (in a few milliseconds) and tell the browser to reload (using a WebSocket).

## Architecture

The site is built with [Hugo](https://gohugo.io), a fast static site generator.

We have a custom-built theme for the site in `themes/cucumber-hugo`. This theme
is based on [Bulma](http://bulma.io/) - a lightweight CSS framework.

The online site is rebuild automatically whenever the git repository receives
new commits, either via a `git push`, or by modifying contents in the CMS.

The [Netlify CMS](https://www.netlifycms.org/) saves contents straight to GitHub
using the GitHub API.

We might experiment with [other CMS systems](https://headlesscms.org/) if Netlify
CMS doesn't fit with our workflow.
