<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">

    <!-- Announcement Form -->
    <div class="tile is-ancestor">
        <div class="tile is-2"></div>
        <div class="tile is-8 is-vertical is-parent">
            <h2>Create Announcment</h2>
            <div class="tile is-child box">
                <span>Title</span>
                <input type="text" class="input is-warning is-small" placeholder="Announcment Title" v-model="announcementTitle">
                </div>
                <div class="tile is-child box">
                    <span>Announcment Body</span>
                    <textarea class="textarea is-warning is-small" rows="8" placeholder="Type Announcment Here..." v-model="announcementBody"></textarea>
                </div>
                <div class="tile is-child box" v-if="picture">
                    <div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose an Image…
                            </span>
                            </span>
                            <span class="file-name">
                            Screen Shot 2017-07-29 at 15.54.25.png
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Submit, Preview, cancel buttons -->
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" v-on:click="preview()">Preview</button>
                    </div>
                    <div class="control">
                        <button class="button is-success" type="submit" v-on:click="announcement">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text" type="reset">Cancel</button>
                    </div>
                </div>

            </div>
            <div class="tile is-3"></div>
        </div>

        <!-- Preview Announcment -->
        <div class="box">
            <h2> Preview Announcements </h2>
        <article class="message is-warning" v-for="(ann, index) in announcements" v-bind:key="index">
            <div class="message-header">
                <p>{{ann.title}}</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{ann.body}}
            </div>
        </article>
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
    iAnnouncement
} from "../models/announcement.interface";

@Component
export default class EditAnnouncements extends Vue {
    error: string | boolean = false;
    announcementTitle: String = "";
    announcementBody: String = "";
    announcements: iAnnouncement[] = [];

    announcement() {
        if (this.announcementTitle == "" || this.announcementBody == "") {
            return;
        }
        axios
            .post(APIConfig.buildUrl("/announcement"), {
                title: this.announcementTitle,
                body: this.announcementBody
            })
            .then((response: AxiosResponse) => {
                this.$emit("success");
                this.announcementTitle = "";
                this.announcementBody = "";
            })
            .catch((errorResponse: any) => {
                this.error = errorResponse.response.data.reason;
            });
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
