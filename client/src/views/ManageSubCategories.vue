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
                            <li><a>Brands</a></li>
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
                        <div class="dropdown is-hoverable" style="margin-bottom: 15px;">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">

                                <span style="color: grey" v-if="mainCategoryName === ''">Ex: Bikes</span>
                                <span style="color: grey" v-else>{{ mainCategoryName }}</span>

                                <span class="icon is-small">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content" v-for="(main, index) in mainCategoryList" v-bind:key="index">
                                    <a class="dropdown-item" v-on:click="saveMainCat(main.id, main.name)">{{ main.name }}</a>
                                </div>
                            </div>
                        </div>

                    <!-- sub category input box -->
                    <h3 style="padding-bottom: 10px;">New Sub Category</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name" v-model="subCategoryName">
                    <div class="level-right">
                        <button class="button is-success" type="submit" style="margin-top: 15px;" 
                        v-on:click="addSubCategory(mainCategoryId)">Add</button>
                    </div>
                </div>

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
                            <td><a><font-awesome-icon icon="edit" /></a></td>
                            <td><a v-on:click="deleteSubCategory(subcat.id)"><font-awesome-icon icon="trash-alt" /></a></td>
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

    saveMainCat(mainCatId:number, mainCatName:string) {
        this.mainCategoryId = mainCatId;
        this.mainCategoryName = mainCatName;
        this.getSubCategories(mainCatId);
    }

    addSubCategory(mainCatId:number) {
        axios
        .post(APIConfig.buildUrl("/subcategory"), {               
            name: this.subCategoryName,
            mainCategoryId: mainCatId,
        })
        .then((response: AxiosResponse) => {
            debugger; 
            this.getSubCategories(this.mainCategoryId);
            this.subCategoryName = "";
            this.mainCategoryId = 0;
            this.$emit("success");
            //this.getCategories();
        })
        .catch((errorResponse: any) => {
            debugger;
            this.error = errorResponse.response.data.reason;
        });
    }

    deleteSubCategory(index:number) {
        axios
        .delete(APIConfig.buildUrl("/subcategory/" + index), {           
        })
        .then(() => {
            this.getSubCategories(this.mainCategoryId);
        })
    }

    // deleteSubCategory(index:number) {
    //     axios
    //     .delete(APIConfig.buildUrl("/subcategory/" + index), {           
    //     })
    //     .then(() => {
    //         this.getCategories();
    //     })
    // }

    // editTrue(name:string, index: number){
    //     this.editMe = true;
    //     this.categoryName = name;
    //     this.editIndex = index;
    // }

    // editCategory() {
    //     console.log(this.editIndex);
    //     axios
    //     .put(APIConfig.buildUrl("/maincategory/" + this.editIndex), {
    //         name: this.categoryName
    //     })
    //     .then(() => {
    //         this.categoryName = "";
    //         this.editIndex = 0;
    //         this.editMe = false;
    //         this.getCategories();
    //     })
    // }

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
