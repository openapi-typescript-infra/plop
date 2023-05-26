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
    '@openapi-typescript-infra/coconfig': '^3.0.2',
    '@openapi-typescript-infra/service': '^1.0.1',
  } as Record<string, string>;
  if (features.includes('db')) {
    Object.assign(deps, {
      kysely: '^0.24.2',
      pg: '^8.11.0',
    });
  }
  return sortByKey(deps);
}

export function devDependencies({ features }: { features: string[] }) {
  const deps = {
    coconfig: '^0.10.1',
    '@openapi-typescript-infra/service-tester': '^1.0.3',
    '@typescript-eslint/eslint-plugin': '^5.59.7',
    '@typescript-eslint/parser': '^5.59.7',
    '@types/jest': '^29.5.1',
    eslint: '^8.41.0',
    'eslint-config-prettier': '^8.8.0',
    'eslint-plugin-cypress': '^2.13.3',
    'eslint-plugin-import': '^2.27.5',
    'eslint-plugin-jest': '^27.2.1',
    husky: '^8.0.3',
    jest: '^29.5.0',
    'jest-openapi': '^0.14.2',
    'lint-staged': '^13.2.2',
    'prettier': '^2.8.8',
    'ts-jest': '^29.1.0',
    typescript: '^4.9.5',
  };
  if (features.includes('db')) {
    Object.assign(deps, {
      'db-migrate': '^0.11.13',
      'db-migrate-pg': '^1.3.0',
      'kysely-codegen': '^0.10.0',
    });
  }
  return sortByKey(deps);
}
