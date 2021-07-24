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
            messages: []
        }
    },
    methods: {
        sendMessage() {
            if(this.message != 0) {
                this.chat.messages.push(this.message)
                this.message = ''
            }
        }
    }
});
