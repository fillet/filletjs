export interface EnvConfig {
  path: string;
  baseUrl: string;
  endpoint?: string;
  secret?: string;
}

export interface AppConfig extends EnvConfig {
  pageTitle: string;
  env: string;
  cookieName: string;
  port: number;
}

export interface TargetEnvConfig {
  [key: string]: EnvConfig;
}
