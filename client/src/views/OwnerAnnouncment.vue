<template>
    <!-- Main container -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px;">

        <!-- Announcement Form -->
        <div class="tile is-ancestor">
            <div class="tile is-3"></div>
            <div class="tile is-6 is-vertical is-parent">
                <h2>Create Announcment</h2>
                <div class="tile is-child box">
                    <span>Title</span>
                    <input type="text" class="input is-warning is-small" placeholder="Announcment Title">
                </div>
                <div class="tile is-child box">
                    <span>Announcment Body</span>
                    <textarea class="textarea is-warning is-small" rows="8" placeholder="Type Announcment Here..."></textarea>
                </div>
                <div class="tile is-child box">
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
                        <button class="button is-link">Preview</button>
                    </div>
                    <div class="control">
                        <button class="button is-success" type="submit">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text" type="reset">Cancel</button>
                    </div>
                </div>

            </div>
            <div class="tile is-3"></div>
        </div>
        
        
        <!-- Preview Announcment -->
        <div class="tile is-ancestor" style="margin-top: 15px">
            <div class="tile is-1"></div>
            <div class="tile is-10 box">
                <!-- Add content or other tiles -->
                <p class="title">Preview Announcement Here</p>
            </div>
            <div class="tile is-1"></div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

</style>
