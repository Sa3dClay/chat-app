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
        $this->storeDataToSession($req);

        event(new ChatEvent($user, $req->message));

        return $req->all();
    }

    public function storeDataToSession(Request $req) {
        session()->put('chat', $req->chat);
    }

    public function getOldMessages() {
        return session('chat');
    }
}
