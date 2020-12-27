IMAGE := klakegg/hugo:0.78.2-ext
UID := $(shell id -u)

PORT ?= 1313

.PHONY: all clean build run

all: clean build

build: yarn.lock
	docker run --rm -u $(UID) -it -v $(CURDIR):/src $(IMAGE) build

run:
	docker run --rm -u $(UID) -p$(PORT):1313 -it -v $(CURDIR):/src $(IMAGE) server -D --debug

clean:
	rm -rf public resources/_gen

yarn.lock: node_modules package.json
	docker run --rm -u $(UID) -it -v $(CURDIR):/src --entrypoint /usr/bin/yarn $(IMAGE) install

node_modules:
	mkdir -p $@



