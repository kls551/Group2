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
            <a class="panel-block is-active">
              <div class="dropdown">
                <div class="dropdown-trigger" on-click="showSortMenu()">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Sort Options</span>
                    <span class="icon is-small">
                      <i class="fas fa-user" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                      Any
                    </a>
                    <a class="dropdown-item">
                      Trek
                    </a>
                    <a href="#" class="dropdown-item is-active">
                      Specialized
                    </a>
                    <a href="#" class="dropdown-item">
                      Giant
                    </a>
                  </div>
                </div>
              </div>
            </a>

            <!-- Category options -->
            <a v-for="category in categories" :key="category.id" class="panel-block">
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
          <div v-for="item in itemSet1" :key="item.id" class="tile is-child box" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="is-size-5"> {{ item.name }} </li>
              <li> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemSet2" :key="item.id" class="tile is-child box" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="is-size-5"> {{ item.name }} </li>
              <li> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemSet3" :key="item.id" class="tile is-child box" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="is-size-5"> {{ item.name }} </li>
              <li> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemSet4" :key="item.id" class="tile is-child box" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="is-size-5"> {{ item.name }} </li>
              <li> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div v-for="item in itemSet5" :key="item.id" class="tile is-child box" onclick="location.href='shop/itemview';" style="cursor: pointer;">
            <figure class="image is-128x128 center">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <ul class="product">
              <li class="is-size-5"> {{ item.name }} </li>
              <li> ${{ item.price }} </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { iShopItem } from "../models/shopitem.interface";
  import { iMainCategory } from "../models/mainCategory.interface";

  export default class Shop extends Vue {
    items: iShopItem[] = [
      { id: 789, name: 'M480 Mountain Bike', ship: true, count: 5, description: 'Good for trails', price: 1200 },
      { id: 903, name: 'M680 Mountain Bike', ship: true, count: 11, description: 'Good for trails', price: 2000 },
      { id: 234, name: 'M1080 Mountain Bike', ship: false, count: 3, description: 'Good for trails', price: 3100 },
      { id: 678, name: 'R480 Road Bike', ship: true, count: 8, description: 'Good for roads', price: 1000 },
      { id: 239, name: 'R680 Road Bike', ship: false, count: 2, description: 'Good for roads', price: 1500 },
      { id: 112, name: 'R1080 Road Bike', ship: true, count: 10, description: 'Good for roads', price: 2100 },
      { id: 914, name: 'C400 Cruising Bike', ship: true, count: 6, description: 'Good for cruising', price: 800 },
      { id: 503, name: 'C600 Cruising Bike', ship: true, count: 9, description: 'Good for cruising', price: 1200 },
      { id: 716, name: 'C800 Cruising Bike', ship: false, count: 6, description: 'Good for cruising', price: 1800 }
    ];
    categories: iMainCategory[] = [
      { id: 0, name: "Mountain" },
      { id: 1, name: "Road" },
      { id: 2, name: "Cruising" },
      { id: 3, name: "Kids" },
      { id: 4, name: "Accessories" }
    ];
    brands: iMainCategory[] = [
      { id: 90, name: "Any" },
      { id: 91, name: "Trek" },
      { id: 92, name: "Specialized" },
      { id: 93, name: "Schwinn" },
      { id: 94, name: "Giant" }
    ]
    itemSet1: iShopItem[] = this.col(this.items, 0);
    itemSet2: iShopItem[] = this.col(this.items, 1);
    itemSet3: iShopItem[] = this.col(this.items, 2);
    itemSet4: iShopItem[] = this.col(this.items, 3);
    itemSet5: iShopItem[] = this.col(this.items, 4);

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

    showSortMenu() {
      document.getElementById("dropdown-menu").classList.toggle("show");
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
</style>
