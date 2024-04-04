<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTableModel extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = ['userId', 'price', 'items'];
}
