import chalk from 'chalk';

import { print } from '../../utils/Screen';

const message = (value: string, color: typeof chalk.Color = 'white') => print(chalk[color](value));

export default message;
