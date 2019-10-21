---
title: Cucumber Configuration
subtitle: How to configure Cucumber
polyglot: true
subtitle: cucumber.yml, environment variables
polyglot:
 - java
 - javascript
 - ruby
 - kotlin

---


# Type Registry

{{% block "java,kotlin" %}}
Parameter types let you convert parameters from cucumber-expressions to objects. Data table and doc string string types let you convert data tables and doc strings to objects. Like step definitions, type definitions are part of the glue. When placed on the glue path Cucumber will detect them automatically.
For example, the following class registers custom "Author" data table type:

```java
package com.example.app;

import io.cucumber.java.DataTableType;
import io.cucumber.java.en.Given;

import java.util.List;
import java.util.Map;

public class StepDefinitions {

    @DataTableType
    public Author authorEntryTransformer(Map<String, String> entry) {
        return new Author(
            entry.get("firstName"),
            entry.get("lastName"),
            entry.get("famousBook"));
    }

    @Given("There are my favorite authors")
    public void authorsStep(List<Author> authors) {
        // step implementation
    }
}    
```


```kotlin

package com.example.app;


import io.cucumber.java.DataTableType
import io.cucumber.java.en.Given
import kotlin.streams.toList


class Steps {

    @DataTableType
    fun authorEntryTransformer(entry: Map<String, String>): Author {
        return Author(
                entry["firstName"],
                entry["lastName"],
                entry["famousBook"])
    }

    @Given("There are my favorite authors")
    fun authorsStep(authors: List<Author>) {
        // step implementation
    }
}
```
The parameter type example:
```java

package com.example.app;

import io.cucumber.java.ParameterType;
import io.cucumber.java.en.Given;

public class StepDefinitions {

    @ParameterType(name = "book", value = ".*")
    public Book bookTransformer(String bookName) {
    	return new Book(bookName);
    }	

    @Given("{book} is my favorite book")
    public void bookStep(Book book) {
        // step implementation
    }
}
```

```kotlin

package com.example.app;


import io.cucumber.java.ParameterType
import io.cucumber.java.en.Given
import kotlin.streams.toList


class Steps {

    @ParameterType(name = "book", value = ".*")
    fun bookTransformer(bookName: String): Book {
        return Book(bookName)
    }

    @Given("{book} is my favorite book")
    fun bookStep(book: Book) {
        // step implementation
    }
}
```
The docstring type example:

```java
package com.example.app;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.DocStringType;
import io.cucumber.java.en.Given;

public class StepsDefinitions {

    private static ObjectMapper objectMapper = new ObjectMapper();

    @DocStringType(contentType = "shelf_json")
    public BookShelf defineShelf(String docstring) throws JsonProcessingException {
        return objectMapper.readValue(docstring, BookShelf.class);
    }

    @Given("Books are defined by json")
    public void bookShelfStep(BookShelf bookShelf) {
        // step implementation
    }
}    
```

```kotlin
package com.example.app

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import io.cucumber.java.DocStringType
import io.cucumber.java.en.Given

class StepsDefinitions {

    companion object {

        private val objectMapper = ObjectMapper()
    }

    @DocStringType(contentType = "shelf_json")
    @Throws(JsonProcessingException::class)
    fun defineShelf(docstring: String): BookShelf {
        return objectMapper.readValue(docstring, BookShelf::class)
    }

    @Given("Books are defined by json")
    fun bookShelfStep(bookShelf: BookShelf) {
        // step implementation
    }
}
```

For lambda defined step definitions, there are `DataTableType`, `ParameterType` and `DocStringType` functions:

```java
package com.example.app;

import io.cucumber.java8.En;

import java.util.Map;

public class LambdaStepDefinitions implements En {
    
    private static ObjectMapper objectMapper = new ObjectMapper();

    public LambdaStepDefinitions() {
        
        DataTableType((Map<String, String> entry) -> new Author(
            entry.get("firstName"),
            entry.get("lastName"),
            entry.get("famousBook")
        ));


        ParameterType("book", ".*", (String bookName) -> new Book(bookName));

        DocStringType("shelf_json", (String docstring) -> {
            return objectMapper.readValue(docstring, BookShelf.class)
        });
    }
}
```
```kotlin
package com.example.kotlin

import io.cucumber.java8.En

class LambdaStepDefinitions : En {

    init {
        val objectMapper = ObjectMapper()

        ParameterType("book", ".*") { s : String ->
            Book(s)
        }

        DataTableType { entry: Map<String, String> ->
            Author(entry["firstName"], entry["lastName"], entry["famousBook"])
        }

        DocStringType("shelf_json") { docstring: String -> 
	    objectMapper.readValue(docstring, BookShelf::class)
	}
    }
}
```

Using the `@DefaultParameterTransformer`, `@DefaultDataTableEntryTransformer` and `DefaultDataTableCellTransformer` annotations also possible to plugin an ObjectMapper. The object mapper (Jackson in this example) will handle the conversion of anonymous parameter types and data table entries.

