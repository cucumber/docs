DOCKER_TAG = $(shell cat Dockerfile | md5sum | cut -d ' ' -f 1)
DOCKER_IMAGE = cucumber/hugo:$(DOCKER_TAG)

define DOCKER_SHELL
#!/bin/sh
docker run -p 1313:1313 --volume $$(pwd):/app -it $(DOCKER_IMAGE) $$@
endef
export DOCKER_SHELL

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

htmlproofer: hugo
	ruby themes/cucumber-hugo/tools/htmlproofer/htmlproofer.rb
.PHONY: htmlproofer

.docker-$(DOCKER_TAG): Dockerfile
	docker build --rm --tag $(DOCKER_IMAGE) .
	touch $@

docker_shell.sh: .docker-$(DOCKER_TAG) Makefile
	@echo "$$DOCKER_SHELL" > $@
	chmod +x $@

docker_push:
	docker push $(DOCKER_IMAGE)
.PHONY: docker_push

clean:
	rm -rf public
.PHONY: clean
