# vi: ft=make

.PHONY: build
## build: build the application
build:
	npm run build

.PHONY: run
## run: run the application
run:
	npm start

.PHONY: test
## test: run tests
test:
	npm test

.PHONY: lint
## lint: check everything's okay
lint:
	npm run lint

.PHONY: format
## format: format files
format:
	npm run lint -- --fix

.PHONY: help
## help: prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':'
