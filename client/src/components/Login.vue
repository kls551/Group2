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
      <p v-if="error">{{ error }}</p>
      <div class="field">
        <label class="label">Email Address</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="email address"
            v-model="signup.emailAddress"
          >
        </div>
          <p v-if="signup.emailAddress.length <= 0" class="help is-danger">Email is required</p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="password" v-model="signup.password">
        </div>
          <p v-if="signup.password.length <= 0" class="help is-danger">Password is required</p>
      </div>
    </form>
            </section>
      <footer class="modal-card-foot">
      <a v-if="!formcheck" class="button is-success" v-on:click="success" disabled>LoginForm</a>
      <a v-if="formcheck" class="button is-success" v-on:click="success">Login</a>
      <a class="button" v-on:click="cancel">Cancel</a>
    </footer>
  </div></div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Modal from "./Modal.vue";
@Component({
  components: {
    Modal
  }
})
export default class Signup extends Vue {
  signup: LoginForm = {
    emailAddress: "",
    password: ""
  };
  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;
  @Watch("isShowing")
  handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
    if (!isShowingStart && isShowingEnd) {
      this.signup = {
        emailAddress: "",
        password: ""
      };
    }
  }
  success() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/login"), {
        emailAddress: this.signup.emailAddress,
        password: this.signup.password
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        this.$store.dispatch("login", {
          token: response.data.token,
          userid: response.data.userId
        });
        this.$emit("success");
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }
  get formcheck(): boolean {
    if(
    this.signup.emailAddress.length <= 0 ||
    this.signup.password.length <= 0)
      return false;
    else
      return true;
  }
  cancel() {
    this.$emit("cancel");
  }
}
interface LoginResponse {
  token: string;
  userId: number;
}
export interface LoginForm {
  emailAddress: string;
  password: string;
}
</script>
