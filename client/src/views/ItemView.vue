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
        <h1>Beach Cruiser</h1>
        <hr width="30%">
        <br>
        <div class="columns">
          <div class="column is-3">
            <h2>$320.56</h2>
          </div>
          <div class="column">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Qty</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    1
                  </a>
                  <a class="dropdown-item">
                    2
                  </a>
                  <a href="#" class="dropdown-item is-active">
                    3
                  </a>
                  <a href="#" class="dropdown-item">
                    4
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br>
        <div class="buttons has-addons">
          <span class="button buttonStyle">Add To Cart</span>
          <span class="button buttonStyle">Buy Now</span>
        </div>
        <p class="subtitle is-6">In-Store Pickup Only</p>

        <br>
        <article class="message">
          <div class="message-body">
            This is a cool bike
          </div>
        </article>

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
