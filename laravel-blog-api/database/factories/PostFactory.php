<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title'   => fake()->realText(50),
            'slug'    => fake()->slug(),
            'body'    => fake()->realTextBetween(2000, 5000),
            'image'   => 'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA', // https://picsum.photos/
            // 'user_id' => //using factory relationships for this.
        ];
    }
}
