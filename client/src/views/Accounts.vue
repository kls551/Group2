<template>
  <!-- Main container -->
  <div class="container" style="margin-top: 15px; margin-bottom: 15px;">
    <!-- Preview Announcment -->
    <div class="box">
      <h2>Users</h2>
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Id">Pos</abbr>
            </th>
            <th>
              <abbr title="First Name">FN</abbr>
            </th>
            <th>
              <abbr title="Last Name">LN</abbr>
            </th>
            <th>
              <abbr title="emailAddress">Email</abbr>
            </th>
            <th>
              <abbr title="Type">Type</abbr>
            </th>
            <th v-if="isAd">edit</th>
            <th v-if="isAd">delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" v-bind:key="index">
            <th>{{user.id}}</th>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.emailAddress}}</td>
            <td>{{user.isAdmin === 1 ? "Admin" : user.isAdmin === 0 ? "Staff" : "User"}}</td>
            <td v-if="isAd">
              <button class="button is-success" v-on:click="showEditForm(index)">Edit</button>
            </td>
            <td v-if="isAd">
              <button class="button is-danger" v-on:click="deleteItem(user.id)">Delete?</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter" v-if="showEdit">
          <div class="box is-small">
            <h3>Editing ({{editEmail}})</h3>
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
              <!-- <label class="label is-small">Role</label>
                                <div class="control">
                                    <input class="input is-small" type="number" placeholder="Admin: 1 Staff: 0 User: others" v-model="editRole">
              </div>-->
              <div class="select is-small">
                <select v-model="editRole">
                  <option disabled value>select account type</option>
                  <option value="1">Admin</option>
                  <option value="0">Staff</option>
                  <option value="-1">User</option>
                </select>
              </div>
            </div>
            <nav class="level">
              <div class="level-left">
                <button class="button is-success is-small" v-on:click="editItem(editIndex)">Update</button>
              </div>
              <div class="level-right">
                <button class="button is-danger is-small" v-on:click="cancelEdit()">Cancel</button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <button class="button is-success" v-if="isAd" v-on:click="showSignupModal()">Add User</button>
      <Signup
        v-bind:is-showing="showSignup"
        v-on:success="successSignup()"
        v-on:cancel="cancelSignup()"
      />
      <Edit v-bind:is-showing="showEdit" v-on:success="successEdit()" v-on:cancel="cancelEdit()"/>
    </div>
  </div>
</template>

<script lang="ts">
import Signup from "@/components/Signup.vue";
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iUser } from "../models/user.interface";

@Component({
  components: {
    Signup
  }
})
export default class Accounts extends Vue {
  public showSignup: boolean = false;
  public showEdit: boolean = false;
  error: string | boolean = false;
  users: iUser[] = [];
  edit: iUser | undefined;
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
      .get(APIConfig.buildUrl("/users"))
      .then((response: AxiosResponse<iUser[]>) => {
        this.users = response.data;
        console.log(this.users);
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
          .delete(APIConfig.buildUrl("/users/" + index))
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
    this.edit = this.users[index];
    if (this.edit) {
      this.edit.firstName = this.editFn;
      this.edit.lastName = this.editLn;
      this.edit.isAdmin = this.editRole;
      axios
        .put(APIConfig.buildUrl("/users/" + this.edit.id), {
          ...this.edit
        })
        .then(() => {
          this.preview();
          this.successEdit();
        });
    }
  }

  get isAd(): boolean {
    return this.$store.state.user.isAdmin === 1;
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
    this.editEmail = this.users[index].emailAddress;
    this.editFn = this.users[index].firstName;
    this.editLn = this.users[index].lastName;
    this.editRole = this.users[index].isAdmin;
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
  font-family: "Questrial";
  font-size: 28px;
}

h3 {
  font-family: "Questrial";
}
</style>
