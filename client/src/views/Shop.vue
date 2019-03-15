<template>
  <div class="shop">
    <div class="columns top-bar">
      <!-- Categories menu -->
      <div class="column is-3 menu">
          <section>
            <nav class="panel">
              <p class="panel-heading">
                <span>Categories</span>
              </p>

            <!-- Menu for sorting options -->
            <div class="panel-block">
              <span class="cat-name">{{ sorts.name }}</span>
            </div>

            <a
              class="panel-block menu-contents"
              v-show="sorts.show"
              v-for="option in sorts.subCategories"
              :key="option.id"
              v-on:change="sortby"
            >
              <b-radio v-model="whichSort" :name="sorts.name" :native-value="option.id">
                {{ option.name }}
              </b-radio>
            </a>

            <!-- Brand filter options -->
            <div class="panel-block" v-on:click="brandsShow = !brandsShow">
              <span class="cat-name"> Brands </span>
              <font-awesome-icon v-show="!brandsShow" icon="angle-down"/>
              <font-awesome-icon v-show="brandsShow" icon="angle-up"/>
            </div>

            <a class="panel-block menu-contents" v-show="brandsShow" v-for="brand in brands" :key="brand.id">
              <b-checkbox v-model="activeBrandIds" :native-value="brand.id">
                {{ brand.name }}
              </b-checkbox>
            </a>

            <!-- Category filter options -->
            <div v-for="category in categories" :key="category.id + 50">
              <!-- Main category set -->
              <div class="panel-block" v-on:click="category.show = !category.show">
                <span class="cat-name">
                    <b-checkbox v-model="activeCatIds" :native-value="category.id">
                    {{ category.name }}
                  </b-checkbox>
                </span>
                <div v-if="category.subCategories.length != 0">
                  <font-awesome-icon v-show="!category.show" icon="angle-down"/>
                  <font-awesome-icon v-show="category.show" icon="angle-up"/>
                </div>
              </div>

              <!-- Subcategory set -->
              <a class="panel-block menu-contents" v-show="category.show" v-for="sub in category.subCategories" :key="sub.id + 100">
                <b-checkbox v-model="activeSubCatIds" :native-value="sub.id">
                  {{ sub.name }}
                </b-checkbox>
              </a>
            </div>

            <!-- Filter button -->
            <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth" v-on:click="filter">
                Filter
              </button>
            </div>

            <!-- Show selection for testing -->
            <div class="panel-block">
              Active brands:
            </div>
            <div class="panel-block menu-contents" v-for="brand in activeBrandIds">
              {{ brand }}
            </div>

            <div class="panel-block">
              Active main categories:
            </div>
            <div class="panel-block menu-contents" v-for="cat in activeCatIds">
              {{ cat }}
            </div>

            <div class="panel-block">
              Active subcategories:
            </div>
            <div class="panel-block menu-contents" v-for="cat in activeSubCatIds">
              {{ cat }}
            </div>
          </nav>
        </section>
      </div>

      <!-- Shop layout -->
      <div class="columns is-multiline shop-layout">
        <div v-for="item in shopItems" :key="item.id" class="column is-narrow">
          <router-link :to="{ name: 'shopItem', params: { itemId: item.id } }">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="item.images[0].img">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <div class="columns">
                      <div class="column is-8">
                        <p class="title is-4">{{ item.name }}</p>
                      </div>
                      <div class="column">
                        <p class="title" style="color: orange; font-size: 18px;">
                          ${{ item.price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <p> {{ item.brand }}   |   IN STOCK </p>
                    <div v-if="isLoggedIn">
                      <router-link :to="{ name: 'ownerAddItem', params: { itemId: item.id, editing: true }}">
                        <button class="button is-info is-fullwidth" type="submit" style="margin-top: 15px;">
                          Edit
                        </button>
                      </router-link>
                      <button class="button is-danger is-fullwidth" type="submit" style="margin-top: 15px;">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
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
  import { iShopItem, iImg } from "../models/shopitem.interface";
  import { iMainCategory, iSubCategory } from "../models/category.interface";
  import { iBrand } from "../models/brand.interface";

  @Component
  export default class Shop extends Vue {
    error: string | boolean = false;
    shopItems: iShopItem[] = [];
    brands: iBrand[] = [];
    categories: iMainCategory[] = [];
    whichSort: number = 0;
    brandsShow = false;
    activeBrandIds: number[] = [];
    activeCatIds: number[] = [];
    activeSubCatIds: number[] = [];

    sorts: iMainCategory = { id: 1099, name: "Sorting Options", show: true,
              subCategories: [
                { id: 1100, name: "Alphabetical" },
                { id: 1101, name: "Price (Low to High)" },
                { id: 1102, name: "Price (High to Low)" }]
    };

    mounted() {
      this.display();
    }

    display() {
      axios
        .get(APIConfig.buildUrl("/shopitems"))
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          console.log(this.shopItems);
          this.$emit("success");
          return axios.get(APIConfig.buildUrl("/maincategory"));
        })
        .then((response: AxiosResponse) => {
          this.categories = response.data;
          this.$emit("success");
          console.log(this.categories);
          return axios.get(APIConfig.buildUrl("/brands"));
        })
        .then((response: AxiosResponse) => {
          this.brands = response.data;
          this.$emit("success");
          console.log(this.brands);
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

  filter() {
    if (this.activeBrandIds.length != 0) {
      axios
        .get(APIConfig.buildUrl("/shopitems/"), { params: { brand_ids: this.activeBrandIds }})
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          console.log(this.shopItems);
          this.$emit("success");
        });
    }
    if (this.activeCatIds.length != 0) {
      axios
        .get(APIConfig.buildUrl("/shopitems/"), { params: { cat_ids: this.activeCatIds }})
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          console.log(this.shopItems);
          this.$emit("success");
        });
    }
    if (this.activeBrandIds.length == 0 && this.activeCatIds.length == 0 && this.activeSubCatIds.length == 0) {
      axios
        .get(APIConfig.buildUrl("/shopitems"))
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          console.log(this.shopItems);
          this.$emit("success");
        });
    }
  }

  get isOwner(): boolean {
    return this.$store.state.user && (this.$store.state.user.isAdmin === 1);
  }

  get isLoggedIn(): boolean {
    return this.$store.state.user;
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
  border-radius: 5px;
  padding: 3px 3px 3px 3px;
  margin-bottom: 10px;
  height: auto;
  width: 300px;
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

.title {
  font-family: 'Questrial';
  font-size: 16px;
}

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

h3 {
    font-family: 'Questrial';
    font-size: 16px;
}
</style>
