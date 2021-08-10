@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-9 col-md-6 col-lg-3">
            <h2 class="text-center bg-primary py-2 text-white">
                Chat Room
                <span class="badge bg-info">@{{ nOfUsers }}</span>
            </h2>
            <h3 class="badge bg-danger text-white">@{{ typing }}</h3>

            <ul class="list-group" v-chat-scroll>
                <message-component
                    v-for="(message, index) in chat.messages"
                    :username=chat.users[index]
                    :bgColor=chat.colors[index]
                    :time=chat.times[index]
                    textColor="white"
                    :key="index"
                >
                    @{{ message }}
                </message-component>
            </ul>

            <input
                type="text"
                id="message"
                name="message"
                v-model="message"
                class="form-control mt-2"
                @keyup.enter="sendMessage()"
                placeholder="Type your message here"
            >
        </div>
    </div>
</div>
@endsection
