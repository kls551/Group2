<template>

    <div class="container" style="margin-top: 5%; margin-bottom: 15px;">
        <div class="tile is-ancestor">
            <div class="tile is-2 is-parent">
                <div class="tile is-child"></div>
            </div>

            <!-- Order number box and submit button -->
            <div class="tile is-8 is-parent is-vertical">
                <h2 style="margin-bottom: 15px">Track My Order</h2>
                <div class="tile is-child box">
                    <input type="text" class="input is-warning is-large" placeholder="Tracking Number">
                    <button class="button is-success is-normal is-fullwidth" type="submit" style="margin-top: 15px">Submit</button>
                </div>

                <!-- order information to appear when order retrieved from databse -->
                <h2 style="margin-bottom: 15px; margin-top: 15px; padding-top: 20px; border-top: 1px solid orange;">Order Information</h2>
                <div class="tile is-child box">
                    <h3>Ordered on: </h3>
                    <h3>Shipped on: </h3>
                    <h3>Current Location: </h3>
                    <h3>Expected Delivery: </h3>
                    <h3>Shipping to: </h3>
                </div>
            </div>

            <div class="tile is-2 is-parent">
                <div class="tile is-child"></div>
            </div>

        </div>
    </div>
    
</template>

<style scoped lang="scss">

h2 {
    font-size: 32px;
    font-family: 'Questrial';
}

h3 {
    font-size: 20px;
    font-family: 'Questrial';
    color: black;
    padding: 5px;
}

</style>
