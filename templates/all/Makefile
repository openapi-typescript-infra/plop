#!make
.PHONY: all build clean

src_files := $(shell find src -name '*.ts')
build_files := $(patsubst src/%.ts,build/%.js,$(src_files))

export PGUSER ?= postgres
export PGPASSWORD ?= postgres
export PGHOST ?= localhost

all: service {{#inArray features 'db'}}dbi {{/inArray}}$(word 1, $(build_files))

ts: $(word 1, $(build_files))

$(word 1, $(build_files)): $(src_files)
	./node_modules/.bin/tsc -p tsconfig.build.json

clean:
	yarn dlx rimraf ./build src/generated

service: src/generated/service/index.ts

{{#inArray features 'db'}}
db-ci:
	yarn run-pg-sql -q postgres ./migrations/setup/ci_setup.sql
	yarn run-pg-sql -q postgres ./migrations/setup/db_setup.sql
	yarn migration:apply
	yarn run-pg-sql {{dbName}} ./migrations/setup/dev_setup.sql

db-drop:
	yarn run-pg-sql -q {{dbName}} ./migrations/setup/db_clean.sql || true

db+:
	yarn migration:apply

db-:
	yarn migration:undo

db-clean: db-drop db-ci

dbi:
	echo "Generating database types"
	DATABASE_URL=postgres://$(PGUSER):$(PGPASSWORD)@$(PGHOST)/{{dbName}} yarn kysely-codegen \
		--dialect postgres --schema public \
		--out-file src/generated/database.ts
{{/inArray}}

src/generated/service/index.ts: api/{{dashCase name}}.yaml
	echo "Building service interface"
	yarn dlx openapi-typescript-express ./api/{{dashCase name}}.yaml \
		--output ./src/generated/service/index.ts
	./node_modules/.bin/prettier ./src/generated/service/index.ts --write
