<template>

<div class="container" style="margin-top: 25px; margin-bottom: 25px;">

        <div class="tile is-ancestor">

            <!-- Side bar menu -->
            <div class="tile is-2" style="margin-top: 15px; margin-right: 25px">
                <div class="tile is-child box">
                    <aside class="menu">
                        <p class="menu-label" style="color: orange">Menu</p>
                        <ul class="menu-list">
                            <li><router-link to="/owner/manage-main-categories">Main Categories</router-link></li>
                            <li><router-link  to=/owner/manage-sub-categories>Sub-Categories</router-link ></li>
                            <li><router-link to=/owner/manage-brands>Brands</router-link></li>
                        </ul>
                    </aside>
                </div>
            </div>

            <div class="tile is-8 is-vertical is-parent">
                <!-- Input box -->
                <h2 style="padding-bottom: 15px">Manage Sub Categories</h2>
                <div class="tile is-child box">

                    <!-- Main category drop down -->
                    <h3 style="padding-bottom: 10px">Select Main Category</h3>
                    <div class="select is-rounded">
                    <select v-on:change="saveMainCat" v-model="mainCategoryId">
                        <option
                        v-for="(main, index) in mainCategoryList" v-bind:key="index"
                        :value="main.id">
                        {{ main.name }}
                        </option>
                    </select>
                    </div>


                <!-- <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                        <span>Select A Main Category</span>
                        <span class="icon is-small">
                            <font-awesome-icon icon="angle-down" />
                        </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                        <div class="dropdown-content"
                            v-for="(main, index) in mainCategoryList" v-bind:key="index">
                            <a v-on:click="saveMainCat(main.id, main.name)" class="dropdown-item">
                                {{main.name}}
                            </a>
                        </div>
                    </div>
                </div> -->
                    <!-- <b-field>
                        <b-select placeholder="Select a Main Category"
                                  v-model="selected"
                                  v-on:input="saveMainCat(main.id, main.name)">
                                <option disabled value="">Please select one</option>
                                <option v-for="main in mainCategoryList" v-bind:key="main.id">{{ main.name }}</option>
                        </b-select>
                    </b-field> -->

                    <!-- sub category input box -->
                    <h3 style="padding-bottom: 10px;">New Sub Category</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name" v-model="subCategoryName">
                    <div class="level-right">
                        <div v-if="editMe == true">
                            <button class="button is-success" type="submit" style="margin-top: 15px;" v-on:click="editCategory">Update</button>
                        </div>
                        <div v-else>
                            <button class="button is-success" type="submit" style="margin-top: 15px;"
                            v-on:click="addSubCategory(mainCategoryId)">Add</button>
                        </div>
                    </div>
                </div>

                {{ getMainName(mainCategoryId) }}
                <!-- Table -->
                <div class="tile is-child box">
                    <h2><b>Main Category :</b> {{ mainCategoryName }} </h2>
                    <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Sub Categories</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody v-for="(subcat, index) in subCategoryList" v-bind:key="index">
                        <tr>
                            <th>{{ subcat.name }}</th>
                            <td><a v-on:click="editTrue(subcat.name, subcat.id)"><font-awesome-icon icon="edit" /></a></td>
                            <td><a v-on:click="deleteSubCategory(subcat.id, mainCategoryId)"><font-awesome-icon icon="trash-alt" /></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tile is-2"></div>
        </div>
    </div>

</template>

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class subCategory extends Vue {

    mainCategoryList: MainCategory[] = [];
    subCategoryList: SubCategory[] = [];
    subCategoryName: String = "";
    mainCategoryId: Number = 0;
    mainCategoryName: String = "";

    editMe: Boolean = false;
    editIndex: Number = 0;
    // subCategories: SubCategory[] = [];;

    error: string | boolean = false;

    mounted(){
        this.getMainCategories();
        //this.getSubCategories(this.mainCategoryId);
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

    getMainName(mainCatId:Number) {
        axios
        .get(APIConfig.buildUrl("/maincategory/" + mainCatId), {
        })
        .then((response: AxiosResponse<MainCategory>) => {
            console.log(this.mainCategoryName);
            this.mainCategoryName = response.data.categoryname;
        })
        .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
        });
    }

    saveMainCat() {
        this.getMainName(this.mainCategoryId);
        console.log(this.mainCategoryName);
        // debugger;
        this.getSubCategories(this.mainCategoryId);
    }
    addSubCategory(mainCatId:number) {
        axios
        .post(APIConfig.buildUrl("/subcategory"), {
            name: this.subCategoryName,
            mainCategoryId: mainCatId,
        })
        .then((response: AxiosResponse) => {
            // debugger; 
            this.getSubCategories(this.mainCategoryId);
            this.subCategoryName = "";
            this.$emit("success");
            //this.getCategories();
        })
        .catch((errorResponse: any) => {
            // debugger;
            this.error = errorResponse.response.data.reason;
        });
    }

    deleteSubCategory(index:number, mainCatId:number) {
        axios
        .delete(APIConfig.buildUrl("/subcategory/" + index), {
        })
        .then(() => {
            this.getSubCategories(mainCatId);
        })
    }

    editTrue(name:string, index: number){
        this.editMe = true;
        this.subCategoryName = name;
        this.editIndex = index;
    }

    editCategory() {
        console.log(this.editIndex);
        axios
        .put(APIConfig.buildUrl("/subcategory/" + this.editIndex), {
            name: this.subCategoryName
        })
        .then(() => {
            this.subCategoryName = "";
            this.editIndex = 0;
            this.editMe = false;
            this.getSubCategories(this.mainCategoryId);
        })
    }

    cancel() {
        this.$emit("cancel");
    }
}

interface MainCategory {
    categoryname: string;
    subCategories: SubCategory[];
}

interface SubCategory {
    name: string;
    mainCategoryId: number;
}

</script>

<style scoped lang="scss">

thead {
    background-color: orange;
}

tr {
    padding: 15px;
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
