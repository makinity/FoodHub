<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'description', 'price', 'image_url', 'category_id', 'is_available', 'stock'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_available' => 'boolean',
        ];
    }

    public function getImageUrlAttribute($value): ?string
    {
        return $value ?: null;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
