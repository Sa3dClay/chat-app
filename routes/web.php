<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chat', [App\Http\Controllers\ChatController::class, 'chat']);
Route::post('/send', [App\Http\Controllers\ChatController::class, 'send']);
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
