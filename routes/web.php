<?php

use Illuminate\Support\Facades\Route;

Auth::routes();
Broadcast::routes();

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/chat', 'ChatController@chat');
Route::post('/send', 'ChatController@send');
Route::post('/storeDataToSession', 'ChatController@storeDataToSession');
Route::get('/getOldMessages', 'ChatController@getOldMessages');

Route::get('/check', function() {
    return session('chat');
});
