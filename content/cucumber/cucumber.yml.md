---
menu:
- reference
source: https://github.com/cucumber/cucumber/wiki/cucumber.yml/
title: cucumber.yml
---

You can specify commonly-used command line arguments for Cucmber in a `cucumber.yml` or `cucumber.yaml` file.
This file must be in a `.config` subdirectory, or `config` subdirectory of your current working directory.

# Defining Profiles

```yaml

1. config/cucumber.yml
   ## ##YAML Template
   html_report: --format progress --format html --out=features_report.html
   bvt: --tags @bvt
   ```

Defining a template requires a name and then the command-line options that you
want to execute with this profile.

The example above generates two profiles:

1. `html_report`, with a list of command-line options that specify new output formats, and
2. `bvt`, which executes all Features and Scenarios [tagged](/cucumber/#/tags/) with `@bvt`.

## Executing Profiles

```bash
\[user@system project] cucumber --profile html_report
\[user@system project] cucumber -p bvt
```

Use the flag `--profile` or `-p` to execute Cucumber with a profile.
You can still use other command line arguments alongside `--profile` or `-p`,
if desired.

```bash
\[user@system project] cucumber --profile html_report --tags ~@wip
```

Multiple profiles can even be specified together. The following executes all
Features and Scenarios tagged `@bvt`, with the specified progress and HTML
output.

```bash
\[user@system project] cucumber -p html_report -p bvt
```

## Default Profile

Chances are you’ll want to execute Cucumber with a particular profile most of the time.
The Cucumber configuration file uses a `default` profile to provide this functionality.
When you specify a `default` profile, you are telling Cucumber to use the `default` command-line options whenever you don't explicitly specify a different profile.

Using the same example, perhaps we want the `html_report` profile to be our default execution.
```yaml

1. config/cucumber.yml
   ## ##YAML Template
   default: --profile html_report --profile bvt
   html_report: --format progress --format html --out=features_report.html
   bvt: --tags @bvt
   ```


```bash
\[user@system project] cucumber
```

With this setup, Cucumber will now use both the `bvt` profile and `html_report`
profile, testing all Features and Scenarios tagged with `@bvt`, along with the
progress output and HTML output.

## Preprocessing with ERb

The `cucumber.yml` file is preprocessed by ERb. This allows you to use Ruby code
to generate values in the `cucumber.yml` file.

So, if you have several profiles with similar values, you might do this:

```yaml

1. config/cucumber.yml
   ## ##YAML Template
   &lt;% common = "--tags ~@wip --strict" %>
   default: &lt;%= common %> features
   html_report: &lt;%= common %> --format html --out=features_report.html features
   ```

## Environment Variables

[Environment Variables](/cucumber/environment-variables/) can be used in the profile argument list, just as you would normally specify one on the command-line.

```yaml

1. config/cucumber.yml
   \##YAML Template
2. ## ie profile executes the browser features with Internet Explorer
   default: --profile html_report --profile bvt
   html_report: --format progress --format html --out=features_report.html
   bvt: --tags @bvt
   ie: BROWSER=IE
   ```

## Autotest Profiles

cucumber.yml - [Autotest Integration](/wiki/autotest-integration)
 uses two profiles: `autotest` and `autotest-all`.
These profile names should be reserved for that service.
