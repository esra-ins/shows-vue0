<template>
  <!-- <nav> -->
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
  <!-- </nav> -->
  <header-comp-vue/>
  <!-- <router-view/> -->

  <main>
    <router-view/>
  </main>
</template>

<script>
import HeaderCompVue from './components/HeaderComp.vue'

export default {
components: {
  HeaderCompVue,
}
}
</script>
