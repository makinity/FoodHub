<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'icon', 'image'];

    public function getImageAttribute($value): ?string
    {
        return $value ?: null;
    }

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
