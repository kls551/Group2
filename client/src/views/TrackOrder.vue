<template>

    <div class="container" style="margin-top: 5%; margin-bottom: 15px;">
        <div class="tile is-ancestor">
            <div class="tile is-2 is-parent">
                <div class="tile is-child"></div>
            </div>

            <!-- Order number box and submit button -->
            <div class="tile is-8 is-parent is-vertical">
                <h2 style="margin-bottom: 15px">Track My Order</h2>
                <div class="tile is-child box">
                    <input type="text" class="input is-warning is-large" placeholder="Tracking Number" v-model="trackid">
                    <button class="button is-success is-normal is-fullwidth" type="submit" style="margin-top: 15px"
                    v-on:click="getorder(trackid)">Submit</button>
                </div>

                <!-- order information to appear when order retrieved from databse -->
                <h2 style="margin-bottom: 15px; margin-top: 15px; padding-top: 20px; border-top: 1px solid orange;">Order Information</h2>
                <div class="tile is-child box" v-if="isnotnull">
                    <h3>Ordered on: </h3>
                        <span> {{ new Date(order.orderedDate).toDateString() }}</span>
                    <h3>Shipped on: </h3>
                        <span v-if="shipnotnull"> {{ new Date(order.shipped).toDateString() }}</span>
                    <h3>Current Location: </h3>
                    <h3>Expected Delivery: </h3>
                        <span v-if="shipnotnull"> {{ expected.toDateString() }}</span>
                    <h3>Shipping to: </h3>
                        <span> {{order.address + ", "}}</span>
                        <span> {{order.city}}</span>
                </div>
            </div>

            <div class="tile is-2 is-parent">
                <div class="tile is-child"></div>
            </div>

        </div>
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
    iOrder
} from "../models/order.interface";
@Component
export default class TrackOrder extends Vue {
    error: string | boolean = false;
    trackid: string = "";
    order: iOrder | null = null;
    expected: Date | null = null;
    getorder(id : number) {
        axios
            .get(APIConfig.buildUrl("/trackorder/"+id))
            .then((response: AxiosResponse) => {
                console.log(response.data);
                this.order = response.data;
                if(this.order !== null && this.order.shipped !== null) {
                    this.expected = new Date(this.order.shipped);
                    this.expected.setDate(this.expected.getDate() + 10);
                }
                console.log(this.order);
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }
    get isnotnull(): boolean {
        return !!this.order;
    }
    get shipnotnull(): boolean {
        return !!this.order && !!this.order.shipped;
    }
    get isAd(): boolean {
        return (this.$store.state.user.isAdmin === 1);
    }
    get picture(): boolean {
        return false;
    }
}
</script>

<style scoped lang="scss">
h2 {
    font-size: 32px;
    font-family: 'Questrial';
}
h3 {
    font-size: 20px;
    font-family: 'Questrial';
    color: black;
    padding: 5px;
}
</style>
