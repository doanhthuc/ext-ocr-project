import { createFileRoute } from '@tanstack/react-router';

import { OcrHistoryDetailsPage } from '~/ocr/pages';

export const Route = createFileRoute('/_private/ocr/history/$id')({
  component: OcrHistoryDetailsPage,
});
