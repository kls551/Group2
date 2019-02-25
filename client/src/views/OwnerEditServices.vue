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
                        <div class="tile is-3"> Service Name </div>
                        <div class="tile is-1"> Price  </div>
                        <div class="tile"> Description  </div>
                        <div class="tile is-1"> Edit  </div>
                        <div class="tile is-1"> Delete  </div>
                        <!-- <input type="text input" class="input is-warning is-small" placeholder="Service Name" v-model="service.serviceName"> -->
                    </div>
                </div>


                <!-- list of services -->
                <div v-for="(service, index) in services" v-bind:key="index">
                    <div class="tile is-child">
                        <div class="tile">
                            <div class="tile is-3"> {{ service.serviceName }} </div>
                            <div class="tile is-1"> {{ service.price }}  </div>
                            <div class="tile"> {{ service.description }}</div>
                            <!-- <span class="icon"> 
                                <i class="fas fa-edit"></i>
                            </span> -->
                        
                            <a class="button" v-on:click="showEditForm(services[index])">edit </a>
                            <a class="button" v-on:click="removeService(service.id)">delete </a>
                        </div>
                    </div>

                </div>
<!-- 
                edit form  -->
                <!-- <form v-on:submit.prevent="onSubmit" v-if="showEdit" > -->
                <form v-if="showEdit" >
                        <p v-if="error">{{ error }}</p>
                        <!-- service name field  -->
                        <div class="field">
                            <label class="label">Service Name</label>
                            <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder=""
                                v-model="editServiceName"
                            >
                            
                            </div>
                        </div>

                        <!-- description field -->
                        <div class="field">
                            <label class="label">Description</label>
                            <div class="control">
                            <input class="input" type="text" placeholder="" v-model="editDescription">
                            </div>
                        </div>

                        <!-- description field -->
                        <div class="field">
                            <label class="label">Price</label>
                            <div class="control">
                            <input class="input" placeholder="" v-model="editPrice">
                            </div>
                        </div>

                        <!-- Submit, Preview, cancel buttons -->
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link">Preview</button>
                            </div>
                            <div class="control">
                                <button class="button is-success" type="submit" v-on:click="updateService()">Save Changes</button>
                            </div>
                            <div class="control">
                                <button class="button is-danger" type="reset">Cancel</button>
                            </div>
                        </div>
                    </form>


            </div>
            <div class="tile is-3"></div>
        </div>
        <!-- </form> -->
        <!-- </modal> -->
        <!-- <UpdateService 
            v-bind:is-showing="showEdit"
            v-on:success="successUpdate()" 
            v-on:cancel="cancelUpdate()"> </UpdateService> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop} from "vue-property-decorator";
import Modal  from "../components/Modal.vue";
import { iService } from "../models/service.interface";
import { Service } from "../../../api/entity";
import UpdateService  from "@/components/UpdateService.vue";
@Component({
  components: { Modal, UpdateService }
})

export default class OwnerEditServices extends Vue{
    // @Prop(Boolean) isShowing: boolean = false;
    public showEdit: boolean = false;
    public editServiceName = "";
    public editDescription = "";
    public editPrice = 0;
    public editSrv : Service = {
        id: 0,
        serviceName: "",
        description: "",
        price: 0
    };
    service: ServiceForm = {
        serviceName: "",
        description: "",
        price: 0
    };
    error: string | boolean = false;

    public services: Service[] = [];
    public display = true;
    mounted() {
      this.getServices();
    }

    getServices() {
        axios.get(APIConfig.buildUrl("/owner/edit-services"), {
        })
        .then((response) => {
            this.services = response.data;
        });
    }

    successUpdate() {
      this.showEdit = false;
    }
    cancelUpdate() {
        this.showEdit = false;
    }
    success() {
        this.error = false;
       
        axios 
        .post(APIConfig.buildUrl("/owner/edit-services"), {
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

    showEditForm(srv : Service) {
        console.log("srv ", srv);
        this.editSrv = srv;
        this.editServiceName = srv.serviceName;
        this.editDescription = srv.description;
        this.editPrice = srv.price;
        console.log("editSrv ", srv);
        this.showUpdate();
    }
    showUpdate() {
        this.showEdit = true;
    }

    removeService( srvId : number | undefined ) {
        axios
        .delete(APIConfig.buildUrl("/owner/edit-services/" + srvId ))
        .then( () => {
            this.getServices();
        }) 
    }

    updateService() {
        console.log("updatesrv: ", this.editSrv);
        axios
        .put(APIConfig.buildUrl("/owner/edit-services/" + this.editSrv.id ), 
            {serviceName: this.editServiceName,
            description: this.editDescription,
            price : this.editPrice }
        )
        .then( () => {
            this.getServices();
        })
    }


}

export interface ServiceForm {
  serviceName: string;
  description: string;
  price: number;
}
</script>

<style scoped lang="scss">

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

</style>