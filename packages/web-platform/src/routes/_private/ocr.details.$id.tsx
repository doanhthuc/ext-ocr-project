import { createFileRoute } from '@tanstack/react-router';

import { OcrDetailsPage } from '~/ocr/pages';

export const Route = createFileRoute('/_private/ocr/details/$id')({
  component: OcrDetailsPage,
});
