<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">
    <!-- Preview Announcment -->
    <div class="box">
        <h2> Orders </h2>
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Id">Order Num</abbr></th>
                    <th><abbr title="User">User</abbr></th>
                    <th><abbr title="Email">User Email</abbr></th>
                    <th><abbr title="Date">Order Date</abbr></th>
                    <th><abbr title="Status">Status</abbr></th>
                    <th v-if="isAd">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" v-bind:key="index">
                    <th>{{ order.id }}</th>
                    <td>{{ users[index].firstName }}</td>
                    <td>{{ users[index].emailAddress }}</td>
                    <td>{{ new Date(order.orderedDate).toDateString() }}</td>
                    <td>
                    <b-dropdown v-model="order.status" aria-role="list">
                        <button class="button is-primary" type="button" slot="trigger">
                            <template v-if="order.status === 0">
                                <span>Processing</span>
                            </template>
                            <template v-else-if="order.status === 1">
                                <span>Complete</span>
                            </template>
                            <template v-else-if="order.status === 2">
                                <span>Shipped</span>
                            </template>
                            <template v-else-if="order.status === 3">
                                <span>Cancelled</span>
                            </template>
                        </button>

                        <b-dropdown-item :value="0" aria-role="listitem">
                            <div class="media">
                                <div class="media-content">
                                    <h3>Processing</h3>
                                </div>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="1" aria-role="listitem">
                            <div class="media">
                                <div class="media-content">
                                    <h3>Complete</h3>
                                </div>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="2" aria-role="listitem">
                            <div class="media">
                                <div class="media-content">
                                    <h3>Shipped</h3>
                                </div>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="3" aria-role="listitem" v-if="isAd">
                            <div class="media">
                                <div class="media-content">
                                    <h3>Cancelled</h3>
                                </div>
                            </div>
                        </b-dropdown-item>
                    </b-dropdown>
                    </td>
                    <td v-if="isAd">
                        <button class="button is-danger" v-on:click="deleteItem(order.id)">Delete?</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script lang="ts">
import Signup from "@/components/Signup.vue";
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
import {
    iUser
} from "../models/user.interface";

@Component({
    components: {
        Signup
    }
})
export default class Orders extends Vue {
    public showSignup: boolean = false;
    public showEdit: boolean = false;
    error: string | boolean = false;
    orders: iOrder[] = [];
    users: iUser[] = [];
    edit: iOrder | undefined;
    editFn: string = "";
    editEmail: string = "";
    editLn: string = "";
    editRole: number = 0;
    editIndex: number = 0;

    mounted() {
        this.preview();
    }

    preview() {
        axios
            .get(APIConfig.buildUrl("/orders"))
            .then((response: AxiosResponse < iOrder[] > ) => {
                this.orders = response.data;
                console.log(this.orders);
                this.getUsers();
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    getUsers(){
        var i;
        for(i = 0; i < this.orders.length; i++){
            axios
            .get(APIConfig.buildUrl("/users/" + this.orders[i].userId))
            .then((response: AxiosResponse < iUser >) => {
                this.users.push(response.data);
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
        }
    }

    deleteItem(index: number) {
        axios.delete(APIConfig.buildUrl("/trackorder/" + index), {
            headers: {
                token: this.$store.state.userToken
            }
        })
        .then(() => {
            this.preview();
        })
    }
    editOrder(index: number, value: number) {
        this.edit = this.orders[index];
        if (this.edit) {
            this.edit.status = value;
            axios.put(APIConfig.buildUrl("/orders/" + this.edit.id + "/" + value), {
                    ...this.edit
                })
                .then(() => {
                    this.preview();
                })
        }
    } 

    get isAd(): boolean {
        return (this.$store.state.user.isAdmin === 1);
    }
}
</script>  

<style lang="scss" scoped>
h2 {
    font-family: 'Questrial';
    font-size: 28px;
}
h3 {
    font-family: 'Questrial';
}
</style>
