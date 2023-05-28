# Makefiles are useful for slightly more complex scenarios than npm scripts can easily handle.
# You can use gulp or whatever other thing you like, but we prefer the simplicity of Make.

.PHONY: all build clean

all: service {{#inArray features 'db'}}dbi {{/inArray}}$(word 1, $(build_files))

{{#inArray features 'db'}}export DB_NAME ?= {{dbName}}
{{/inArray}}export SERVICE_NAME ?= {{dashCase name}}

include node_modules/@openapi-typescript-infra/service/Makefile
