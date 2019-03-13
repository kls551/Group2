<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;">

        <!-- Service List -->
        <div class="tile is-ancestor">
            <!-- navigating services options on the left -->
            <div class="tile is-2" style="margin-top: 15px"> 
                <aside class="menu" >
                    <div class="menu-label title"> <h2> Menu </h2> </div>
                    <ul class="menu-list">
                        <li ><router-link to="/owner/edit-services"> <h3> Edit  </h3> </router-link></li>
                        <li ><router-link to="/owner/create-services"> <h3> New Service </h3> </router-link></li>
                    </ul>
                </aside>
            </div>

            <!-- editing area on the right -->
            <div class="tile is-9 is-vertical is-parent">
                <br>
                <h2>Services Available</h2>
                <br>
                <div class="tile is-child">
                    <table class="table is-striped is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                            <th> <h3> Service Name </h3> </th>
                            <th> <h3> Price  </h3> </th>
                            <th> <h3> Description  </h3> </th>
                            <th> <h3> Edit </h3> </th>
                            <th> <h3> Delete </h3> </th>
                            </tr>
                        </thead>

                        <tbody>
                                <tr v-for="(service, index) in services" v-bind:key="index">
                                    <th> {{ service.serviceName }} </th>
                                    <th> {{ service.price }}  </th>
                                    <th> {{ service.description }} </th>
                                    <th> <span class="tile file-icon" v-on:click="showEditForm(service)">
                                        <font-awesome-icon icon="edit"/> <!-- edit icon -->
                                    </span> </th>

                                    <th> <span class="file-icon" v-on:click="showDeleteConfirm(service)">
                                        <font-awesome-icon icon="trash-alt" /> <!-- trash icon -->
                                    </span> </th>
                                </tr>

                        </tbody>

                    </table>
                </div>

            </div>
            <div class="tile is-3"></div>
        </div>
        <!-- </form> -->
        <!-- </modal> -->
        <UpdateService 
            v-bind:is-showing="showEdit"
            v-bind:service="selectedService"
            v-on:success="successUpdate()" 
            v-on:cancel="cancelUpdate()"> </UpdateService>

        <DeleteConfirm 
            v-bind:is-showing="showDelConfirm"
            v-bind:del="confirmDel"
            v-on:success="successDelete()" 
            v-on:cancel="cancelDelete()"> </DeleteConfirm>

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
import DeleteConfirm  from "@/components/DeleteConfirm.vue";
@Component({
  components: { Modal, UpdateService, DeleteConfirm}
})

export default class OwnerEditServices extends Vue{
    // @Prop(Boolean) isShowing: boolean = false;
    public showEdit: boolean = false;
    public showDelConfirm: boolean = false;
    public confirmDel: boolean = false;
    public delId: number = -1;

    public editServiceName = "";
    public editDescription = "";
    public editPrice = 0;
    public editImage = "";

    service: ServiceForm = {
        serviceName: "",
        description: "",
        price: 0
    };
    error: string | boolean = false;

    public services: Service[] = [];
    public display = true;
    public selectedService: Service  = {
        id: 0,
        serviceName: "",
        description: "",
        price: 0
    };

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
      this.getServices();
    }
    cancelUpdate() {
        this.showEdit = false;
        this.getServices();
    }

    successDelete() {
        this.showDelConfirm = false;
        this.removeService(this.delId);
    }

    cancelDelete() {
        this.showDelConfirm = false;
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
        this.showEdit = false;
        this.$emit("cancel");  
    }

    showEditForm(srv : Service) {
        this.showEdit = true;
        this.selectedService = srv;
    }

    showDeleteConfirm(srv : Service) {
        this.delId = srv.id;
        this.showDelConfirm = true;
    }
    removeService( srvId : number | undefined ) {
        axios
        .delete(APIConfig.buildUrl("/owner/edit-services/" + srvId ))
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
thead {
    background-color: #ffe7c1;
}

.menu {
    margin-top: 20px;
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