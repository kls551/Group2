<template>
  <div class="shop">
    <div class="container" style="margin-top: 25px; margin-bottom: 25px">
    <h2 style="color: orange">Shop our collection</h2>
    <h3 style="border-bottom: 1.5px solid orange">Sort or filter items and click to view item details</h3>
    <div class="columns is-full top-bar">
      <!-- Categories menu -->
      <div class="column is-3" style="padding: 0px 0px 0px 20px; margin: 4px 15px;">
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
              class="panel-block"
              style="padding-left: 40px"
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

            <a class="panel-block" style="padding-left: 40px" v-show="brandsShow" v-for="brand in brands" :key="brand.id">
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
              <a class="panel-block" style="padding-left: 40px" v-show="category.show" v-for="sub in category.subCategories" :key="sub.id + 100">
                <b-checkbox v-model="activeSubCatIds" :native-value="sub.id" style="color: #363636" disabled>
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
          </nav>
        </section>
      </div>

      <!-- Shop layout -->
      <div class="columns is-multiline">
        <div v-for="item in shopItems" :key="item.id" class="column is-narrow">

            <div class="card">
              <router-link :to="{ name: 'shopItem', params: { itemId: item.id } }">
              <div class="card-image" style="min-height: 200px">
                <figure class="image">
                  <img v-if="item.images[0].img" :src="item.images[0].img" style="max-width: 100%; height: auto; border-radius: 4px;" class="center">
                  <img v-else src="https://www.rabata.org/wp-content/uploads/2018/05/dummy.png" style="max-width: 100%; height: auto; border-radius: 4px;" class="center">
                </figure>
              </div>
              </router-link>

              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                      <div class="subtitle is-4" style="font-weight: bold">{{ item.name }}</div>
                      <div class="title" style="color: orange; font-size: 18px;"> ${{ item.price }} </div>
                    </div>
                  </div>


                <div class="content">
                  <div class="columns">
                    <div class="column">
                      <p v-if="item.brand != null">{{ item.brand.name }}</p>
                      <p v-else>Brand</p>
                    </div>
                    <div class="column" style="text-align: right">
                      <p v-if="inStock(item.quantity) === true" style="color: green">IN STOCK</p>
                      <p v-else style="color: red">SOLD OUT</p>
                    </div>
                  </div>

                  <div v-if="isLoggedIn && isOwner">
                    <router-link :to="{ name: 'ownerAddItem', params: { itemId: item.id, editing: true }}">
                      <button class="button is-info is-fullwidth" type="submit" style="margin-top: 15px;">Edit</button></router-link>
                      <button class="button is-danger is-fullwidth" style="margin-top: 15px;" v-on:click="showDeleteConfirm(item)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirm
            v-bind:is-showing="showDelConfirm"
            v-bind:del="confirmDel"
            v-on:success="successDelete()"
            v-on:cancel="cancelDelete()"> </DeleteConfirm>
  </div>
</template>

<script lang="ts">
  import axios, { AxiosResponse, AxiosError } from "axios";
  import { APIConfig } from "../utils/api.utils";
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { iShopItem, iImg } from "../models/shopitem.interface";
  import { iMainCategory, iSubCategory } from "../models/category.interface";
  import { iBrand } from "../models/brand.interface";
  import Modal  from "../components/Modal.vue";
  import DeleteConfirm  from "@/components/DeleteConfirm.vue";
  import { constants } from "http2";

@Component({
  components: { Modal, DeleteConfirm}
})
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

    @Prop ({default : null})
    mCat : string | undefined;

    public showDelConfirm: boolean = false;
    public confirmDel: boolean = false;
    public delId: number = -1;


    sorts: iMainCategory = { id: 1099, name: "Sorting Options", show: true,
              subCategories: [
                { id: 1100, name: "Alphabetical" },
                { id: 1101, name: "Price (Low to High)" },
                { id: 1102, name: "Price (High to Low)" }]
    };

    mounted() {
      this.display();
      this.loader();
    }

    successDelete() {
      debugger;
        this.showDelConfirm = false;
        this.removeItem(this.delId);
    }

    cancelDelete() {
        this.showDelConfirm = false;
    }

    showDeleteConfirm(item:iShopItem) {
        debugger;
        this.delId = item.id;
        this.showDelConfirm = true;
    }

    removeItem(itemid : number | undefined ) {
        axios
        .delete(APIConfig.buildUrl("/shopitems/" + itemid ))
        .then( () => {
            this.display();
        })
    }

    display() {
      console.log(this.$store.state.mCat);
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

    inStock(quant:number) {
      if(quant > 0) {
        return true;
      } else {
        return false;
      }
    }

    loader () {
      console.log(this.$store.state.mCat);
      if (this.$store.state.mCat) {
        axios
          .get(APIConfig.buildUrl("/shopitems/"), { params: { cat_ids: [this.$store.state.mCat] }})
          .then((response: AxiosResponse) => {
            this.shopItems = response.data;
            this.$store.state.mCat = null;
            console.log(this.shopItems);
            this.$emit("success");
          });
      }
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
    if (this.activeCatIds.length != 0 || this.activeBrandIds.length != 0) {
      axios
        .get(APIConfig.buildUrl("/shopitems/"), { params: { cat_ids: this.activeCatIds, brand_ids: this.activeBrandIds }})
        .then((response: AxiosResponse) => {
          this.shopItems = response.data;
          console.log(this.shopItems);
          this.$emit("success");
        });
    }
    else if (this.activeBrandIds.length == 0 && this.activeCatIds.length == 0 && this.activeSubCatIds.length == 0) {
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
.column {
  margin: 5px;
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
