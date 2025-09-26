import { FileRoutesByPath } from '@tanstack/react-router';

export type Path = FileRoutesByPath[keyof FileRoutesByPath]['path'];
