<template>
    <div class="message">
        <li :class="className">
            <slot></slot>
        </li>
        <small>
            <span class="badge bg-danger text-white">You</span>
        </small>
    </div>
</template>

<script>
    export default {
        props: [
            'bgcolor',
            'textcolor'
        ],
        computed: {
            className() {
                return 'list-group-item bg-' + this.bgcolor + ' text-' + this.textcolor
            }
        }
    }
</script>
