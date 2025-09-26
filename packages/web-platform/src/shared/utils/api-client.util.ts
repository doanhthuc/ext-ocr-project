import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_ENDPOINT } from '~config/env.config';

export function createBaseClient(baseURL = API_ENDPOINT) {
  const client = applyCaseMiddleware(
    axios.create({
      baseURL,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    }),
    {
      ignoreHeaders: true,
    }
  );

  return client;
}

export const baseClient = createBaseClient();
