---
title: Cucumber Configuration
subtitle: How to configure Cucumber
polyglot: true
subtitle: cucumber.yml, environment variables
polyglot:
 - java
 - javascript
 - ruby

---


# Type Registry

{{% block "java" %}}
The type registry is used to configure parameter types and data table types. It can be configured by placing an implementation
of `cucumber.api.TypeRegistryConfigurer` on the glue path.

For instance, the following `TypeRegistryConfiguration.java` registers a `ParameterType` of type Integer, and a `DataTableType` of type ItemQuantity:

```java
public class TypeRegistryConfiguration implements TypeRegistryConfigurer {

    @Override
    public Locale locale() {
        return ENGLISH;
    }

    @Override
    public void configureTypeRegistry(TypeRegistry typeRegistry) {
        typeRegistry.defineParameterType(new ParameterType<Integer>(
            "digit",
            "[0-9]",
            Integer.class,
            new Transformer<Integer>() {
                @Override
                public Integer transform(String s) throws Throwable {
                    return Integer.parseInt(s);
                }
            })
        );

        typeRegistry.defineDataTableType(new DataTableType(
            ItemQuantity.class,
            new TableCellTransformer<ItemQuantity>() {
                @Override
                public ItemQuantity transform(String s) {
                    return new ItemQuantity(s);
                }
            })
        );
    }
}
```
{{% /block %}}

{{% block "ruby" %}}
A `Parameter Type` lets you transform an argument from a string to another type before it's passed to the step definition.

For example, let's define our own "Person" type:

```ruby
ParameterType(
  name: 'person',
  regexp: /[A-Z][a-z]+/,
  transformer: -> (name) { Person.new(name) }
end
```

Here's an example of how to use this in a step definition:
```ruby
Then /^a user {person} should have {int} followers$/ do |person, count|
  assert(person.is_a?(Person))
end
```
{{% /block %}}

{{% block "java, ruby" %}}
If you are using a type that has not yet been defined, you will an error similar to:
```shell
The parameter type "person" is not defined.
```
{{% /block %}}

{{% block "javascript" %}}
You can define your own parameter types and data table types.

