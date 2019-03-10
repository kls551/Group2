<template>
  <div class="shop">
    <div class="tile is-ancestor top-bar">
      <!-- Categories menu -->
      <div class="tile is-3 is-vertical is-parent menu">
        <div class="tile is-child box">
          <section>
            <nav class="panel">
              <p class="panel-heading">
                <span>Categories</span>
              </p>

              <!-- Dropdown menu for sorting options -->
              <div class="panel-block">
                <span class="cat-name">{{ sorts.name }}</span>
              </div>

              <a
                class="panel-block menu-contents"
                v-show="sorts.show"
                v-for="option in sorts.subcategories"
                :key="option.id"
                v-on:change="sortby"
              >
                <b-radio
                  v-model="whichSort"
                  :name="sorts.name"
                  :native-value="option.id"
                >{{ option.name }}</b-radio>
              </a>

              <!-- Category options -->
              <div v-for="category in categories" :key="category.id">
                <div class="panel-block" v-on:click="category.show = !category.show">
                  <span class="cat-name">
                    <b-checkbox>{{ category.name }}</b-checkbox>
                  </span>
                  <font-awesome-icon icon="angle-down"/>
                </div>

                <a
                  class="panel-block menu-contents"
                  v-show="category.show"
                  v-for="sub in category.subcategories"
                  :key="sub.id"
                >
                  <b-checkbox>{{ sub.name }}</b-checkbox>
                </a>
              </div>

              <!-- Filter button -->
              <div class="panel-block">
                <button class="button is-link is-outlined is-fullwidth">Filter</button>
              </div>
            </nav>
          </section>
        </div>
      </div>

      <!-- Shop layout -->
      <div class="tile is-child columns is-multiline shop-layout">
        <div v-for="item in shopItems" :key="item.id" class="column is-narrow">
          <!-- <div class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>-->
          <router-link :to="{ name: 'shopItem', params: { itemId: item.id } }">
            <div class="card">
              <figure class="image is-128x128 center">
                <img :src="item.images[0].img">
              </figure>
              <ul class="product">
                <li class="item-name is-size-5">{{ item.name }}</li>
                <li class="item-price">${{ item.price }}</li>
              </ul>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iShopItem } from "../models/shopitem.interface";
import { iMainCategory } from "../models/category.interface";
import { iSubCategory } from "../models/category.interface";

@Component
export default class Shop extends Vue {
  error: string | boolean = false;
  shopItems: iShopItem[] = [];
  categories: iMainCategory[] = [];
  whichSort: number = 0;

  // items: iShopItem[] = [
  //   { id: 789, name: 'M480 Mountain Bike', price: 1200, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 903, name: 'M680 Mountain Bike', price: 2000, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 234, name: 'M1080 Mountain Bike', price: 3100, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 678, name: 'R480 Road Bike', price: 1000, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 239, name: 'R680 Road Bike', price: 1500, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 112, name: 'R1080 Road Bike', price: 2100, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 914, name: 'C400 Cruising Bike', price: 800, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 503, name: 'C600 Cruising Bike', price: 1200, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
  //   { id: 716, name: 'C800 Cruising Bike', price: 1800, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" }
  // ];
  image: string[] = [];

  sorts: iMainCategory = {
    id: 1099,
    name: "Sorting Options",
    show: true,
    subcategories: [
      { id: 1100, name: "Alphabetical" },
      { id: 1101, name: "Price (Low to High)" },
      { id: 1102, name: "Price (High to Low)" }
    ]
  };

  mounted() {
    this.display();
  }

  display() {
    axios
      .get(APIConfig.buildUrl("/shopitems"))
      .then((response: AxiosResponse) => {
        this.shopItems = response.data;
        this.$emit("success");
        return axios.get(APIConfig.buildUrl("/maincategory"));
      })
      .then((response: AxiosResponse) => {
        this.categories = response.data;
        this.$emit("success");
        console.log(this.categories);
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

  sortby(): void {
    // Alphabetically
    if (this.whichSort == 1100) {
      this.shopItems.sort((lside: iShopItem, rside: iShopItem) => {
        if (lside.name < rside.name) return -1;
        if (lside.name > rside.name) return 1;
        return 0;
      });
    }
    // Price (Low to High)
    else if (this.whichSort == 1101) {
      this.shopItems.sort((lside: iShopItem, rside: iShopItem) => {
        if (lside.price < rside.price) return -1;
        if (lside.price > rside.price) return 1;
        return 0;
      });
    }
    // Price (High to Low)
    else if (this.whichSort == 1102) {
      this.shopItems.sort((lside: iShopItem, rside: iShopItem) => {
        if (lside.price > rside.price) return -1;
        if (lside.price < rside.price) return 1;
        return 0;
      });
    }
  }
}
</script>


<style lang="scss">
.top-bar {
  padding-top: 50px;
}
.product {
  text-align: center;
  padding-top: 12px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.card {
  border-radius: 7px;
  padding: 12px 5px 12px 5px;
  margin-bottom: 15px;
  height: 250px;
  width: 160px;
}
.item-price {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1;
  margin: auto;
}
.cat-name {
  margin-right: 5px;
}
.menu-contents {
  padding-left: 40px;
}
.column {
  margin: 5px;
}
.shop-layout {
  margin: 0px 5px 0px 5px;
}
.menu {
  margin-top: 5px;
}
</style>
