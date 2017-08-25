# Cucumber Documentation

This repository contains the source code for the Cucumber Documentation website.
It is currently live at [https://cucumber.netlify.com](https://cucumber.netlify.com),
and the plan is to move it to [https://docs.cucumber.io](https://docs.cucumber.io) once
it is good enough to replace the existing documentation.

Please make ALL contributions to the documentation in this repo.

## Current status
We are working to add and update all of the old documentation (see below) to this repo. 

All *relevant* documentation from the old documentation has been added to this project.
Some files have been deleted; this does not necessarily mean that those files should not exist, 
just that there was not enough info there to justify leaving them.

This work is currently being done on branch `sw-reorg` and will be merged to master soon.

## Old documentation

For various reasons, old Cucumber documentation is scattered around different places:

* 2008 onwards: [Cucumber wiki (primarily Ruby)](https://github.com/cucumber/cucumber/wiki)
* 2008 onwards: Misc README files for different implementations:
  * https://github.com/cucumber/cucumber-ruby
  * https://github.com/cucumber/cucumber-jvm
  * https://github.com/cucumber/cucumber-js
* 2015 onwards: [https://cucumber.io/docs](https://cucumber.io/docs)
  * Based on our own website app (Jekyll-like)
  * [source](https://github.com/cucumber/website/tree/master/apps/dynamic/views/docs)
* 2016 onwards: [https://docs.cucumber.io/](https://docs.cucumber.io/)
  * Based on GitBook
  * [source](https://github.com/cucumber/cucumber)
  * See [SUMMARY.md](https://github.com/cucumber/cucumber/blob/master/SUMMARY.md) for the outline

The goal is to move the documentation to this repo.

When the new website is ready to go live, we should replace contents on old pages
with a link and/or redirect to the new location, so that external links to the old documentation remain useful.

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

### Modify theme

Edit files under `themes/cucumber-hugo`. Changes to the CSS should be made in
`themes/cucumber-hugo/static/css/cucumber.sass`.

If you make changes to the `sass`, it will be rebuilt if you run the following:

    cd themes/cucumber-hugo
    yarn        # install dependencies
    yarn watch  # rebuild cucumber.css

A rebuild of the CSS will trigger a reload of the browser, just like with content.

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

## Continuous Deployment

GitHub will notify Netlify for every `git push` via a [webhook](thanks to a [webhook](https://github.com/cucumber/docs.cucumber.io/settings/hooks)).

Netlify will then build the site
[deploy](https://app.netlify.com/sites/cucumber/deploys) it if the build is successful.

The build will check for broken links and other problems.

Build notifications are sent to the `#cucumber-docs-bots` Slack channel. See
https://cucumber.io/support for details on how to access Slack.
