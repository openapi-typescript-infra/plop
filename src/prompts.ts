import path from 'node:path';

import Configstore from 'configstore';
import { sync } from 'parse-git-config';
import type { PromptQuestion } from 'node-plop';

const config = new Configstore('@openapi-typescript-infra/plop');

export interface OtiAnswers {
  name: string;
  desc: string;
  features: string[];
}

function saver(fieldName: string) {
  return (value: string) => {
    config.set(fieldName, value);
    return true;
  };
}

const gitConfig = sync({ type: 'global' });

function removeType(name: string) {
  const parts = name.split('-');
  if (parts.length > 1) {
    parts.pop();
  }
  return parts.join('-');
}

export const Prompts: Record<string, PromptQuestion> = {
  dirWarning: {
    type: 'confirm',
    name: 'dirWarning',
    message: `This will create files in the current directory (${process.cwd()}). Continue?`
  },
  email: {
    type: 'input',
    name: 'email',
    message: 'What is the developer email address for package.json?',
    validate: saver('email'),
    default: config.get('email') || gitConfig?.user?.email,
  },
  fullname: {
    type: 'input',
    name: 'fullname',
    message: 'What is the developer name for package.json?',
    validate: saver('fullname'),
    default: config.get('fullname') || gitConfig?.user?.name,
  },
  org: {
    type: 'input',
    name: 'org',
    message: 'What is the name of your github organization or your github username?',
    validate: saver('org'),
    default: config.get('org'),
  },
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
  dbName: {
    type: 'input',
    name: 'dbName',
    when: (answers) => answers.features.includes('db'),
    message: 'What will be the name of the database?',
    default: (answers: OtiAnswers) => removeType(answers.name),
  },
};
