---
title: Environment Variables
subtitle: How to define Environment Variables
---

Cucumber uses [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to enable
certain features, such as publishing [Cucumber Reports](https://reports.cucumber.io).

There are many different ways to define environment variables, depending on your environment.
This guide describes how to set the `CUCUMBER_PUBLISH_ENABLED` environment variable to `true`.

For security reasons you should *not* define `CUCUMBER_*` environment variables globally.

For MacOS and Linux users this means you should *not* put them in `~/.bashrc`,
`~/.bash_profile`, `~/.zshrc`, `/etc.profile` or similar.

For Windows users this means you should *not* add them via System/Control Panel or `setx.exe`.

## Terminal

If you are using a terminal to run Cucumber, you should define environment variables in the
same terminal.

### Windows PowerShell

```shell
$Env:CUCUMBER_PUBLISH_ENABLED = 'true'
```

### Windows Command Prompt

```shell
set CUCUMBER_PUBLISH_ENABLED=true
```

### Bash / Zsh

```shell
export CUCUMBER_PUBLISH_ENABLED=true
```

## Editor / IDE

If you are using an editor or IDE to run Cucumber via a menu or shortcut, you should
define environment variables in the editor.

### IntelliJ IDEA / WebStorm / RubyMine

Click the *Run/Debug Configuration* dropdown in the toolbar:

![Run/Debug Configuration](/img/environment-variables/idea/run-debug-configuration.png)

Click on the *Environment Variables* field.

![Environment Variabled Field](/img/environment-variables/idea/environment-variables-field.png)

Enter the environment variable and its value into the dialog.

![Run/Debug Configuration](/img/environment-variables/idea/enter-environment-variable.png)

### Other editors

Check the documentation for your editor, or help us improving this documentation by editing this page (link at the bottom of the page).

## Continuous Integration Servers

Every Continuous Integration server has a different mechanism for defining environment variables.
Please consult the documentation for your CI server about how to do this.
