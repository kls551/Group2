<template>
    <modal
        v-bind:is-showing="isShowing"
        title="Edit Profile"
        success-button="Save Changes"
        v-on:success="success"
        v-on:cancel="cancel" >

        <form v-on:submit.prevent="onSubmit">
        <p v-if="error">{{ error }}</p>
        <!-- first name field  -->
        <div class="field">
            <label class="label">First Name</label>
            <div class="control">
            <input
                class="input"
                type="text"
                placeholder=user.firstName
                v-model="user.firstName"
            >
            </div>
        </div>

        <!-- last name field -->
        <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
            <input class="input" type="text" placeholder=user.lastName v-model="user.lastName">
            </div>
        </div>

        <!-- password field -->
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
            <input class="input" placeholder="new password" v-model="user.Password">
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
import { iUser }  from "../models/user.interface";
// import ServiceForm from "../views/OwnerEditServices.vue";


@Component({
  components: {
    Modal
  }
})

export default class UpdateProfile extends Vue {
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
    // @Prop ()
    // service: EditServiceForm = {
    //     serviceName: "",
    //     description: "",
    //     price: undefined
    // };

    @Prop({ default: null })
    user!: iUser | null;

    @Watch("isShowing")
    handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
        if (!isShowingStart && isShowingEnd) {
            console.log("watching changes");
        }
    } 

    success() {
        this.$emit("success");
    }

    cancel() {
        this.$emit("cancel");
    }
}

</script>