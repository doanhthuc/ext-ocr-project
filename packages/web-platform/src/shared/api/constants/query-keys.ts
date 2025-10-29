/**
 * TanStack Query Key Constants
 * Generated from swagger.json
 */

export const QUERY_KEYS = {
  // Health
  HEALTH: ['health'] as const,
  HEALTH_CHECK: ['health', 'check'] as const,

  // Auth
  AUTH: {
    PROFILE: ['auth', 'profile'] as const,
  },

  // Users
  USERS: {
    PROFILE: ['users', 'profile'] as const,
  },

  // Plans
  PLANS: {
    ALL: ['plans'] as const,
    LIST: ['plans', 'list'] as const,
    BY_ID: (id: string) => ['plans', id] as const,
  },

  // Subscriptions
  SUBSCRIPTIONS: {
    ALL: ['subscriptions'] as const,
    MY: ['subscriptions', 'my'] as const,
    CREDITS: ['subscriptions', 'my', 'credits'] as const,
    USAGE_HISTORY: (limit?: number) =>
      ['subscriptions', 'my', 'usage-history', { limit }] as const,
  },

  // Files
  FILES: {
    ALL: ['files'] as const,
    MY: (folder?: string) => ['files', 'my', { folder }] as const,
    INFO: (key: string) => ['files', 'info', key] as const,
    URL: (key: string, expiresIn?: number) =>
      ['files', 'url', key, { expiresIn }] as const,
  },

  // OCR
  OCR: {
    ALL: ['ocr'] as const,
    MY: (limit?: number) => ['ocr', 'my', { limit }] as const,
    BY_ID: (id: string) => ['ocr', 'my', id] as const,
    RESULT: (id: string) => ['ocr', 'my', id, 'result'] as const,
    HISTORY: (id: string) => ['ocr', 'my', id, 'history'] as const,
    RESULT_BY_ID: (id: string, resultId: string) =>
      ['ocr', 'my', id, 'result', resultId] as const,
    QUEUE_STATS: ['ocr', 'queue', 'stats'] as const,
    JOB_STATUS: (jobId: string) => ['ocr', 'queue', 'job', jobId] as const,
    MY_STATS: ['ocr', 'my', 'stats'] as const,
    SUPPORTED_LANGUAGES: ['ocr', 'supported-languages'] as const,
  },

  // Notifications
  NOTIFICATIONS: {
    ALL: ['notifications'] as const,
    MY_TOKENS: ['notifications', 'my-tokens'] as const,
  },

  // Payments
  PAYMENTS: {
    ALL: ['payments'] as const,
    MY: ['payments', 'my'] as const,
    BY_ID: (id: string) => ['payments', id] as const,
  },

  // Dashboard
  DASHBOARD: {
    MY: ['dashboard', 'my'] as const,
    ANALYTICS: ['dashboard', 'my', 'analytics'] as const,
  },
} as const;
