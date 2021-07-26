require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.component('message-component', require('./components/MessageComponent.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            messages: [],
            colors: [],
            users: []
        },
    },
    methods: {
        sendMessage() {
            if(this.message != 0) {
                this.chat.messages.push(this.message)
                this.chat.colors.push('primary')
                this.chat.users.push('you')

                axios.post('/send', {
                    message: this.message
                })
                    .then( response => {
                        console.log(response);
                        this.message = ''
                    })
                    .catch( error => {
                        console.log(error);
                    });
            }
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                console.log(e)
                this.chat.messages.push(e.message)
                this.chat.colors.push('danger')
                this.chat.users.push(e.user)
            });
    }
});
