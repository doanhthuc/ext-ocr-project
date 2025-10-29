/**
 * API Path Constants
 * Generated from swagger.json
 */

export const API_PATHS = {
  // Health Check
  HEALTH: '/',
  HEALTH_CHECK: '/health',

  // Authentication
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    MFA: {
      GENERATE_SECRET: '/auth/mfa/generate-secret',
      ENABLE: '/auth/mfa/enable',
      DISABLE: '/auth/mfa/disable',
    },
  },

  // Users
  USERS: {
    PROFILE: '/users/profile',
  },

  // Plans
  PLANS: {
    LIST: '/plans',
    BY_ID: (id: string) => `/plans/${id}`,
  },

  // Subscriptions
  SUBSCRIPTIONS: {
    MY: '/subscriptions/my',
    CREDITS: '/subscriptions/my/credits',
    USAGE_HISTORY: '/subscriptions/my/usage-history',
    CHANGE_PLAN: '/subscriptions/my/change-plan',
    CANCEL: '/subscriptions/my/cancel',
    REACTIVATE: '/subscriptions/my/reactivate',
  },

  // Files
  FILES: {
    UPLOAD: '/files/upload',
    UPLOAD_MULTIPLE: '/files/upload/multiple',
    MY: '/files/my',
    INFO: (key: string) => `/files/${encodeURIComponent(key)}/info`,
    URL: (key: string) => `/files/${encodeURIComponent(key)}/url`,
    DOWNLOAD: (key: string) => `/files/${encodeURIComponent(key)}/download`,
    DELETE: (key: string) => `/files/${encodeURIComponent(key)}`,
  },

  // OCR
  OCR: {
    PROCESS: '/ocr/process',
    MY_EVENTS: '/ocr/my/events',
    MY: '/ocr/my',
    MY_BY_ID: (id: string) => `/ocr/my/${id}`,
    RESULT: (id: string) => `/ocr/my/${id}/result`,
    HISTORY: (id: string) => `/ocr/my/${id}/history`,
    RESULT_BY_ID: (id: string, resultId: string) =>
      `/ocr/my/${id}/result/${resultId}`,
    QUEUE_STATS: '/ocr/queue/stats',
    JOB_STATUS: (jobId: string) => `/ocr/queue/job/${jobId}`,
    MY_STATS: '/ocr/my/stats',
    SUPPORTED_LANGUAGES: '/ocr/supported-languages',
  },

  // Notifications
  NOTIFICATIONS: {
    REGISTER_TOKEN: '/notifications/register-token',
    UNREGISTER_TOKEN: '/notifications/unregister-token',
    MY_TOKENS: '/notifications/my-tokens',
    SUBSCRIBE_TOPIC: '/notifications/subscribe-topic',
    UNSUBSCRIBE_TOPIC: '/notifications/unsubscribe-topic',
  },

  // Payments
  PAYMENTS: {
    MY: '/payments/my',
    BY_ID: (id: string) => `/payments/${id}`,
    CREATE: '/payments',
    STRIPE: (id: string) => `/payments/${id}/stripe`,
    PAYPAL: (id: string) => `/payments/${id}/paypal`,
    WEBHOOK_STRIPE: '/payments/webhook/stripe',
  },

  // Dashboard
  DASHBOARD: {
    MY: '/dashboard/my',
    ANALYTICS: '/dashboard/my/analytics',
  },
} as const;
