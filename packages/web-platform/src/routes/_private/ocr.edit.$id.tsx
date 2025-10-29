import { createFileRoute } from '@tanstack/react-router';

import { OcrEditPage } from '~/ocr/pages';

export const Route = createFileRoute('/_private/ocr/edit/$id')({
  component: OcrEditPage,
});
