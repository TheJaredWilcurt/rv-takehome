<template>
  <main id="app">
    <div class="wrapper">
      <!-- <img src="./assets/logo.png"> -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="sass">
@import "sass/styles.scss"
</style>
