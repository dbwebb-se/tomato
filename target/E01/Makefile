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

# # Tools
BASE := ..
BIN     := $(BASE)/.bin
BUILD   := build
SRC     := src
TOMATO  := .tomato
include ../$(TOMATO)/config.bash
include $(TOMATO)/config.bash

# Bats
BATS    := npx bats
BATS_TEST := $(TOMATO)/test/bats

# PHP
VENDOR  := $(BASE)/vendor
VBIN    := $(VENDOR)/bin
PHP     := php
PHPCS   := $(BIN)/phpcs
PHPCBF  := $(BIN)/phpcbf
PHPMD   := $(BIN)/phpmd
PHPSTAN := $(VBIN)/phpstan
PHPUNIT := $(VBIN)/phpunit
PHPUNIT_TEST := $(TOMATO)/test/phpunit

# JavaScript
NODE   := node
NPM    := npm
ESLINT := npx eslint
MOCHA  := npx mocha
MOCHA_TEST := $(TOMATO)/test/mocha



# ----------------------------------------------------------------------------
#
# Local exercise targets
#
# target: level1                  - Check Level 1.
.PHONY: level1
level1: prepare
	@$(call HELPTEXT,$@)
ifeq ($(LANG_PHP), true)
	@printf " %-10s..." "bats"
	@$(BATS) $(BATS_TEST)/php/Level1.bats > $(BUILD)/phpcs
	@printf " ok.\n"
ifneq (,$(wildcard $(BASE)/.phpcs.xml))
	@printf " %-10s..." "phpcs"
	@$(PHPCS) --standard=$(BASE)/.phpcs.xml $(SRC) > $(BUILD)/phpcs
	@printf " ok.\n"
endif
ifneq (,$(wildcard $(BASE)/.phpmd.xml))
	@printf " %-10s..." "phpmd"
	@$(PHPMD) $(SRC) text $(BASE)/.phpmd.xml > $(BUILD)/phpmd
	@printf " ok.\n"
endif
ifneq (,$(wildcard $(BASE)/.phpstan.neon))
	@printf " %-10s..." "phpstan"
	@$(PHPSTAN) analyse -c $(BASE)/.phpstan.neon -q $(SRC) &> $(BUILD)/phpstan
	@printf " ok.\n"
endif
ifneq (,$(wildcard $(BASE)/.phpunit.xml))
	@printf " %-10s..." "phpunit"
	@$(PHPUNIT) --configuration $(BASE)/.phpunit.xml --bootstrap $(PHPUNIT_TEST)/config.php $(PHPUNIT_TEST) > $(BUILD)/phpunit
	@printf " ok.\n"
endif
endif

ifeq ($(LANG_JS), true)
	$(BATS) $(BATS_TEST)/javascript/Level1.bats
endif



# target: level2                  - Check Level 2.
.PHONY: level2
level2:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level2.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level2.bats
endif



# target: level3                  - Check Level 3.
.PHONY: level3
level3:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level3.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level3.bats
endif



# target: level4                  - Check Level 4.
.PHONY: level4
level4:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level4.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level4.bats
endif



# target: level5                  - Check Level 5.
.PHONY: level5
level5:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level5.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level5.bats
endif




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



# target: clean                   - Remove all generated files.
.PHONY: clean
clean:
	@$(call HELPTEXT,$@)
	rm -rf $(BUILD)



# ----------------------------------------------------------------------------
#
# PHP specific targets
#
# target: phpcs                   - PHP code style using phpcs.
.PHONY: phpcs
phpcs: prepare
ifneq (,$(wildcard $(BASE)/.phpcs.xml))
	@$(call HELPTEXT,$@)
	$(PHPCS) --standard=$(BASE)/.phpcs.xml $(SRC) | tee $(BUILD)/phpcs
endif



# target: phpcs-fix               - PHP code style using phpcbf (fix).
.PHONY: phpcs-fix
phpcs-fix: prepare
	@$(call HELPTEXT,$@)
	[ ! -f $(BASE)/.phpcs.xml ] || $(PHPCBF) --standard=$(BASE)/.phpcs.xml $(SRC) | tee $(BUILD)/phpcbf



# target: phpmd                   - PHP mess detector using phpmd.
.PHONY: phpmd
phpmd: prepare
ifneq (,$(wildcard $(BASE)/.phpmd.xml))
	@$(call HELPTEXT,$@)
	$(PHPMD) $(SRC) text $(BASE)/.phpmd.xml | tee $(BUILD)/phpmd
endif



# target: phpstan                 - PHP code analysis using phpstan.
.PHONY: phpstan
phpstan: prepare
ifneq (,$(wildcard $(BASE)/.phpstan.neon))
	@$(call HELPTEXT,$@)
	$(PHPSTAN) analyse -c $(BASE)/.phpstan.neon $(SRC) | tee $(BUILD)/phpstan
endif



# target: phpunit                 - PHP unit test using phpunit.
.PHONY: phpunit
phpunit: prepare
ifneq (,$(wildcard $(BASE)/.phpunit.xml))
	@$(call HELPTEXT,$@)
	$(PHPUNIT) --configuration $(BASE)/.phpunit.xml --bootstrap $(PHPUNIT_TEST)/config.php $(PHPUNIT_TEST)
endif



# ----------------------------------------------------------------------------
#
# JavaScript specific targets
#
# target: eslint                  - JavaScript code style using eslint.
.PHONY: eslint
eslint: prepare
ifneq (,$(wildcard $(BASE)/.eslintrc.json))
	@$(call HELPTEXT,$@)
	$(ESLINT) -c $(BASE)/.eslintrc.json $(SRC) | tee $(BUILD)/eslint
endif



# target: eslint-fix              - JavaScript code style using eslint (fix).
.PHONY: eslint-fix
eslint-fix: prepare
	@$(call HELPTEXT,$@)
	[ ! -f $(BASE)/.eslintrc.json ] || $(ESLINT) -c $(BASE)/.eslintrc.json  $(SRC) --fix | tee $(BUILD)/eslint


# target: mocha                   - JavaScript unit test (Mocha).
.PHONY: mocha
mocha: prepare
ifneq (,$(wildcard $(MOCHA_TEST)))
	@$(call HELPTEXT,$@)
	$(MOCHA) $(MOCHA_TEST)
endif
