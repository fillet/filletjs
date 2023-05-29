import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorViewService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'view', { suffixOnClass: true });
  }

  async execute() {
    await super.execute();
    await this.renderBlock('View.tsx.ejs', `${this.block.fileName}.tsx`);
    await this.renderBlock('Style.scss.ejs', `${this.block.fileName}.scss`);
  }
}
