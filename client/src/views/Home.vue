<template>
  <div class="home">
    <div class="container">
          <div class="columns">   
            <div class="column"></div>
            <div class="column is-four-fifths"><img alt="Vue logo" src="../assets/bike-shop.jpg"></div>
            <div class="column"></div>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style>

</style>

