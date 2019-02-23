<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;">

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

            <!-- editing area on the right -->
            <div class="tile is-8 is-vertical is-parent">
                <br>
                <h2>Services Available</h2>
                <br>
                <div class="tile is-child">
                    <div class="tile">
                        <div class="tile"> Service Name </div>
                        <div class="tile"> Pricing  </div>
                        <div class="tile"> Hours  </div>
                        <div class="tile is-1"> Edit  </div>
                        <div class="tile is-1"> Delete  </div>
                        <!-- <input type="text input" class="input is-warning is-small" placeholder="Service Name" v-model="service.serviceName"> -->
                    </div>
                </div>
                <div class="tile is-child">
                    <div class="tile">
                        <div class="tile"> Tire </div>
                        <div class="tile"> $20.00  </div>
                        <div class="tile"> 7:00am-7pm </div>
                        <div class="tile is-1"> 
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="tile is-1">   </div>
                        <!-- <input type="text input" class="input is-warning is-small" placeholder="Service Name" v-model="service.serviceName"> -->
                    </div>
                </div>


                <div class="tile is-child box">
                    <span>Description </span>
                    <textarea class="textarea input is-warning is-small" rows="8" placeholder="Description ... "  v-model="service.description"></textarea>
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
                        <button class="button is-success" type="submit" v-on:click="success">Submit</button>
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

export default class OwnerEditServices extends Vue{
    @Prop(Boolean) isShowing: boolean = false;
    service: addServiceForm = {
        serviceName: "",
        description: ""
    };
    error: string | boolean = false;
    success() {
        this.error = false;
        console.log("submit is pressed --- handling post ");
        axios 
        .post(APIConfig.buildUrl("/owner/services"), {
            // console.log("service ", this.service);
            ...this.service
        } )
        .then ((response : AxiosResponse<iService> ) => {
            this.$emit("success");
            this.service.serviceName = "",
            this.service.description  = ""
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
}
</script>

<style scoped lang="scss">

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

</style>