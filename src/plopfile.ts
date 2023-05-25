import path from 'node:path';

import Helpers from 'handlebars-helpers';
import type { HelperDelegate } from 'handlebars';
import type { Answers } from 'inquirer';

import { Prompts } from './prompts';
import type { OtiAnswers } from './prompts';
import { dependencies, devDependencies } from './dependencies';
import { Action, useCliAction } from './actions';

// Uncomment for VSCode help, comment to compile (ESM stupidness)
// import type { NodePlopAPI } from 'plop';
interface NodePlopAPI {
  load(name: string): void;
  setHelper(name: string, helper: HelperDelegate): void;
  setActionType(name: string, fn: Action): void;
  setGenerator(name: string, config: Record<string, ReturnType<typeof JSON.parse>>): void;
}

module.exports = function (plop: NodePlopAPI) {
  plop.load('plop-pack-git-init');

  const helpers = Helpers();
  Object.entries(helpers).forEach(([name, helper]) => {
    if (!['raw'].includes(name)) {
      plop.setHelper(name, helper);
    }
  });
  plop.setHelper('ternary', ((test, yes, no) => (test ? yes : no)) as HelperDelegate);
  useCliAction(plop);

  // controller generator
  plop.setGenerator('api', {
    description: 'Generate an API service',
    prompts: [Prompts.name, Prompts.desc, Prompts.features],
    actions(data: Answers) {
      return [
        {
          type: 'addMany',
          base: path.join(__dirname, '..', 'templates', 'all'),
          destination: '.',
          stripExtensions: ['hbs'],
          globOptions: { dot: true },
          force: true,
          templateFiles: [
            path.resolve(__dirname, '../templates/all/**'),
          ],
          data: {
            dependencies: dependencies(data as OtiAnswers),
            devDependencies: devDependencies(data as OtiAnswers),
          },
        },
        {
          type: 'add',
          templateFile: path.join(__dirname, '..', 'templates', 'api.yaml.hbs'),
          path: 'api/{{name}}.yaml',
          force: true,
        },
        {
          type: 'cli',
          command: 'yarn',
        },
        {
          type: 'gitInit',
          path: process.cwd(),
          // By default is false, but if "true" will log the output of commands
          verbose: true,
        },
      ];
    },
  });
};
