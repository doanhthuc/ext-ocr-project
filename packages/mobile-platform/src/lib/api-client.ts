import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_ENDPOINT } from '../constants/env';

export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: API_ENDPOINT,
    paramsSerializer: {
      indexes: null
    }
  }),
  {
    ignoreHeaders: true
  }
);

export type ApiClient = typeof apiClient;
