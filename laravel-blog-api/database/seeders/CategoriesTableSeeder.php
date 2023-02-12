<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()
            ->state(new Sequence(
                ['title' => 'Laravel'],
                ['title' => 'VueJS'],
                ['title' => 'NodeJS'],
                ['title' => 'ReactJS'],
                ['title' => 'Nginx'],
            ))
            ->count(5)
            ->create();
    }
}
