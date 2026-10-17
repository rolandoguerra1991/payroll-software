<?php

use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin,hr'])->group(function (): void {
    Route::inertia('/dashboard', 'admin/Dashboard')->name('dashboard');
    Route::inertia('/employees', 'admin/Employees')->name('employees');
    Route::inertia('/attendance', 'admin/Attendance')->name('attendance');
    Route::resource('departments', DepartmentController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::inertia('/positions', 'admin/Positions')->name('positions');
});

Route::prefix('portal')->name('portal.')->middleware(['auth', 'role:admin,hr,employee'])->group(function (): void {
    Route::inertia('/dashboard', 'portal/Dashboard')->name('dashboard');
    Route::inertia('/payroll', 'portal/Payroll')->name('payroll');
    Route::inertia('/attendance', 'portal/Attendance')->name('attendance');
    Route::inertia('/profile', 'portal/Profile')->name('profile');
});
