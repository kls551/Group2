<template>
<!-- Main container -->

<div class="container" style="margin-top: 15px; margin-bottom: 15px;">
    <!-- Preview Announcment -->
    <div class="box">
        <h2> Inventory </h2>
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Id">Item Name</abbr></th>
                    <th><abbr title="Price">Price</abbr></th>
                    <th><abbr title="Quantity">Quantity</abbr></th>
                    <th>Edit</th>
                    <th v-if="isAd">Delete</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" v-bind:key="index">
                    <th>{{item.name}}</th>
                    <td>{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>
                        <button class="button is-success" v-on:click="showEditForm(index)">Edit</button>
                    </td>
                    <td v-if="isAd">
                        <button class="button is-danger" v-on:click="deleteItem(item.id)">Delete?</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter" v-if="showEdit">
                <div class="box is-small">
                    <h3> Editing: {{editName}} </h3>
                    <div class="field">
                        <label class="label is-small">New Quantity</label>
                        <div class="control">
                            <input class="input is-small" type="text" placeholder="enter a number" v-model="newQty">
                        </div>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <button class="button is-success is-small" v-on:click="editItem(editIndex)">Update</button></div>
                        <div class="level-right">
                            <button class="button is-danger is-small" v-on:click="cancelEdit()">Cancel</button></div>
                    </nav>
                </div>
            </div>
        </div>
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
    iShopItem
} from "../models/shopitem.interface";

@Component({
    components: {
        Signup
    }
})
export default class Orders extends Vue {
    public showSignup: boolean = false;
    public showEdit: boolean = false;
    error: string | boolean = false;
    items: iShopItem[] = [];
    edit: iShopItem | undefined;
    newQty: number = 0;
    editName: string = "";
    editIndex: number = 0;

    mounted() {
        this.preview();
    }

    preview() {
        axios
            .get(APIConfig.buildUrl("/shopitems"))
            .then((response: AxiosResponse < iShopItem[] > ) => {
                this.items = response.data;
                console.log(this.items);
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    deleteItem(index: number) {
        this.$snackbar.open({
            duration: 2000,
            message: "Confirm Deletion",
            type: "is-danger",
            position: "is-top",
            actionText: "Delete",
            queue: false,
            onAction: () => {
                this.error = false;
                axios
                .delete(APIConfig.buildUrl("/shopitems/" + index))
                .then((response: AxiosResponse) => {
                    this.preview();
                })
                .catch((res: AxiosError) => {
                    this.error = res.response && res.response.data.error;
                });
            }
        });
    }

    editItem(index: number) {
        this.edit = this.items[index];
        if (this.edit) {
            this.edit.count = this.newQty;
            axios.put(APIConfig.buildUrl("/shopitems/" + this.edit.id + "/" + this.edit.count), {
                    ...this.edit
                })
                .then(() => {
                    this.preview();
                    this.successEdit();
                })
        }
    } 

    get isAd(): boolean {
        return (this.$store.state.user.isAdmin === 1);
    }

    get isEmp(): boolean {
        return (this.$store.state.user.isAdmin === 1 || this.$store.state.user.isAdmin === 0);
    }

    get picture(): boolean {
        return false;
    }

    showSignupModal() {
        this.showSignup = true;
    }

    successSignup() {
        this.showSignup = false;
        this.preview();
    }

    cancelSignup() {
        this.showSignup = false;
        this.preview();
    }

    showEditForm(index: number) {
        this.editName = this.items[index].name;
        this.newQty = this.items[index].count;
        this.editIndex = index;
        this.showEdit = true;
    } 

    successEdit() {
        this.showEdit = false;
        this.preview();
    }
    cancelEdit() {
        this.showEdit = false;
        this.preview();
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