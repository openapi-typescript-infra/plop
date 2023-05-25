import { spawnSync } from 'node:child_process';

import { OtiAnswers } from './prompts';

export type Action = (answers: OtiAnswers, config: CliActionConfig, plop: NodePlopAPI) => Promise<void> | void;

// Uncomment for VSCode help, comment to compile
// import type { NodePlopAPI } from 'plop';
type NodePlopAPI = { setActionType(name: string, action: Action): void };

interface CliActionConfig {
  command: string;
  args: string[];
  cwd?: string;
}

export function useCliAction(plop: NodePlopAPI) {
  plop.setActionType('cli', ((answers, config) => {
    spawnSync(config.command, config.args || [], {
      cwd: config.cwd,
      stdio: 'inherit',
    });
  }) as Action);
}
