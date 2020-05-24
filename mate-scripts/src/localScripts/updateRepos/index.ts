import { getCommander, CommanderOptions } from './getCommander';
import { ReposUpdater } from './ReposUpdater';
import { mapCommanderOptions } from './mapCommanderOptions';

const commander = getCommander(process.argv);
const commanderOptions = commander.opts() as CommanderOptions;
const options = mapCommanderOptions(commanderOptions);
const reposUpdater = new ReposUpdater(options);

reposUpdater.updateRepos();
