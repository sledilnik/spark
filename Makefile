IMAGE := klakegg/hugo:0.78.2-ext
UID := $(shell id -u)

PORT ?= 1313

.PHONY: all clean build run

all: clean build

build: yarn.lock layouts/partials/i18n/messages.json
	hugo

run: yarn.lock layouts/partials/i18n/messages.json
	hugo server -D --debug

clean:
	rm -rf public resources/_gen

yarn.lock: node_modules package.json
	yarn install

layouts/partials/i18n/messages.json: i18n/sl.json i18n/en.json
	yarn js-i18n

node_modules:
	mkdir -p $@



