<template>
<!-- Main container -->
<div class="container" style="margin-top: 15px; margin-bottom: 15px;">

    <!-- Announcement Form -->
    <div class="tile is-ancestor">
        <div class="tile is-2"></div>
        <div class="tile is-8 is-vertical is-parent">
            <h2 v-if="!showEdit">Create Announcment</h2>
            <h2 v-if="showEdit">Editing "{{editTitle}}"</h2>
            <div class="tile is-child box">
                <span>Title</span>
                <input v-if="!showEdit" type="text" class="input is-warning is-small" placeholder="Announcment Title" v-model="announcementTitle">
                <input v-if="showEdit" type="text" class="input is-warning is-small" placeholder="Announcment Title" v-model="editTitle">
                </div>
                <div class="tile is-child box">
                    <span>Announcment Body</span>
                    <textarea v-if="!showEdit" class="textarea is-warning is-small" rows="8" placeholder="Type Announcment Here..." v-model="announcementBody"></textarea>
                    <textarea v-if="showEdit" class="textarea is-warning is-small" rows="8" placeholder="Type Announcment Here..." v-model="editBody"></textarea>
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
                        <button v-if="!showEdit" class="button is-success" type="submit" v-on:click="announcement">Submit</button>
                        <button v-if="showEdit" class="button is-success" type="submit" v-on:click="editItem(editIndex)">Submit</button>
                    </div>
                    <div class="control">
                        <button v-if="!showEdit" class="button is-text" type="reset">Cancel</button>
                        <button v-if="showEdit" class="button is-text" v-on:click="cancelEdit()">Cancel</button>
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
                    <span class="button is-small" v-on:click="showEditForm(index)">
              <span class="file-icon">
                <font-awesome-icon icon="edit"/> <!-- using icon -->
              </span>
                    </span>
                    <p>{{ann.title}}</p>
                    <button class="delete" aria-label="delete" v-on:click="deleteItem(ann.id)"></button>
                </div>
                <div class="message-body">
                    {{ann.body}}
                </div>

            </article>
        </div>

        <Edit v-bind:is-showing="showEdit" v-on:success="successEdit()" v-on:cancel="cancelEdit()" />
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
export default class OwnerAnnouncement extends Vue {
    public showEdit: boolean = false;
    error: string | boolean = false;
    announcementTitle: String = "";
    announcementBody: String = "";
    announcements: iAnnouncement[] = [];
    edit: iAnnouncement | undefined;
    editTitle: string = "";
    editBody: string = "";
    editIndex: number = 0;
    editId: number = 0;

    mounted() {
        this.preview();
    }
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
                this.preview();
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

    deleteItem(index: number) {
        axios.delete(APIConfig.buildUrl("/announcement/" + index), {
                headers: {
                    token: this.$store.state.userToken
                }
            })
            .then(() => {
                this.preview();
            })
    }

    editItem(index: number) {
        this.edit = this.announcements[index];
        if (this.editTitle || this.editBody) {
            this.edit.title = this.editTitle;
            this.edit.body = this.editBody;
            axios.put(APIConfig.buildUrl("/announcement/" + this.edit.id), {
                    ...this.edit
                })
                .then(() => {
                    this.preview();
                    this.successEdit();
                })
        }
    }

    get picture(): boolean {
        return false;
    }

    showEditForm(index: number) {
        this.editTitle = this.announcements[index].title;
        this.editBody = this.announcements[index].body;
        this.editIndex = index;
        this.showEdit = true;
    }
    successEdit() {
        this.showEdit = false;
        this.preview();
    }
    cancelEdit() {
        this.showEdit = false;
        this.preview();
    }
}
</script>  

<style lang="scss" scoped>
h2 {
    font-family: 'Questrial';
    font-size: 28px;
}
</style>
