all: build htmlproofer
.PHONY: all

build:
	hugo
.PHONY: build

htmlproofer: build Gemfile.lock
	htmlproofer --extension .html public
.PHONY: htmlproofer

Gemfile.lock: Gemfile
	ruby --version
	gem list
	bundle

clean:
	git clean -dfx
.PHONY: build
