<template>
  <div class="about">

    <div class="container" style="margin-top: 25px; margin-bottom: 25px">
        <!-- check to see if we are editing an item from the shop -->
        <div v-if="isEditing == true">
            <h2 style="color: red">Editing {{ this.itemName }}</h2>
        </div>
        <div v-else>
            <h2>Add New Item </h2>
        </div>
    <div class="columns">

      <div class="rightMargin column">
      <br>

      <div class="box">
          <div v-if="errorMessage == null">
          </div>
          <div v-else><p style="color: red">{{errorMessage}}</p></div>
          
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


        <!-- Main Category Radio Buttons -->

            <div class="columns">
                <div class="column">
                    <label class="label">Main Category</label>
                    <div class="field" v-for="main in mainCategoryList" :key="main.id">
                        <b-radio name="options" v-model="selected" :native-value="main.id"
                                 v-on:input="saveMainCat(main.id)">
                            {{ main.name }}
                        </b-radio>
                    </div>

                </div>

                <!-- Subcategory select multiple -->
                <div v-if="mainselected === true" class="column">
                    <label class="label">Sub Categories</label>
                    <b-select
                        multiple
                        native-size="4"
                        v-model="selectedSubCategories">
                        <option v-for="(sub, index) in subCategoryList" v-bind:key="index" :value="sub.id">{{ sub.name }}</option>
                    </b-select>
                </div>
                <div v-else></div>


                <div class="column">
                    <label class="label">Brand</label>
                    <div class="field" v-for="(brand, index) in brandList" v-bind:key="index">
                        <b-radio name="brands" v-model="selectedBrand" :native-value="brand.id">
                            {{ brand.name }}
                        </b-radio>
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
            <div class="field">
                <label class="label">ImageUrl</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Please make sure to copy image address" v-model="itemImageURL">
                </div>
            </div>

        <div class="field">
            <div class="control">
                <p style="color: red">** select to input more image addresses in image URL field **</p>
                <label class="checkbox">
                    <input type="checkbox" v-model="addwithmoreimg">
                    Add With More Imgs
                </label>
            </div>
        </div>

          </div>
                <div v-if="isEditing == true">
                    <span><button v-if="!addMoreimg" class="button is-warning" type="submit" v-on:click="updateItem">Update Item</button></span>
                    <span><button v-if="addMoreimg" class="button is-warning" type="submit" v-on:click="addMore">Add More Image</button></span>
                    <span><button v-if="addMoreimg" class="button is-danger" type="submit" v-on:click="cancel">Cancel</button></span>

                </div>
                <div v-else>
                    <span><button v-if="!addMoreimg" class="button is-success" type="submit" v-on:click="addItem">Add Item</button></span>
                    <span><button v-if="addMoreimg" class="button is-warning" type="submit" v-on:click="addMore">Add More Image</button></span>
                    <span><button v-if="addMoreimg" class="button is-danger" type="submit" v-on:click="cancel">Cancel</button></span>
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
import { resolve } from "path";
import { iShopItem } from "@/models/shopitem.interface";
import { ShopItem } from '../../../api/entity';
//import Toasted from 'vue-toasted';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

@Component
export default class NewItem extends Vue {
    error: string | boolean = false;
    imageCount: Number = 0;
    itemName: String = "";
    itemDetail: String = "";
    itemPrice: Number = 0;
    itemQuantity: Number = 0;
    iteminStorePickup: Boolean = false;
    itemPostedDate: Date = new Date();
    itemImageURL: String = "";

    selected: Number = 0;
    selectedBrand: Number = 0;
    selectedSubCategories: Number[] = [];
    itemid: number | null = null;
    addMoreimg: Boolean = false;
    addwithmoreimg: Boolean = false;

    mainCategoryList: MainCategory[] = [];
    mainCategoryId: Number = 0;
    subCategoryList: SubCategory[] = [];
    mainselected: Boolean = false;
    brandList: Brand[] = [];

    shopItem: iShopItem | undefined;

    isEditing: Boolean = false;
    errorMessage: String = "";

    mounted() {
        if(this.$route.params.editing) {
            this.editItem();
        }
        this.getMainCategories();
        //this.getSubCategories(this.mainCategoryId);
        this.getBrands();
        this.imageCount;
    }


