<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Support\Facades\Cache;

class GamesController extends Controller
{
    public function games()
    {
        $games = Cache::get('games');
        if (!$games) {
            $games = Games::all();
            Cache::put('games', $games);
        }
        return response()->json($games);
    }
}
