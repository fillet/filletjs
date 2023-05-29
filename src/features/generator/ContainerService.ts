import message from '../../components/message';
import { IBlock } from '../../types';
import { GeneratorBaseService } from './BaseService';
import { GeneratorFeatureService } from './FeatureService';

export class GeneratorContainerService extends GeneratorBaseService<IBlock> {
  public result?: IBlock | undefined;

  constructor(name: string) {
    super(`${name}Container`, 'container', { folder: 'features' });
  }

  async execute() {
    await this.createFeatureIfNotExists();

    await super.execute();
    await this.renderBlock('Container.tsx.ejs', `${this.block.fileName}.tsx`);
    await this.renderBlock('Style.scss.ejs', `${this.block.fileName}.scss`);
  }

  private async createFeatureIfNotExists() {
    try {
      const featureService = new GeneratorFeatureService(this.block.group.singular);
      await featureService.execute();
    } catch (ex) {
      message(`The ${this.block.group.singular}'s feature already exists.`, 'yellow');
    }
  }
}
