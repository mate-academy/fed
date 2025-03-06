import treeKill from 'tree-kill';

export function kill(pid: number, signal?: NodeJS.Signals): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    treeKill(pid, signal, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
