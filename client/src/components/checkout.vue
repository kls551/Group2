<template>
  <div class="modal" v-bind:class="{'is-active': isShowing}">
    <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">CheckOut</p>
          <button class="delete" aria-label="close" v-on:click="cancel"></button>
        </header>
        <section class="modal-card-body">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="columns">
        <div class="column is-half">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="First name" v-model="checkout.firstName"/>
        </div>
        <p v-if="checkout.firstName.length <= 0" class="help is-danger">First Name is required</p>
      </div></div>
       <div class="column">
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Last name" v-model="checkout.lastName"/>
        </div>
        <p v-if="checkout.lastName.length <= 0" class="help is-danger">Last Name is required</p>
      </div></div></div>
      <div class="columns">
        <div class="column is-half">
      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input class="input" type="text" placeholder="Address" v-model="checkout.address"/>
        </div>
        <p v-if="checkout.address.length <= 0" class="help is-danger">Address is required</p>
      </div></div>
        <div class="column">
      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input class="input" type="text" placeholder="City" v-model="checkout.city"/>
        </div>
        <p v-if="checkout.city.length <= 0" class="help is-danger">City is required</p>
      </div> </div> </div>   



      <div class="field">
        <label class="label">Credit Card</label>
        <div class="control">
          <input class="input" type="text" placeholder="Credit Card number" v-model="checkout.cnum"/>
        </div>
          <p v-if="checkout.cnum.length <= 0" class="help is-danger">Credit Card Info is required</p>
      </div>

      <div class="columns">
        <div class="column is-half">
      <div class="field">
        <label class="label">Expiration Date</label>
        <div class="control">
          <input class="input" type="text" placeholder="Expr Date" v-model="checkout.expr"/>
        </div>
            <p v-if="checkout.expr.length <= 0" class="help is-danger">*</p>
      </div></div>
        <div class="column">
      <div class="field">
        <label class="label">Zip</label>
        <div class="control">
          <input class="input" type="text" placeholder="Zip" v-model="checkout.zip"/>
        </div>
        <p v-if="checkout.zip.length <= 0" class="help is-danger">*</p>
      </div> </div> </div>   

      <div class="control">
        <label class="radio">
          <input type="radio" name="Pickup" v-model="checkout.Pickup" v-bind:value="true">
          Pickup
        </label>
      </div>     
    </form>
    </section>
    <footer class="modal-card-foot">
      <a v-if="!formcheck" class="button is-success" v-on:click="success" disabled>Checkout</a>
      <a v-if="formcheck" class="button is-success" v-on:click="success">Checkout</a>
      <a class="button" v-on:click="cancel">Cancel</a>
    </footer>
      </div></div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iOrder } from "../models/order.interface";
import { iCart } from "../models/cart.interface";
import { iShopItem } from "../models/shopitem.interface";
import { ShopItem } from '../../../api/entity';

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
    zip: "",
    expr: "",
    orderedDate: new Date,
    Pickup: false,
    user: 0,
    items: []
  };

  error: string | boolean = false;
  cartList: ShopItem[] = [];
  public cart: iCart | undefined;

  mounted() {
    this.getCart();
  }

  success() {
    this.error = false;
    this.checkout.user = this.$store.state.user;
    this.checkout.items = this.cartList;
    axios
      .post(APIConfig.buildUrl("/orders"), {
        ...this.checkout
      }, {headers: {token: this.$store.state.userToken}})
      .then((response) => {
        this.$store.state.orderNum = response.data.savedOrder.id;
      })
      .then(() => {
        const cartId = this.$store.state.cart && this.$store.state.cart.data.newCart.id;
        axios
          .delete(APIConfig.buildUrl("/cart/" + cartId))
          .then(() => {
            this.$store.commit("removeCart", null);
            this.$emit("success");
          })
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  getCart() {
        const cartId = this.$store.state.cart && this.$store.state.cart.data.newCart.id;
        if (this.$store.state.user) {
            console.log("store ", this.$store.state.cart );
            const userId = this.$store.state.user && this.$store.state.user.id;
            axios
            .get(APIConfig.buildUrl("/cart/" + cartId))
            .then((response: AxiosResponse) => {
                this.cartList = response.data;
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
        }   
    }



  get formcheck(): boolean {
    if(this.checkout.firstName.length <= 0 ||
    this.checkout.lastName.length <= 0 ||
    this.checkout.address.length <= 0 ||
    this.checkout.cnum.length <= 0 ||  this.checkout.city.length <= 0 ||
    this.checkout.expr.length <= 0 ||  this.checkout.zip.length <= 0)
      return false;
    else
      return true;
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
  expr: string;
  zip: string;
  orderedDate: Date | null;
  items: ShopItem[];
}
</script>
