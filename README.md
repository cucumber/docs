# Cucumber Documentation

This repository contains the source code for [https://docs.cucumber.io](https://docs.cucumber.io).

## Contributing Content

For small edits, the recommended way to contribute is via GitHub.
Each page in the documentation will have an **Edit** link for this purpose.

## Working locally

For bigger modifications, the recommended workflow is to edit the documentation
locally on your machine, and seeing the results in a web browser.

This involves getting the source code and building the documentation yourself.

# Get the source code

    git clone https://github.com/cucumber/docs.cucumber.io.git
    cd docs.cucumber.io

### View the site

The website is built with several tools that are distributed as a Docker image.

Install [Docker](https://docs.docker.com/install/) if you don't already have
it on your machine.

Build and serve the website:

    ./docker_shell.sh

Open a browser:

    http://localhost:1313

Changes to the contents will be automatically updated in the browser.

Try editing one of the pages under `content` and see for yourself!

### Build the site and check links

When you are done editing, build the site and check links:

    ./docker_shell.sh make clean
    ./docker_shell.sh make
    ./docker_shell.sh make htmlproofer

### Modify theme

See the [theme README](themes/cucumber-hugo/README.md)

## Architecture

The site is built with [Hugo](https://gohugo.io), a fast static site generator.

We have a custom-built theme for the site in `themes/cucumber-hugo`. This theme
is based on [Bulma](http://bulma.io/) - a lightweight CSS framework.

The online site is rebuild automatically whenever the git repository receives
new commits, either via a `git push`, or by modifying contents in the CMS.

The [Netlify CMS](https://www.netlifycms.org/) saves contents straight to GitHub
using the GitHub API.

## Continuous Deployment

GitHub will notify Netlify for every `git push` thanks to a [webhook](https://github.com/cucumber/docs.cucumber.io/settings/hooks).

Netlify will then build the site and
[deploy](https://app.netlify.com/sites/cucumber/deploys) it if the build is successful.

The build will check for broken links and other problems. Internal and external links are checked by [HTMLProofer](https://github.com/gjtorikian/html-proofer).
Occasionally, the build will fail due to external links being unavailable or giving a timeout. When that happens, please check if these external links are available and if so, 'Retry build' on Netlify.

You can discuss the documentation in the `#docs` Slack channel. Build notifications are sent to the `#bots-docs` Slack channel. See https://cucumber.io/support for details on how to access Slack.
