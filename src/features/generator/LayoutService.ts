import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorLayoutService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'layout', { suffixOnClass: true, isSimplePath: true, folder: 'views/layouts' });
  }

  async execute() {
    await super.execute();
    await this.renderBlock('Layout.tsx.ejs', `${this.block.fileName}Layout.tsx`);
    await this.renderBlock('Style.scss.ejs', `${this.block.fileName}Layout.scss`);
  }
}
