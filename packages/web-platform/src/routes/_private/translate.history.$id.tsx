import { createFileRoute } from '@tanstack/react-router';

import { TranslateHistoryDetailsPage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/history/$id')({
  component: TranslateHistoryDetailsPage,
});
