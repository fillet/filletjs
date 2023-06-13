import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import Session from '@app/utils/Session';

import appConfig from './App';

// #region API
export const api: AxiosInstance = axios.create({
  baseURL: appConfig.endpoint,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const authSession: any = Session.Get('auth');

  if (authSession.accessToken) {
    config.headers.Authorization = `Bearer ${authSession.accessToken}`;
  }

  return config;
});
// #endregion

export default {
  api,
};
