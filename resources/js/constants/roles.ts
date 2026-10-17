import type { UserRole } from '@/types';

/**
 * Human readable labels for each role, mirroring App\Enums\UserRole::label().
 */
export const USER_ROLE_LABELS = {
    admin: 'Administrator',
    hr: 'Human Resources',
    employee: 'Employee',
} as const satisfies Record<UserRole, string>;
