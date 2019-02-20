<template>
  <div class="services">
    <br> 
      
      <div class="tile is-ancestor is-vertical"> 
        <!-- <div class="tile is-veritical"> -->
        <div class="tile"> 
          <div class="tile is-1"> <br> </div>
          <div class="service tile title is-11"> Services </div>
        </div>

        <div class="tile"> <br> </div>

          <!-- 1st services -->
          <div class="tile is-vertical">

            <div class="tile"> 
              <div class="tile is-1"> <br> </div> 
            <div class="tile box is-parent is-vertical">
              <div class="title is-4 tile is-children"> Wheels </div>
    
              <div class="tile is-children">
                <figure class="image is-128x128">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
                <div class="tile is-1"> <br> </div>
                <div class = "tile columns is-10 ">
                  <div class="column  media-content"> 
                    <p class="subtitle">
                      Flat tire repair <br>
                      Replace broken spoke(s) <br>
                      Install new front wheel 
                    </p>
                  </div>
                
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Install new rear wheel <br>
                      Wheel truing (Minor/Major) <br>
                      Wheel retensioning, dishing and truing 
                    </p>
                  </div>
                  
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Custom wheel building <br>
                      Hub bearing overhaul <br>
                      Replace tire(s) 
                    </p>
                  </div>

                  <div class="hours tile box media-content"> 
                    <p>
                      Hours: 10am - 7pm <br>
                      Price: <br>
                       $00.00 - $00.00 <br>
                    </p>
                  </div>
                  <div class="tile is-1"> <br> </div>
                </div>

              </div>
            </div>
            <div class="tile is-1"> <br> </div> 
          </div>

          </div>

          <div class="tile"> <br> </div>
          <!-- 2nd Services  -->
          <div class="tile is-vertical">

            <div class="tile"> 
              <div class="tile is-1"> <br> </div> 
            <div class="tile box is-parent is-vertical">
              <div class="title is-4 tile is-children"> Brakes </div>
    
              <div class="tile is-children">
                <figure class="image is-128x128">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>

                <div class="tile is-1"> <br> </div>
                <div class = "tile columns is-10 ">
                  <div class="column  media-content"> 
                    <p class="subtitle">
                      Flat tire repair <br>
                      Replace broken spoke(s) <br>
                      Install new front wheel 
                    </p>
                  </div>
                
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Install new rear wheel <br>
                      Wheel truing (Minor/Major) <br>
                      Wheel retensioning, dishing and truing 
                    </p>
                  </div>
                  
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Custom wheel building <br>
                      Hub bearing overhaul <br>
                      Replace tire(s) 
                    </p>
                  </div>

                  <div class="hours tile box media-content"> 
                    <p>
                      Hours: 10am - 7pm <br>
                      Price: <br>
                       $00.00 - $00.00 <br>
                    </p>
                  </div>
                  <div class="tile is-1"> <br> </div>
                </div>

              </div>
            </div>
            <div class="tile is-1"> <br> </div> 
          </div>
          
          </div>
          <div class="tile"> <br> </div>
           <!-- 3rd Services  -->
          <div class="tile is-vertical">

            <div class="tile"> 
              <div class="tile is-1"> <br> </div> 
            <div class="tile box is-parent is-vertical">
              <div class="title is-4 tile is-children"> Customization </div>
    
              <div class="tile is-children">
                <figure class="image is-128x128">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
                <!-- <div class="media-left picture is-3"
                    <img src="../assets/tireChange.jpg"  height="200" width="200"> 
                </div>  -->
                <div class="tile is-1"> <br> </div>
                <div class = "tile columns is-10 ">
                  <div class="column  media-content"> 
                    <p class="subtitle">
                      Flat tire repair <br>
                      Replace broken spoke(s) <br>
                      Install new front wheel 
                    </p>
                  </div>
                
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Install new rear wheel <br>
                      Wheel truing (Minor/Major) <br>
                      Wheel retensioning, dishing and truing 
                    </p>
                  </div>
                  
                  <div class="column media-content"> 
                    <p class="subtitle">
                      Custom wheel building <br>
                      Hub bearing overhaul <br>
                      Replace tire(s) 
                    </p>
                  </div>

                  <div class="hours tile box media-content"> 
                    <p>
                      Hours: 10am - 7pm <br>
                      Price: 
                      <br> $00.00 - $00.00 <br>
                    </p>
                  </div>
                  <div class="tile is-1"> <br> </div>
                </div>

              </div>
            </div>
            <div class="tile is-1"> <br> </div> 
          </div>
          
          </div>

            </div>
          </div>

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style lang="scss">

.service {
  color: seagreen;
}

.hours {
  background-color: #ffe7c1;
}

.subtitle {
  font-size: 5erm;
}
/* .column {
  -webkit-column-gap: 3; 
  column-gap: 3;
  background-color: 	#FFA500	;
} */

/* .row:after {
  content: "";
  display: table;
  clear: both;
} */

</style>


