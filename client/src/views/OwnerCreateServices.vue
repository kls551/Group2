<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;" >

        <!-- Announcement Form -->
        <div class="tile is-ancestor">
           <!-- navigating services options on the left -->
            <div class="tile is-2"> 
                <aside class="menu" >
                    <br>
                    <div class="menu-label title"> <h2> Menu </h2> </div>
                    <ul class="menu-list">
                        <li ><router-link to="/owner/edit-services"> Edit </router-link></li>
                        <li ><router-link to="/owner/create-services"> Create New Service </router-link></li>
                    </ul>
                </aside>
            </div>

            <!-- create services on the right  -->
            <div class="tile is-8 is-vertical is-parent">
                <h2>Create Service</h2>
                <div class="tile is-child box">
                    <span>Service Name</span>
                    <input type="text input" class="input is-warning is-small" placeholder="Service Name" v-model="service.serviceName">
                </div>
                <div class="tile is-child box">
                    <span>Description </span>
                    <textarea class="textarea input is-warning is-small" rows="8" placeholder="Description ... "  v-model="service.description"></textarea>
                </div>
                <div class="tile is-child box">
                    <span>Price</span>
                    <input type="text input" class="input is-warning is-small" placeholder="Price" v-model="service.price">
                </div>
                <div class="tile is-child box">
                     <div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose File
                            </span>
                            </span>
                            <span class="file-name">
                            Photo1.jpg
                            </span>
                        </label>
                        </div>
                </div>

                <!-- Submit, Preview, cancel buttons -->
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Preview</button>
                    </div>
                    <div class="control">
                        <button class="button is-success" type="submit" v-on:click="success()">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-danger" type="reset">Cancel</button>
                    </div>
                </div>

            </div>
            <div class="tile is-3"></div>
        </div>
        <!-- </form> -->
        <!-- </modal> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop} from "vue-property-decorator";
import Modal  from "../components/Modal.vue";
import { iService } from "../models/service.interface";

@Component({
  components: { Modal }
})

export default class OwnerCreateServices extends Vue{
    @Prop(Boolean) isShowing: boolean = false;
    service: addServiceForm = {
        serviceName: "",
        description: "",
        price: undefined
    };

    error: string | boolean = false;
    success() {
        this.error = false;
        console.log("submit is pressed --- handling post ");
        axios 
        .post(APIConfig.buildUrl("/owner/edit-services"), {
            // console.log("service ", this.service);
            // ...this.service
            ...{serviceName : this.service.serviceName,
                description : this.service.description,
                price : this.service.price}
        } )
        .then ((response : AxiosResponse<iService> ) => {
            this.$emit("success");
            this.service.serviceName = "",
            this.service.description  = "",
            this.service.price = undefined
        })
        .catch((errorResponse: any) => {
            console.log("error ", errorResponse);
        });
    }

    cancel() {
        this.$emit("cancel");
    }
}

export interface addServiceForm {
  serviceName: string;
  description: string;
  price: number | undefined;
}
</script>

<style scoped lang="scss">

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

</style>