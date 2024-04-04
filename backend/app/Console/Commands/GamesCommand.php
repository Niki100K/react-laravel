<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class GamesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:games-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $games = Games::all();
        Cache::put('games', $games);
    }
}
