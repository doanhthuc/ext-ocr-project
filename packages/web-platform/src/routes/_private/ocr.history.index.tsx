import { createFileRoute } from '@tanstack/react-router';

import { OcrHistoryPage } from '~/ocr/pages';

export const Route = createFileRoute('/_private/ocr/history/')({
  component: OcrHistoryPage,
});
