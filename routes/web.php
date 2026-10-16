<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::inertia('/login', 'auth/Login')->name('login');

Route::inertia('/forgot-password', 'auth/ForgotPassword')->name('password.request');
Route::inertia('/reset-password/{token}', 'auth/ResetPassword')->name('password.reset');
Route::inertia('/confirm-password', 'auth/ConfirmPassword')->name('password.confirm');
Route::inertia('/two-factor-challenge', 'auth/TwoFactorChallenge')->name('two-factor.login');

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::inertia('/dashboard', 'admin/Dashboard')->name('dashboard');
    Route::inertia('/employees', 'admin/Employees')->name('employees');
    Route::inertia('/attendance', 'admin/Attendance')->name('attendance');
    Route::inertia('/departments', 'admin/Departments')->name('departments');
    Route::inertia('/positions', 'admin/Positions')->name('positions');
});

Route::prefix('portal')->name('portal.')->group(function (): void {
    Route::inertia('/dashboard', 'portal/Dashboard')->name('dashboard');
    Route::inertia('/payroll', 'portal/Payroll')->name('payroll');
    Route::inertia('/attendance', 'portal/Attendance')->name('attendance');
    Route::inertia('/profile', 'portal/Profile')->name('profile');
});
