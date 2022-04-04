import { CommanderOptions } from './getCommander';
import { UpdateReposOptions } from './ReposUpdater';

export function mapCommanderOptions(
  commanderOptions: CommanderOptions,
): UpdateReposOptions {
  const {
    scripts: commands,
    message,
    types: projectTypes,
    include: includedProjects,
    exclude: excludedProjects,
    merge: shouldMerge,
    silent: isSilent,
    chunkSize,
    mergeOnly,
  } = commanderOptions;

  return {
    commands,
    message,
    projectTypes,
    includedProjects,
    excludedProjects,
    shouldMerge,
    isSilent,
    chunkSize,
    mergeOnly,
  };
}
