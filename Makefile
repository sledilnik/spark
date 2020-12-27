run:
	docker run --rm -u 1000 -p1313:1313 -it -v $$(pwd):/src klakegg/hugo:0.78.2-ext server -D --debug