<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="main-content">
        <b-button variant="danger m-1" @click="previous">
            Retour
        </b-button>
        <breadcumb :page="modelRead.nom" :folder="'Options'" />

        <b-row>
            <b-col md="11 mb-30">
                <b-card class="card mb-30"
                        header=""
                        header-bg-variant="transparent">
                    <b-tabs pills>
                        <b-tab title="List">
                            <template slot="title">
                                <i class="i-Newspaper text-15"></i>
                            </template>
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
                                        :headers="headers"
                                        :items="desserts"
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

                                            <v-dialog v-model="dialogDelete" max-width="500px">
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
                                                small
                                                class="mr-2"
                                                @click="editItem(item)"
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                                small
                                                @click="deleteItem(item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-btn
                                                color="primary"
                                                @click="
                                                "
                                        >
                                            Reset
                                        </v-btn>
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
                        </b-tab>
                        <b-tab title="Kanban">
                            <template slot="title">
                                <i class="i-Split-Four-Square-Window text-15"></i>
                            </template>
                            <ListKanban :rows_kanban="list_kanban" ></ListKanban>
                        </b-tab>

                        <b-tab title="Graph" >
                            <template slot="title">
                                <i class="i-Bar-Chart text-15"> </i>
                            </template>
                            <ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_hist" :abcis="abcis"></ListGraph>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <!-- form-inputs-rounded -->
        </b-row>
    </div>

</template>

