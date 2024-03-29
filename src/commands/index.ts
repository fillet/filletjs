import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ApplicationCreateService } from '../features/application/CreateService';
import { GeneratorComponentService } from '../features/generator/ComponentService';
import { GeneratorContainerService } from '../features/generator/ContainerService';
import { GeneratorFeatureService } from '../features/generator/FeatureService';
import { GeneratorHookService } from '../features/generator/HookService';
import { GeneratorLayoutService } from '../features/generator/LayoutService';
import { GeneratorUtilService } from '../features/generator/UtilService';
import { GeneratorViewService } from '../features/generator/ViewService';
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
  view: GeneratorViewService,
  layout: GeneratorLayoutService,
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
  .help()
  .demandCommand(1);
