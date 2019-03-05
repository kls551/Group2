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
                <h2 style="padding-bottom: 15px">Manage Brands</h2>
                <div class="tile is-child box">
                    <h3 style="padding-bottom: 10px;">New Brand</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name" v-model="brandName">
                    <div class="level-right">
                        <div v-if="editMe == true">
                            <button class="button is-success" type="submit" style="margin-top: 15px;" v-on:click="editBrand">Update</button>
                        </div>
                        <div v-else>
                            <button class="button is-success" type="submit" style="margin-top: 15px;" v-on:click="addBrand">Add</button>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="tile is-child box">
                    <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Brand</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody v-for="(brand, index) in brandCategoryList" v-bind:key="index">
                        <tr>
                            <td>{{ brand.name }}</td>
                            <td><a v-on:click="editTrue(brand.name, brand.id)"><font-awesome-icon icon="edit" /></a></td>
                            <td><a v-on:click="deleteCategory(brand.id)"><font-awesome-icon icon="trash-alt" /></a></td>
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
export default class brands extends Vue {

    brandCategoryList: Brands[] = [];
    brandName: String = "";
    editMe: Boolean = false;
    editIndex: Number = 0;

    error: string | boolean = false;

    mounted(){
        this.getBrands();
    }

    getBrands() {
        axios
            .get(APIConfig.buildUrl("/brands"))
            .then((response: AxiosResponse<Brands[]>) => {
                this.brandCategoryList = response.data;
                this.$emit("success");
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    addBrand() {
        axios
        .post(APIConfig.buildUrl("/brands"), {           
            name: this.brandName,
            // subCategories: this.subCategories,
        })
        .then((response: AxiosResponse) => {
            this.brandName = "";
            this.$emit("success");
            this.getBrands();
        })
        .catch((errorResponse: any) => {
            this.error = errorResponse.response.data.reason;
        });
    }

    deleteCategory(index:number) {
        axios
        .delete(APIConfig.buildUrl("/brands/" + index), {           
        })
        .then(() => {
            this.getBrands();
        })
    }

    editTrue(name:string, index: number){
        this.editMe = true;
        this.brandName = name;
        this.editIndex = index;
    }

    editBrand() {
        console.log(this.editIndex);
        axios
        .put(APIConfig.buildUrl("/brands/" + this.editIndex), {
            name: this.brandName
        })
        .then(() => {
            this.brandName = "";
            this.editIndex = 0;
            this.editMe = false;
            this.getBrands();
        })
    }

    cancel() {
        this.$emit("cancel");
    }  
}

interface Brands {
    brandname: string;
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