<script>
    import organisationReadFields from './organisationReadField';
    import Organisationforms from './organisationforms'
    import ListKanban from '../components/list-kanban';
    import ListGraph from '../components/list-graph';
    import schemaVue from './organisationReadField';
    import axios from 'axios';
    import organisationListHeader from './organisationListHeader';
    import organisationAddFields from './organisationAddFields';
    import organisation from './organisationModel';
    import assurancejson from '../../../entities/assurance';
    import VueFormGenerator from 'vue-form-generator';
    import ListdataTable from "../listdataTable";
    import constants from "../../../plugins/constants"

    export default {
        name: "organisationRead",
        props:{
            modelRead: Object,
        },
        data() {
            return {
                modelRead:this.modelRead,
                schemaRead: organisationReadFields,
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
                percent_visit:'Organisation',
                list_camembert:[],
                list_hist:[],
                list_kanban:[],
                abcis:[],
                load:true,
                schemaVue : schemaVue,
                search: '',
                currentTutorial: null,
                currentIndex: -1,
                searchTitle: "",

                page: 1,
                count: 0,
                pageSize: 10,

                pageSizes: [3, 6, 9],

                dialog: false,
                dialog2: false,
                dialogDelete: false,
                headers: organisationListHeader,
                model: assurancejson,
                modelEdit: organisation,
                schema : organisationAddFields ,
                schemaEdit : organisationAddFields,
                desserts: [],
                organisations: [],
                editedIndex: -1,
                editedItem: assurancejson,
                defaultItem: assurancejson
            }

        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nouveau' : 'Modifier'
            },
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        created () {
            this.initialize();
            this.FetchVueKanban('visit')
            this.FetchVueGraph('visite')
        },
        methods: {
            previous(){
                this.$router.go(-1);
            },
            handlePageChange(value) {
                this.page = value;
                this.initialize();
            },

            handlePageSizeChange(event) {
                this.pageSize = event.target.value;
                this.page = 1;
                this.initialize();
            },

            getRequestParams(searchTitle, page, pageSize) {

                let params = {};

                if (searchTitle) {
                    params["title"] = searchTitle;
                }

                if (page) {
                    params["page"] = page - 1;
                }

                if (pageSize) {
                    params["size"] = pageSize;
                }

                return params;
            },
            onee(){
                //console.log('products_error','rttor');
                this.$router.push({name: 'addorganisation'})
            },

            FetchVueKanban(){

                axios.get(constants.back_end_url+'organisations/kanban')
                    .then(list => {
                        if(list.data.success){
                            this.list_kanban = list.data.data;
                            //commit("SETVUEKANBAN",list.data.data)
                        }

                    })
                    .catch(function(error) {
                        console.log('products_error',error);
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // console.log(error);

                        //commit("setError", error);

                    });
            },
            FetchVueGraph(){

                axios.get(constants.back_end_url+'organisations/graphview')
                    .then(list => {

                        if(list.data.success){
                            this.list_hist = list.data.histogramme
                            this.list_camembert = list.data.data
                        }

                    })
                    .catch(function(error) {
                        console.log('products_error',error);
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // console.log(error);

                        //commit("setError", error);

                    });
            },

            initialize () {

                const params = this.getRequestParams(
                    this.searchTitle,
                    this.page,
                    this.pageSize
                );
                axios.get(constants.back_end_url + 'organisations/parents')
                    .then(org => {
                        this.abcis = org.data.data;
                        console.log('abcis', this.abcis )
                    })
                    .catch(function(error) {
                        console.log('organisations_error',error);
                    });

                axios.get(constants.back_end_url + 'organisations/children/'+ this.modelRead.id,
                    {
                        params: params
                    })
                    .then(org => {

                        console.log('organisations',org.data);
                        this.load= false;
                        this.desserts = org.data.data.content;
                        console.log('dessertes',org.data.data.content);
                        this.count = org.data.data.page.totalElements

                    })
                    .catch(function(error) {
                        console.log('organisations_error',error);
                    });

            },

            findOrganisation(fields){
                return fields.model === 'parentOrganisation';
            },


            deleteItem (item) {

                this.model = Object.assign({}, item)
                this.dialogDelete = true
            },
            editItem (item) {

                this.modelEdit = Object.assign({}, item);
                ;

                this.$router.push({name: 'editorganisation', params:{ modelEdit:item } })

            },
            openItem (item) {

                this.$router.push({name: 'readorganisation', params:{ modelRead:item }})
                console.log('readitem---',item);
            },

            deleteItemConfirm ()
            {
                axios.delete(constants.back_end_url +'organisations/'+this.model.id)

                    .then(org => {

                        console.log('variant',org.data.data)
                        if(org.data.success) {
                            this.desserts.splice(this.editedIndex, 1)
                        }
                        this.initialize();
                    })
                    .catch(function(error) {


                        console.log('customer_create_error',error);
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // console.log(error);
                        //commit("setError", error);
                        // ...

                    });

                this.closeDelete()
            },

            close () {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
            },

            closeDelete () {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
            },
            save () {

                //console.log('item',this.modelEdit)
                let editvalue = this.modelEdit

                if (this.editedIndex > -1) {
                    const instance = axios.post(constants.back_end_url  + 'assurances',
                        {
                            editvalue
                            /*categorieProduitId: this.model.categorieProduitId,
                            libelle: this.model.libelle,
                            description: this.model.description,
                            organisation :this.model.organisation*/
                        }
                    )

                        .then(response => {
                            this.model.organisation = response.data
                            console.log('model', this.model)
                            Object.assign(this.desserts[this.editedIndex], this.model)
                            this.$swal("Lexique engistré avec succès");
                        })
                        .catch(error => {

                            this.$swal({
                                type: "Erreur",
                                title: "Oops...",
                                text: "Une erreur est survenu!",
                                footer: "<a href>Vérifier la cohérence des données</a>"
                            });
                        });


                } else {
                    //ajouter
                    const instance = axios.post(constants.back_end_url  + 'assurances',
                        {
                            editvalue
                            /*categorieProduitId: this.model.categorieProduitId,
                            libelle: this.model.libelle,
                            description: this.model.description,
                            organisation :this.model.organisation*/
                        }
                    )
                        .then(response => {

                            this.model.organisation = response.data.data.organisation;
                            this.desserts.push(this.model)
                            this.$swal("Lexique engistré avec succès");
                        })
                        .catch(error => {

                            this.$swal({
                                type: "Erreur",
                                title: "Oops...",
                                text: "Une erreur est survenu!!!!",
                                footer: "<a href>Vérifier la cohérence des données</a>"
                            });
                        });

                }
                this.close()
            },
        },
        mounted(){
            console.log('model read...', this.modelRead);
        },

        components: {
            Organisationforms,ListdataTable,ListKanban,ListGraph,
            "vue-form-generator": VueFormGenerator.component
        }
    }
</script>

<style scoped>

</style>