import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorHookService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'hook', { isSimplePath: true, suffixOnClass: true });
  }

  async execute() {
    await super.execute();
    await this.renderBlock('Hook.ts.ejs', `${this.block.fileName}.ts`);
  }
}
