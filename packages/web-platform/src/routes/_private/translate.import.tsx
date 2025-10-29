import { createFileRoute } from '@tanstack/react-router';

import { TranslateImportPage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/import')({
  component: TranslateImportPage,
});
