<template>
  <div class="about">
    <div class="columns">   
      <div class="rightMargin column">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
                <div class="tile is-child">
                    <figure class="image is-3by2">
                        <img alt="Map" src="../assets/beach-cruiser.jpg"
                                style="margin-top:150px">
                    </figure>
                </div>

                <br><br><br><br><br><br>

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
            </div>
        </div>

      </div>
      
      <div class="leftMargin rightColumn column">
      <br><br>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input is-warning" type="text" placeholder="Item Name">
            </div>
        </div>

        <hr width="30%">
        <br>
        <div class="columns">
          <div class="column is-3">
            <div class="field">
                <label class="label">Price</label>
                <div class="control">
                    <input class="input is-warning" type="text" placeholder="Item Price">
                </div>
            </div>
        </div>
          <div class="column">
            <div class="field">
                <label class="label">Quantity Available</label>
                <div class="control">
                    <input class="input is-warning" type="text" placeholder="0" style="width:120px">
                </div>
            </div>
          </div>
        </div>

        <br>
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox">
                    In-Store Pickup Only
                </label>
            </div>  
        </div>

        <br>

        <div class="field">
            <label class="label">Details</label>
            <div class="control">
                <textarea class="textarea is-warning" placeholder="Add Details" style="width:450px"></textarea>
            </div>
        </div>

        <br>

        <div class="columns">
            <div class="column">
                <h1><span>Main Categories</span></h1>
                <div class="control scroll-container">
                    <label class="radio">
                        <input type="radio" name="answer">
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="answer">
                        No
                    </label>
                </div>
            </div>
            <div class="column">
                <h1><span>Sub-Categories</span></h1>
                <div class="control scroll-container">
                    <label class="radio">
                        <input type="radio" name="answer">
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="answer">
                        No
                    </label>
                 </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-top: 90px;
  font-size: 30px;
  font-weight: bold;
}
hr {
   background-color: black; 
   height: 2px; 
   border: 0; 
}
h2 {
  font-size: 22px;
}
.rightMargin {
  margin-right:80px;
}
.leftMargin {
  margin-left:80px;
}
.rightColumn {
  margin-right:180px;
}
.buttonStyle {
  padding-top:5px;
  padding-right:17px;
  padding-bottom:5px;
  padding-left:17px;
  margin-bottom: 4px;
}
.scroll-container {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 10px;
}
div h1{
    text-align: left;
    margin-top: -10px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
}

div h1 span{
    background-color: white;
}
</style>