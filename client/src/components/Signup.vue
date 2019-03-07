<template>
  <div class="modal" v-bind:class="{'is-active': isShowing}">
    <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Signup</p>
          <button class="delete" aria-label="close" v-on:click="cancel"></button>
        </header>
        <section class="modal-card-body">
          <form v-on:submit.prevent="onSubmit">
            <p class="is-danger" v-if="error">
              {{ error }}
            </p>
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="first name" v-model="signup.firstName"/>
              </div>
              <p v-if="signup.firstName.length <= 0" class="help is-danger">First name is required</p>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="last name" v-model="signup.lastName"/>
              </div>
              <p v-if="signup.lastName.length <= 0" class="help is-danger">Last name is required</p>
            </div>
            <div class="field">
              <label class="label">Email Address</label>
              <div class="control">
                <input class="input" type="text" placeholder="email address" v-model="signup.emailAddress"/>
              </div>
              <p v-if="signup.emailAddress.length <= 0" class="help is-danger">Email is required</p>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="password" v-model="signup.password"/>
              </div>
              <p v-if="signup.password.length <= 0" class="help is-danger">Password is required</p>
            </div>
            <div class="field" v-if="isAd">
              <label class="label">Type</label>
              <div class="control">
                <input class="input" type="text" placeholder="Type" v-model="signup.isAdmin"/>
              </div>
            </div>
          </form>
        </section>
    <footer class="modal-card-foot">
      <a v-if="!formcheck" class="button is-success" v-on:click="success" disabled>Signup</a>
      <a v-if="formcheck" class="button is-success" v-on:click="success">Signup</a>
      <a class="button" v-on:click="cancel">Cancel</a>
    </footer>
    </div>
  </div>

</template>



<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iUser } from "../models/user.interface";

@Component({
  components: { Modal }
})
export default class Signup extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  signup: SignupForm = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    isAdmin: null
  };
  error: string | boolean = false;

  success() {
    this.error = false;
    // this.signup.firstName = "done";
    console.log("hello");
    axios
      .post(APIConfig.buildUrl("/users"), {
        ...this.signup
      })
      .then((response: AxiosResponse<iUser>) => {
        this.$emit("success");
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  get formcheck(): boolean {
    if(this.signup.firstName.length <= 0 ||
    this.signup.lastName.length <= 0 ||
    this.signup.emailAddress.length <= 0 ||
    this.signup.password.length <= 0)
      return false;
    else
      return true;
  }

  cancel() {
    this.$emit("cancel");
  }
  
  get isAd(): boolean {
      console.log("get here");
      return this.$store.state.user && (this.$store.state.user.isAdmin === 1);
  }
}

export interface SignupForm {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  isAdmin: number | null;
}
</script>
