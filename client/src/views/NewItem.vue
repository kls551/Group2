<template>
  <div class="about">

    <div class="container" style="margin-top: 25px; margin-bottom: 25px">
      <h2>Add New Item </h2>
    <div class="columns">

      <!-- <div class="rightMargin column" style="margin-right: 0px"> -->
        <!-- <figure class="image is-3by2">
            <img alt="Map" src=https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Left_side_of_Flying_Pigeon.jpg/1200px-Left_side_of_Flying_Pigeon.jpg style="margin-top: 20px;">
        </figure>

        <div class="tile box" style="margin-top: 20px">
          <div class="field" style="margin-top 20px;">
            <div class="file" style="margin-left: 150px">
              <label class="file-label">
                <input 
                type="file"
                accept="image/*"
                class="input-file file-input" 
                name="resume">
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
        </div> -->

      <!-- </div> -->
      
      <div class="rightMargin column">
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
                    <input class="input" type="text" placeholder="URL" v-model="itemImageURL">
                </div>
            </div>

        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="addwithmoreimg">
                    Add With More Imgs
                </label>
            </div>  
        </div>
        
          </div>
                <span><button v-if="addMoreimg" class="button is-warning" type="submit" v-on:click="addMore">Add More Image</button></span>
                <span><button v-if="!addMoreimg" class="button is-success" type="submit" v-on:click="addItem">Add Item</button></span>

                <span><button v-if="addMoreimg" class="button is-danger" type="submit" v-on:click="cancel">Cancel</button></span>
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

    mounted() {
        this.getMainCategories();
        this.getSubCategories(this.mainCategoryId);
        this.getBrands();
        this.imageCount;
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

    saveMainCat(mainCatId:number) {
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