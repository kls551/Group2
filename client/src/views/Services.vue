<template>
  <div class="services">
    <h1>This is an services</h1>
    <div class="columns">
      <div class="column is-one-third is-3 is-orange"> 
        <p> Wheels Services </p>
        <div class="picture"> <img src="../assets/tireChange.jpg"  height="600" width="500"> </div>
      </div>

      <div class="column is-one-third is-3"> 
        <p> Brake Services </p> 
        <div class="picture"> <img src="../assets/brakeTuning.jpeg"  height="600" width="500"> </div>
      </div>
    <div class="column is-one-third is-3">  
      <p> Customization </p> 
      <div class="picture"> <img src="../assets/customBike.jpeg"  height="500" width="500"> </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  
})
</script>

<style scoped>
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


