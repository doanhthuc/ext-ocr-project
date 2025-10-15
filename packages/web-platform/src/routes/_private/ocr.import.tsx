import { createFileRoute } from '@tanstack/react-router';

import { ImportOcrPage } from '~/ocr/pages/ImportOcrPage';

export const Route = createFileRoute('/_private/ocr/import')({
  component: ImportOcrPage,
});
