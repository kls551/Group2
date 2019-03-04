<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">

    <!-- Announcement Form -->
    <div class="tile is-ancestor">
        <div class="tile is-2"></div>
        <div class="tile is-8 is-vertical is-parent">
            <h2>Update About</h2>
            <div class="tile is-child">
                <span>Address</span>
                <input type="text" class="input is-warning is-small" placeholder="Address" v-model="editAddress">
                </div>
                <div class="tile is-child">
                    <span>Email</span>
                    <input type="text" class="input is-warning is-small" placeholder="Email" v-model="editEmail">
                </div>
                <div class="tile is-child">
                    <span>Phone</span>
                    <input type="text" class="input is-warning is-small" placeholder="Phone" v-model="editPhone">
                </div>
                <div class="tile is-child">
                    <span>Monday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editMonday">
                </div>                                
                <div class="tile is-child">
                    <span>Tuesday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editTuesday">
                </div>
                <div class="tile is-child">
                    <span>Wednesday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editWednesday">
                </div>
                <div class="tile is-child">
                    <span>Thursday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editThursday">
                </div>
                <div class="tile is-child">
                    <span>Friday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editFriday">
                </div>
                <div class="tile is-child">
                    <span>Saturday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editSaturday">
                </div>
                <div class="tile is-child">
                    <span>Sunday</span>
                    <input type="text" class="input is-warning is-small" placeholder="Hours" v-model="editSunday">
                </div>
              
      <form enctype="multipart/form-data" novalidate>
        <div class="aboutMap">
          <img :src="profileUrl"/>
        </div>
        <div class="file">
          <label class="file-label">
            <input
              type="file"
              name="aboutMap"
              :disabled="isSaving"
              v-on:change="filesChanged"
              accept="image/*"
              class="input-file file-input"
            >
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon icon="upload"/>
              </span>
              <span class="file-label">
                Choose a map
              </span>
            </span>
          </label>
          <p v-if="isSaving">Uploading file...</p>
        </div>
      </form>   

                      <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-success" type="submit" v-on:click="editItem">Submit</button>
                    </div>
                    <div class="control">
                        <button v-if="!showEdit" class="button is-text" type="reset">Cancel</button>
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
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import {
    iAbout
} from "../models/about.interface";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;
@Component
export default class OwnerAbout extends Vue {
    public showEdit: boolean = false;
    error: string | boolean = false;
    about: iAbout | undefined;
    edit: iAbout | undefined;
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
    currentStatus: number | null = null;
  fileCount: number = 0;
  uploadError: string | null = null;
    editIndex: number = 0;
    editId: number = 0;
  upload(formData: FormData) {
    if (this.about) {
      const url = `${APIConfig.url}/about`;
      return axios
        .post(url, formData)
        .then((res: AxiosResponse) => {
          this.$emit("success");
        });
    }
    return Promise.reject({ response: "no user logged in" });
  }

  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = STATUS_SAVING;
    this.upload(formData)
      .then(() => {
        this.currentStatus = STATUS_SUCCESS;
        this.preview();
      })
      .catch(err => {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      });
  }

  filesChanged(event: any) {
    const name = event.target.name;
    const files = event.target.files;
    this.fileCount = event.target.files.length;
    // handle file changes
    const formData = new FormData();

    if (!files.length) return;

    // append the files to FormData
    Array.from(Array(files.length).keys()).map(x => {
      formData.append(name, files[x], files[x].name);
    });

    // save it
    this.save(formData);
  }

  reset() {
    // reset form to initial state
    this.currentStatus = STATUS_INITIAL;
    this.uploadError = null;
  }

  //computed
  get isInitial() {
    return this.currentStatus === STATUS_INITIAL;
  }

  get isSaving() {
    return this.currentStatus === STATUS_SAVING;
  }

  get isSuccess() {
    return this.currentStatus === STATUS_SUCCESS;
  }

  get isFailed() {
    return this.currentStatus === STATUS_FAILED;
  }
  get profileUrl(): string {
    if (this.about) {
      return APIConfig.buildUrl(`/profilePhotos/5f50f3d590761181d337b40c5cc54283`);
    }
    return "";
  }

    mounted() {
        this.preview();
        this.reset();
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
                this.$emit("success");

                if(this.about) {
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

    editItem() {
        this.edit = this.about;
        if(this.edit) {
        if (this.editAddress) this.edit.address = this.editAddress;
        if (this.editPhone) this.edit.phone = this.editPhone;
        if (this.editEmail) this.edit.email = this.editEmail;
        if (this.editMonday) this.edit.monday = this.editMonday;
        if (this.editTuesday) this.edit.tuesday = this.editTuesday;
        if (this.editWednesday) this.edit.wednesday = this.editWednesday;
        if (this.editThursday) this.edit.thursday = this.editThursday;
        if (this.editFriday) this.edit.friday = this.editFriday;
        if (this.editSaturday) this.edit.saturday = this.editSaturday;
        if (this.editSunday) this.edit.sunday = this.editSunday;
        }
            

            axios.put(APIConfig.buildUrl("/about"), {
                    ...this.edit
                })
                .then(() => {
                    this.preview();
                })
    }

    get picture(): boolean {
        return false;
    }
}
</script>

<style lang="scss" scoped>
h2 {
    font-family: 'Questrial';
    font-size: 28px;
}
</style>