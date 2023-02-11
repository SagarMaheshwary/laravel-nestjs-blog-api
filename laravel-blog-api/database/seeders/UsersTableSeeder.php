<?php

namespace Database\Seeders;

use App\Services\UserService;
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
    public function run(UserService $userService)
    {
        $userService->createUser([
            'name'     => 'Admin',
            'role'     => 'admin',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('Password123'),
        ]);

        $userService->createUser([
            'name' => 'User',
            'role' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make('Password123'),
        ]);
    }
}
