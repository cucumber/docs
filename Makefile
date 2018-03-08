site: hugo htmlproofer
.PHONY: site

site-with-search: layouts/shortcodes/gherkin-i18n-table.html site static/js/lunr-index.json static/js/lunr.js
	# Need to run hugo again to copy over lunr-index.json 
	hugo
.PHONY: site-with-search

hugo:
	hugo
.PHONY: hugo

static/js/lunr-index.json: public/index.json node_modules/lunr/lib/lunr.js
	cat $< | node themes/cucumber-hugo/tools/lunr/buildIndex.js > $@

static/js/lunr.js: node_modules/lunr/lunr.js
	cp $< $@

layouts/shortcodes/gherkin-i18n-table.html: node_modules/gherkin/lib/gherkin/gherkin-languages.json layouts/shortcodes/gherkin-i18n-table-jq.txt
	cat $< | jq --sort-keys --from-file layouts/shortcodes/gherkin-i18n-table-jq.txt --raw-output --compact-output > $@

public/index.json:
	hugo

node_modules/gherkin/lib/gherkin/gherkin-languages.json:
	yarn

node_modules/lunr/lib/lunr.js:
	yarn

htmlproofer: hugo Gemfile.lock
	ruby themes/cucumber-hugo/tools/htmlproofer/htmlproofer.rb
.PHONY: htmlproofer

Gemfile.lock: Gemfile
	bundle

clean:
	git clean -dfx
.PHONY: build
