<template>
    <modal
        v-bind:is-showing="isShowing"
        title="Confirm Delete"
        success-button="Delete"
        v-on:success="success"
        v-on:cancel="cancel" >

        <form v-on:submit.prevent="onSubmit">
        <p v-if="error">{{ error }}</p>
        <!-- Confirm Delete Message -->
        <div class="field">
            <label class="label">Do you want to delete the service? </label>
        </div>

        </form>

    </modal>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Modal from "./Modal.vue";
import  { Service } from "../../../api/entity";
// import ServiceForm from "../views/OwnerEditServices.vue";


@Component({
  components: {
    Modal
  }
})

export default class DeleteConfirm extends Vue {
//   @Prop(String) title!: string;
    error: string | boolean = false;
    @Prop(Boolean) isShowing: boolean = false;
    @Prop(Boolean) del: boolean = false;

    @Watch("isShowing")
    handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
        if (!isShowingStart && isShowingEnd) {
            
        }
    } 

    success() {
        this.del = true;
        this.$emit("success");
    }

    cancel() {
        this.$emit("cancel");
    }
}

</script>