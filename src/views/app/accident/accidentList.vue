<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main-content">

        <breadcumb :page="'Accident'" :folder="'Options'" />

        <b-row>
            <b-col md="11 mb-30">
                <b-card class="card mb-30"
                        header=""
                        header-bg-variant="transparent">
                    <b-tabs pills>
                        <b-tab title="List">
                            <template slot="title" >
                                <i class="i-Newspaper text-15"></i>
                            </template>
                            <v-card-title>
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
                                        :loading = "load"
                                        loading-text="Loading... "
                                >
                                  <template v-slot:item.id="{ item }">
                                    <v-chip>
                                      {{desserts.map(function(x) {return x.id; }).indexOf(item.id) + 1}}
                                    </v-chip>
                                  </template>
                                  <template v-slot:no-data>
                                    <v-alert :value="true" color="error" icon="warning">
                                      Something wrong happen
                                    </v-alert>
                                  </template>
                                  <template slot="no-data">
                                      <v-alert :value="true" color="warning" icon="warning">
                                          Empty: nothing to display
                                      </v-alert>
                                  </template>
                                  <template v-slot:item.date_debut="{ item }">
                                      <span>{{ new Date(item.date_debut).toLocaleString('fr-FR',{ year: 'numeric', month: '2-digit', day: '2-digit' }) }}</span>
                                  </template>
                                    <template v-slot:top>
                                        <v-toolbar flat>
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
                                        <v-icon v-if="item.inCare > 0"
                                                small
                                                @click="openItem(item)"
                                        >
                                          mdi-hospital-building
                                        </v-icon>
                                        <v-icon v-if="item.status == 'ACCEPTED'"
                                                small
                                                @click="openItem(item)"
                                        >
                                          mdi-police-badge
                                        </v-icon>
                                    </template>


                                    <template v-slot:no-data>
                                        <v-btn
                                                color="info"
                                                @click="initialize"
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
                            <ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_camembert" :abcis="list_camembert.map(function(a) {return a.name;})"></ListGraph>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <!-- form-inputs-rounded -->
        </b-row>
    </div>
</template>
<script>
    import ListKanban from '../components/list-kanban';
    import ListGraph from '../components/list-graph';
    import axios from 'axios';
    import assuranceListHeader from './assuranceListHeader';
    import assurancejson from '../../../entities/assurance';
    import VueFormGenerator from 'vue-form-generator';
    import ListdataTable from "../listdataTable";
    import store from "../../../store";
    import constants from "../../../plugins/constants"
    export default {
        data() {
            return{
                percent_visit:'Pourcentage par visite',
                list_camembert:[],
                list_hist:[],
                list_kanban:[],
                load:true,
                search: '',
                currentTutorial: null,
                currentIndex: -1,
                searchTitle:  localStorage.getItem('insurance'),
                id: localStorage.getItem('id'),
                page: 1,
                count: 0,
                pageSize: 10,
                pageSizes: [3, 6, 9],
                dialog: false,
                dialog2: false,
                dialogDelete: false,
                headers: assuranceListHeader,
                model: assurancejson,
                modelEdit: assurancejson,
                schemaEdit : {
                    "fields":[
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "police d'assurance",
                            "model": "police",
                            "placeholder": "police d'assurance",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "date",
                            "label": "date de début validité",
                            "model": "date_debut",
                            "placeholder": "date de début validité",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "date",
                            "label": "date de fin validité",
                            "model": "date_fin",
                            "placeholder": "date de fin validité",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "Puissance Fiscale",
                            "model": "pf",
                            "placeholder": "Puissance Fiscale",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "Montant Prime Assurance",
                            "model": "primeAssurance",
                            "placeholder": "Montant Prime Assurance",
                            "featured": true,
                            "required": true
                        }
                    ]

                },
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
                desserts: [],
                organisations: [],
                editedIndex: -1,
                editedItem: assurancejson,
                defaultItem: assurancejson
            }
        },
        components: {
            ListdataTable,ListKanban,ListGraph,
            "vue-form-generator": VueFormGenerator.component
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
        },

        methods: {
            handlePageChange(value) {
                this.page = value;
                this.initialize();
            },
            handlePageSizeChange(event) {
                this.pageSize = eventbu.target.value;
                this.page = 1;
                this.initialize();
            },
            getRequestParams(name, page, pageSize) {
                let params = {};
                if (name) {
                    params["name"] = name;
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
                this.$router.push({name: 'addassurance'})
            },
            initialize () {
                const params = this.getRequestParams(
                    this.searchTitle,
                    this.page,
                    this.pageSize
                );

                axios.get(constants.accident_end_url + 'accidents/insurance',
                    {
                        params: params})

                    .then(org => {

                        console.log('organisations',org.data);
                        this.load= false;
                        this.desserts = org.data.data.list.content;
                        this.list_camembert = org.data.data.graph
                        this.list_kanban = org.data.data.kanban
                        this.count = org.data.data.list.totalElements

                    })

                    .catch(function(error) {
                        console.log('organisations_error',error);


                    });

            },

            findOrganisation(fields){
                return fields.model === 'organisation';
            },

            editItem (item) {

                this.modelEdit = Object.assign({}, item)
                this.dialog2 = true

                console.log('edititem',item)
            },

            deleteItem (item) {

                this.model = Object.assign({}, item)
                this.dialogDelete = true
            },

            openItem (item) {
              console.log('item',item)
              //this.$router.push({ name: 'patientFolder',params:{ rowes : item.accidentId } });
              this.$router.push({ name: 'patientList',params:{ rowes : item } });

            },

            deleteItemConfirm ()
            {
                axios.delete(constants.back_end_url +'assurances/'+this.model.id)

                    .then(assurances => {

                        console.log('variant',assurances.data.data)

                        if(assurances.data.success) {

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
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
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

    }
</script>