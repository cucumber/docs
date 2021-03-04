# Gherkin Internationalization Table

The table can be updated automatically using make *from the root folder of 
the repo*:

```sh
yarn upgrade
make layouts/shortcodes/gherkin-i18n-table.html 
```

`yarn upgrade` will upgrade `@cucumber/gherkin` to get back the last version 
of the file `gherkin-languages.json`.

`make layouts/shortcodes/gherkin-i18n-table.html` will automatically update
`gherkin-i18n-table.html` based on `gherkin-languages.json`.
