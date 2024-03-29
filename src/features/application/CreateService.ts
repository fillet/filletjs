import { sync as commandExists } from 'command-exists';
import path from 'path';

import { Conflict } from '../../concerns/Exceptions';
import { IService } from '../../types';
import { copy, exists, joinPath, LIB_PATH, PROCESS_PATH, read, write } from '../../utils/File';
import { cmd } from '../../utils/Poccess';

export class ApplicationCreateService implements IService<undefined> {
  private appTargetPath: string;
  private appBasePath: string;

  constructor(private appName: string) {
    this.appTargetPath = joinPath(PROCESS_PATH, this.appName);
    this.appBasePath = joinPath(LIB_PATH, 'app-base');
  }

  async execute() {
    if (exists(this.appTargetPath)) throw Conflict('Sorry: Application already exists.');

    await this.copyBaseApp();
    await this.applyAppName();
    await this.moveGitingore();
    await this.installDependencies();
  }

  private async copyBaseApp() {
    await copy(this.appBasePath, this.appTargetPath);
  }

  private async applyAppName() {
    const packageFile = joinPath(this.appTargetPath, 'package.json');
    const content = await read(packageFile);
    const result = content.replace(/\"name"\: "(.*?)"/g, `"name": "${this.appName}"`);

    await write(packageFile, result);
  }

  private async moveGitingore() {
    const current = path.join(this.appTargetPath, 'gitignore.example');
    const target = path.join(this.appTargetPath, '.gitignore');

    await cmd(`mv ${current} ${target}`);
  }

  private async installDependencies() {
    const hasYarn = commandExists('yarn');

    if (hasYarn) {
      await cmd(`cd ${this.appTargetPath} && yarn install`, 'Installing dependencies...');
    } else {
      await cmd(`cd ${this.appTargetPath} && npm install`, 'Installing dependencies...');
    }
  }
}
