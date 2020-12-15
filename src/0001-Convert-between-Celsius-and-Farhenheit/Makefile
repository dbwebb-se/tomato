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
OUTPUT  := .output

# PHP
VENDOR  := vendor
VBIN    := vendor/bin
PHP     := php
PHPCS   := $(BIN)/phpcs
PHPCBF  := $(BIN)/phpcbf
PHPMD   := $(BIN)/phpmd
PHPSTAN := $(VBIN)/phpstan
PHPUNIT := $(VBIN)/phpunit

# JavaScript
NODE   := node
NPM    := npm
ESLINT := npx eslint



# ----------------------------------------------------------------------------
#
# Highlevel targets
#
# target: prepare                 - Prepare to build and test.
.PHONY: prepare
prepare:
	@$(call HELPTEXT,$@)
	install -d -m 0755 $(BUILD)
	rm -rf $(BUILD)/*



# target: install                 - Install needed utilities locally.
.PHONY: install
install: install-js install-php
	@$(call HELPTEXT,$@)



# target: check                   - Check installed utilities.
.PHONY: check
check: check-js check-php
	@$(call HELPTEXT,$@)
	@$(call CHECK_VERSION, bash, | head -1)
	@$(call CHECK_VERSION, make, | head -1)



# target: analyse                 - Run all static code analysis.
.PHONY: analyse
analyse: prepare phpcs phpmd phpstan eslint
	@$(call HELPTEXT,$@)



# target: unittest                - Run all unittests.
.PHONY: unittest
unittest: prepare
	@$(call HELPTEXT,$@)



# target: test                    - Run all analysis and tests.
.PHONY: test
test: analyse unittest
	@$(call HELPTEXT,$@)



# target: clean                   - Remove all generated files.
.PHONY: clean
clean:
	@$(call HELPTEXT,$@)
	rm -rf $(BUILD)
	rm -f .phpunit.result.cache



# target: clean-all               - Remove all installed files.
.PHONY:  clean-all
clean-all: clean
	@$(call HELPTEXT,$@)
	rm -rf $(BIN)
	rm -rf $(VENDOR) composer.lock
	rm -f package-lock.json



# target: all                     - Check tomato in all aspects.
.PHONY: all
all: clean install analyse test
	@$(call HELPTEXT,$@)



# ----------------------------------------------------------------------------
#
# Local targets?
#
# target: output                  - Create output (dev only).
.PHONY: output
output:
ifneq (,$(wildcard .output))
	@$(call HELPTEXT,$@)
	php $(SRC)/convert_1.php > $(OUTPUT)/convert_1.php
	php $(SRC)/convert_2.php > $(OUTPUT)/convert_2.php
	node $(SRC)/convert_1.js > $(OUTPUT)/convert_1.js
	node $(SRC)/convert_2.js > $(OUTPUT)/convert_2.js
endif

# target: level1                  - Check Level 1 entry tests.
.PHONY: level1
level1: level1-php
	@$(call HELPTEXT,$@)

# target: level1-php              - Check Level 1 entry tests (PHP).
.PHONY: level1-php
level1-php:
	@$(call HELPTEXT,$@)
	@$(call ASSERT_FILE_EXISTS, $(SRC)/convert_1.php)

	@[ ! -f $(SRC)/convert_1.php ] \
		|| printf "$(ERROR_COLOR) Missing file '$(SRC)/convert_1.php'.\n"

# target: level1-js               - Check Level 1 entry tests (JavaScript).
.PHONY: level1-js
level1-js:
	@$(call HELPTEXT,$@)




# ----------------------------------------------------------------------------
#
# PHP specific targets
#
# target: install-php             - Install PHP utilities.
.PHONY: install-php
install-php:
ifneq (,$(wildcard .php*))
	@$(call HELPTEXT,$@)
	[ ! -f composer.json ] || composer install
	[ ! -f .phpcs.xml ] || curl -Lso $(PHPCS) https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar && chmod 755 $(PHPCS)
	[ ! -f .phpcs.xml ] || curl -Lso $(PHPCBF) https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar && chmod 755 $(PHPCBF)
	[ ! -f .phpmd.xml ] || curl -Lso $(PHPMD) https://github.com/phpmd/phpmd/releases/download/2.9.1/phpmd.phar && chmod 755 $(PHPMD)
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
	@[ ! -f .phpunit.xml ] || $(call CHECK_VERSION, $(PHPUNIT), | head -1)
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



# target: phpunit                 - PHP unit test using phpunit.
.PHONY: phpunit
phpunit: prepare
ifneq (,$(wildcard .phpunit.xml))
	@$(call HELPTEXT,$@)
	$(PHPUNIT) --configuration .phpunit.xml $(options)
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
