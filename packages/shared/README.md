# @ocr-platform/shared

Shared utilities, types, and constants for the OCR Platform monorepo.

## 📁 Structure

```
src/
├── types/                 # TypeScript type definitions
│   ├── common.ts         # Common utility types (Maybe, Dict, etc.)
│   ├── user.ts           # User-related types
│   ├── ocr.ts            # OCR-specific types
│   ├── api.ts            # API response types
│   └── index.ts          # Re-exports all types
│
├── utils/                # Utility functions
│   ├── date.ts           # Date formatting utilities
│   ├── validation.ts     # Validation functions
│   ├── format.ts         # Formatting utilities
│   ├── helpers.ts        # General helper functions
│   └── index.ts          # Re-exports all utils
│
├── constants/            # Application constants
│   ├── app.ts            # App metadata
│   ├── api.ts            # API endpoints & HTTP codes
│   ├── file.ts           # File type constants
│   ├── ui.ts             # UI breakpoints
│   └── index.ts          # Re-exports all constants
│
└── index.ts              # Main entry point
```

## 🚀 Usage

### Import Everything (Recommended)

```typescript
import {
  User,
  ApiResponse,
  Maybe,
  formatDate,
  validateEmail,
  APP_NAME,
  SUPPORTED_FILE_TYPES,
} from '@ocr-platform/shared';
```

### Import by Category

```typescript
// Import specific categories
import { User, ApiResponse } from '@ocr-platform/shared/types';
import { formatDate, validateEmail } from '@ocr-platform/shared/utils';
import { APP_NAME, API_ENDPOINTS } from '@ocr-platform/shared/constants';
```

### Import Specific Files

```typescript
// Import from specific files
import { Maybe, Dict } from '@ocr-platform/shared/types/common';
import { formatDate } from '@ocr-platform/shared/utils/date';
import { BREAKPOINTS } from '@ocr-platform/shared/constants/ui';
```

## 📋 Available Exports

### Types (`/types`)

- **common.ts**: `Maybe<T>`, `MaybePromise<T>`, `Id`, `Dict<T>`, `DeepPartial<T>`
- **user.ts**: `User`
- **ocr.ts**: `OcrResult`, `BoundingBox`
- **api.ts**: `ApiResponse<T>`, `BaseError`

### Utils (`/utils`)

- **date.ts**: `formatDate()`, `formatDateToMMDDYYYY()`
- **validation.ts**: `validateEmail()`, `isValidFileType()`
- **format.ts**: `formatFileSize()`
- **helpers.ts**: `generateId()`, `delay()`, `debounce()`

### Constants (`/constants`)

- **app.ts**: `APP_NAME`, `APP_VERSION`
- **api.ts**: `API_ENDPOINTS`, `HTTP_STATUS`
- **file.ts**: `SUPPORTED_FILE_TYPES`, `MAX_FILE_SIZE`, `FILE_TYPE_EXTENSIONS`
- **ui.ts**: `BREAKPOINTS`

## 🔧 Development

```bash
# Build the package
yarn build

# Watch for changes
yarn dev

# Type check
yarn type-check

# Clean build artifacts
yarn clean
```

## 📦 Package Exports

The package supports multiple export paths:

- `@ocr-platform/shared` - Main entry point
- `@ocr-platform/shared/types` - All types
- `@ocr-platform/shared/types/*` - Specific type files
- `@ocr-platform/shared/utils` - All utilities
- `@ocr-platform/shared/utils/*` - Specific utility files
- `@ocr-platform/shared/constants` - All constants
- `@ocr-platform/shared/constants/*` - Specific constant files

This organized structure makes it easy to find and import exactly what you need!
