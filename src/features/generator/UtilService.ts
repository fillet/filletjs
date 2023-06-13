import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorUtilService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'util', { isSimplePath: true, suffixOnClass: true });
  }

  async execute() {
    await super.execute();
    await this.renderBlock('Utils.ts.ejs', `${this.block.fileName}Util.ts`);
  }
}
