<template>
  <div id="app">

    <!-- main nav bar -->
    <div class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="./assets/Foxcycle.png" width="150">
        </a> 
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      
      <div class="navbar-menu is-active">
        <div class="navbar-start">  
          <router-link class="navbar-item is-tab" to="/" exact-active-class="is-active">Home</router-link>
          <router-link class="navbar-item is-tab" to="/shop" exact-active-class="is-active">Shop</router-link>
          <router-link class="navbar-item is-tab" to="/services" exact-active-class="is-active">Services</router-link>
          <router-link class="navbar-item is-tab" to="/about" exact-active-class="is-active">About</router-link>
          <router-link class="navbar-item is-tab" to="/trackorder" exact-active-class="is-active">Track Order</router-link>   
          <router-link class="navbar-item is-tab" to="/todos" exact-active-class="is-active">my Todos</router-link>    
        </div>

        <!-- Log in, Checkout, Sign Up Tabs -->
        <div class="navbar-end">
          <a class="navbar-item is-tab" v-if="!isLoggedIn" v-on:click="showSignupModal()">Sign up</a>
              <router-link
                class="navbar-item is-text"
                v-if="isLoggedIn"
                to="/my-profile"
                exact-active-class="is-active"
              >My Profile</router-link>
              <a class="navbar-item is-tab" v-if="!isLoggedIn" v-on:click="showTrackOrder()">Track Order</a>
              <a class="navbar-item is-tab" v-if="isLoggedIn" v-on:click="showcheckoutModal()">Checkout</a>
              <a class="navbar-item is-tab" v-if="!isLoggedIn" v-on:click="showLoginModal()">Log in</a>
              <a class="navbar-item is-tab" v-if="isLoggedIn" v-on:click="logout">Log out</a>
        </div>
      </div>
    </div>

    <!-- Owner and Staff Login Tabs Only -->
      <div class="container" style="margin-top: 15px; margin-bottom: 15px" v-if="isLoggedIn">
        <div class="tabs is-boxed is-centered">
          <ul>
            <li class="is-active">
              <a> <span>Manage Categories</span></a>
            </li>
            <li>
              <a> <span>Orders/Inventory</span></a>
            </li>
            <li>
              <a><span>Announcement</span>
              </a>
            </li>
            <li>
              <a><span>Accounts</span></a>
            </li>
            <li>
              <a><span>Add Item</span></a>
            </li>
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
    <trackorder
      v-bind:is-showing="trackorder"
      v-on:success="successtrack()"
      v-on:cancel="canceltrack()"
    />
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

@Component({
  components: {
    Signup,
    Login,
    checkout
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
  }

  cancelLogin() {
    this.showLogin = false;
  }

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  logout() {
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
</script>


<style lang="scss">

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
