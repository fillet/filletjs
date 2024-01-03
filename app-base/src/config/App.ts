import { AppConfig } from '@app/@types/Config';

const appConfig = process.env.APP_CONFIG! as unknown;
export default appConfig as AppConfig;
