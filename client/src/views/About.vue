<template>
  <div class="about">
    <div class="columns">
      <div class="rightMargin column is-two-fifths" 
      >
        <h1>Address</h1>
        <h2>{{editAddress}}</h2>

        <h1>Hours</h1>
        <h2>Monday:    {{editMonday}}</h2>
        <h2>Tuesday:   {{editTuesday}}</h2>
        <h2>Wednesday: {{editWednesday}}</h2>
        <h2>Thurssday: {{editThursday}}</h2>
        <h2>Friday:    {{editFriday}}</h2>
        <h2>Saturday:  {{editSaturday}}</h2>
        <h2>Sunday:    {{editSunday}}</h2>

        <h1>Contact Info</h1>
        <h2>Email:   {{editEmail}}</h2>
        <h2>Phone:   {{editPhone}}</h2>
      </div>
      
      <div class="column is-three-fifths">
      <br> <br>
        <figure class="image is-1by1">
          <img alt="Map" src="../assets/Fox_map.jpeg" 
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

    editAddress: string = "";
    editEmail: string = "";
    editPhone: string = "";
    editMonday: string = "";
    editTuesday: string = "";
    editWednesday: string = "";
    editThursday: string = "";
    editFriday: string = "";
    editSaturday: string = "";
    editSunday: string = "";
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
                this.editAddress = this.about.address;
                this.editEmail = this.about.email;
                this.editPhone = this.about.phone;
                this.editMonday = this.about.monday;
                this.editTuesday = this.about.tuesday;
                this.editWednesday = this.about.wednesday;
                this.editThursday = this.about.thursday;
                this.editFriday = this.about.friday;
                this.editSaturday = this.about.saturday;
                this.editSunday = this.about.sunday;
                }
                
            })
            .catch((res: AxiosError) => {
                this.error = res.response && res.response.data.error;
            });
    }

    // deleteItem(index: number) {
    //     axios.delete(APIConfig.buildUrl("/announcement/" + index), {
    //             headers: {
    //                 token: this.$store.state.userToken
    //             }
    //         })
    //         .then(() => {
    //             this.preview();
    //         })
    // }

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