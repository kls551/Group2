<template>
  <div class="shop">
    <div class="tile is-ancestor top-bar">

      <!-- Category selection -->
      <div class="tile is-3 is-vertical is-parent">
        <div class="tile is-child box">
          <nav class="panel">
            <p class="panel-heading">
              Categories
            </p>

            <!-- Dropdown menu for sorting options -->
            <a class="panel-block sort-panel">
              {{ sorts.name }}
            </a>

            <a class="panel-block menu-contents" v-show="sorts.show" v-for="option in sorts.subcategories" :key="option.id" v-on:click="toggle(sorts)">
              {{ option.name }}
            </a>

            <!-- Category options -->
            <a class="panel-block" v-for="category in categories2" :key="category.id">
              {{ category.name }}
            </a>

            <!-- Search button -->
            <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                Search
              </button>
            </div>
          </nav>
        </div>
      </div>

      <!-- Shop layout -->
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <div v-for="item in itemCol1" :key="item.id" class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemCol2" :key="item.id" class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemCol3" :key="item.id" class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemCol4" :key="item.id" class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemCol5" :key="item.id" class="card" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="item-name is-size-5"> {{ item.name }} </li>
              <li class="item-price"> ${{ item.price }} </li>
            </ul>
          </div>
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

  export default class Shop extends Vue {
    error: string | boolean = false;
    shopItems: iShopItem[] = [];

    items: iShopItem[] = [
      { id: 789, name: 'M480 Mountain Bike', price: 1200, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 903, name: 'M680 Mountain Bike', price: 2000, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 234, name: 'M1080 Mountain Bike', price: 3100, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 678, name: 'R480 Road Bike', price: 1000, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 239, name: 'R680 Road Bike', price: 1500, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 112, name: 'R1080 Road Bike', price: 2100, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 914, name: 'C400 Cruising Bike', price: 800, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 503, name: 'C600 Cruising Bike', price: 1200, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" },
      { id: 716, name: 'C800 Cruising Bike', price: 1800, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), imageUrl: "" }
    ];

    /**
      <div v-show="cat.selected" v-on:click=toggle(cat)>
      [{name: "___"
        selected: false
        children: []}]
    */
    sorts: iMainCategory = { id: 89, name: "Sorting Options", show: false,
              subcategories: [
                { id: 90, name: "Alphabetical" },
                { id: 91, name: "Price (Low to High)" },
                { id: 92, name: "Price (High to Low)" }]};
    categories2: iMainCategory[] = [
      { id: 93, name: "Brands", show: false,
        subcategories: [
          { id: 94, name: "Giant" },
          { id: 95, name: "Specialized" },
          { id: 96, name: "Schwinn" },
          { id: 97, name: "Trek" }] },
      { id: 98, name: "Mountain bikes", show: false,
        subcategories: [] },
      { id: 99, name: "Road bikes", show: false,
        subcategories: [
          { id: 1, name: "Racing" },
          { id: 2, name: "Commuter" }
        ]}
    ];
    itemCol1: iShopItem[] = this.col(this.items, 0);
    itemCol2: iShopItem[] = this.col(this.items, 1);
    itemCol3: iShopItem[] = this.col(this.items, 2);
    itemCol4: iShopItem[] = this.col(this.items, 3);
    itemCol5: iShopItem[] = this.col(this.items, 4);

    /** Database version... needs to be tested...
    itemCol1: iShopItem[] = this.col(this.shopItems, 0);
    itemCol2: iShopItem[] = this.col(this.shopItems, 1);
    itemCol3: iShopItem[] = this.col(this.shopItems, 2);
    itemCol4: iShopItem[] = this.col(this.shopItems, 3);
    itemCol5: iShopItem[] = this.col(this.shopItems, 4);
    */

    col(inItems: iShopItem[], colNum: number) {
      const result = []
      const len = inItems.length
      for (var i = 0; i < len; i++) {
        if (i % 5 == colNum) {
          result.push(inItems[i])
        }
      }
      return result
    }

    toggle(cat: iMainCategory) {
      if (cat.show == true) {
        cat.show = false
      }
      else {
        cat.show = true
      }
      return cat
    }

    display() {
      axios
        .get(APIConfig.buildUrl("/shopitems"))
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          this.$emit("success");
          console.log(this.shopItems);
        })
        .catch((res: AxiosError) => {
            this.error = res.response && res.response.data.error;
        });
    }
  }
</script>


<style lang="scss">
   .top-bar {
      padding-top: 32px;
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
   }
   .item-price {
     bottom: 5px;
   }
   .sort-panel {
     background-color: cyan;
   }
   .menu-contents {
     background-color: lightcyan;
   }
</style>
