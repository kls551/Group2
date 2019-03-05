<template>
    <div class="container" style="margin-top: 25px; margin-bottom: 25px;">

        <h2>Your Cart (2) </h2>
        <div class="tile is-ancestor">
            <!-- Cart Items stacked vertically -->
            <div class="tile is-8 is-vertical is-parent">
                <!-- get the cart items from "/cart" route -->
                <div class="tile is-child box" v-for="(item, index) in cartList" v-bind:key="index">
                    <div class="columns">
                        <!-- item image -->
                        <div class="column">
                            <figure class="image is-1by1">
                                <img src="https://bulma.io/images/placeholders/640x480.png">
                            </figure>
                        </div>
                        <!-- item name and description -->
                        <div class="column">
                            <p>{{ item.name }}</p>
                            <p>Quantity: {{ item.quantity }}</p>
                        </div>
                        <!-- item price, remove and edit buttons -->
                        <div class="column">
                            <h3>{{ item.price }}</h3>
                            <button class="button is-medium is-light">Edit</button>
                            <br>
                            <button class="button is-medium is-light">Remove</button>
                        </div>
                    </div>
                </div>
                <div class="tile is-child box">
                    <div class="columns">
                        <!-- item image -->
                        <div class="column">
                            <figure class="image is-1by1">
                                <img src="https://bulma.io/images/placeholders/640x480.png">
                            </figure>
                        </div>
                        <!-- item name and description -->
                        <div class="column">
                            <p>Mountain Bike XX</p>
                            <p>Quantity: 2</p>
                        </div>
                        <!-- item price, remove and edit buttons -->
                        <div class="column">
                            <h3>$399.99</h3>
                            <button class="button is-medium is-light">Edit</button>
                            <br>
                            <button class="button is-medium is-light">Remove</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Summary Column -->
            <div class="tile is-4 is-vertical is-parent">
                <!-- Add content or other tiles -->
                <div class="tile is-child">
                    <h2 style="border-bottom: 1.5px solid orange; margin-bottom: 20px">Summary</h2>
                    <p class="bold">Subtotal:</p>   <p>$445.67 </p>
                    <p class="bold">Shipping and Handling: </p>   <p>$7.99 </p>
                    <p class="bold">Tax: </p>  <p style="border-bottom: 1.5px solid black; padding-bottom: 20px"> $35.99 </p>
                    <p style="margin-top: 20px" class="bold">TOTAL: </p>     <p style="margin-bottom: 20px;"> $489.79 </p>
                    <button class="button is-warning is-medium is-fullwidth" v-on:click="showcheckoutModal()">CHECKOUT</button>
                </div>
            </div>
        </div>

        <router-view class="container"/>
            <checkout
            v-bind:is-showing="showcheckout"
            v-on:success="successCheckout()"
            v-on:cancel="cancelCheckout()"
            />

    </div>
</template>

<script lang="ts">
import axios, {
    AxiosResponse,
    AxiosError
} from "axios";
import {
    APIConfig
} from "../utils/api.utils";
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import {
    iShopItem
} from "../models/shopitem.interface";
import checkout from "@/components/checkout.vue";

@Component({
  components: {
    checkout
  }
})
export default class Cart extends Vue {
    error: string | boolean = false;
    public showcheckout: boolean = false;
    cartList: iShopItem[] = [];

    mounted(){
        this.getCart();
    }

    getCart() {
        debugger;
        axios
            .get(APIConfig.buildUrl("/cart"), { params: {
                user_id:  this.$store.state.user
                
            }})
            .then((response: AxiosResponse<iShopItem[]>) => {
                debugger;
                this.cartList = response.data;
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    // checkout modal functions
    showcheckoutModal() {
        this.showcheckout = true;
    }
    successCheckout() {
        this.showcheckout = false;
    }
    cancelCheckout() {
        this.showcheckout = false;
    }
    
    
}
</script>

<style lang="scss" scoped>
h2 {
    font-family: 'Questrial';
    font-size: 28px;
    color: orange;
}
h3 {
    font-size: 22px;
    color: green;
    font-weight: 800;
}

.bold {
    font-weight: 800;
    font-size: 20px;
}
</style>
