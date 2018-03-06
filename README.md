# Cucumber Documentation

This repository contains the source code for the Cucumber Documentation website.
It is currently live at [https://cucumber.netlify.com](https://cucumber.netlify.com),
and the plan is to move it to [https://docs.cucumber.io](https://docs.cucumber.io) once
it is good enough to replace the existing documentation.

Please make ALL contributions to the documentation in [docs.cucumber.io](https://github.com/cucumber/docs.cucumber.io).

## Current status
We are working to add and update all of the old documentation (see below) to this repo.

All *relevant* documentation from the old documentation has been added to this project.
Some files have been deleted; this does not necessarily mean that those files should not exist,
just that there was not enough info there to justify leaving them.

**This work is currently being done and has been merged to master**.

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

### Install the software (OS X)

The site is built with [Hugo](https://gohugo.io). Install it:

    gem install bundler
    brew install git hugo python

Hugo uses [Pygments](http://pygments.org/) for syntax highlighting.
Installing Pygments is optional - if you don't have it, code won't
be highlighted.

    pip install Pygments

If you don't have `pip` installed yet, you'll first need to install it.

On macOS you can do so by installing Python with Homebrew

    brew install python

We use HTMLProofer to check whether hyperlinks are correct. To run HTMLProofer on your local version, run `make htmlproofer` in the directory
where this project is located on your machine.

If this doesn't work, you may need to install Ruby first:

    gem install bundler

### Run the site locally

Start the server:

    hugo server

Open a browser:

    http://localhost:1313

### Modify content

Edit Markdown files under in the `content` directory.

Whenever you make a change to the content, the server will automatically rebuild the site (in a few milliseconds) and tell the browser to reload (using a WebSocket).

### Verify content integrity

    make 

### Modify theme

Edit files under `themes/cucumber-hugo`. Changes to the CSS should be made in
`themes/cucumber-hugo/static/css/cucumber.sass`.

If you make changes to the `sass`, it will be rebuilt if you run the following:

    cd themes/cucumber-hugo
    yarn        # install dependencies
    yarn build  # rebuild cucumber.css

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

GitHub will notify Netlify for every `git push` thanks to a [webhook](https://github.com/cucumber/docs.cucumber.io/settings/hooks).

Netlify will then build the site
[deploy](https://app.netlify.com/sites/cucumber/deploys) it if the build is successful.

The build will check for broken links and other problems. Internal and external links are checked by [HTMLProofer](https://github.com/gjtorikian/html-proofer).
Occasionally, the build will fail due to external links being unavailable or giving a timeout. When that happens, please check if these external links are available and if so, 'Retry build' on Netlify.

Build notifications are sent to the `#bots-website` Slack channel. See
https://cucumber.io/support for details on how to access Slack.
