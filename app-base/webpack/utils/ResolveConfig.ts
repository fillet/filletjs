import path from 'path';
//TYPES
import { ResolveOptions } from 'webpack';

import { compilerOptions } from '../../tsconfig.json';

const rootPath = process.cwd();

const createPaths = (): ResolveOptions['alias'] => {
  const paths = compilerOptions.paths as { [key: string]: string[] };

  const aliases: ResolveOptions['alias'] = {};

  Object.keys(paths).forEach((alias) => {
    const aliasArray = paths[alias].map((aliasPath) => path.resolve(rootPath, aliasPath.replace('/*', '')));

    aliases[alias.replace('/*', '')] = aliasArray;
  });

  return aliases;
};

const resolveConfig: ResolveOptions = {
  alias: {
    ...createPaths(),
  },
  extensions: ['.tsx', '.ts', '.js', '...'],
};

export default resolveConfig;
