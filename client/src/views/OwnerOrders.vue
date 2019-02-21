<template>
    <section>
        <br> <br> <br>

        <button class="button field is-light is-small" @click="checkedRows = []"
            :disabled="!checkedRows.length">
            <b-icon icon="close"></b-icon>
            <span>Clear checked</span>
        </button>

        <b-tabs>
            <b-tab-item label="Orders">
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
                { 'onum': 1395, 'cust': 'Jesse Simmons', email: 'jsims@gmail.com', 'items': 'Replacement Tire, Mountain Bike X', 'total': '$370.49' , 'date': '2016-10-15'},
                { 'onum': 3028, 'cust': 'John Gilbert', email: 'gilbert@gmail.com', 'items': 'Air Pump', 'total': '$17.26' , 'date': '2016-12-15'},
                { 'onum': 4393, 'cust': 'Tina Jacobs', email: 'tintin@aol.com', 'items': 'Beach Cruiser F90', 'total': '$287.60', 'date': '2016-04-26'},
                { 'onum': 2846, 'cust': 'Clarence Lee', email: 'clarelee@yahoo.com', 'items': 'Break Cord, Sprocket', 'total': '$31.42', 'date': '2016-04-10'},
                { 'onum': 6560, 'cust': 'Anne Flores', email: 'anneflor70@gmail.com', 'items': 'Sport Bike S42, Fox Sport Seat', 'total': '$567.80', 'date': '2016-12-06'}
            ]

            return {
                data,
                checkedRows: [data[1], data[3]],
                columns: [
                    {
                        field: 'onum',
                        label: 'Order Number',
                        width: '80',
                        numeric: true
                    },
                    {
                        field: 'cust',
                        label: 'Customer',
                    },
                    {
                        field: 'email',
                        label: 'Email',
                    },
                    {
                        field: 'items',
                        label: 'Items',
                    },
                    {
                        field: 'total',
                        label: 'Total',
                        centered: true
                    },
                    {
                        field: 'date',
                        label: 'Date',
                    },
                    {
                        field: 'status',
                        label: 'Status',
                    }
                ]
            }
        }
    }
</script>