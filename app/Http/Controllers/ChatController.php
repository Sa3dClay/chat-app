<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Events\ChatEvent;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat() {
        return view('chat');
    }

    public function send(Request $req) {
        $user = User::find(Auth::id());
        event(new ChatEvent($user, $req->message));

        return $req->all();
    }

    // fro test
    // public function send() {
    //     $message = "hello";
    //     $user = User::find(Auth::id());
    //     event(new ChatEvent($user, $message));
    // }
}
