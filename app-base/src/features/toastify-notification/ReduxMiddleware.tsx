import axios, { AxiosError } from 'axios';
import React from 'react';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import { Middleware } from 'redux';

import { ActionNotifiable, ServiceErrorResponse } from './Types';

const notifyIt = (action: ActionNotifiable): void => {
  const { type, payload } = action;
  const regexActionType = type.match(/(_|\/)(ERROR|SUCCESS|INFO|WARNING)$/i);
  if (regexActionType) {
    let content: Array<string> = payload.messages || [];
    const actionType: TypeOptions = regexActionType[0]
      .replace(/\W/, '')
      .toLowerCase() as TypeOptions;
    const options: ToastOptions<{}> = {
      type: actionType,
      theme: 'dark',
    };

    if (payload.message) content.push(payload.message);

    if (payload) {
      if (axios.isAxiosError(payload)) {
        const axiosError: AxiosError = payload;
        const data: ServiceErrorResponse = axiosError.response?.data as ServiceErrorResponse;

        if (data) {
          content = [...content, ...data.messages];
        } else {
          content = [...content, axiosError.message];
        }
      } else {
        if (payload.ex) {
          content.push(payload.ex.message);
          console.error(payload.ex);
        }
      }
    }

    const messagesAsHtml: string = content.join('<br />');

    toast(<div dangerouslySetInnerHTML={{ __html: messagesAsHtml }} />, options);
  }
};

const notificationMiddleware: Middleware = (storeApi) => (next) => (action) => {
  notifyIt(action);
  return next(action);
};

export default notificationMiddleware;
