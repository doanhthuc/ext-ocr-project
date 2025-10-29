# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OCR Platform is a monorepo for an Optical Character Recognition web application built with React, TypeScript, and Vite. The project uses Yarn workspaces to manage multiple packages: web-platform (React SPA), shared (common utilities/types), and mobile-platform (React Native placeholder).

## Essential Commands

### Development

```bash
yarn dev                    # Start web platform dev server (port 3001)
yarn build                  # Build shared package, then web platform
yarn build:shared           # Build shared package only (required before first dev run)
yarn build:web              # Build web platform only
```

### Code Quality

```bash
yarn lint                   # Lint all packages
yarn lint:fix               # Lint and auto-fix
yarn format                 # Format all code with Prettier
yarn format:check           # Check formatting without modifying
yarn type-check             # Type check all packages
yarn ci                     # Run lint + type-check (used in CI)
yarn test                   # Run Vitest tests
```

### Workspace Management

```bash
yarn workspace @ocr-platform/web-platform <command>
yarn workspace @ocr-platform/shared <command>
```

### Package Management

**IMPORTANT**: Always use `yarn` for package management, never `npm`. This is enforced via preinstall hook.

### Storybook

```bash
yarn workspace @ocr-platform/web-platform storybook        # Run Storybook dev server
yarn workspace @ocr-platform/web-platform storybook:build  # Build Storybook
```

## Architecture

### Monorepo Structure

- **packages/web-platform**: React SPA using Vite, TanStack Router, TanStack Query, Ant Design, Tailwind CSS
- **packages/shared**: Shared types, constants, utilities, i18n translations (compiled to `dist/` via TypeScript)
- **packages/mobile-platform**: React Native placeholder (not yet implemented)

### Shared Package Dependencies

The web-platform depends on the **compiled output** of the shared package (`dist/`). **You must build the shared package** (`yarn build:shared`) before:

1. First time running web dev server
2. After modifying shared package code
3. Before committing shared package changes

The shared package exports are configured in its `package.json` with granular path exports:

- `@ocr-platform/shared` - Main exports
- `@ocr-platform/shared/types` - Type definitions
- `@ocr-platform/shared/utils` - Utility functions
- `@ocr-platform/shared/constants` - Constants
- `@ocr-platform/shared/i18n` - Internationalization
- `@ocr-platform/shared/styles` - Styles including CSS

### Routing (TanStack Router)

- File-based routing in `packages/web-platform/src/routes/`
- Route tree auto-generated in `routeTree.gen.ts`
- Layout routes:
  - `_private.tsx`: Protected routes requiring authentication, includes Sidebar layout
  - `_auth.tsx`: Public auth routes (redirects if authenticated)
  - `_public.tsx`: Public routes accessible to all
- Router context provides `auth` and `notification` throughout the app
- Auth guards in `beforeLoad` hooks check `context.auth.isAuthenticated()`

### State Management

- **TanStack Query**: Server state, API calls, caching
- **Zustand**: Client state (e.g., auth store at `packages/web-platform/src/modules/auth/stores/auth.store.ts`)
- Router context: Shared services like auth and notifications

### Authentication

- JWT-based authentication stored in localStorage via `jwt-storage.service.ts`
- Auth state managed by Zustand store (`auth.store.ts`)
- `useAuth()` hook provides: `isAuthenticated()`, `signIn()`, `signOut()`, `redirectWithProvider()`
- Route protection via TanStack Router `beforeLoad` hooks
- OAuth2 support for external providers

### Internationalization (i18n)

- Custom lightweight i18n implementation in `@ocr-platform/shared/i18n`
- Supports English (`en`) and Vietnamese (`vi`)
- Language detection from localStorage → browser → default
- `useTranslation()` hook provides: `t()`, `currentLanguage`, `changeLanguage()`, `isRTL`
- Global subscriber pattern for language changes
- Translation files organized by domain: `auth`, `ocr`, `dashboard`, `navigation`, `errors`, etc.
- RTL support built-in
- Document language/direction updated automatically

### Styling

- **Tailwind CSS v4** (using Vite plugin)
- **Ant Design v5** with custom theme configuration (`ant.config.ts`)
- **Emotion** for CSS-in-JS (configured as jsxImportSource in Vite)
- Custom prefix for Ant Design: `PREFIX_CLASS` to avoid conflicts
- Global styles from `@ocr-platform/shared/src/styles/global.css`
- **IMPORTANT**: Prefer using Tailwind classes over inline styles
- **CRITICAL**: NEVER use hardcoded color values (e.g., `#2970ff`, `rgb()`, `hsl()`) directly in Tailwind classes
  - All colors MUST be defined as CSS variables in `@ocr-platform/shared/src/styles/global.css`
  - Follow the existing naming convention: `--color-{scale}-{number}` (e.g., `--color-gray-11`, `--color-blue-4`)
  - For semantic colors, use descriptive names (e.g., `--color-primary`, `--color-error`, `--color-success`)
  - For color scales, use numbered variants: `--color-gray-{N}`, `--color-blue-{N}`, `--color-red-{N}`, etc.
  - When adding new colors from Figma designs, first add them to `global.css` following this convention
  - Examples:
    - Use `text-blue-4` instead of `text-[#2970ff]`
    - Use `border-gray-12` instead of `border-[#dee5ef]`
    - Use `bg-primary` instead of `bg-[#2344c3]`
