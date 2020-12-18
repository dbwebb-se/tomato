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
BIN     := ../.bin
BUILD   := build
SRC     := src
TOMATO  := .tomato
include ../$(TOMATO)/config.bash
include $(TOMATO)/config.bash

# Bats
BATS    := npx bats
BATS_TEST := $(TOMATO)/test/bats

# PHP
VENDOR  := ../vendor
VBIN    := $(VENDOR)/bin
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
MOCHA  := npx mocha
MOCHA_TEST := $(TOMATO)/test/mocha



# ----------------------------------------------------------------------------
#
# Local exercise targets
#
# target: level1                  - Check Level 1 tests.
.PHONY: level1
level1:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level1.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level1.bats
endif



# target: level2                  - Check Level 2 tests.
.PHONY: level2
level2:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level1.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level1.bats
endif



# target: level3                  - Check Level 3 tests.
.PHONY: level3
level3:
	@$(call HELPTEXT,$@)
ifeq ($(PHP), true)
	$(BATS) $(BATS_TEST)/php/Level1.bats
endif
ifeq ($(JAVASCRIPT), true)
	$(BATS) $(BATS_TEST)/javascript/Level1.bats
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



# ----------------------------------------------------------------------------
#
# PHP specific targets
#
# target: phpcs                   - PHP code style using phpcs.
.PHONY: phpcs
phpcs: prepare
ifneq (,$(wildcard ../.phpcs.xml))
	@$(call HELPTEXT,$@)
	$(PHPCS) --standard=../.phpcs.xml $(SRC) | tee $(BUILD)/phpcs
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


# target: mocha                   - JavaScript unit test (Mocha).
.PHONY: mocha
mocha: prepare
ifneq (,$(wildcard $(MOCHA_TEST)))
	@$(call HELPTEXT,$@)
	$(MOCHA) $(MOCHA_TEST)
endif
