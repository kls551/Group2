<template>
  <div id="app">

    <!-- main nav bar -->
    <div class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="./assets/Foxcycle.png" width="150">
        </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="true">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" to="/" exact-active-class="is-active">Home</router-link>
          <router-link class="navbar-item is-tab" to="/shop" exact-active-class="is-active">Shop</router-link>
          <router-link class="navbar-item is-tab" to="/services" exact-active-class="is-active">Services</router-link>
          <router-link class="navbar-item is-tab" to="/about" exact-active-class="is-active">About</router-link>
        </div>

        <!-- Log in, Checkout, Sign Up Tabs -->
        <div class="navbar-end">
          <a class="navbar-item is-tab" v-if="!isLoggedIn" v-on:click="showSignupModal()">Sign up</a>
              <router-link
                class="navbar-item is-text"
                v-if="isLoggedIn"
                to="/my-profile"
                exact-active-class="is-active"
              ><font-awesome-icon icon="user-alt" /></router-link>
              <router-link class="navbar-item is-tab" to="/trackorder">Track Order</router-link>
              <router-link class="navbar-item is-tab" v-if="isLoggedIn" to="/cart"><font-awesome-icon icon="shopping-cart" /></router-link>
              <a class="navbar-item is-tab" v-if="!isLoggedIn" v-on:click="showLoginModal()">Log in</a>
              <a class="navbar-item is-tab" v-if="isLoggedIn" v-on:click="logout"><font-awesome-icon icon="sign-out-alt" /></a>
        </div>
      </div>
    </div>

    <!-- Owner and Staff Login Tabs Only -->
      <div class="container" style="margin-top: 15px; margin-bottom: 15px" v-if="isLoggedIn">
        <div class="tabs is-boxed is-centered">
          <ul>
              <router-link to="/owner/manage-main-categories" v-show="isOwner" tag="li" exact-active-class="is-active"><a>Manage Categories</a></router-link>

              <router-link to="/owner/manage-orders" v-show="isStaff || isOwner" tag="li" exact-active-class="is-active"><a>Orders</a></router-link>

              <router-link to="/owner/manage-inventory" v-show="isStaff || isOwner" tag="li" exact-active-class="is-active"><a>Inventory</a></router-link>

              <router-link to="/owner/announcment" v-show="isOwner" tag="li" exact-active-class="is-active"><a>Announcement</a></router-link>
              <router-link to="/owner/about" v-show="isOwner" tag="li" exact-active-class="is-active"><a>About</a></router-link>
              <router-link to="/owner/accounts" v-show="isStaff || isOwner" tag="li" exact-active-class="is-active"><a>Accounts</a></router-link>

              <router-link to="/owner/add-item" v-show="isOwner" tag="li" exact-active-class="is-active"><a>New Item</a></router-link>

              <router-link to="/owner/edit-services" v-show="isOwner" tag="li" exact-active-class="is-active"><a>Services</a></router-link>
          </ul>
        </div>
      </div>
    <router-view class="container"/>

    <Signup
      v-bind:is-showing="showSignup"
      v-on:success="successSignup()"
      v-on:cancel="cancelSignup()"
    />
    <checkout
      v-bind:is-showing="showcheckout"
      v-on:success="successCheckout()"
      v-on:cancel="cancelCheckout()"
    />
    <!-- This doesn't seem to be doing anything, just sending a warning in console
    <trackorder
      v-bind:is-showing="showTrackOrder"
      v-on:success="successtrack()"
      v-on:cancel="canceltrack()"
    />
    -->
    <Login v-bind:is-showing="showLogin" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import checkout from "@/components/checkout.vue";
import { APIConfig } from "@/utils/api.utils";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Shop from "@/views/Shop.vue";

Vue.use(Buefy);
@Component({
  components: {
    Signup,
    Login,
    checkout,
    Shop
  }
})
export default class App extends Vue {
  public showSignup: boolean = false;
  public showLogin: boolean = false;
  public showcheckout: boolean = false;
  public showtrack: boolean = false;
  showSignupModal() {
    this.showSignup = true;
  }
  successSignup() {
    this.showSignup = false;
  }
  cancelSignup() {
    this.showSignup = false;
  }
  showcheckoutModal() {
    this.showcheckout = true;
  }
  successCheckout() {
    this.showcheckout = false;
  }
  cancelCheckout() {
    this.showcheckout = false;
  }
  showTrackOrder() {
    this.showtrack = true;
  }
  successtrack() {
    this.showtrack = false;
  }
  canceltrack() {
    this.showtrack = false;
  }
  showLoginModal() {
    this.showLogin = true;
  }

  successLogin() {
    this.showLogin = false;
    // direct owner to management page
    if (this.$store.state.user && (this.$store.state.user.isAdmin === 1)) {
      this.$router.push("/owner/manage-main-categories");
    }
    else if (this.$store.state.user && (this.$store.state.user.isAdmin === 0)) {
      this.$router.push("/owner/manage-orders");
    }
  }
  cancelLogin() {
    this.showLogin = false;
  }
  get isLoggedIn(): boolean {
    return this.$store.state.user;
  }
  get isStaff(): boolean {
    return this.$store.state.user && (this.$store.state.user.isAdmin === 0);
  }
  get isOwner(): boolean {
    return this.$store.state.user && (this.$store.state.user.isAdmin === 1);
  }

  logout() {
    console.log("loging out ", this.$store.state.cart);
<<<<<<< HEAD
    // this.$store.commit("removeCart");
    if (this.$store.state.cart && this.$store.state.cart.data.newCart.id) {
=======
    if (this.$store.state.cart && this.$store.state.cart.data && this.$store.state.cart.data.newCart) {
>>>>>>> f7181deea53f0cb94c0c6a693f686a1dd52a19b0
      console.log("deleting cart ");
      console.log("cart id  ", this.$store.state.cart.data.newCart.id);
      axios
      .delete(APIConfig.buildUrl("/cart/" + this.$store.state.cart.data.newCart.id))
      .then( () => {
        this.$store.commit("removeCart");
        axios
        .post(APIConfig.buildUrl("/logout"), null, {
          headers: { token: this.$store.state.userToken }
        })
        .then(() => {
          this.$store.commit("logout");
          this.$router.push({ name: "home" });
        });
      }
      );
    }
    else {
      console.log("no cart found ");
      axios
        .post(APIConfig.buildUrl("/logout"), null, {
          headers: { token: this.$store.state.userToken }
        })
        .then(() => {
          this.$store.commit("logout");
          this.$router.push({ name: "home" });
        });
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Questrial', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

</style>
