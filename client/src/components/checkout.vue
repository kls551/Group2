<template>
  <modal v-bind:is-showing="isShowing" title="Checkout" success-button="Checkout" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="First name" v-model="checkout.firstName"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Last name" v-model="checkout.lastName"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input class="input" type="text" placeholder="Address" v-model="checkout.address"/>
        </div>
      </div>
      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input class="input" type="text" placeholder="City" v-model="checkout.city"/>
        </div>
      </div>      
      <div class="field">
        <label class="label">Credit Card</label>
        <div class="control">
          <input class="input" type="text" placeholder="Credit Card number" v-model="checkout.cnum"/>
        </div>
      </div>
      <div class="control">
        <label class="radio">
          <input type="radio" name="Pickup" v-model="checkout.Pickup" v-bind:value="true">
          Pickup
        </label>
      </div>     
    </form>
  </modal>
</template>


<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iOrder } from "../models/order.interface";

@Component({
  components: { Modal }
})
export default class order extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  checkout: orderForm = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    cnum: "",
    orderedDate: new Date,
    Pickup: false,
    user: 0
  };
  error: string | boolean = false;

  success() {
    debugger;
    this.error = false;
    this.checkout.user = this.$store.state.user;
    console.log('hello');
    axios
      .post(APIConfig.buildUrl("/checkout"), {
        ...this.checkout
      }, {headers: {token: this.$store.state.userToken}})
      .then((response: AxiosResponse<iOrder>) => {
        this.$emit("success");
      })
      .catch((errorResponse: any) => {
        debugger;
        this.error = errorResponse.response.data.reason;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface orderForm {
  user: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  cnum: string;
  Pickup: boolean;
  orderedDate: Date | null;
}
</script>
