<template>
  <!-- <modal 
    v-bind:is-showing="isShowing" 
    title="Edit Service"
    success-button="Change"
    v-on:success="success"
    v-on:cancel="cancel">

    <form v-on:submit.prevent="onSubmit">
      <p v-if="error">{{ error }}</p>
      <div class="field">
        <label class="label"> Service Name </label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder=`{{service.serviceName}}
            v-model="signup.emailAddress"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="password" v-model="signup.password">
        </div>
      </div> 
    </form>-->


    <!-- <div class="modal" v-show="isShowing" v-bind:class="{'is-active': isShowing}" >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" aria-label="close" v-on:click="cancelHandler()"></button>
      </header>
      <section class="modal-card-body">
        <slot/>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="successHandler()">{{ successButton }}</button>
        <button class="button" v-on:click="cancelHandler()">Cancel</button>
      </footer>
    </div>
  </div> -->

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
        // else if (isShowingStart && !isShowingEnd) {
        //     this.service = {
        //         serviceName: this.editingSrv.serviceName,
        //         description: this.editingSrv.description,
        //         price: this.editingSrv.price
        //     }
        // }
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