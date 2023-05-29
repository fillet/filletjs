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

  constructor(name: string, type: string, folder?: string) {
    const nameSlug = camelCase(name);
    const group = name.split('/')[0];
    const nameWithooutGroup = name.replace(group, '').trim();
    const fileName = ['', '/'].includes(nameWithooutGroup)
      ? 'index'
      : pascalCase(nameWithooutGroup);

    this.block = {
      name,
      fileName:
        ['container', 'hook'].includes(type) && fileName == 'index' ? pascalCase(group) : fileName,
      group: {
        singular: paramCase(group),
        plural: pluralize(paramCase(group)),
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
      folder ? folder : this.block.type.plural,
      type == 'hook' ? '' : this.block.group.singular
    );
  }

  async execute() {
    if (exists(this.folderPath)) {
      if (this.block.type.singular == 'feature')
        throw Conflict(
          `The ${this.block.type.singular} "${this.block.group.singular}" already exists!`
        );
    } else {
      await createFolder(this.folderPath);
    }
  }

  protected async renderBlock(temaplate: string, filename: string) {
    const content = await render(temaplate, this.block);
    const filePath = joinPath(this.folderPath, filename);

    if (exists(filePath))
      throw Conflict(
        `The ${this.block.type.singular} "${filename}" already exists on "${this.block.group.singular}".`
      );

    await write(filePath, content);
    message(filePath, 'green');
  }
}
