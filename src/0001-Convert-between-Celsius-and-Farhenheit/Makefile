#!/usr/bin/env make
#
# This is a tomato, an exercise to train to be a programmer.

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
CHECK_VERSION = printf "%-15s %-13s %s\n" "`basename $(1)`" "`$(1) --version $(2)`" "`which $(1)`"

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
PHPCS   := $(BIN)/phpcs
PHPCBF  := $(BIN)/phpcbf
PHPMD   := $(BIN)/phpmd
PHPSTAN := $(VBIN)/phpstan



# ----------------------------------------------------------------------------
#
# Highlevel targets
#
# target: prepare                 - Prepare the build directory.
.PHONY: prepare
prepare:
	@$(call HELPTEXT,$@)
	install -d -m 0755 $(BIN) $(BUILD)



# target: install                 - Install needed utilities locally.
.PHONY: install
install: prepare
	@$(call HELPTEXT,$@)

	@# PHP
	[ ! -f .phpcs.xml ] || curl -Lso $(PHPCS) https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar && chmod 755 $(PHPCS)
	[ ! -f .phpcs.xml ] || curl -Lso $(PHPCBF) https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar && chmod 755 $(PHPCBF)
	[ ! -f .phpmd.xml ] || curl -Lso $(PHPMD) https://github.com/phpmd/phpmd/releases/download/2.9.1/phpmd.phar && chmod 755 $(PHPMD)
	[ ! -f composer.json ] || composer install

	@# JavaScript
	[ ! -f package.json ] || npm install



# target: check                   - Check installed utilities.
.PHONY: check
check:
	@$(call HELPTEXT,$@)
	@$(call CHECK_VERSION, make, | head -1)
	# PHP
	@[ ! -f .phpcs.xml ] || $(call CHECK_VERSION, $(PHPCS), | head -1)
	@[ ! -f .phpcs.xml ] || $(call CHECK_VERSION, $(PHPCBF), | head -1)
	@[ ! -f .phpmd.xml ] || $(call CHECK_VERSION, $(PHPMD), | head -1)
	@[ ! -f .phpstan.neon ] || $(call CHECK_VERSION, $(PHPSTAN), | head -1)



# target: test                    - Run all tests.
.PHONY: test
test: phpcs phpmd phpstan
	@$(call HELPTEXT,$@)



# target: clean                   - Remove all generated files.
.PHONY:  clean
clean:
	@$(call HELPTEXT,$@)



# target: clean-all               - Remove all installed files.
.PHONY:  clean-all
clean-all: clean
	@$(call HELPTEXT,$@)
	rm -rf $(BIN) $(BUILD)
	rm -rf $(VENDOR) composer.lock



# ----------------------------------------------------------------------------
#
# Specific targets
#
# target: phpcs                   - PHP Code Style using phpcs.
.PHONY: phpcs
phpcs:
	@$(call HELPTEXT,$@)
	[ ! -f .phpcs.xml ] || $(PHPCS) --standard=.phpcs.xml $(SRC) | tee $(BUILD)/phpcs



# target: phpcs-fix               - PHP Code Style using phpcbf (fix).
.PHONY: phpcs-fix
phpcs-fix:
	@$(call HELPTEXT,$@)
	[ ! -f .phpcs.xml ] || $(PHPCBF) --standard=.phpcs.xml $(SRC) | tee $(BUILD)/phpcbf



# target: phpmd                   - PHP Mess detector using phpmd.
.PHONY: phpmd
phpmd:
	@$(call HELPTEXT,$@)
	[ ! -f .phpmd.xml ] || $(PHPMD) $(SRC) text .phpmd.xml | tee $(BUILD)/phpmd



# target: phpstan                 - PHP code analysis using phpstan.
.PHONY: phpstan
phpstan:
	@$(call HELPTEXT,$@)
	[ ! -f .phpstan.neon ] || $(PHPSTAN) analyse -c .phpstan.neon $(SRC) | tee $(BUILD)/phpstan
