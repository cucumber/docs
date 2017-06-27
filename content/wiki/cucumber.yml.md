+++
title = "cucumber.yml"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

Cucumber lets you store and reuse commonly used cucumber command line arguments for a project in a <code>cucumber.yml</code> or <code>cucumber.yaml</code> file. This file must be in a <code>.config</code> subdirectory or <code>config</code> subdirectory of your current working directory.

Defining Profiles
-----------------

\`\`\`yaml

1.  config/cucumber.yml
    \#\#YAML Template
    ---
    html\_report: --format progress --format html --out=features\_report.html
    bvt: --tags @bvt
    \`\`\`

Defining a template requires a name and then the command-line options that you want to execute with this profile. The example above generates two profiles: the first, named <code>html\_report</code>, with a list of command-line options that specify new output formats and a second, named <code>bvt</code> which executes all features and scenarios \[\[tagged|Tags\]\] with @bvt.

Executing Profiles
------------------

\`\`\`bash
\[user@system project\] cucumber --profile html\_report
\[user@system project\] cucumber -p bvt
\`\`\`

The execution of a profile simply requires the use of the flag <code>--profile</code> or <code>-p</code>.

During execution you can also specify additional parameters alongside the profile.

\`\`\`bash
\[user@system project\] cucumber --profile html\_report --tags ~@wip
\`\`\`

Even multiple profiles can be specified together. The following executes all the features and scenarios tagged as @bvt with the specified progress and html output.

\`\`\`bash
\[user@system project\] cucumber -p html\_report -p bvt
\`\`\`

Default Profile
---------------

It is often the case that you will want to execute Cucumber with a particular profile a majority of the time. The Cucumber configuration file uses a <code>default</code> profile to provide this functionality. When you specify a default profile you are stating that Cucumber should apply this command-line options to an execution when you do not specify a profile.

Using the same example, perhaps we want the <code>html\_report</code> profile to be our default execution.
\`\`\`yaml

1.  config/cucumber.yml
    \#\#YAML Template
    ---
    default: --profile html\_report --profile bvt
    html\_report: --format progress --format html --out=features\_report.html
    bvt: --tags @bvt
    \`\`\`

The <code>default</code> profile is a special profile that when present, is applied to the execution of Cucumber when you have not specified a profile.

\`\`\`bash
\[user@system project\] cucumber
\`\`\`

So now, by default, Cucumber is going to use both the <code>bvt</code> profile and <code>html\_report</code> profile testing all features and scenarios tagged as @bvt with the progress output and html output.

Preprocessing with ERb
----------------------

The cucumber.yml file is preprocessed by ERb; this allows you to use ruby code to generate values in the cucumber.yml file. So if you have several profiles with similar values you could do something like:

\`\`\`yaml

1.  config/cucumber.yml
    \#\#YAML Template
    ---
    &lt;% common = "--tags ~@wip --strict" %&gt;
    default: &lt;%= common %&gt; features
    html\_report: &lt;%= common %&gt; --format html --out=features\_report.html features
    \`\`\`

Environment Variables
---------------------

\[\[Environment Variables\]\] can be used in the profile argument list for a profile as you would normally specify one on the command-line.

\`\`\`yaml

1.  config/cucumber.yml
    \#\#YAML Template
2.  ie profile executes the browser features with Internet Explorer
    ---
    default: --profile html\_report --profile bvt
    html\_report: --format progress --format html --out=features\_report.html
    bvt: --tags @bvt
    ie: BROWSER=IE
    \`\`\`

Autotest Profiles
-----------------

\[\[Integration with Autotest|Autotest-Integration\]\] uses two profiles <code>autotest</code> and <code>autotest-all</code>. These profiles should be reserved for that service.
