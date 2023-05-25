import path from 'node:path';

export interface OtiAnswers {
  name: string;
  desc: string;
  features: string[];
}

export const Prompts = {
  name: {
    type: 'input',
    name: 'name',
    message: 'What is the name of the service?',
    default: path.basename(process.cwd()),
  },
  desc: {
    type: 'input',
    name: 'desc',
    message: 'Describe the service (for package.json)?',
    default: 'An api for doing things',
  },
  features: {
    type: 'checkbox',
    name: 'features',
    message: 'Which features will you use?',
    choices: [
      { name: 'Postgres Database', value: 'db' },
      { name: 'redis', value: 'redis' },
    ],
  },
};
