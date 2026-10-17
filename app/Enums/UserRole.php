<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Hr = 'hr';
    case Employee = 'employee';

    /**
     * The human readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Hr => 'Human Resources',
            self::Employee => 'Employee',
        };
    }

    /**
     * Whether the role is allowed into the administration panel.
     */
    public function canAccessAdminPanel(): bool
    {
        return $this !== self::Employee;
    }

    /**
     * The path the role is sent to after a successful authentication.
     */
    public function homePath(): string
    {
        return $this->canAccessAdminPanel()
            ? route('admin.dashboard', absolute: false)
            : route('portal.dashboard', absolute: false);
    }

    /**
     * The scalar values of every case, useful for validation rules.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
