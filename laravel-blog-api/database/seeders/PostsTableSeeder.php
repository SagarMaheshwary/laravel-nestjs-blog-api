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
        Post::factory()
            ->count(20)
            ->for(User::where('role', 'admin')->first()) // this will be our first user (admin@gmail.com).
            ->hasAttached(Category::all()) // create 20 posts for each category
            ->has(
                Comment::factory()->state(new Sequence(
                    fn ($sequence) => ['user_id' => User::where('role', 'user')->get()->random()],
                ))->count(10) // create 10 comments for each post
            )
            ->create();
    }
}
