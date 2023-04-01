<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'slug'        => $this->slug,
            'body'        => $this->body,
            'image'       => $this->image_url,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->whenHas('updated_at'),
            'user'        => new UserResource($this->whenLoaded('user')),
            'categories'  => CategoryResource::collection($this->whenLoaded('categories')),
            'comments'    => CommentResource::collection($this->whenLoaded('comments')),
            'likes_count' => $this->whenCounted('likes'),
        ];
    }
}
