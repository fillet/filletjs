import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorComponentService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'component');
  }

  async execute() {
    await super.execute();
    await this.renderBlock('Component.tsx.ejs', `${this.block.fileName}.tsx`);
    await this.renderBlock('Style.scss.ejs', `${this.block.fileName}.scss`);
    await this.renderBlock('Component.stories.ts.ejs', `${this.block.fileName}.stories.ts`);
  }
}
