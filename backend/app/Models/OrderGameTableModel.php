<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderGameTableModel extends Model
{
    use HasFactory;

    protected $table = 'order_game';
    protected $fillable = ['orderId', 'userId', 'gameId', 'quantity', 'name', 'price'];
}
