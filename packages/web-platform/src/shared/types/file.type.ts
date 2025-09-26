import { FILE_TYPE_EXTENSIONS } from '@ocr-platform/shared';

export type FileExt =
  (typeof FILE_TYPE_EXTENSIONS)[keyof typeof FILE_TYPE_EXTENSIONS];
