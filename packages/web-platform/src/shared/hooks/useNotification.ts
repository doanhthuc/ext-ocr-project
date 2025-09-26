import type { AxiosError } from 'axios';

import { BaseError } from '@ocr-platform/shared';
import { App } from 'antd';
import { isString } from 'lodash-es';
import { createElement } from 'react';

import { IconError, IconInfo, IconSuccess, IconWarning } from '~icons';

export function useNotification() {
  const { notification } = App.useApp();

  const showError = (error: AxiosError<BaseError> | string) => {
    const content = isString(error) ? error : error?.response?.data.message;
    notification.error({
      message: 'Error',
      description: content ?? 'Something went wrong',
      className: 'p-3',
      icon: createElement(IconError, { className: 'text-error' }),
    });
  };

  const showSuccess = (message: string) => {
    notification.success({
      message: 'Success',
      description: message,
      className: 'p-3',
      icon: createElement(IconSuccess, { className: 'text-success' }),
    });
  };

  const showWarning = (message: string) => {
    notification.warning({
      message: 'Warning',
      description: message,
      className: 'p-3',
      icon: createElement(IconWarning, { className: 'text-warning' }),
    });
  };

  const showInfo = (message: string) => {
    notification.info({
      message: 'Info',
      description: message,
      className: 'p-3',
      icon: createElement(IconInfo, { className: 'text-info' }),
    });
  };

  return { showError, showSuccess, showWarning, showInfo };
}
