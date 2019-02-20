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
                <h2 style="padding-bottom: 15px">Manage Sub Categories</h2>
                <div class="tile is-child box">

                    <!-- Main category drop down -->
                    <h3 style="padding-bottom: 10px">Select Main Category</h3>
                        <div class="dropdown is-hoverable" style="margin-bottom: 15px;">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span style="color: grey">Ex: Bikes</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item">
                                        Bikes
                                    </a>
                                    <a class="dropdown-item">
                                        Accessories
                                    </a>
                                    <a href="#" class="dropdown-item is-active">
                                        Clothing
                                    </a>
                                </div>
                            </div>
                        </div>

                    <!-- sub category input box -->
                    <h3 style="padding-bottom: 10px;">New Sub Category</h3>
                    <input type="text" class="input is-warning is-medium" placeholder="Category Name">
                    <div class="level-right">
                        <button class="button is-success" type="submit" style="margin-top: 15px;">Add</button>
                    </div>
                </div>

                <!-- Table -->
                <div class="tile is-child box">
                    <h2><b>Main Category :</b> Bikes </h2>
                    <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Sub Categories</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Mountain</th>
                            <!-- <td><font-awesome-icon="edit" /></td> -->
                            <td>edit icon</td>
                            <td>delete icon</td>
                        </tr>
                        <tr>
                            <th>Racing</th>
                            <td>edit icon</td>
                            <td>delete icon</td>
                        </tr>
                        <tr>
                            <th>Cruisers</th>
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



</style>
