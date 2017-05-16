# Cucumber Documentation

This is the Cucumber Documentation website.

## Install the software (Mac)

    brew install git hugo

## Start the server

    hugo server --theme=cucumber-hugo --buildDrafts

## Toolchain / components

The site is built with Hugo, using a theme based on the Bulma CSS framework.
We're using a custom build of Bulma, adapted to the CSS classes
(or lack thereof) that Hugo puts on header elements (`h1`, `h2`). Bulma's default
colours and fonts are also overridden. No more changes have been made to Bulma.

We use Netlifycms, primarily for its workflow and integration with Netlify
hosting. We might experiment with multiple CMS systems until we find one
that suits us well.
