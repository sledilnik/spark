IMAGE := klakegg/hugo:0.78.2-ext
UID := $(shell id -u)

PORT ?= 1313

.PHONY: all clean build run

all: clean build

build: yarn.lock layouts/partials/i18n/messages.json
	docker run --rm -u $(UID) -v $(CURDIR):/src $(IMAGE) build

run: yarn.lock layouts/partials/i18n/messages.json
	docker run --rm -u $(UID) -p$(PORT):1313 -v $(CURDIR):/src $(IMAGE) server -D --debug

clean:
	rm -rf public resources/_gen

yarn.lock: node_modules package.json
	docker run --rm -u $(UID) -v $(CURDIR):/src --entrypoint /usr/bin/yarn $(IMAGE) install

layouts/partials/i18n/messages.json: i18n/sl.json i18n/en.json
	docker run --rm -u $(UID) -v $(CURDIR):/src --entrypoint /usr/bin/yarn $(IMAGE) js-i18n

node_modules:
	mkdir -p $@



