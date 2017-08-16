all: build htmlproofer
.PHONY: all

build:
	hugo
.PHONY: build

htmlproofer: build Gemfile.lock
	htmlproofer --extension .html public
.PHONY: htmlproofer

Gemfile.lock: Gemfile
	bundle

clean:
	git clean -dfx
.PHONY: build
