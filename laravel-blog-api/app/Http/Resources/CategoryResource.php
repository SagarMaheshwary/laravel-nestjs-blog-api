<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->whenHas('description'),
            'image'       => $this->whenHas('image', $this->image_url),
            'posts_count' => $this->whenCounted('posts'),
            'created_at'  => $this->whenHas('created_at'),
        ];
    }
}
