<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-card-title>
            Gérer
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>

        <template>
            <v-data-table
                    :headers="headerss"
                    :items="list"
                    sort-by="libelle"
                    class="elevation-1"
                    disable-pagination
                    :hide-default-footer="true"
                    :search = "search"
                    loading = "load"
                    loading-text="Loading... "
            >
                <template slot="no-data">
                    <v-alert :value="true" color="warning" icon="warning">
                        Empty: nothing to display
                    </v-alert>
                </template>

                <template v-slot:top>
                    <v-toolbar
                            flat
                    >
                        <v-spacer></v-spacer>

                        <template v-slot:activator="{ on, attrs }">
                            <b-button
                                    v-if="addButtonn"
                                    color="primary"
                                    v-bind="attrs"
                                    @click="onee"
                                    class="m-1"
                                    variant="primary"
                            >Add</b-button>
                        </template>


                        <v-dialog v-model="dialogDeletee" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Voulez vous vraiment supprimer?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete"> {{ $t("Annuler") }} </v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">

                    <v-icon
                            v-if="editButtonn"
                            small
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            v-if="openButtonn"
                            small
                            @click="openItem(item)"
                    >
                        mdi-eye
                    </v-icon>
                    <v-icon
                            v-if="deleteButtonn"
                            small
                            @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <div class="col-md-12" style="overflow:auto" >
                <div class="mb-3" >
                    Items per Page:
                    <select  v-model="pageSize" @change="handlePageSizeChange($event)">
                        <option v-for="size in pageSizes" :key="size" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>


                <b-pagination
                        v-model="page"
                        :total-rows="count"
                        :per-page="pageSize"
                        prev-text="Prev"
                        next-text="Next"
                        @change="handlePageChange"
                ></b-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "datatablelist",
        props:{
            headers: Array,
            desserts: String,
            editButton: Boolean,
            addButton: Boolean,
            openButton: Boolean,
            deleteButton: Boolean,
            dialogDelete: Boolean
        },
        data(){
                return {
                    pageSizes: [3, 6, 9],
                    headerss: this.headers,
                    url: this.desserts,
                    search: '',
                    list:[],
                    addButtonn: this.addButton,
                    dialogDeletee: this.dialogDelete,
                    editButtonn: this.editButton,
                    openButtonn: this.openButton,
                    deleteButtonn: this.deleteButton,
                    page: 1,
                    count: 0,
                    pageSize: 10,

                }
        },
        created(){
            console.log('before create datable list '+ this.url);
            axios.get(this.url)
                .then(users => {
                    this.list = users.data.data;
                    console.log('list agent', this.listagent)
                })
                .catch(function(error) {
                    console.log('organisations_error',error);
                });
            console.log('list global vue',this.list )
        },

        methods:{
            handlePageChange(value) {
                this.$emit('handlePageChange')

            },
            handlePageSizeChange(event) {
                this.$emit('handlePageSizeChange')

            },
            closeDelete () {
                this.dialogDeletee = false;
            },
            deleteItemConfirm(){
                this.$emit('deleteItemConfirm')
            },
            editItem(item){
                this.$emit('editItem', item)
            },
            deleteItem(item){
                this.$emit('deleteItem', item)
            },
            openItem(item){
                this.$emit('openItem', item)
            },
            initialize(){
                const params = this.getRequestParams(
                    this.searchTitle,
                    this.page,
                    this.pageSize
                );


            }

        },

    }

</script>

<style scoped>

</style>