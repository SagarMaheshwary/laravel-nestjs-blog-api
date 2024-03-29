<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id'         => $this->id,
            'name'       => $this->name,
            'image'      => $this->whenHas('image', fn () => $this->image_url),
            'email'      => $this->whenHas('email'),
            'role'       => $this->whenHas('role'),
            'created_at' => $this->whenHas('created_at'),
        ];
    }
}
