all: build htmlproofer
.PHONY: all

build:
	hugo
.PHONY: build

htmlproofer: build Gemfile.lock
	ruby tools/htmlproofer/htmlproofer.rb
.PHONY: htmlproofer

Gemfile.lock: Gemfile
	bundle

clean:
	git clean -dfx
.PHONY: build
