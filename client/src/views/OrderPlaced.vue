<template>
    <div class="box" style="margin-top: 100px">
        <div class="title"> <h3> Order was placed successfully </h3></div>
        <div class="title"> <h3> Order number: {{ this.$store.state.orderNum }} </h3> </div>
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

export default class OrderPlaced extends Vue {
    error: string | boolean = false;
}
</script>

<style>
h3{
color: #228B22;
size: 30px;
padding: center;
}
</style>