- **CRITICAL**: Use Tailwind's default size utilities or rem units instead of hardcoded pixel values
  - Prefer Tailwind's text size utilities: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, etc.
  - Prefer Tailwind's spacing utilities: `p-1` through `p-96`, `m-1` through `m-96`, `gap-1` through `gap-96`, etc.
  - If custom sizes are needed, use rem units in brackets: `text-[1.625rem]`, `leading-[2.875rem]`, `w-[37rem]`
  - NEVER use pixel values directly: avoid `text-[26px]`, `leading-[36px]`, `w-[580px]`
  - Examples:
    - Use `text-2xl` instead of `text-[24px]` (24px = 1.5rem)
    - Use `text-6xl` instead of `text-[64px]` (64px = 4rem)
    - Use `leading-9` instead of `leading-[36px]` (36px = 2.25rem)
    - Use `w-96` or `max-w-xl` instead of `w-[384px]` or `max-w-[580px]`

### Module Structure (web-platform)

Organized by feature modules in `src/modules/`:

- Each module contains: `components/`, `hooks/`, `services/`, `stores/`, `types/`, `pages/`
- Example: `modules/auth/` contains all auth-related code
- Shared components live in `src/shared/components/`

### Path Aliases (tsconfig.json)

```typescript
~icons          → ./src/assets/icons
~router         → ./src/router
~shared/*       → ./src/shared/*
~config/*       → ./src/configs/*
~api/*          → ./src/api/*
~styles/*       → ./src/styles/*
~plugins/*      → ./plugins/*
~/*             → ./src/modules/* and ./src/*
```

## Development Guidelines

### Code Style Enforcement

- **ESLint** with TypeScript, React, and Perfectionist plugins
- **Perfectionist plugin** enforces alphabetical sorting of imports and exports
- Import order groups: type → external → internal-type → internal → side-effect → parent/sibling → object
- Internal imports pattern: `~/.*`, `~icons`, `~router`, etc.
- **No relative imports** using `../` - use absolute paths via aliases
- **No importing from `react-router-dom`** - use `@tanstack/react-router` instead
- **No direct `clsx` or `tailwind-merge`** - use `cn` utility from shared utils
- React components must use function declarations, not arrow functions
- Prefer `type` over `interface` for TypeScript definitions
- Use `Array<T>` syntax instead of `T[]`
- Prefix unused variables with `_`

### Component Guidelines

- Function components with function declarations: `function ComponentName() {}`
- Co-locate Storybook stories with components: `Component.stories.tsx`
- Import React hooks from `react`, not `react-dom`

### API Integration

- API endpoint configured via `VITE_API_ENDPOINT` env variable (default: `http://localhost:8080/api`)
- Use TanStack Query for API calls
- API utilities should use axios with case conversion (axios-case-converter)

### Testing

- **Vitest** with React Testing Library
- Test files adjacent to source files or in `__tests__/` directories
- Global test config includes `vitest/globals` types

### Type Safety

- Strict TypeScript configuration
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` enabled
- All packages must pass `yarn type-check` before committing

## Environment Setup

### Node & Yarn Requirements

- Node.js >= 22.14.0
- Yarn >= 1.22.0

### Environment Variables (web-platform)

Create `.env` or `.env.local`:

```bash
VITE_API_ENDPOINT=http://localhost:8080/api    # Backend API URL
VITE_API_ICON_ENDPOINT=                         # Optional icons endpoint
```

## Common Workflows

### Adding a New Feature Module

1. Create module directory: `src/modules/<feature>/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `stores/`, `types/`, `pages/`
3. Add route file in `src/routes/` (TanStack Router auto-generates route tree)
4. Use absolute imports via path aliases

### Adding Shared Code

1. Add to `packages/shared/src/`
2. Export from appropriate index file
3. Run `yarn build:shared`
4. Import in web-platform: `import { X } from '@ocr-platform/shared/...'`

### Adding Dependencies

```bash
# Root workspace
yarn add <package> -W

# Specific package
yarn workspace @ocr-platform/web-platform add <package>
yarn workspace @ocr-platform/shared add <package>
```

### Adding Icons

SVG icons stored in `packages/web-platform/src/assets/icons/` with TypeScript re-exports from `index.ts`. Import icons using the `~icons` alias.

## Git Hooks

- **Husky** configured for git hooks
- **lint-staged** runs on pre-commit
- Commitlint enforces conventional commits
