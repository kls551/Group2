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
                <h2 style="padding-bottom: 15px">Manage Categories</h2>
                <div class="tile is-child box">
                    <h3 style="padding-bottom: 10px;">New Main Category</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name" v-model="categoryName">
                    <div class="level-right">
                        <div v-if="editMe == true">
                            <button class="button is-success" type="submit" style="margin-top: 15px;" v-on:click="editCategory">Update</button>
                        </div>
                        <div v-else>
                            <button class="button is-success" type="submit" style="margin-top: 15px;" v-on:click="addCategory">Add</button>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="tile is-child box">
                    <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Main Categories</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody v-for="(cat, index) in mainCategoryList" v-bind:key="index">
                        <tr>
                            <td>{{ cat.name }}</td>
                            <!-- <td><font-awesome-icon="edit" /></td> -->
                            <td><a v-on:click="editTrue(cat.name, cat.id)"><font-awesome-icon icon="edit" /></a></td>
                            <td><a v-on:click="deleteCategory(cat.id)"><font-awesome-icon icon="trash-alt" /></a></td>
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
export default class mainCategory extends Vue {

    mainCategoryList: MainCategory[] = [];
    categoryName: String = "";
    editMe: Boolean = false;
    editIndex: Number = 0;

    error: string | boolean = false;

    mounted(){
        this.getCategories();
    }

    getCategories() {
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

    addCategory() {
        console.log(this.categoryName);
        axios
        .post(APIConfig.buildUrl("/maincategory"), {           
            name: this.categoryName,
            // subCategories: this.subCategories,
        })
        .then((response: AxiosResponse) => {
            this.categoryName = "";
            this.$emit("success");
            this.getCategories();
        })
        .catch((errorResponse: any) => {
            debugger;
            this.error = errorResponse.response.data.reason;
        });
    }

    deleteCategory(index:number) {
        axios
        .delete(APIConfig.buildUrl("/maincategory/" + index), {           
        })
        .then(() => {
            this.getCategories();
        })
    }

    editTrue(name:string, index: number){
        this.editMe = true;
        this.categoryName = name;
        this.editIndex = index;
    }

    editCategory() {
        console.log(this.editIndex);
        axios
        .put(APIConfig.buildUrl("/maincategory/" + this.editIndex), {
            name: this.categoryName
        })
        .then(() => {
            this.categoryName = "";
            this.editIndex = 0;
            this.editMe = false;
            this.getCategories();
        })
    }

    cancel() {
        this.$emit("cancel");
    }  
}

interface MainCategory {
    categoryname: string;
}

interface SubCategory {
    name: string;
    mainCategory: MainCategory;
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

router-link:active {
    background-color: orange;
}

</style>
