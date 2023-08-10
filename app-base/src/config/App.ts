import type { TargetEnvConfig, AppConfig } from "../@types/Config";

const env = process.env.APP_ENV || "development";
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

const pageTitle = "Fillet.JS";
const cookieName = "app";

const config: TargetEnvConfig = {
  /**
   * example: {
   *  path: "/example/", // This param should start and end with "/"
   *  base: "http://base.com.br", // This param shouldn't have "/" at the end
   *  endpoint: "https://api.com.br/api/v1",
   * }
   */
  development: {
    path: "/",
    baseUrl: `http://${host}:${port}`,
    endpoint: "",
  },
  uat: {
    path: "/teste-build/",
    baseUrl: "https://zone132.fillet-digital.com.br",
    endpoint: "",
  },
  production: {
    path: "/",
    baseUrl: "",
    endpoint: "",
  },
};

export default {
  ...config[env],
  env,
  pageTitle,
  cookieName,
  port,
} as AppConfig;
