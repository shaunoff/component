<template lang="pug">
  .container-fluid
    pbxxheader
    .row.demo-file
      router-view
</template>

<script>
import pbxxheader from '../components/navigation/header.vue'
// @vue/component
export default {
  name: 'app',
  components: {
    pbxxheader
  }
}
</script>

<style lang="scss" scoped>
  .demo-file {
    padding:20px;
  }
</style>
