<template>
  <div class="services">
    <p class="title"> This is the services that FoxCycle Offer</p> 
      <div class="tile is-ancestor"> 
        <div class="tile is-parent is-vertical">
          <div class="title box is-4 is-primary is-dark"> 
            <p class="title"> Wheels Services </p>
            <div class="picture"> <img src="../assets/tireChange.jpg"  height="200" width="200"> </div>
          </div>

          <div class="title box iis-vertical s-4 is-primary"> 
            <p class="title"> Brake Services </p> 
            <div class="picture"> <img src="../assets/brakeTuning.jpeg"  height="200" width="200"> </div>
          </div>
          <div class="title box is-vertical is-4 is-primary">  
            <p class="title"> Customization </p> 
            <div class="picture"> <img src="../assets/customBike.jpeg"  height="200" width="200"> </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../assets/main.scss";
export default Vue.extend({
  
})
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";

/* .column {
  -webkit-column-gap: 3; 
  column-gap: 3;
  background-color: 	#FFA500	;
} */

/* .row:after {
  content: "";
  display: table;
  clear: both;
} */

</style>


