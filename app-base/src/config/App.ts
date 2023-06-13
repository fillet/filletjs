import type { TargetEnvConfig, AppConfig } from '../types/Config';

const env = process.env.APP_ENV || 'development';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const pageTitle = 'Fillet.JS';
const cookieName = 'app';

const config: TargetEnvConfig = {
  development: {
    path: '/',
    baseUrl: `http://${host}:${port}`,
    endpoint: '',
  },
  uat: {
    path: '/',
    baseUrl: '',
    endpoint: '',
  },
  production: {
    path: '/',
    baseUrl: '',
    endpoint: '',
  },
};

export default {
  ...config[env],
  env,
  pageTitle,
  cookieName,
  port,
} as AppConfig;
