import { auth } from './auth';
import { common } from './common';
import { credits } from './credits';
import { dashboard } from './dashboard';
import { errorPages } from './errorPages';
import { errors } from './errors';
import { navigation } from './navigation';
import { ocr } from './ocr';
import { status } from './status';
import { upload } from './upload';
import { validation } from './validation';

export const vi = {
  ...common,
  ...auth,
  ...navigation,
  ...ocr,
  ...dashboard,
  ...upload,
  ...errors,
  ...validation,
  ...status,
  ...credits,
  ...errorPages,
} as const;