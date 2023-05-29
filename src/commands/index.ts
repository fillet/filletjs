import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ApplicationCreateService } from '../features/application/CreateService';

type GeneratorList = { [key: string]: (name: string) => void };

const generators: GeneratorList = {
  component: (name: string) => console.log(name),
  config: (name: string) => console.log(name),
  feature: (name: string) => console.log(name),
  hook: (name: string) => console.log(name),
  utils: (name: string) => console.log(name),
  view: (name: string) => console.log(name),
  layout: (name: string) => console.log(name),
};

const types = Object.keys(generators);

export default yargs(hideBin(process.argv))
  .command(
    'new <appName>',
    'Create new application',
    (yargs) => yargs.positional('appName', { type: 'string' }),
    async ({ appName }) => {
      const service = new ApplicationCreateService(appName!);
      await service.execute();
    }
  )
  .command(
    'g <type> <name>',
    `Generates ${types.join(' or ')}`,
    (yargs) =>
      yargs
        .positional('type', {
          type: 'string',
          describe: `Choice a type: ${types.join(' or ')}`,
          choices: types,
        })
        .positional('name', { type: 'string' }),
    async (argv) => {
      const { type, name } = argv;
      if (type && name) generators[type](name);
    }
  )
  .demandCommand(1);
