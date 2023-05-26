import { spawnSync } from 'node:child_process';

import type { NodePlopAPI } from 'plop';

export function useCliAction(plop: NodePlopAPI) {
  plop.setActionType('cli', (_, config) => {
    spawnSync(config.command, config.args || [], {
      cwd: config.cwd,
      stdio: 'inherit',
    });
    return `Completed ${config.command}`;
  });
}
