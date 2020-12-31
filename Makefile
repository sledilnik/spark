.PHONY: all clean build run

all: clean build

build: yarn.lock layouts/partials/i18n/messages.json
	hugo

run: yarn.lock layouts/partials/i18n/messages.json
	hugo server -D --debug

clean:
	rm -rf public resources/_gen layouts/partials/i18n/messages.json

yarn.lock: node_modules package.json
	yarn install

layouts/partials/i18n/messages.json: i18n/sl.json i18n/en.json
	mkdir -p layouts/partials/i18n
	yarn js-i18n

node_modules:
	mkdir -p $@



