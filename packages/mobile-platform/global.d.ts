﻿/// <reference types="nativewind/types" />

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL?: string;
    }
  }
}

export {};
