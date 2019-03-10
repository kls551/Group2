<template>
  <div class="itemView">
    <div class="columns">

      <div class="rightMargin column">
        <figure class="image is-3by2">
            <img alt="Map" src="../assets/beach-cruiser.jpg"
                    style="margin-top:150px">
          </figure>
      </div>

      <div class="leftMargin column">
        <h1>{{ shopItem.name }}</h1>
        <hr width="30%">
        <br>
        <div class="columns">
          <div class="column is-3">
            <h2>${{ shopItem.price }}</h2>
          </div>
          <div class="column">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>{{ shopItem.quantity }}</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    1
                  </a>
                  <a class="dropdown-item">
                    2
                  </a>
                  <a href="#" class="dropdown-item is-active">
                    3
                  </a>
                  <a href="#" class="dropdown-item">
                    4
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br>
        <div class="buttons has-addons">
          <span class="button buttonStyle">Add To Cart</span>
          <span class="button buttonStyle">Buy Now</span>
        </div>

        <p class="subtitle is-6" v-if="shopItem.inStorePickup">In-Store Pickup Only</p>
        <p class="subtitle is-6" v-else>Order online available</p>

        <br>
        <article class="message">
          <div class="message-body">
            {{ shopItem.details }}
          </div>
        </article>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";

  import axios, { AxiosResponse, AxiosError } from "axios";
  import { APIConfig } from "@/utils/api.utils";
  import { iShopItem } from "@/models/shopitem.interface";

  @Component
  export default class ItemView extends Vue {
    error: string | boolean = false;
    shopItem!: iShopItem;
      // { id: 0, name: "", price: 0, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" };

    mounted() {
      this.display();
    }

    display() {
      axios
        .get(APIConfig.buildUrl("/shopitems/" + this.$route.params.itemId))
        .then((response: AxiosResponse) => {
          this.shopItem = response.data;
          this.$emit("success");
          console.log(this.shopItem);
        })
        .catch((res: AxiosError) => {
            this.error = res.response && res.response.data.error;
        });
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
  font-size: 22px;
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
article {
  height:300px;
  width:400px;
}
</style>
