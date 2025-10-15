import { createFileRoute } from '@tanstack/react-router';

import { OcrDetailsPage } from '~/ocr/pages/OcrDetailsPage';

export const Route = createFileRoute('/_private/ocr/details')({
  component: OcrDetailsPage,
});
