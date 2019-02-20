<template>
  <!-- <modal v-bind:is-showing="isShowing" title="Track Order" success-button="Track" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Order Number</label>
        <div class="control">
          <input class="input" type="text" placeholder="Order Number" v-model="to.Order"/>
        </div>
      </div>   
    </form> -->
    <div>
    <h2>My ToDoList:</h2>
    <table>
      <tr>
        <th>Todo   </th>
        <th>Duedate   </th>
        <th>Delete   </th>
      </tr>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index" style="width:100%">
        <td>{{ todo.userId }}</td>
        <td>{{ todo.fn }}</td>
        <td>
          <button class="button button3" v-on:click="deleteItem(todo.id)">Delete?</button>
        </td>
      </tr>
      {{loadToDos()}}
    </table>
    </div>
  <!-- </modal> -->
</template>


<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iOrder } from "../models/order.interface";
@Component({})
export default class track extends Vue {
  public shownt: boolean = false;
  public showNewItm: boolean = false;
  mytodos: order[] = [];
  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }
  loadToDos() {
    if (this.$store.state.user) {
      axios.get(APIConfig.buildUrl("/trackorder"), {
        headers: {token: 1}
      })
      .then((response) => {
        this.mytodos = response.data;
      })
      .catch((errorResponse: any) => {
        this.mytodos = errorResponse.response.data.reason;
      });
    }
  }

  showNewItmModal() {
    this.showNewItm = true;
  }
  success() {
    this.showNewItm = false;
  }
  cancel() {
    this.showNewItm = false;
  }
}

interface order {
  id: number | null;
  userId: number | null;
  processing: boolean | null;
  shipped: boolean | null;
  orderedDate: Date | null;
  Address: string | null;
  cnum: string | null;
  fn: string | null;
  ln: string | null;
  City: string | null;
  pickup: boolean | null;
}
</script>
