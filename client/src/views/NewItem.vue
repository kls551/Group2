<template>
  <div class="about">

    <div class="container" style="margin-top: 15px">
      <h2>Add New Item </h2>
    <div class="columns">

      <div class="rightMargin column" style="margin-right: 0px">
        <figure class="image is-3by2">
            <img alt="Map" src="../assets/beach-cruiser.jpg" style="margin-top: 20px;">
        </figure>

        <div class="tile box" style="margin-top: 20px">
          <div class="field" style="margin-top 20px;">
            <div class="file" style="margin-left: 150px">
              <label class="file-label">
                <input class="file-input" type="file" name="resume">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose Image file…
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

      </div>
      
      <div class="leftMargin column">
      <br>

      <div class="box">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Item Name" v-model="itemName">
            </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <div class="field">
            <label class="label">Price</label>
            <div class="control">
                <input class="input" type="text" placeholder="Item Price" v-model="itemPrice">
            </div>
        </div>
        </div>
          <div class="column">
            <div class="field">
            <label class="label">Quantity Available</label>
            <div class="control">
                <input class="input" type="text" placeholder="0" v-model="itemQuantity">
            </div>
        </div>
          </div>
        
        </div>

        <div class="columns">

          <div class="column">
            <div class="field">
              <label class="label">Main Catgegory</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Category" v-model="itemCategory">
                </div>
            </div>
          </div>

        </div>

        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="iteminStorePickup">
                    In-Store Pickup Only
                </label>
            </div>  
        </div>

        <div class="field">
            <label class="label">Details</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Add Details" v-model="itemDetail"></textarea>
                </div>
            </div>

            <div class="control">
                  <button class="button is-success" type="submit" v-on:click="addItem">Add Item</button>
             </div>
        </div>

      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios, {
    AxiosResponse,
    AxiosError
} from "axios";
import {
    APIConfig
} from "../utils/api.utils";
import {Component,Prop,Vue} from "vue-property-decorator";

@Component
export default class OwnerAnnouncement extends Vue {
    error: string | boolean = false;
    itemName: String = "";
    itemDetail: String = "";
    itemPrice: Number = 0;
    itemQuantity: Number = 0;
    itemCategory: String = "";
    iteminStorePickup: Boolean = false;
    itemPostedDate: Date = new Date();
    itemImageURL: String = "";

    addItem() {
        if (this.itemName == "" || this.itemPrice == 0) {
            return;
        }
        axios
            .post(APIConfig.buildUrl("/shopitems"), {
                name: this.itemName,
                details: this.itemDetail,
                price: this.itemPrice,
                quantity: this.itemQuantity,
                category: this.itemCategory,
                inStorePickup: this.iteminStorePickup,
                postedDate: this.itemPostedDate,
                imageUrl: this.itemImageURL
            })
            .then((response: AxiosResponse) => {
                this.$emit("success");
                this.itemName = "";
                this.itemDetail = "";
                this.itemPrice = 0;
                this.itemQuantity = 0;
                this.itemCategory = "";
                this.iteminStorePickup = false;
            })
            .catch((errorResponse: any) => {
                this.error = errorResponse.response.data.reason;
            });
    }

    get picture(): boolean {
        return false;
    }
}
</script>  

<style scoped lang="scss">
h1 {
  margin-top: 90px;
  font-size: 30px;
  font-weight: bold;
}
hr {
   background-color: black; 
   height: 2px; 
   border: 0; 
}
h2 {
  font-family: 'Questrial';
    font-size: 28px;
}
.rightMargin {
  margin-right:80px;
}
.leftMargin {
  margin-left:80px;
}
.buttonStyle {
  padding-top:5px;
  padding-right:17px;
  padding-bottom:5px;
  padding-left:17px;
  margin-bottom: 4px;
}
article{
  height:300px;
  width:400px;
}
</style>