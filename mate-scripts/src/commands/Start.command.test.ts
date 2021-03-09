import path from 'path';
import sinon, { SinonSandbox } from 'sinon';
import { StartCommand } from './Start.command';
import { ParcelService } from '../services';

describe('Start Command', () => {
  let sandbox: SinonSandbox;

  it('should run parcel', () => {
    console.log('Test started');

    const rootDir = path.join(__dirname, '../../testing/layout');

    const command = new StartCommand(rootDir);

    console.log('Command created');

    console.log('beforeEach started');

    sandbox = sinon.createSandbox();

    console.log('sandbox created');

    sandbox.spy(command.parcel, 'serve');

    console.log('spy on Parcel.serve');

    command.run({
      shouldShowInternalLogs: false,
      open: true,
    });

    console.log('Command run');

    expect(command.parcel.serve).toHaveBeenCalled();
  });
});
