<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'     => 'Admin',
            'role'     => 'admin',
            'email'    => 'admin@blog.com',
            'password' => Hash::make('Password123'),
        ]);

        User::create([
            'name'     => 'User',
            'role'     => 'user',
            'email'    => 'user@gmail.com',
            'password' => Hash::make('Password123'),
        ]);
    }
}
