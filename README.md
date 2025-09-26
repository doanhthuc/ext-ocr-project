# OCR Platform Monorepo

A monorepo containing web and mobile applications for OCR (Optical Character Recognition) platform.

## Packages

- **[@ocr-platform/web-platform](./packages/web-platform)** - React web application
- **[@ocr-platform/shared](./packages/shared)** - Shared utilities, types, and constants
- **[@ocr-platform/mobile-platform](./packages/mobile-platform)** - React Native mobile application (placeholder)

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Build shared package:

   ```bash
   yarn build:shared
   ```

3. Start web development server:
   ```bash
   yarn dev
   ```

## Available Scripts

- `yarn dev` - Start web development server
- `yarn build` - Build all packages
- `yarn build:web` - Build web platform only
- `yarn build:shared` - Build shared package only
- `yarn lint` - Lint all packages
- `yarn type-check` - Type check all packages
- `yarn test` - Run tests in all packages
- `yarn clean` - Clean all build artifacts and node_modules
- `yarn mobile` - Start React Native development (when initialized)

## Workspace Structure

```
packages/
├── web-platform/     # React web app
├── shared/          # Common utilities and types
└── mobile-platform/ # React Native mobile app (placeholder)
```

## Development

The shared package contains common types, utilities, and constants that can be used across both web and mobile applications. Make sure to build the shared package before working on other packages that depend on it.
