<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">
    <!-- Preview Announcment -->
    <div class="box">
        <h2> Users </h2>
        <table class="table is-full">
            <thead>
                <tr>
                    <th><abbr title="Id">Pos</abbr></th>
                    <th><abbr title="First Name">FN</abbr></th>
                    <th><abbr title="Last Name">LN</abbr></th>
                    <th><abbr title="profileUrl">img</abbr></th>
                    <th><abbr title="emailAddress">Email</abbr></th>
                    <th><abbr title="Type">Type</abbr></th>
                    <th v-if="isAd">delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" v-bind:key="index">
                    <th>{{user.id}}</th>
                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.profileUrl}}</td>
                    <td>{{user.emailAddress}}</td>
                    <td>{{user.isAdmin}}</td>
                    <td v-if="isAd">
                        <button class="button is-danger" v-on:click="deleteItem(user.id)">Delete?</button>
                    </td>
                </tr>
            </tbody>
        </table>
    <button class="button is-success" v-if="isAd" v-on:click="showSignupModal()">Add User</button>
    <Signup
      v-bind:is-showing="showSignup"
      v-on:success="successSignup()"
      v-on:cancel="cancelSignup()"
    />
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
    iUser
} from "../models/user.interface";

@Component({
    components: {
        Signup
    }
})
export default class Accounts extends Vue {
    public showSignup: boolean = false;
    error: string | boolean = false;
    users: iUser[] = [];

    mounted() {
        this.preview();
    }
    preview() {
        axios
            .get(APIConfig.buildUrl("/users"))
            .then((response: AxiosResponse) => {
                this.users = response.data;
                console.log(this.users);
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }
    deleteItem(index: number) {
        axios.delete(APIConfig.buildUrl("/users/" + index), {
                headers: {
                    token: this.$store.state.userToken
                }
            })
            .then(() => {
                this.preview();
            })
    }

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
}
</script>  

<style lang="scss" scoped>
h2 {
    font-family: 'Questrial';
    font-size: 28px;
}
</style>
