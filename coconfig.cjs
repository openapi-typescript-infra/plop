const { config } = require('@openapi-typescript-infra/coconfig');

// Modify config to be ESM
const ts = config['tsconfig.json'].configuration;
ts.compilerOptions.module = 'Node16';
ts.compilerOptions.moduleResolution = 'node16';
ts['ts-node'].esm = true;

// Modify lint to handle ESM
const eslint = config['.eslintrc.js'].configuration;
eslint.settings = {
  'import/resolver': {
    typescript: {} // this loads <rootdir>/tsconfig.json to eslint
  },
  'import/parsers': {
    "@typescript-eslint/parser": [".ts", ".tsx"],
  },
};

config['.eslintrc.cjs'] = config['.eslintrc.js'];
delete config['.eslintrc.js'];

config['.prettierrc.cjs'] = config['.prettierrc.js'];
delete config['.prettierrc.js'];

exports.config = config;
