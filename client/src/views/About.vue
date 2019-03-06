<template>
  <div class="about">
    <div class="columns">
      <div class="rightMargin column is-two-fifths" v-if="loaded">
        <h1>Address</h1>
        <h2>{{about.address}}</h2>

        <h1>Hours</h1>
        <h2>Monday:    {{about.monday}}</h2>
        <h2>Tuesday:   {{about.tuesday}}</h2>
        <h2>Wednesday: {{about.wednesday}}</h2>
        <h2>Thurssday: {{about.thursday}}</h2>
        <h2>Friday:    {{about.friday}}</h2>
        <h2>Saturday:  {{about.saturday}}</h2>
        <h2>Sunday:    {{about.sunday}}</h2>

        <h1>Contact Info</h1>
        <h2>Email:   {{about.email}}</h2>
        <h2>Phone:   {{about.phone}}</h2>
      </div>
      
      <div class="column is-three-fifths">
      <br> <br>
        <figure class="image is-1by1">
          <img alt="Map" :src="about.profileUrl" 
                style="margin-left:30px">
        </figure>
        <br>
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
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import {
    iAbout
} from "../models/about.interface";

@Component
export default class About extends Vue {
    error: string | boolean = false;
    about: iAbout | undefined;
    loaded: boolean = false;

  uploadedFile: any = null;
    currentStatddus: number | null = null;
  fileCount: number = 0;
  uploadError: string | null = null;
    editIndex: number = 0;
    editId: number = 0;

    mounted() {
        this.preview();
    }
    // announcement() {
    //     if (this.announcementTitle == "" || this.announcementBody == "") {
    //         return;
    //     }
    //     axios
    //         .post(APIConfig.buildUrl("/announcement"), {
    //             title: this.announcementTitle,
    //             body: this.announcementBody
    //         })
    //         .then((response: AxiosResponse) => {
    //             this.$emit("success");
    //             this.announcementTitle = "";
    //             this.announcementBody = "";
    //             this.preview();
    //         })
    //         .catch((errorResponse: any) => {
    //             this.error = errorResponse.response.data.reason;
    //         });
    // }

    preview() {
        axios
            .get(APIConfig.buildUrl("/about"))
            .then((response: AxiosResponse) => {
                this.about = response.data;
                if(this.about)
                {
                this.$emit("success");
                this.about.profileUrl = APIConfig.buildUrl(`/${response.data.profileUrl}`);
                this.loaded = true;
                }
                
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }
    get picture(): boolean {
        return false;
    }
}
</script>


<style scoped lang="scss">
h1 {
  margin-top: 80px;
  font-size: 30px;
  font-weight: bold;
}
h2 {
  font-size: 18px;
}
.rightMargin {
 border-right: solid #000000;
}
</style>