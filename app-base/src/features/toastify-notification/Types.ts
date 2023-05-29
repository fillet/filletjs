import { AxiosError } from 'axios';

export interface ActionNotifiable {
  type: string;
  payload: {
    messages?: Array<string>;
    message?: string;
    ex?: Error | AxiosError;
  };
}

export interface ServiceErrorResponse {
  messages: Array<string>;
  code?: number;
}
