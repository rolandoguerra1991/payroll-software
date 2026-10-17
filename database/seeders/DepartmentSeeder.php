<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technology = Department::create(['name' => 'Technology']);
        Department::create(['name' => 'Engineering', 'parent_id' => $technology->id]);
        Department::create(['name' => 'IT Support', 'parent_id' => $technology->id]);

        $operations = Department::create(['name' => 'Operations']);
        Department::create(['name' => 'Customer Support', 'parent_id' => $operations->id]);
        Department::create(['name' => 'Logistics', 'parent_id' => $operations->id]);

        $people = Department::create(['name' => 'People']);
        Department::create(['name' => 'Recruitment', 'parent_id' => $people->id]);

        Department::create(['name' => 'Finance']);
    }
}
