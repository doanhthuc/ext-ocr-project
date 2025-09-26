import { FormRule as Rule } from 'antd';

export const required = (message?: string): Rule => ({
  required: true,
  message,
});
