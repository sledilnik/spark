.PHONY: all clean build run

GENERATED := layouts/partials/i18n/messages.json static/webfonts

all: clean build

build: yarn.lock $(GENERATED)
	hugo

run: yarn.lock $(GENERATED)
	hugo server -D --debug

clean:
	rm -rf public resources/_gen layouts/partials/i18n/messages.json static/webfonts

clean-full: clean
	rm -rf node_modules

yarn.lock: node_modules package.json
	yarn install

layouts/partials/i18n/messages.json: i18n/sl.json i18n/en.json
	mkdir -p layouts/partials/i18n
	yarn js-i18n

static/webfonts: node_modules/@fortawesome/fontawesome-free/webfonts
	mkdir -p $@
	cp -r $</* -t $@

node_modules/@fortawesome/fontawesome-free/webfonts: yarn.lock

node_modules:
	mkdir -p $@



