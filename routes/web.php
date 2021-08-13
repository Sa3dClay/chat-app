<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/chat', [App\Http\Controllers\ChatController::class, 'chat']);
Route::post('/send', [App\Http\Controllers\ChatController::class, 'send']);
Route::post('/storeDataToSession', [App\Http\Controllers\ChatController::class, 'storeDataToSession']);
Route::post('/getOldMessages', [App\Http\Controllers\ChatController::class, 'getOldMessages']);

Route::get('/check', function() {
    return session('chat');
});
