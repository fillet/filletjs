import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import Session from "@app/utils/Session";

import appConfig from "./App";

// #region API
export const api: AxiosInstance = axios.create({
  baseURL: appConfig.endpoint,
});

interface AuthTokenData {
  accessToken: string;
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const authSession = Session.get<AuthTokenData>("auth");

    if (authSession) {
      config.headers.Authorization = `Bearer ${authSession.data.accessToken}`;
    }

    return config;
  }
);
// #endregion

export default {
  api,
};
