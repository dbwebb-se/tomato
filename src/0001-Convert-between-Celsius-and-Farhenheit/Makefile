#!/usr/bin/env make
#
# This is tomato, exercise to train to be a programmer.

# ------------------------------------------------------------------------
#
# General stuff, reusable for all Makefiles.
#

# Detect OS
OS = $(shell uname -s)

# Defaults
ECHO = echo

# Make adjustments based on OS
ifneq (, $(findstring CYGWIN, $(OS)))
	ECHO = /bin/echo -e
endif

# Colors and helptext
NO_COLOR	= \033[0m
ACTION		= \033[32;01m
OK_COLOR	= \033[32;01m
ERROR_COLOR	= \033[31;01m
WARN_COLOR	= \033[33;01m

# Print out colored action message
ACTION_MESSAGE = $(ECHO) "$(ACTION)---> $(1)$(NO_COLOR)"

# Which makefile am I in?
WHERE-AM-I = "$(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))"
THIS_MAKEFILE := $(call WHERE-AM-I)

# Echo some nice helptext based on the target comment
HELPTEXT = $(call ACTION_MESSAGE, $(shell egrep "^\# target: $(1) " $(THIS_MAKEFILE) | sed "s/\# target: $(1)[ ]*-[ ]* / /g"))

# Check version  and path to command and display on one line
CHECK_VERSION = printf "%-25s %-13s\n" "$(1)" "`$(1) --version $(2)`"

# Get current working directory, it may not exist as environment variable.
PWD = $(shell pwd)

# target: help                    - Displays help.
.PHONY:  help
help:
	@$(call HELPTEXT,$@)
	@sed '/^$$/q' $(THIS_MAKEFILE) | tail +3 | sed 's/#\s*//g'
	@$(ECHO) "Usage:"
	@$(ECHO) " make [target] ..."
	@$(ECHO) "target:"
	@egrep "^# target:" $(THIS_MAKEFILE) | sed 's/# target: / /g'



# ------------------------------------------------------------------------
#
# Specifics for this project.
#

# Add local bin path for test tools
#SHELL := env PATH='$(PATH)' $(SHELL)

# Tools
BIN     := .bin
BUILD   := build
SRC     := src

# PHP
VENDOR  := vendor
VBIN    := vendor/bin
PHP     := php
PHPCS   := $(BIN)/phpcs
PHPCBF  := $(BIN)/phpcbf
PHPMD   := $(BIN)/phpmd
PHPSTAN := $(VBIN)/phpstan

# JavaScript
NODE   := node
NPM    := npm
ESLINT := npx eslint #node_modules/.bin/eslint



# ----------------------------------------------------------------------------
#
# Highlevel targets
#
# target: prepare                 - Prepare to build and test.
.PHONY: prepare
prepare:
	@$(call HELPTEXT,$@)
	install -d -m 0755 $(BUILD)
	rm -f $(BUILD)/*



# target: install                 - Install needed utilities locally.
.PHONY: install
install: install-js install-php
	@$(call HELPTEXT,$@)
	install -d -m 0755 $(BIN)



# target: check                   - Check installed utilities.
.PHONY: check
check: check-js check-php
	@$(call HELPTEXT,$@)
	@$(call CHECK_VERSION, bash, | head -1)
	@$(call CHECK_VERSION, make, | head -1)



# target: test                    - Run all tests.
.PHONY: test
test: prepare phpcs phpmd phpstan eslint
	@$(call HELPTEXT,$@)



# target: clean                   - Remove all generated files.
.PHONY:  clean
clean:
	@$(call HELPTEXT,$@)
	rm -rf $(BUILD)



# target: clean-all               - Remove all installed files.
.PHONY:  clean-all
clean-all: clean
	@$(call HELPTEXT,$@)
	rm -rf $(BIN)
	rm -rf $(VENDOR) composer.lock
	rm -f package-lock.json



# ----------------------------------------------------------------------------
#
# PHP specific targets
#
# target: install-php             - Install PHP utilities.
.PHONY: install-php
install-php:
ifneq (,$(wildcard package.json))
	@$(call HELPTEXT,$@)
	npm install
endif



# target: check-php               - Check PHP utilities.
.PHONY: check-php
check-php:
ifneq (,$(wildcard .php*))
	@$(call HELPTEXT,$@)
	@[ ! -f .phpcs.xml ] || $(call CHECK_VERSION, $(PHP), | head -1)
	@[ ! -f .phpcs.xml ] || $(call CHECK_VERSION, $(PHPCS), | head -1)
	@[ ! -f .phpcs.xml ] || $(call CHECK_VERSION, $(PHPCBF), | head -1)
	@[ ! -f .phpmd.xml ] || $(call CHECK_VERSION, $(PHPMD), | head -1)
	@[ ! -f .phpstan.neon ] || $(call CHECK_VERSION, $(PHPSTAN), | head -1)
endif



# target: phpcs                   - PHP code style using phpcs.
.PHONY: phpcs
phpcs: prepare
ifneq (,$(wildcard .phpcs.xml))
	@$(call HELPTEXT,$@)
	$(PHPCS) --standard=.phpcs.xml $(SRC) | tee $(BUILD)/phpcs
endif



# target: phpcs-fix               - PHP code style using phpcbf (fix).
.PHONY: phpcs-fix
phpcs-fix: prepare
	@$(call HELPTEXT,$@)
	[ ! -f .phpcs.xml ] || $(PHPCBF) --standard=.phpcs.xml $(SRC) | tee $(BUILD)/phpcbf



# target: phpmd                   - PHP mess detector using phpmd.
.PHONY: phpmd
phpmd: prepare
ifneq (,$(wildcard .phpmd.xml))
	@$(call HELPTEXT,$@)
	$(PHPMD) $(SRC) text .phpmd.xml | tee $(BUILD)/phpmd
endif



# target: phpstan                 - PHP code analysis using phpstan.
.PHONY: phpstan
phpstan: prepare
ifneq (,$(wildcard .phpstan.neon))
	@$(call HELPTEXT,$@)
	$(PHPSTAN) analyse -c .phpstan.neon $(SRC) | tee $(BUILD)/phpstan
endif



# ----------------------------------------------------------------------------
#
# JavaScript specific targets
#
# target: install-js              - Install JavaScript utilities.
.PHONY: install-js
install-js:
ifneq (,$(wildcard package.json))
	@$(call HELPTEXT,$@)
	npm install
endif



# target: check-js                - Check JavaScript utilities.
.PHONY: check-js
check-js:
ifneq (,$(wildcard .eslintrc.json))
	@$(call HELPTEXT,$@)
	@$(call CHECK_VERSION, $(NODE), | head -1)
	@$(call CHECK_VERSION, $(NPM), | head -1)
	@[ ! -f .eslintrc.json ] || $(call CHECK_VERSION, $(ESLINT), | head -1)
endif



# target: eslint                  - JavaScript code style using eslint.
.PHONY: eslint
eslint: prepare
ifneq (,$(wildcard .eslintrc.json))
	@$(call HELPTEXT,$@)
	$(ESLINT) $(SRC) | tee $(BUILD)/eslint
endif



# target: eslint-fix              - JavaScript code style using eslint (fix).
.PHONY: eslint-fix
eslint-fix: prepare
	@$(call HELPTEXT,$@)
	[ ! -f .eslintrc.json ] || $(ESLINT) $(SRC) --fix | tee $(BUILD)/eslint
