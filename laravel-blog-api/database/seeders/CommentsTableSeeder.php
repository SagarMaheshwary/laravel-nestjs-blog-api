<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::where('role', 'user')->get();

        foreach (Comment::all(['id', 'post_id']) as $comment) {
            //Create replies for each comment.
            Comment::factory()
                ->state([
                    'post_id'   => $comment->post_id,
                    'parent_id' => $comment->id,
                ])
                ->state(new Sequence(
                    fn ($sequence) => ['user_id' => $users->random()],
                ))->count(30)
                ->create();
        }
    }
}
