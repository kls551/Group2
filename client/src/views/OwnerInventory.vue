<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">
    <!-- Preview Announcment -->
    <div class="box">
        <h2> Inventory </h2>
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Id">Order Num</abbr></th>
                    <th><abbr title="User">User</abbr></th>
                    <th><abbr title="Date">Date</abbr></th>
                    <th v-if="isAd">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orders" v-bind:key="index">
                    <th>{{item.name}}</th>
                    <td>{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td v-if="isAd">
                        <button class="button is-danger" v-on:click="deleteItem(order.id)">Delete?</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter" v-if="showEdit">
                <div class="box is-small">
                    <h3> Editing ({{editEmail}}) </h3>
                    <div class="field">
                        <label class="label is-small">FirstName</label>
                        <div class="control">
                            <input class="input is-small" type="text" placeholder="e.g Alex" v-model="editFn">
  </div>
                        </div>
                        <div class="field">
                            <label class="label is-small">LastName</label>
                            <div class="control">
                                <input class="input is-small" type="text" placeholder="e.g.Smith" v-model="editLn">
  </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Role</label>
                                <div class="control">
                                    <input class="input is-small" type="number" placeholder="e.g.0" v-model="editRole">
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

                    <button class="button is-success" v-if="isAd" v-on:click="showSignupModal()">Add User</button>
                    <Signup v-bind:is-showing="showSignup" v-on:success="successSignup()" v-on:cancel="cancelSignup()" />
                    <Edit v-bind:is-showing="showEdit" v-on:success="successEdit()" v-on:cancel="cancelEdit()" />
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
    items: iShopItem[] = [];
    users: iUser[] = [];
    edit: iUser | undefined;
    editFn: string = "";
    editEmail: string = "";
    editLn: string = "";
    editRole: number = 0;
    editIndex: number = 0;

    mounted() {
        this.preview();
        //this.getUsers();
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

    getUser(userId: number){
        //var i = this.orders[0].userId;

            axios
            .get(APIConfig.buildUrl("/users/" + userId))
            .then((response: AxiosResponse < iUser >) => {
                return response.data;
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    
    }

    /*pairs(){
        return this.orders.map((order, i) => {
            return {
                order: order,
                user: this.users[i]
            }
        });
    }*/

    deleteItem(index: number) {
        axios.delete(APIConfig.buildUrl("/orders/" + index), {
            headers: {
                token: this.$store.state.userToken
            }
        })
        .then(() => {
            this.preview();
        })
    }
/*    editItem(index: number) {
        this.edit = this.users[index];
        if (this.edit) {
            this.edit.firstName = this.editFn;
            this.edit.lastName = this.editLn;
            this.edit.isAdmin = this.editRole;
            axios.put(APIConfig.buildUrl("/users/" + this.edit.id), {
                    ...this.edit
                })
                .then(() => {
                    this.preview();
                    this.successEdit();
                })
        }
    } */

    get isAd(): boolean {
        return (this.$store.state.user.isAdmin === 1);
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

/*    showEditForm(index: number) {
        this.editEmail = this.users[index].emailAddress;
        this.editFn = this.users[index].firstName;
        this.editLn = this.users[index].lastName;
        this.editRole = this.users[index].isAdmin;
        this.editIndex = index;
        this.showEdit = true;
    } */

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