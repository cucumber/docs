site: hugo htmlproofer
.PHONY: site

site-with-search: site static/js/lunr-index.json static/js/lunr.js
.PHONY: site-with-search

hugo:
	hugo
.PHONY: hugo

static/js/lunr-index.json: public/index.json node_modules/lunr/lib/lunr.js
	cat $< | node themes/cucumber-hugo/tools/lunr/buildIndex.js > $@

static/js/lunr.js: node_modules/lunr/lunr.js
	cp $< $@

public/index.json:
	hugo

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
