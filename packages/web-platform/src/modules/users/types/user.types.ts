/**
 * User API Types
 */

// ============================================================================
// User DTOs (Request Types)
// ============================================================================

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

// ============================================================================
// User Responses
// ============================================================================

export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};
