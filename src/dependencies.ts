function sortByKey(deps: Record<string, string>) {
  return Object.keys(deps)
    .sort()
    .reduce((obj, key) => {
      obj.push({ name: key, spec: deps[key] });
      return obj;
    }, [] as { name: string; spec: string }[]);
}

export function dependencies({ features }: { features: string[] }) {
  const deps = {
    '@openapi-typescript-infra/coconfig': '^4.2.0',
    '@openapi-typescript-infra/service': '^4.5.1',
  } as Record<string, string>;
  if (features.includes('db')) {
    Object.assign(deps, {
      kysely: '^0.26.3',
      pg: '^8.11.3',
    });
  }
  if (features.includes('redis')) {
    Object.assign(deps, {
      ioredis: '^5.3.2',
    });
  }
  return sortByKey(deps);
}

export function devDependencies({ features }: { features: string[] }) {
  const deps = {
    coconfig: '^0.13.3',
    '@openapi-typescript-infra/service-tester': '^4.0.1',
    '@typescript-eslint/eslint-plugin': '^6.8.0',
    '@typescript-eslint/parser': '^6.8.0',
    eslint: '^8.51.0',
    'eslint-config-prettier': '^9.0.0',
    'eslint-plugin-import': '^2.28.1',
    prettier: '^3.0.3',
    typescript: '^5.2.2',
    vitest: '^0.34.4',
  };
  if (features.includes('db')) {
    Object.assign(deps, {
      'run-pg-sql': '^1.2.0',
      'db-migrate': '^0.11.14',
      'db-migrate-pg': '^1.5.2',
      'kysely-codegen': '^0.10.1',
    });
  }
  return sortByKey(deps);
}
