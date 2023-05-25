import { spawnSync } from 'node:child_process';
import { OtiAnswers } from './prompts';

// Uncomment for VSCode help, comment to compile
// import type { NodePlopAPI } from 'plop';
type NodePlopAPI = any;

interface CliActionConfig {
  command: string;
  args: string[];
  cwd?: string;
}

type Action = (answers: OtiAnswers, config: CliActionConfig, plop: NodePlopAPI) => Promise<void> | void;

export function useCliAction(plop: NodePlopAPI) {
  plop.setActionType('cli', ((answers, config, plop) => {
    spawnSync(config.command, config.args || [], {
      cwd: config.cwd,
      stdio: 'inherit',
    });
  }) as Action);
}
