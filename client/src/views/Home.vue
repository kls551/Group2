<template>
  <div class="container" style="margin-top: 15px; margin-bottom: 15px">

    <!-- Four Grid Pictures -->
      <div class="tile is-ancestor">
        <div class="tile is-1"></div>
        <div class="tile is-5 is-vertical is-parent">

          <!-- Shop Mountain -->
          <div class="tile is-child">
            <figure class="image is-3by2">
                <img src="../assets/mountain-bike.jpg">
                <div class="middle">
                  <a><div class="hover-text">Mountain</div></a>
                </div>
            </figure> 
          </div>

          <!-- Shop Cruisers -->
          <div class="tile is-child">
            <figure class="image is-3by2">
              <img src="../assets/race-bikes.jpg">
              <div class="middle">
                  <a><div class="hover-text">Cruisers</div></a>
                </div>
            </figure>
          </div>
        </div>

        <!-- Shop Racing -->
        <div class="tile is-5 is-parent is-vertical">
          <div class="tile is-child">
            <figure class="image is-3by2">
              <img src="../assets/beach-cruiser.jpg">
              <div class="middle">
                  <a><div class="hover-text">Racing</div></a>
              </div>
            </figure>
          </div>

          <!-- Shop Accesories -->
          <div class="tile is-child">
            <figure class="image is-3by2">
              <img src="../assets/bike-accessories.jpg">
               <div class="middle">
                <a><div class="hover-text">Accesories</div></a>
              </div>
            </figure>
          </div>
        </div>
    </div>
    <div class="tile is-1"></div>

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

<style scoped lang="scss">

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

figure:hover img {
  opacity: 0.3;
}

figure:hover .middle {
  opacity: 1;
}

.hover-text {
  background-color: orange;
  color: white;
  font-size: 20px;
  padding: 12px 26px;
}

.hover-text:hover {
  background-color: rgb(252, 202, 110);
}

</style>

