import { createFileRoute } from '@tanstack/react-router';

import { TranslateHistoryPage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/history/')({
  component: TranslateHistoryPage,
});
