#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import * as url from 'url';

import minimist from 'minimist';

const args = process.argv.slice(2);
const argv = minimist(args);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function runPlop() {
  const { Plop, run } = await import('plop');

  if (fs.existsSync('package.json')) {
    Plop.prepare(
      {
        cwd: argv.cwd,
        configPath: path.join(__dirname, 'handlers.js'),
        preload: argv.preload || [],
        completion: argv.completion,
      },
      (env) =>
        Plop.execute(env, (env) => {
          const options = {
            ...env,
            dest: process.cwd(), // this will make the destination path to be based on the cwd when calling the wrapper
          };
          return run(options, undefined, true);
        }),
    );
  } else {
    Plop.prepare(
      {
        cwd: argv.cwd,
        configPath: path.join(__dirname, 'apiProject.js'),
        preload: argv.preload || [],
        completion: argv.completion,
      },
      (env) =>
        Plop.execute(env, (env) => {
          const options = {
            ...env,
            dest: process.cwd(), // this will make the destination path to be based on the cwd when calling the wrapper
          };
          return run(options, undefined, true);
        }),
    );
  }
}

runPlop();
