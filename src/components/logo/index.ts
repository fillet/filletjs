import chalk from 'chalk';
import figlet from 'figlet';

import { print } from '../../utils/screen';

const Logo = {
  show: () => print(chalk.yellow(figlet.textSync('Fillet'))),
};

export default Logo;
