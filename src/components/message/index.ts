import chalk, { ColorName } from 'chalk';

import { print } from '../../utils/Screen';

const message = (value: string, color: ColorName = 'white') => print(chalk[color](value));

export default message;
