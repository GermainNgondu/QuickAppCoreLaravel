<?php

namespace App\Core\Domains\Media\Models;

use Illuminate\Database\Eloquent\Model;

class MediaCollection extends Model
{
    protected $fillable = ['name', 'slug', 'icon', 'description'];
}