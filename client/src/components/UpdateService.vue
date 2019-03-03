<template>
    <modal
        v-bind:is-showing="isShowing"
        title="Edit Service"
        success-button="Save Changes"
        v-on:success="success"
        v-on:cancel="cancel" >

        <form v-on:submit.prevent="onSubmit">
        <p v-if="error">{{ error }}</p>
        <!-- service name field  -->
        <div class="field">
            <label class="label">Service Name</label>
            <div class="control">
            <input
                class="input"
                type="text"
                placeholder=editingSrv.serviceName
                v-model="service.serviceName"
            >
            </div>
        </div>

        <!-- description field -->
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
            <input class="input" type="text" placeholder="description" v-model="service.description">
            </div>
        </div>

        <!-- description field -->
        <div class="field">
            <label class="label">Price</label>
            <div class="control">
            <input class="input" placeholder="price" v-model="service.price">
            </div>
        </div>

        </form>

    </modal>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Modal from "./Modal.vue";
import  { Service } from "../../../api/entity";
// import ServiceForm from "../views/OwnerEditServices.vue";


@Component({
  components: {
    Modal
  }
})

export default class UpdateService extends Vue {
//   @Prop(String) title!: string;
    error: string | boolean = false;
    @Prop(Boolean) isShowing: boolean = false;

    // @Prop() editingSrv : Service = {
    //     id: 0,
    //     serviceName: "",
    //     description: "",
    //     price: 0
    // }
    // @Prop({ type: String, default: "Save" })
    // @Prop() srvId : number | undefined = 0;
    // successButton: string | undefined;
    @Prop ()
    service: EditServiceForm = {
        serviceName: "",
        description: "",
        price: undefined
    };

    @Watch("isShowing")
    handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
        if (!isShowingStart && isShowingEnd) {
            this.service = {
                serviceName: "",
                description: "",
                price: undefined
            };
        }
    } 

    success() {
        this.$emit("success");
    }

    cancel() {
        this.$emit("cancel");
    }
}

export interface EditServiceForm {
    serviceName: string;
    description: string;
    price: number | undefined;
}
</script>