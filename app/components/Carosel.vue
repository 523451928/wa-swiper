<template>
  <div>{{msg}}</div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'hello vue'
      }
    },
    mounted() {
      alert('hello')
    }
  }
</script>