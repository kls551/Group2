<template>
    <div class="tile is-ancestor is-vertical">
        <div class="tile is-parent">
            <!-- item image -->
            <div class="tile is-child is-4"> 
                <img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiAwsKlrOfgAhXTvp4KHeZJBNIQjRx6BAgBEAU&url=https%3A%2F%2Fwww.bicyclesportshop.com%2Frent-a-bike&psig=AOvVaw2U9bch6_T5_EckSf71fiam&ust=1551749703285637" >
            </div>

            <!-- item info -->
            <div class="tile is-child is-8"> 
                Item Name: Sport Bike </br>
                Quantity: 2  </br>
                Price: 2000 </br>
                Shipping option: pick-up only
            </div>
        </div>
    </div>  
</template>


<script lang="ts">
import Vue from 'vue';
export default class OrderConfirmation extends Vue{
     public display : boolean = true;
}

</script>

