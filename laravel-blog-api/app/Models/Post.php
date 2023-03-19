<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'body',
        'image',
        'user_id',
    ];

    protected function imageUrl(): Attribute
    {
        $urlPrefix = config('filesystems.storage_url');

        return Attribute::make(
            get: fn ($value, $attributes) => "{$urlPrefix}{$attributes['image']}",
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'post_category', 'post_id', 'category_id');
    }

    /**
     * Get all the post comments that are not
     * replies.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id')->whereNull('parent_id');
    }
}
