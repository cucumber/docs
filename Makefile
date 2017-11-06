all: hugo static/js/lunr-index.json htmlproofer
.PHONY: all

hugo:
	hugo
.PHONY: hugo

static/js/lunr-index.json: public/index.json
	cat $< | node themes/cucumber-hugo/tools/lunr/buildIndex.js > $@

public/index.json:
	hugo

htmlproofer: hugo Gemfile.lock
	ruby themes/cucumber-hugo/tools/htmlproofer/htmlproofer.rb
.PHONY: htmlproofer

Gemfile.lock: Gemfile
	bundle

clean:
	git clean -dfx
.PHONY: build
