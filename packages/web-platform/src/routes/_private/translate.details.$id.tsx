import { createFileRoute } from '@tanstack/react-router';

import { TranslateDetailsPage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/details/$id')({
  component: TranslateDetailsPage,
});
