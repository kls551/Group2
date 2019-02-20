<template>

    <div class="container" style="margin-top: 25px; margin-bottom: 25px;">
        
        <div class="tile is-ancestor">

            <!-- Side bar menu -->
            <div class="tile is-2" style="margin-top: 15px; margin-right: 25px">
                <div class="tile is-child box">
                    <aside class="menu">
                        <p class="menu-label" style="color: orange">Menu</p>
                        <ul class="menu-list">
                            <li><router-link to="/owner/manage-main-categories">Main Categories</router-link></li>
                            <li><router-link  to=/owner/manage-sub-categories>Sub-Categories</router-link ></li>
                            <li><a>Brands</a></li>
                        </ul>
                    </aside>
                </div>
            </div>

            <div class="tile is-8 is-vertical is-parent">
                <!-- Input box -->
                <h2 style="padding-bottom: 15px">Manage Categories</h2>
                <div class="tile is-child box">
                    <h3 style="padding-bottom: 10px;">New Main Category</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name">
                    <div class="level-right">
                        <button class="button is-success" type="submit" style="margin-top: 15px;">Add</button>
                    </div>
                </div>

                <!-- Table -->
                <div class="tile is-child box">
                    <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Categories</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Bikes</th>
                            <!-- <td><font-awesome-icon="edit" /></td> -->
                            <td>edit icon</td>
                            <td>delete icon</td>
                        </tr>
                        <tr>
                            <th>Accesories</th>
                            <td>edit icon</td>
                            <td>delete icon</td>
                        </tr>
                        <tr>
                            <th>Clothing</th>
                            <td>edit icon</td>
                            <td>delete icon</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tile is-2"></div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">

thead {
    background-color: orange;
}

tr {
    padding: 15px;
}

h2 {
    font-family: 'Questrial';
    font-size: 28px;
}

h3 {
    font-family: 'Questrial';
    font-size: 16px;
}

router-link:active {
    background-color: orange;
}

</style>
