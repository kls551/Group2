<template>
  <div class="about">
    <div class="columns">
      
      <div class="rightMargin column">
        <figure class="image is-3by2">
            <img alt="Map" src="../assets/beach-cruiser.jpg"
                    style="margin-top:150px">
          </figure>
      </div>
      
      <div class="leftMargin column">
      <br>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Item Name">
            </div>
        </div>

        <hr width="30%">
        <br>
        <div class="columns">
          <div class="column is-3">
            <div class="field">
            <label class="label">Price</label>
            <div class="control">
                <input class="input" type="text" placeholder="Item Price">
            </div>
        </div>
        </div>
          <div class="column">
            <div class="field">
            <label class="label">Quantity Available</label>
            <div class="control">
                <input class="input" type="text" placeholder="0">
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
                    <textarea class="textarea" placeholder="Add Details"></textarea>
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
.buttonStyle {
  padding-top:5px;
  padding-right:17px;
  padding-bottom:5px;
  padding-left:17px;
  margin-bottom: 4px;
}
article{
  height:300px;
  width:400px;
}
</style>