<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;" >

        <!-- Announcement Form -->
        <div class="tile is-ancestor" style="margin-top: 23px;">
           <!-- navigating services options on the left -->
            <div class="tile is-2 "> 
                <aside class="menu" >
                    <div class="menu-label title"> <h2> Menu </h2> </div>
                    <ul class="menu-list">
                        <li ><router-link to="/owner/edit-services"> <h3> Edit </h3> </router-link></li>
                        <li ><router-link to="/owner/create-services"> <h3> New Service </h3> </router-link></li>
                    </ul>
                </aside>
            </div>

            <!-- create services on the right  -->
            <div class="tile is-8 is-vertical is-parent">
                <h2>New Service</h2>
                <div class="tile is-child box">
                    <span> <h3> Service Name </h3> </span>
                    <input type="text input" class="input is-warning is-small" placeholder="Service Name" v-model="service.serviceName">
                </div>
                <div class="tile is-child box">
                    <span> <h3> Description </h3> </span>
                    <textarea class="textarea input is-warning is-small" rows="8" placeholder="Description ... "  v-model="service.description"></textarea>
                </div>
                <div class="tile is-child box">
                    <span> <h3> Price </h3> </span>
                    <input type="text input" class="input is-warning is-small" placeholder="Price" v-model="service.price">
                </div>

                <!-- upload picture -->
                <div class="tile is-child box">
                     <!-- <div class="file has-name">
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
                    </div> -->
                    <form enctype="multipart/form-data" novalidate>
                        <div class="servicePhoto">
                        <img :src="serviceUrl"/>
                        </div>
                        <div class="file">
                        <label class="file-label">
                            <input
                            type="file"
                            name="servicePhoto"
                            :disabled="isSaving"
                            v-on:change="filesChanged"
                            accept="image/*"
                            class="input-file file-input"
                            >
                            <span class="file-cta">
                            <span class="file-icon">
                                <font-awesome-icon icon="upload"/> <!-- using icon -->
                            </span>
                            <span class="file-label">
                                Choose an image…
                            </span>
                            </span>
                        </label>
                        <p v-if="isSaving">Uploading file...</p>
                        </div>
                    </form>
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
                         <button class="button is-danger" type="reset"> Cancel </button>
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

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

@Component({
  components: { Modal }
})

export default class OwnerCreateServices extends Vue{
    @Prop(Boolean) isShowing: boolean = false;
    service: addServiceForm = {
        serviceName: "",
        description: "",
        price: undefined,
    };
    selectedImage : any = "";
    uploadError: string | null = null;
    currentStatus: number | null = null;
    fileCount : number = 0;
    error: string | boolean = false;
   

    filesChanged(event : any) {
        this.selectedImage = event.target.files[0];
        const name = event.target.name;
        const files = event.target.files;
        this.fileCount = event.target.files.length;
        // handle file changes
        const formData = new FormData();

        if (!files.length) return;

        // append the files to FormData
        Array.from(Array(files.length).keys()).map(x => {
        formData.append(name, files[x], files[x].name);
        });

        // save it
        this.save(formData);
    }

    save(formData: FormData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;
        this.upload(formData)
        .then(() => {
            this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
        });
    }

    upload(formData: FormData) {
        const url = `${APIConfig.url}/"onwer/edit-services`;
        const fd = new FormData();
        fd.append('image', this.selectedImage, this.selectedImage.name );
        return axios
        .post(url, fd)
        .then((res: AxiosResponse<{ serv: iService }>) => {
            this.$store.dispatch("fechtService", { imgUrl: res.data.serv.imgUrl });
        });
    }

    success() {
        this.error = false;
        console.log("submit is pressed --- handling post ");
        axios 
        .post(APIConfig.buildUrl("/owner/edit-services"), {
            ...{serviceName : this.service.serviceName,
                description : this.service.description,
                price : this.service.price}
        } )
        .then ((response : AxiosResponse<iService> ) => {
            this.$emit("success");
            this.service.serviceName = "",
            this.service.description  = "",
            this.service.price = undefined,
            this.$router.push("/owner/edit-services");
        })
        .catch((errorResponse: any) => {
            console.log("error ", errorResponse);
        });
    }

    cancel() {
        this.$emit("cancel");
        this.$router.push("/owner/edit-services");
    }
}

export interface addServiceForm {
  serviceName: string;
  description: string;
  price: number | undefined;
}
</script>

<style scoped lang="scss">

thead {
    background-color: #ffd280;
}

h2 {
    font-family: 'Arial';
    font-size: 34px;
}

h3 {
    font-family: 'Arial';
    font-size: 20px;
}

</style>