import { createFileRoute } from '@tanstack/react-router';

import { OcrPage } from '~/ocr/pages';

export const Route = createFileRoute('/_private/ocr/')({
  component: OcrPage,
});
