all: build htmlproofer
.PHONY: all

build:
	hugo
.PHONY: build

htmlproofer: build
	htmlproofer --extension .html public
.PHONY: htmlproofer

clean:
	rm -rf public
.PHONY: build
