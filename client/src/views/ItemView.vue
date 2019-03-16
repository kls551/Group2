<template>
  <div class="itemView">
    <div class="container" style="margin-top: 25px; margin-bottom: 25px">
    <div class="columns" v-if="loaded">
      <div class="column">
      <div class="card-content">
        <div class="card-carousel">
          <figure class="image is-48x48">
            <img :src="currentImage" alt>
          </figure>
          <div class="thumbnails" v-if="!isOnlyOne">
            <div
              v-for="(image, index) in  shopItem.images"
              :key="image.id"
              :class="['thumbnail-image image', (activeImage == index) ? 'active' : '']"
              v-on:click="activateImage(index)"
            >
              <img :src="image.img">
            </div>
          </div>
        </div>
      </div>
      </div>

      <div class="leftMargin column" style="margin-top: 75px">
        <h1>{{ shopItem.name }}</h1>
        <div class="columns">
          <div class="column is-3">
            <h2>${{ shopItem.price }}</h2>
          </div>
        </div>
        <div class="buttons has-addons">
          <span class="button buttonStyle" v-on:click="addToCart(shopItem)">Add To Cart</span>
        </div>

        <p class="subtitle is-6" v-if="shopItem.inStorePickup">In-Store Pickup Only</p>
        <p class="subtitle is-6" v-else>Order online available</p>
        <div class="box">
          <h3><strong>Details</strong><br>{{ shopItem.details }}</h3>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { iShopItem, iImg } from "@/models/shopitem.interface";
import {} from "@/models/shopitem.interface";

@Component
export default class ItemView extends Vue {
  error: string | boolean = false;
  loaded: boolean = false;
  //someImages: iImg[] = [{id: 0, img: ""}];
  shopItem: iShopItem | undefined;
  //  { id: 0, name: "", price: 0, details: "", quantity: 0, category: "", inStorePickup: false, postedDate: new Date("2019-02-27"), images: this.someImages };

  activeImage: number = 0;
  currentImage: String = "";

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
        this.activateImage(0);
        this.loaded = true;
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

  addToCart(item: iShopItem) {
    const itemId = item && item.id;
    if (!this.$store.state.cart) {
      axios
        .post(APIConfig.buildUrl("/cart"), {
          userId: this.$store.state.user.id,
          itemId: itemId
        })
        .then((cart: AxiosResponse) => {
          this.$store.state.cart = cart;
        })
        .catch((res: AxiosError) => {
          this.error = res.response && res.response.data.error;
        });
    } else {
      const cartId = this.$store.state.cart && this.$store.state.cart.id;
      axios
        .put(APIConfig.buildUrl("/cart/" + cartId), {
          userId: this.$store.state.user.id,
          itemId: itemId
        })
        .then((cart: AxiosResponse) => {
          console.log(" add new item ", cart);
          this.$store.state.cart = cart;
        })
        .catch((res: AxiosError) => {
          this.error = res.response && res.response.data.error;
        });
    }
  }

  activateImage(imageIndex: number) {
    this.activeImage = imageIndex;
    this.currentImage = this.shopItem
      ? this.shopItem.images[imageIndex].img
      : "";
  }

  get isOnlyOne(): boolean {
    if (this.shopItem && this.shopItem.images.length === 1) return true;
    else return false;
  }
}
</script>

<style scoped lang="scss">
.card-carousel {
  user-select: none;
  position: relative;
}

.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
}

.thumbnail-image > img {
  width: 100%;
  height: auto;
  transition: all 250ms;
}

.thumbnail-image > img {
  width: 100%;
  height: auto;
  transition: all 250ms;
}

.thumbnail-image:hover > img,
.thumbnail-image.active > img {
  opacity: 0.6;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
}

.card-img {
  position: relative;
  margin-bottom: 15px;
}

.card-img > img {
  display: block;
  margin: 0 auto;
}

.actions {
  font-size: 1.5em;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #585858;
}

.actions > span {
  cursor: pointer;
  transition: all 250ms;
}

.actions > span.prev {
  margin-left: 5px;
}

.actions > span.next {
  margin-right: 5px;
}

.actions > span:hover {
  color: #eee;
}
h1 {
  font-family: 'Questrial';
  font-size: 30px;
  font-weight: bold;
  color: orange;
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
  margin-right: 80px;
}
.leftMargin {
  margin-left: 80px;
}
.buttonStyle {
  padding-top: 5px;
  padding-right: 17px;
  padding-bottom: 5px;
  padding-left: 17px;
  margin-bottom: 4px;
}
article {
  height: 300px;
  width: 400px;
}
.image {
  width: 100%;
  height: auto;
  margin-top: 150px;
}
</style>
