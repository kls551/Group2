<template>
<div style="margin-top: 40px; margin-bottom: 40px">
    <!-- Four Grid Pictures -->

    <h2>Welcome to Foxcycle</h2>
    <h3 style="border-bottom: 1.5px solid orange; padding-bottom: 15px;">Browse and buy from our online shop, contact us, or learn about our services</h3>
    <br>
    <!-- Preview Announcment -->
    <div class="columns">
        <div class="column is-two-thirds">
            <div class="tile is-ancestor">
        <div class="tile is-6 is-vertical is-parent">

            <!-- Shop Mountain -->
            <div class="tile is-child">
                <figure class="image is-3by2">
                    <img src="../assets/mountain-bike.jpg">
                    <div class="middle">
                        <a><div v-on:click="showShop(1)" class="hover-text">Mountain</div></a>
                    </div>
                </figure>
            </div>

            <!-- Shop Cruisers -->
            <div class="tile is-child">
                <figure class="image is-3by2">
                    <img src="../assets/race-bikes.jpg">
                    <div class="middle">
                        <a><div v-on:click="showShop(2)"  class="hover-text">Cruisers</div></a>
                    </div>
                </figure>
            </div>
        </div>

        <!-- Shop Racing -->
        <div class="tile is-6 is-parent is-vertical">
            <div class="tile is-child">
                <figure class="image is-3by2">
                    <img src="../assets/beach-cruiser.jpg">
                    <div class="middle">
                        <a><div v-on:click="showShop(3)"  class="hover-text">Racing</div></a>
                    </div>
                </figure>
            </div>

            <!-- Shop Accesories -->
            <div class="tile is-child">
                <figure class="image is-3by2">
                    <img src="../assets/bike-accessories.jpg">
                    <div class="middle">
                        <a><div v-on:click="showShop(4)"  class="hover-text">Accesories</div></a>
                    </div>
                </figure>
            </div>
        </div>
    </div>

        </div>

        <div class="column">
            <div class="box">
                <h2>Announcements</h2>
                <article class="message is-warning" v-for="(ann, index) in announcements" v-bind:key="index">
                    <div class="message-header">
                        <p>{{ann.title}}</p>
                        <!-- <button class="delete" aria-label="delete"></button> -->
                    </div>
                    <div class="message-body">
                        {{ann.body}}
                    </div>
                </article>
            </div>
        </div>

    </div>

</div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios, {
    AxiosResponse,
    AxiosError
} from "axios";
import {
    APIConfig
} from "../utils/api.utils";
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import {
    iAnnouncement
} from "../models/announcement.interface";
import Shop from "@/views/Shop.vue";

@Component({
    components: {
        HelloWorld,
        Shop
    }
})
export default class Home extends Vue {
    error: string | boolean = false;
    announcements: iAnnouncement[] = [];

    mounted() {
        this.preview();
    }
    preview() {
        axios
            .get(APIConfig.buildUrl("/announcement"))
            .then((response: AxiosResponse) => {
                this.announcements = response.data;
                this.$emit("success");
                console.log(this.announcements);
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    showShop(id : number) {
        this.$store.state.mCat = id;
        this.$router.push("/shop");
    }
}
</script>

<style lang="scss" scoped>
.image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

h2 {
    font-family: 'Questrial';
    font-size: 28px;
    font-weight: 800;
}

h3 {
    font-family: 'Questrial';
    font-size: 20px;
}

.middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

figure:hover img {
    opacity: 0.3;
}

figure:hover .middle {
    opacity: 1;
}

.hover-text {
    background-color: orange;
    color: white;
    font-size: 20px;
    padding: 12px 26px;
}

.hover-text:hover {
    background-color: rgb(252, 202, 110);
}
</style>
