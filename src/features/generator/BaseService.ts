import { camelCase, paramCase, pascalCase } from 'change-case';
import pluralize from 'pluralize';

import message from '../../components/message';
import { Conflict } from '../../concerns/Exceptions';
import { IBlock, IService } from '../../types';
import { createFolder, exists, joinPath, PROCESS_PATH, write } from '../../utils/File';
import { render } from '../../utils/Template';

export abstract class GeneratorBaseService<T> implements IService<T> {
  protected block: IBlock;
  protected folderPath: string;

  constructor(name: string, type: string) {
    const nameSlug = camelCase(name);
    const group = paramCase(name.split('/')[0]);

    this.block = {
      name,
      group: {
        singular: group,
        plural: pluralize(group),
      },
      className: pascalCase(name),
      variable: {
        singular: nameSlug,
        plural: pluralize(nameSlug),
      },
      type: {
        singular: type,
        plural: pluralize(type),
      },
    };

    this.folderPath = joinPath(
      PROCESS_PATH,
      'src',
      this.block.type.plural,
      this.block.group.singular
    );
  }

  async execute() {
    if (exists(this.folderPath)) throw Conflict(`The ${this.block.type.singular} already exists!`);
    await createFolder(this.folderPath);
  }

  protected async renderBlock(temaplate: string, filename: string) {
    const content = await render(temaplate, this.block);
    const filePath = joinPath(this.folderPath, filename);
    await write(filePath, content);
    message(filePath, 'green');
  }
}
