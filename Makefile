MONGO = mongo
DB_URI := $(shell node -e \
	'console.log(require("$(CURDIR)/config/keys_dev.js").mongoURI)')

all:
	@echo "${DB_URI}"

connect:
	${MONGO} "${DB_URI}"
