import ejs from 'ejs';

import { IBlock } from '../types';
import { joinPath, LIB_PATH } from './File';

export const render = async (template: string, block: IBlock) =>
  await ejs.renderFile(joinPath(LIB_PATH, 'templates', template), { block }, { async: true });