    editItem() {
        if(this.$route.params.editing) {
            axios
            .get(APIConfig.buildUrl("/shopitems/" + this.$route.params.itemId))
            .then((response: AxiosResponse) => {
                this.shopItem = response.data;
                if (this.shopItem) {
                    this.itemName = this.shopItem.name;
                    this.itemPrice = this.shopItem.price;
                    this.itemDetail = this.shopItem.details;
                    this.itemQuantity = this.shopItem.quantity;
                    this.iteminStorePickup = this.shopItem.inStorePickup; 
                    this.selected = response.data.category && response.data.category.id;
                    this.selectedBrand = response.data.brand.id;
                    this.selectedSubCategories = response.data.subcategories;
                    this.itemImageURL = this.shopItem.images[0].img;
                    this.saveMainCat(this.selected);
                }
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
            this.isEditing = true;
            this.itemid = parseInt(this.$route.params.itemId);
        }
            
    }

    updateItem() {
        if(this.itemName != "" && this.itemPrice > 0 && this.itemQuantity >= 0 && this.itemDetail != null) {
        this.$snackbar.open({
            duration: 4000,
            message: "Update Item?",
            type: "is-info",
            position: "is-top",
            actionText: "Update",
            queue: false,
            onAction: () => {
        axios
        .put(APIConfig.buildUrl("/shopitems/" + this.itemid), {
                name: this.itemName,
                details: this.itemDetail,
                price: this.itemPrice,
                quantity: this.itemQuantity,
                category: this.selected,
                subcategories: this.selectedSubCategories,
                inStorePickup: this.iteminStorePickup,
                postedDate: this.itemPostedDate,
                imageUrl: this.itemImageURL,
                brand: this.selectedBrand
        })
        .then((response: AxiosResponse<{ id: number }>) => {
                if(!this.addwithmoreimg) {
                    this.itemid = response.data.id;
                    this.$emit("success");
                    this.clear();
                }
                else
                {
                    this.itemid = response.data.id;
                    this.addMoreimg = true;
                    this.itemImageURL = "";
                }
            })
            .catch((errorResponse: any) => {
                this.error = errorResponse.response.data.reason;
            });
            }
        });
        } else {
            this.errorMessage = "Missing fields or out of range price/quantity";
        }
    }


    getMainCategories() {
        axios
            .get(APIConfig.buildUrl("/maincategory"))
            .then((response: AxiosResponse<MainCategory[]>) => {
                this.mainCategoryList = response.data;
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    getSubCategories(mainCatId:Number) {
        axios
        .get(APIConfig.buildUrl("/subcategory"), { params: {
            main_id: mainCatId
        }})
        .then((response: AxiosResponse<SubCategory[]>) => {
                this.subCategoryList = response.data;
                this.$emit("success");
        })
        .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
        });
    }

    getBrands() {
        axios
            .get(APIConfig.buildUrl("/brands"))
            .then((response: AxiosResponse<Brand[]>) => {
                this.brandList = response.data;
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    saveMainCat(mainCatId:Number) {
        this.mainCategoryId = mainCatId;
        this.mainselected = true;
        this.getSubCategories(mainCatId);
    }

    addMore() {
        console.log(this.itemid);
        axios.post(APIConfig.buildUrl("/itemimages/" + this.itemid), {
            img : this.itemImageURL
        })
        .then((response: AxiosResponse) => {
            console.log(response.data);
            this.itemImageURL = "";
        })
        .catch((errorResponse: any) => {
            this.error = errorResponse.response.data.reason;
        });
    }

    clear() {
        this.itemName = "";
        this.itemDetail = "";
        this.itemPrice = 0;
        this.itemQuantity = 0;
        this.itemImageURL = "";
        this.iteminStorePickup = false;
    }

    cancel() {
        this.clear();
        this.itemid = 0;
        this.addMoreimg = false;
        this.itemImageURL = "";
    }

    addItem() {
        if(this.itemName != "" && this.itemPrice > 0 && this.itemQuantity >= 0 && this.itemDetail != null) {
        this.$snackbar.open({
            duration: 4000,
            message: "Add Item?",
            type: "is-info",
            position: "is-top",
            actionText: "Add",
            queue: false,
            onAction: () => {
        if (this.itemName == "" || this.itemPrice == 0) {
            return;
        }
        axios
            .post(APIConfig.buildUrl("/shopitems"), {
                name: this.itemName,
                details: this.itemDetail,
                price: this.itemPrice,
                quantity: this.itemQuantity,
                category: this.selected,
                subcategories: this.selectedSubCategories,
                inStorePickup: this.iteminStorePickup,
                postedDate: this.itemPostedDate,
                imageUrl: this.itemImageURL,
                brand: this.selectedBrand
            })
            .then((response: AxiosResponse<{ id: number }>) => {
                if(!this.addwithmoreimg) {
                    this.itemid = response.data.id;
                    this.$emit("success");
                    this.clear();
                }
                else
                {
                    this.itemid = response.data.id;
                    this.addMoreimg = true;
                    this.itemImageURL = "";
                }
            })
            .catch((errorResponse: any) => {
                this.error = errorResponse.response.data.reason;
            });
            }
        });
        } else {
            this.errorMessage = "Missing fields or out of range price/quantity";
        }
    }
}

interface MainCategory {
    mainId: number;
    categoryname: string;
    subCategories: SubCategory[];
}

interface Brand {
    brandname: string;
}

interface SubCategory {
    name: string;
    mainCategoryId: number;
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
.rightColumn {
  margin-right:180px;
}
.buttonStyle {
  padding-top:5px;
  padding-right:17px;
  padding-bottom:5px;
  padding-left:17px;
  margin-bottom: 4px;
}
.scroll-container {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 10px;
}
div h1{
    text-align: left;
    margin-top: -10px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
}

div h1 span{
    background-color: white;
}
</style>