For more information on how to use `Parameter Type` with Cucumber-js, please see the [parameter_types.feature](https://github.com/cucumber/cucumber-js/blob/master/features/parameter_types.feature).

For more information on how to use `Data Tables` with Cucumber-js, please see the [cucumber-js documentation](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/data_table_interface.md).

{{% /block %}}

## Recommended location

The recommended location to define custom parameter types, would be in{{% text "ruby" %}} `features/support/parameter_types.rb`.{{% /text %}}{{% text "javascript" %}} `features/support/parameter_types.js`.{{% /text %}}{{% text "java" %}} `src/test/com/example/TypeRegistryConfiguration.java`.{{% /text %}}
This is just a convention though; Cucumber will pick them up from any file{{% text "ruby, javascript" %}} under features.{{% /text %}}{{% text "java" %}} on the glue path.{{% /text %}}

# Profiles

{{% block "java" %}}
Profiles are not available in Java.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to use profiles with Cucumber-js, please see the [profiles.feature](https://github.com/cucumber/cucumber-js/blob/master/features/profiles.feature).
{{% /block %}}

{{% block "ruby" %}}
You can specify configuration options for Cucumber in a `cucumber.yml` or `cucumber.yaml` file.
This file must be in a `.config` directory, or `config` subdirectory of your current working directory.

```yaml
config/cucumber.yml
## ##YAML Template
html_report: --format progress --format html --out=features_report.html
bvt: --tags @bvt
```

Defining a template requires a name and then the command-line options that you
want to execute with this profile.

The example above generates two profiles:

1. `html_report`, with a list of command-line options that specify new output formats, and
2. `bvt`, which executes all Features and Scenarios [tagged](/cucumber/api#tags) with `@bvt`.

Cucumber-Rails creates a `cucumber.yml` file in the project config directory containing a number of predefined profiles,
one of which is the default profile. When Cucumber is run from the command line, it is usually necessary to provide both
the directory name containing the root directory of the tree containing feature files and the directory name containing
references to the necessary library files. In a typical project, `cucumber --require features features/some/path` will suffice.
Repetitious usages can be added to user-defined profiles contained in the project's `cucumber.yml` file.

To execute the profile, use:

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
{{% /block %}}

## Default Profile
{{% block "java" %}}
Profiles are not available in Java.
{{% /block %}}

{{% block "javascript" %}}
For more information on how to use profiles with Cucumber-js, please see the [profiles.feature](https://github.com/cucumber/cucumber-js/blob/master/features/profiles.feature).
{{% /block %}}

{{% block "ruby" %}}
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
{{% /block %}}

## Preprocessing with ERB

{{% block "java, javascript" %}}
ERB (Embedded RuBy) is a Ruby specific tool.
{{% /block %}}

{{% block "ruby" %}}

The `cucumber.yml` file is preprocessed by [ERB (Embedded RuBy)](http://ruby-doc.org/stdlib-2.5.0/libdoc/erb/rdoc/ERB.html). This allows you to use Ruby code
to generate values in the `cucumber.yml` file.

So, if you have several profiles with similar values, you might do this:

```yaml

1. config/cucumber.yml
   ## ##YAML Template
   <% common = "--tags ~@wip --strict" %>
   default: <%= common %> features
   html_report: <%= common %> --format html --out=features_report.html features
   ```
{{% /block %}}

# Environment Variables
{{% block "java" %}}
Cucumber-jvm does not support configuration of Cucumber with an `env` file.
{{% /block %}}

{{% block "javascript" %}}
Cucumber-js does not support configuration of Cucumber with an `env` file.
{{% /block %}}

{{% block "ruby" %}}
You can use environment variables in the profile argument list, just as you would normally specify them on the command-line.

```yaml

1. config/cucumber.yml
   \##YAML Template
2. ## ie profile executes the browser features with Internet Explorer
   default: --profile html_report --profile bvt
   html_report: --format progress --format html --out=features_report.html
   bvt: --tags @bvt
   ie: BROWSER=IE
   ```

When [running Cucumber](/cucumber/api#running-cucumber), it can sometimes be handy to pass special
values to Cucumber for your [step definitions](/cucumber/step-definitions) to use.

You can do this on the command line:

   ```
   cucumber FOO=BAR --format progress features
   ```

You can now pick up `ENV\['FOO']` in Ruby (for example, in `env.rb`, or a Step Definition) and perform actions according to the value.

You can also do this in `cucumber.yml`.

For example, the following sets up a profile that runs the specified Tag and sets an environment variable:

   ```
   baz: --tags @mytag FOO=BAR
   ```

Local Cucumber customisation code in `support/env.rb` itself as that file is typically
overwritten by `script/generate cucumber:install | rails g cucumber`. Customisations that
must be loaded before the rest of Cucumber initialises must be placed at the beginning of the `env.rb file`.

Every file ending in `.rb` that is found in features/support is loaded by Cucumber. Therefore, if you place local
customisations in any `.rb` file in that directory, they will get loaded. However, be advised that Cucumber's
`--dry-run` option only excludes files in `features/support` that match the regexp `/env\\..\*/` (*note that the trailing dot is significant*).
So a file with local customisations called `my_locals.rb` will be loaded regardless.

If you put custom files inside `features/support` that you do not wish loaded when you do a dry-run with Cucumber,
then those files must be prefaced with the string `env.`. For example, `features/support/env.local.rb` will not be loaded
when `cucumber --dry-run` is run, but that `features/support/local_env.rb` will be. That might result in some very
obscure errors if `features/support/local_env.rb`contains code dependent upon elements found in `env.rb`.

As a matter of good practice you should always run `script/generate cucumber | rails g cucumber:install` whenever you
install an updated version of Cucumber or cucumber-rails. However, this overwrites `features/support/env.rb`.
In order to keep any custom configurations from your `env.rb` file, check in your `env.rb` along with the rest of your version
controlled files and be prepared to diff and merge changes to `env.rb` between versions of Cucumber-Rails.
{{% /block %}}
