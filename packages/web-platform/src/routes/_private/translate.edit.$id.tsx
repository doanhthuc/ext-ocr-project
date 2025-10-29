import { createFileRoute } from '@tanstack/react-router';

import { TranslateEditPage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/edit/$id')({
  component: TranslateEditPage,
});
