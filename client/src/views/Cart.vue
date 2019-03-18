<template>
    <div class="container" style="margin-top: 25px; margin-bottom: 25px;">

        <h2 class="bold" style="margin-bottom: 25px; font-size: 36px">Your Cart </h2>
        <div class="tile is-ancestor">
            <!-- Cart Items stacked vertically -->
            <div class="tile is-8 is-vertical is-parent">
                <!-- get the cart items from "/cart" route -->
                <div class="tile is-child box" v-for="(item, index) in cartList" v-bind:key="index">
                    <div class="columns">
                        <!-- item image -->
                        <!-- <div class="column">
                            <figure class="image is-1by1">
                                <img alt="" :src="item.images[0].img">
                                <img src="https://bulma.io/images/placeholders/640x480.png">
                            </figure>
                        </div> -->
                        <!-- item name and description -->
                        <div class="column">
                            <p> <h2>{{ item.name }}</h2> </p> 
                            <p> <h2 style="color: black;">  Quantity: </h2> </p>
                        </div>
                        <!-- item price, remove and edit buttons -->
                        <div class="column">
                            <h3> Price: $ {{ item.price }}</h3>
                            <br>
                            <div class="columns" >
                                <button class="column button is-medium is-light" v-on:click="decreaseQuant(item)"> - </button>
                                <h3 class="column"> {{item.quant}} </h3>
                                <button class="column button is-medium is-light" v-on:click="addQuant(item)"> + </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>


            <!-- Summary Column -->
            <div class="tile is-4 is-vertical is-parent">
                <!-- Add content or other tiles -->
                <div class="tile is-child">
                    <h3 style="color: orange; border-bottom: 1.5px solid orange; margin-bottom: 20px;">Summary</h3>
                    <div class="columns"> 
                        <div class="column"> 
                            <p class="bold">Subtotal:</p>
                            <br>
                            <p class="bold">Shipping and Handling: </p> 
                            <br>
                            <p class="bold" style="border-bottom: 1.5px">Tax: </p> 
                            <br>
                            <p style="color: Orange; margin-top: 20px" class="bold">TOTAL: </p>  
                        </div>

                        <div> 
                            <p class="bold"> $ {{this.subtotal}} </p>
                            <br>
                            <p class="bold"> $ {{this.handling}} </p>
                            <br>
                            <p class="bold" 
                                style="border-bottom: 1.5px"> 
                                $ {{Number(this.tax).toFixed(2)}} </p>
                            <br>
                            <p class="bold" style="color: Green; margin-top: 20px;"> $ {{ Number(this.total).toFixed(2) }}</p>
                        </div>

                    </div>
                    <button class="button is-warning is-medium is-fullwidth" v-on:click="showcheckoutModal()">CHECKOUT</button>
                </div>
            </div>
        </div>

        <router-view class="container"/>
            <checkout
            v-bind:is-showing="showcheckout"
            v-bind:purchasedList="cartList"
            v-on:success="successCheckout()"
            v-on:cancel="cancelCheckout()"
            />

    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iShopItem } from "../models/shopitem.interface";
import { iCart } from "../models/cart.interface";
import checkout from "@/components/checkout.vue";
import  { ShopItem } from "../../../api/entity";

@Component({
  components: {
    checkout
  }
})
export default class Cart extends Vue {
    error: string | boolean = false;
    public showcheckout: boolean = false;
    public cartList: iShopItem[] = [];
    public cart: iCart | undefined;
    public tax : number = 0;
    public subtotal : number = 0;
    public handling : number = 7.99;
    public total : number = 0;
    public taxRate : number = 0.085;
    public loaded : boolean = false;

    mounted(){
        this.getCart();  
        this.calculateTotal(); 
    }

    getCart() {
        const cartId = this.$store.state.cart && this.$store.state.cart.data.newCart.id;
     
        if (this.$store.state.user && cartId) {
            const userId = this.$store.state.user && this.$store.state.user.id;
            axios
            .get(APIConfig.buildUrl("/cart/" + cartId))
            .then((response: AxiosResponse) => {
                response.data.items.forEach((item : iShopItem) => {
                    if (!item.quant)
                        item.quant = 1;
                })
                this.cart = response.data;
                this.cartList = response.data.items;
                this.calculateTotal();
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
        }   
    }

    calculateTotal() {
        this.subtotal = 0;
        this.total = 0;
        this.tax = 0;
        this.cartList.forEach( (item : iShopItem) => {
            this.subtotal += (item.price * item.quant);
        });
        this.tax = (this.subtotal * this.taxRate);  
        this.total = this.subtotal + this.tax;
    }

    addQuant(item : iShopItem) {
        item.quant++;
        this.calculateTotal();
    }

    decreaseQuant(item : iShopItem) {
        if (item.quant >= 1) {
            item.quant--;
            this.calculateTotal();
        }    
    }

    // checkout modal functions
    showcheckoutModal() {
        this.showcheckout = true;
    }


    successCheckout() {
        this.showcheckout = false;

        this.cartList.forEach(item => {
            const updatedQuant = (item.quantity - item.quant);
            axios
            .put(APIConfig.buildUrl("/shopitems/" + item.id + "/" + updatedQuant))
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
        })
        this.$router.push("/order-placed");
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
