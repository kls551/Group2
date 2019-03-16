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
                placeholder=service.serviceName
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
            <p v-if="isNaN(service.price)" class="help is-danger">Price must be a number</p>
            </div>
        </div>

        <div class="field">
            <label class="label">Image</label>
            <div class="control">
            <input class="input" type="text" placeholder="URL" v-model="service.imgURL">
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
import { constants, connect } from "http2";
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
    @Prop ({default : null}) 
    service : Service | undefined;

    editingService: EditServiceForm = {
        serviceName: "",
        description: "",
        imgURL: "",
        price: undefined
    };

    @Watch("isShowing")
    handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
        if (!isShowingStart && isShowingEnd) {
            this.editingService = {
                serviceName: "",
                description: "",
                imgURL: "",
                price: undefined
            };
        }
    } 

    success() {
        console.log(this.$props);
         axios
        .put(APIConfig.buildUrl("/owner/edit-services/" + this.$props.service.id ), 
            {serviceName: this.$props.service.serviceName,
            description: this.$props.service.description,
            price : this.$props.service.price,
            imgURL: this.$props.service.imgURL }
        )
        .then( () => {
            this.$emit("success");
        })
       
    }

    cancel() {
        this.$emit("cancel");
    }
}

export interface EditServiceForm {
    serviceName: string;
    description: string;
    imgURL: string;
    price: number | undefined;
}
</script>