require('./bootstrap')

import Vue from 'vue'
import axios from 'axios'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
Vue.use(Toaster, { timeout: 5000 })
import 'v-toaster/dist/v-toaster.css'

Vue.component('message-component', require('./components/MessageComponent.vue').default)

const app = new Vue({
    el: '#app',

    data: () => ({
        message: '',
        typing: '',
        nOfUsers: 0,
        chat: {
            messages: [],
            colors: [],
            users: [],
            times: []
        }
    }),
    
    methods: {
        sendMessage() {
            if (this.message != 0) {
                this.chat.messages.push(this.message)
                this.chat.colors.push('primary')
                this.chat.users.push('you')
                this.chat.times.push(this.getTime())

                axios.post('/send', {
                    message: this.message,
                    chat: this.chat
                })
                    .then(response => {
                        // console.log(response)
                        this.message = ''
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        
        getTime() {
            let time = new Date()
            return time.getHours() + ':' + time.getMinutes()
        },

        getOldMessages() {
            axios.get('/getOldMessages')
                .then(res => {
                    // console.log('old data ', res.data)
                    if (res.data) {
                        // console.log('old data ', res.data)
                        this.chat = res.data
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                })
        }
    },
    
    mounted() {
        this.getOldMessages()

        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                // console.log(e)
                this.chat.messages.push(e.message)
                this.chat.colors.push('danger')
                this.chat.users.push(e.user)
                this.chat.times.push(this.getTime())

                axios.post('/storeDataToSession', {
                    chat: this.chat
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .listenForWhisper('typing', (e) => {
                if (e.name != '') {
                    this.typing = 'typing...'
                } else {
                    this.typing = ''
                }
            })

        Echo.join('chat')
            .here((users) => {
                // console.log(users)
                this.nOfUsers = users.length
            })
            .joining((user) => {
                this.$toaster.success(user.name + ' joined the chat room', { timeout: 3000 })
                this.nOfUsers++
            })
            .leaving((user) => {
                this.$toaster.error(user.name + ' leaved the chat room', { timeout: 3000 })
                this.nOfUsers--
            })
            .error((error) => {
                console.error(error);
            })
    }
})
