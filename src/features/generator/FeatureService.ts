import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';

export class GeneratorFeatureService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(name, 'feature');
  }

  async execute() {
    await super.execute();
    await this.renderBlock('FeatureType.ts.ejs', 'Types.ts');
    await this.renderBlock('Service.ts.ejs', 'Service.ts');
    await this.renderBlock('Slice.ts.ejs', 'Slice.ts');
  }
}
