/**
 * Users Validation Schemas
 * Zod schemas for form validation
 */

import { z } from 'zod';

/**
 * Update User Schema
 */
export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
