<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\UserOrdersController;
use Illuminate\Support\Facades\Route;

Route::get('games', [GamesController::class, 'games']);
Route::post('register', [UserDataController::class, 'store']);
Route::post('login', [UserDataController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('upload-order/{id}', [UserOrdersController::class, 'order']);
});