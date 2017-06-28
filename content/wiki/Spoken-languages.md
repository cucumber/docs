+++
title = "Spoken languages"
source = "https://github.com/cucumber/cucumber/wiki/Spoken-languages/
menu = ["all", "wiki"]
+++

Communication within a team always works better when people can use their spoken language. Cucumber supports over [60 spoken languages](https://github.com/cucumber/cucumber/blob/master/gherkin/gherkin-languages.json) and the number is steadily growing. This is Norwegian:

```gherkin
# language: no
Egenskap: Summering
  For å unngå at firmaet går konkurs
  Må regnskapsførerere bruke en regnemaskin for å legge sammen tall

  Scenario: to tall
    Gitt at jeg har tastet inn 5
    Og at jeg har tastet inn 7
    Når jeg summerer
    Så skal resultatet være 12

  Scenario: tre tall
    Gitt at jeg har tastet inn 5
    Og at jeg har tastet inn 7
    Og at jeg har tastet inn 1
    Når jeg summerer
    Så skal resultatet være 13
```

A `# language:` header on the first line of a feature file tells Cucumber what spoken language to use - for example `# language: fr` for French. If you omit this header, Cucumber will default to English (`en`).

## Listing the available languages

    cucumber --i18n help

## Listing the keywords of a particular language

For example Russian:

    cucumber --i18n ru

## Adding a new language

It's easy! 

* Make a [fork](https://help.github.com/articles/fork-a-repo/) of [Gherkin3](http://github.com/cucumber/gherkin3)
* Add your language's keywords to [gherkin-languages.json](https://github.com/cucumber/cucumber/blob/master/gherkin/gherkin-languages.json)
* Commit and push your changes - then send a [pull request](https://help.github.com/articles/using-pull-requests/).

That's it! When a new release of gherkin is made you can specify in a <code># language: xx</code> header in your feature files.

## Adding examples for a new language

The examples live in the Cucumber codebase.

Just copy the `examples/i18n/en` example to a new directory with the same name as the language you added. Then translate everything in there. When you're done you should be able to run `rake i18n` from the `examples/i18n` directory. If you want this code back into the official source you have to do those changes in your own cloned Git repo and send a pull request.

## Selecting a language from the command line

You can select a language from the command line using the `-L` or `--language` flag, followed by the two-letter language code. Run `cucumber --i18n help` to view the list of available languages and their two-letter codes.
