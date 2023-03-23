<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::where('role', 'admin')->first();
        $users = User::where('role', 'user')->get();

        Post::factory()
            ->count(20)
            ->for($admin)
            ->hasAttached(Category::all()) //Create 20 posts for each category
            ->has(
                Comment::factory()->state(
                    new Sequence(fn ($sequence) => ['user_id' => $users->random()])
                )->count(25) //Create comments for each post
            )
            ->create();
    }
}
