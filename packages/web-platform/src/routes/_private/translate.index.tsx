import { createFileRoute } from '@tanstack/react-router';

import { TranslatePage } from '~/translate/pages';

export const Route = createFileRoute('/_private/translate/')({
  component: TranslatePage,
});
