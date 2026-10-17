<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'Root Administrator',
            'email' => 'admin@example.com',
        ]);

        User::factory()->hr()->create([
            'name' => 'Ana Rivas',
            'email' => 'hr@example.com',
        ]);

        User::factory()->employee()->create([
            'name' => 'Carlos Mendez',
            'email' => 'employee@example.com',
        ]);

        $this->call(DepartmentSeeder::class);
    }
}
