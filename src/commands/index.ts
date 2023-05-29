import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import message from '../components/message';
import { ConsoleErrror } from '../concerns/Exceptions';
import { ApplicationCreateService } from '../features/application/CreateService';
import { GeneratorComponentService } from '../features/generator/ComponentService';
import { GeneratorContainerService } from '../features/generator/ContainerService';
import { GeneratorFeatureService } from '../features/generator/FeatureService';
import { GeneratorHookService } from '../features/generator/HookService';
import { GeneratorUtilService } from '../features/generator/UtilService';
import { IBlock, IService } from '../types';

interface ComponentClass {
  new (name: string): IService<IBlock>;
}

type GeneratorList = { [key: string]: ComponentClass | undefined };

const generators: GeneratorList = {
  component: GeneratorComponentService,
  feature: GeneratorFeatureService,
  container: GeneratorContainerService,
  hook: GeneratorHookService,
  utils: GeneratorUtilService,
  view: undefined,
  layout: undefined,
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
      if (type && name) {
        const Generator = generators[type];
        if (!Generator) return;

        const service = new Generator(name);
        await service.execute();
      }
    }
  )
  .fail(function (msg, err, yargs) {
    if (err instanceof ConsoleErrror) {
      message(err.message, 'red');
    } else {
      throw err;
    }
    process.exit(1);
  })
  .demandCommand(1);
