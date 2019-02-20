<template>
    <section>
        <br> <br> <br>

        <button class="button field is-light is-small" @click="checkedRows = []"
            :disabled="!checkedRows.length">
            <b-icon icon="close"></b-icon>
            <span>Clear checked</span>
        </button>

        <b-tabs>
            <b-tab-item label="Inventory">
                <b-table
                    :data="data"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    :is-row-checkable="(row) => row.id !== 3"
                    checkable>

                    <template slot="bottom-left">
                        <div class="buttons has-addons">
                            <span class="button">Delete Selected</span>
                            <span class="button">Save Changes</span>
                        </div>
                    </template>
                    
                </b-table>
            </b-tab-item>
        </b-tabs>

       

        <br>


    </section>
</template>

<script>
    export default {
        data() {
            const data = [
                { 'inum': 1395, 'item': 'Mountain Bike X', 'price': '$338.21', 'in-stock': 2},
                { 'inum': 3028, 'item': 'Beach Cruiser F90', 'price': '$287.60', 'in-stock': 9},
                { 'inum': 4393, 'item': 'Sport Bike S42', 'price': '$40.00', 'in-stock': 12},
                { 'inum': 2846, 'item': 'Replacement Tire', 'price': '$32.28', 'in-stock': 53},
                { 'inum': 6560, 'item': 'Fox Sport Seat', 'price': '$527.80', 'in-stock': 21}
            ]

            return {
                data,
                checkedRows: [data[1], data[3]],
                columns: [
                    {
                        field: 'inum',
                        label: 'Item Number',
                        width: '80',
                        numeric: true
                    },
                    {
                        field: 'item',
                        label: 'Item',
                    },
                    {
                        field: 'price',
                        label: 'Price',
                    },
                    {
                        field: 'in-stock',
                        label: 'In-Stock',
                        numeric: true
                    }
                ]
            }
        }
    }
</script>