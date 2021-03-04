DOCKER_TAG = $(shell cat Dockerfile | md5sum | cut -d ' ' -f 1)
DOCKER_IMAGE = cucumber/hugo:$(DOCKER_TAG)

define DOCKER_SHELL
#!/bin/sh
docker run -p 1313:1313 --volume $$(pwd):/app -it $(DOCKER_IMAGE) $$@
endef
export DOCKER_SHELL

hugo:
	hugo
.PHONY: hugo

htmlproofer: hugo
	ruby themes/cucumber-hugo/tools/htmlproofer/htmlproofer.rb
.PHONY: htmlproofer

layouts/shortcodes/gherkin-i18n-table.html: node_modules/@cucumber/gherkin/dist/src/gherkin-languages.json layouts/shortcodes/gherkin-i18n-table-jq.txt
	cat $< | jq --sort-keys --from-file layouts/shortcodes/gherkin-i18n-table-jq.txt --raw-output --compact-output > $@

node_modules/@cucumber/gherkin/dist/src/gherkin-languages.json:
	yarn

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
