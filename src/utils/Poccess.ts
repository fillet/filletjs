import childProcess from 'child_process';
import cliSpinner from 'cli-spinner';

import { print } from './Screen';

const Spinner = cliSpinner.Spinner;
const execute = childProcess.exec;

export const cmd = async (command: string, description: string = 'processing...') => {
  const spinner = new Spinner(`${description} %s`);
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  const child = execute(command);

  return new Promise<void>((resolve) => {
    child.on('data', (x) => {
      print(x.toString());
    });

    child.on('data', (x) => {
      print(x.toString());
    });

    child.on('close', function () {
      spinner.stop(true);
      resolve();
    });
  });
};
