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
    '@openapi-typescript-infra/coconfig': '^3.2.0',
    '@openapi-typescript-infra/service': '^1.1.3',
  } as Record<string, string>;
  if (features.includes('db')) {
    Object.assign(deps, {
      kysely: '^0.24.2',
      pg: '^8.11.0',
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
    coconfig: '^0.12.2',
    '@openapi-typescript-infra/service-tester': '^1.0.5',
    '@typescript-eslint/eslint-plugin': '^6.1.0',
    '@typescript-eslint/parser': '^6.1.0',
    '@types/jest': '^29.5.3',
    eslint: '^8.45.0',
    'eslint-config-prettier': '^8.8.0',
    'eslint-plugin-cypress': '^2.13.3',
    'eslint-plugin-import': '^2.27.5',
    'eslint-plugin-jest': '^27.2.3',
    jest: '^29.6.1',
    'jest-openapi': '^0.14.2',
    'prettier': '^3.0.0',
    'ts-jest': '^29.1.1',
    typescript: '^5.1.6',
  };
  if (features.includes('db')) {
    Object.assign(deps, {
      'run-pg-sql': '^1.1.0',
      'db-migrate': '^0.11.13',
      'db-migrate-pg': '^1.3.0',
      'kysely-codegen': '^0.10.0',
    });
  }
  return sortByKey(deps);
}
