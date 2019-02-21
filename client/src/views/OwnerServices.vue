<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;">

        <!-- Announcement Form -->
        <div class="tile is-ancestor">
            <div class="tile is-2"></div>
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
                     <div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose an Image…
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
        
        
        <!-- Preview Announcment -->
        <div class="tile is-ancestor" style="margin-top: 15px">
            <div class="tile is-1"></div>
            <div class="tile is-10 box">
                <!-- Add content or other tiles -->
                <p class="title">Preview Service Page</p>
            </div>
            <div class="tile is-1"></div>
        </div>
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

export default class OwnerServices extends Vue{
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