```java
package com.example

import io.cucumber.core.api.TypeRegistryConfigurer
import io.cucumber.core.api.TypeRegistry
import io.cucumber.cucumberexpressions.ParameterByTypeTransformer
import io.cucumber.datatable.TableCellByTypeTransformer
import io.cucumber.datatable.TableEntryByTypeTransformer
import com.fasterxml.jackson.databind.ObjectMapper

import java.lang.reflect.Type;

public class ParameterTypes {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @DefaultParameterTransformer
    @DefaultDataTableEntryTransformer
    @DefaultDataTableCellTransformer
    public Object transformer(Object fromValue, Type toValueType) {
        return objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType));
    }
}
```

```kotlin

package com.example.app;

import com.fasterxml.jackson.databind.ObjectMapper
import io.cucumber.java.DefaultDataTableCellTransformer
import io.cucumber.java.DefaultDataTableEntryTransformer
import io.cucumber.java.DefaultParameterTransformer

import java.lang.reflect.Type

class StepDefinitions {

    private val objectMapper = ObjectMapper()

    @DefaultParameterTransformer
    @DefaultDataTableEntryTransformer
    @DefaultDataTableCellTransformer
    fun transformer(fromValue: Any, toValueType: Type): Any {
        return objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType))
    }
}
```
For lambda defined step definitions, there are `DefaultParameterTransformer`, `DefaultDataTableCellTransformer` and `DefaultDataTableEntryTransformer` functions:
```java

package com.example.app;

import io.cucumber.java8.En;

import com.fasterxml.jackson.databind.ObjectMapper

public class LambdaStepDefinitions implements En {
    
    public LambdaSteps() {
        ObjectMapper objectMapper = new ObjectMapper();

        DefaultParameterTransformer((String fromValue, Type toValueType) ->
            objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType));

        DefaultDataTableCellTransformer((fromValue, toValueType) ->
            objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType));

        DefaultDataTableEntryTransformer((fromValue, toValueType) ->
            objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType));
    }
}    
```

```kotlin

import com.fasterxml.jackson.databind.ObjectMapper

import io.cucumber.java8.En
import java.lang.reflect.Type

class LambdaSteps : En {
    init {
        val objectMapper = ObjectMapper()

        DefaultParameterTransformer { fromValue: String, toValueType: Type -> objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType)) }

        DefaultDataTableCellTransformer { fromValue, toValueType -> objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType)) }

        DefaultDataTableEntryTransformer { fromValue, toValueType -> objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType)) }
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
)
```

Here's an example of how to use this in a step definition:
```ruby
Then /^a user {person} should have {int} followers$/ do |person, count|
  assert(person.is_a?(Person))
end
```
{{% /block %}}

{{% block "java,kotlin,ruby" %}}
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

The recommended location to define custom parameter types, would be in{{% text "ruby" %}} `features/support/parameter_types.rb`.{{% /text %}}{{% text "javascript" %}} `features/support/parameter_types.js`.{{% /text %}}{{% text "java" %}} `src/test/com/example/ParameterTypes.java`.{{% /text %}}{{% text "kotlin" %}} `src/test/com/example/ParameterTypes.kt`.{{% /text %}}
This is just a convention though; Cucumber will pick them up from any file{{% text "ruby, javascript" %}} under features.{{% /text %}}{{% text "java,kotlin" %}} on the glue path.{{% /text %}}

# Profiles

{{% block "java" %}}
Profiles are not available in Java.
{{% /block %}}

{{% block "kotlin" %}}
Profiles are not available in Kotlin.
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
2. `bvt`, which executes all Features and Scenarios [tagged](/docs/cucumber/api#tags) with `@bvt`.

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

{{% block "kotlin" %}}
Profiles are not available in Kotlin.
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

{{% block "java,kotlin,javascript" %}}
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
{{% block "java,kotlin" %}}
Cucumber-JVM does not support configuration of Cucumber with an `env` file.
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

When [running Cucumber](/docs/cucumber/api#running-cucumber), it can sometimes be handy to pass special
values to Cucumber for your [step definitions](/docs/cucumber/step-definitions) to use.

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
customisations in any `.rb` file in that directory, they will get loaded. However, be advised that in
Cucumber < 4.x, the `--dry-run` option only excludes files in `features/support` that match the regexp `/env\\..\*/`
(*note that the trailing dot is significant*). So a file with local customisations called `my_locals.rb` will be loaded regardless.
In Cucumber 4.x, all support files, including `env.rb` files, are loaded.

If you put custom files inside `features/support` that you do not wish loaded when you do a dry-run with Cucumber,
you can use the `--exclude` flag to ensure they aren't loaded. In Cucumber versions < 4.x, you can also prefix the filenames
with `env`, as in `env.local.rb`. Note that a file called `local_env.rb`, for example, does not match the regex
above and therefore will be loaded in all versions of Cucumber unless specifically excluded.

As a matter of good practice you should always run `script/generate cucumber | rails g cucumber:install` whenever you
install an updated version of Cucumber or cucumber-rails. However, this overwrites `features/support/env.rb`.
In order to keep any custom configurations from your `env.rb` file, check in your `env.rb` along with the rest of your version
controlled files and be prepared to diff and merge changes to `env.rb` between versions of Cucumber-Rails.
{{% /block %}}
