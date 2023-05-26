#!make
.PHONY: all build clean

src_files := $(shell find src -name '*.ts')
build_files := $(patsubst src/%.ts,build/%.js,$(src_files))

PGUSER := postgres
PGPASSWORD := postgres
PGHOST := localhost

all: service {{#inArray features 'db'}}dbi {{/inArray}}$(word 1, $(build_files))

ts: $(word 1, $(build_files))

$(word 1, $(build_files)): $(src_files)
	./node_modules/.bin/tsc -p tsconfig.build.json

clean:
	yarn dlx rimraf ./build src/generated

service: src/generated/service/index.ts

{{#inArray features 'db'}}
db-ci:
	PGHOST=$(PGHOST) PGUSER=$(PGUSER) PGPASSWORD=$(PGPASSWORD) yarn dlx run-pg-sql -q postgres ./migrations/setup/ci_setup.sql
	PGHOST=$(PGHOST) PGUSER=$(PGUSER) PGPASSWORD=$(PGPASSWORD) yarn dlx run-pg-sql -q postgres ./migrations/setup/db_setup.sql
	yarn migration:apply
	PGHOST=$(PGHOST) PGUSER=$(PGUSER) PGPASSWORD=$(PGPASSWORD) yarn dlx run-pg-sql {{dbName}} ./migrations/setup/dev_setup.sql

db-drop:
	PGHOST=$(PGHOST) PGUSER=$(PGUSER) PGPASSWORD=$(PGPASSWORD) yarn dlx run-pg-sql -q {{dbName}} ./migrations/setup/db_clean.sql || true

db-clean: db-drop db-ci

dbi:
	echo "Generating database types"
	DATABASE_URL=postgres://postgres:postgres@localhost/{{dbName}} yarn kysely-codegen \
		--dialect postgres --schema public \
		--out-file src/generated/database.ts
{{/inArray}}

src/generated/service/index.ts: api/{{dashCase name}}.yaml
	echo "Building service interface"
	yarn dlx openapi-typescript-express ./api/{{dashCase name}}.yaml \
		--output ./src/generated/service/index.ts
	./node_modules/.bin/prettier ./src/generated/service/index.ts --write
