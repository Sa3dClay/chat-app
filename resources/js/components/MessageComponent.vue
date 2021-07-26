<template>
    <div class="message">
        <li :class="className">
            <slot></slot>
        </li>
        <small class="userName">
            <span class="badge bg-info text-white">
                {{ username }}
            </span>
        </small>
    </div>
</template>

<script>
    export default {
        props: [
            'bgcolor',
            'textcolor',
            'username'
        ],
        computed: {
            className() {
                return 'list-group-item bg-' + this.bgcolor + ' text-' + this.textcolor
            }
        }
    }
</script>
