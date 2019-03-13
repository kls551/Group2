<template>
  <div class="services">
    
    <div class="container" style="margin-top: 40px; margin-bottom: 25px;">

      <h2 style="border-bottom: 1.5px solid orange; margin-bottom: 15px;">Services</h2>
    <div v-if="display">
      <!-- <button class="button" v-on:click="getServices()" >  add service </button> -->
      <div v-for="(service, index) in services" v-bind:key="index">


        <div class="tile is-ancestor">
          <div class="tile is-3"></div>
            <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
              <div class="columns">
                <div class="column">
                  <h2>{{ service.serviceName }}</h2>
                </div>
                <div class="column">
                  <p>{{ service.description }}</p>
                </div>
                <div class="column">
                  <h2>${{ service.price }}</h2>
                </div>
              </div>
            </div>
            </div>
            <div class="tile is-3"></div>
        </div>

      </div>
    </div>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop} from "vue-property-decorator";
import Modal  from "../components/Modal.vue";
import { iService } from "../models/service.interface";
import addServiceForm  from "./ownerService.vue";
import  { Service } from "../../../api/entity";

@Component({
  components: { Modal }
})

export default class Services extends Vue{
    // @Prop(Boolean) isShowing: boolean = true;
    public services: Service[] = [];
    public display = true;
    mounted() {
      this.getServices();
    }
    getServices() {
      console.log("getting services");
      axios.get(APIConfig.buildUrl("/owner/edit-services"), {
      })
      .then((response) => {
          this.services = response.data;
          console.log("service ", this.services);
          // this.display = false;
      });
    }
}


</script>

<style lang="scss">

.service {
  color: #ffa500;
}

.hours {
  background-color: #ffe7c1;
}

.subtitle {
  font-size: 16px;
}

h2 {
    font-family: 'Questrial';
    color: orange;
    font-size: 28px;
}

h3 {
    font-family: 'Questrial';
    font-size: 16px;
}
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


