import chalk from 'chalk';
import figlet from 'figlet';

import { print } from '../../utils/Screen';

const Logo = {
  show: () => print(chalk.yellow(figlet.textSync('Fillet'))),
};

export default Logo;
