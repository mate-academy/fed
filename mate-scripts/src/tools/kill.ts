import treeKill from 'tree-kill';

export async function kill(pid: number, signal?: NodeJS.Signals) {
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
