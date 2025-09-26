export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/tiff',
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const FILE_TYPE_EXTENSIONS = {
  All: '*',

  // Image
  Jpg: 'jpg',
  Png: 'png',
  Jpeg: 'jpeg',
  Webp: 'webp',
  Bmp: 'bmp',
  Tiff: 'tiff',

  // Document
  Pdf: 'pdf',
  Docx: 'docx',
  Txt: 'txt',
  Xlsx: 'xlsx',
  Pptx: 'pptx',
} as const;
