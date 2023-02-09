<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main-content">

        <breadcumb :page="'Catégorie de produit'" :folder="'Options'" />
        <b-row>
            <b-col md="11 mb-30">
                <b-card class="card   mb-30"
                        header=""
                        header-bg-variant="transparent">
                    <b-tabs pills >
                        <b-tab title="Data">
                            <!--<listdata-table :model="model" :schema="schema" :headers="headers" :formOptions="formOptions"></listdata-table>-->
                            <template>
                                <v-data-table
                                        :headers="headers"
                                        :items="desserts"
                                        sort-by="libelle"
                                        class="elevation-1"
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
                                            <v-toolbar-title>Gérer</v-toolbar-title>
                                            <v-divider
                                                    class="mx-4"
                                                    inset
                                                    vertical
                                            ></v-divider>
                                            <v-spacer></v-spacer>

                                            <v-dialog
                                                    v-model="dialog"
                                                    max-width="750px"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                            color="primary"
                                                            dark
                                                            class="mb-2"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                    >
                                                        Ajouter
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline">{{ formTitle }}</span>
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-container>
                                                            <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                                                        </v-container>
                                                    </v-card-text>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="close"
                                                        >
                                                            {{ $t("Annuler") }}
                                                        </v-btn>
                                                        <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="save"
                                                        >
                                                            Save
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

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
                                                @click="initialize"
                                        >
                                            Reset
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </template>
                        </b-tab>
                        <b-tab title=""  >
                            <template slot="title">
                                <i class="i-Bar-Chart text-15"> </i>
                            </template>

                        </b-tab>

                    </b-tabs>
                </b-card>
            </b-col>
            <!-- form-inputs-rounded -->
        </b-row>
    </div>
</template>
<script>
    import axios from 'axios';
    import catproductListHeader from './catproductListHeader.json';
    import catProductAddFields from './catProductAddFields';
    import catproduct from '../../../entities/catproduct'
    import VueFormGenerator from 'vue-form-generator'
    import ListdataTable from "../listdataTable";
    import constants from "../../../plugins/constants"
    export default {
        data() {

            return{
                dialog: false,
                dialogDelete: false,
                headers: catproductListHeader,
                model: catproduct,
                schema : catProductAddFields,
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
                desserts: [],
                organisations: [],
                editedIndex: -1,
                editedItem: catproduct,
                defaultItem: catproduct
            }
        },
        components: {
            ListdataTable,
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
            initialize () {
                axios.get(constants.back_end_url + 'admin/catproducts')
                    .then(products => {
                        console.log('clients',products.data);
                        this.desserts = products.data
                    })
                    .catch(function(error) {
                        console.log('products_error',error);
                    });
                axios.get('http://localhost:8080/api/v1/organisations')
                    .then(org => {

                        console.log('organisations',org.data);
                        this.organisations = org.data;
                        this.schema.fields.find(this.findOrganisation).values = this.organisations;

                    })
                    .catch(function(error) {
                        console.log('organisations_error',error);


                    });
            },
            findOrganisation(fields){
                return fields.model === 'organisation';
            },
            editItem (item) {
                this.editedIndex=0
                this.model = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {

                this.model = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)

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
                if (this.editedIndex > -1) {const instance = axios.post('http://localhost:8080/api/v1/categorieproduits',
                    {
                        categorieProduitId: this.model.categorieProduitId,
                        libelle: this.model.libelle,
                        description: this.model.description,
                        organisation :this.model.organisation
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

                    const instance = axios.post('http://localhost:8080/api/v1/categorieproduits',
                        {
                            categorieProduitId: this.model.categorieProduitId,
                            libelle: this.model.libelle,
                            description: this.model.description,
                            organisation :this.model.organisation
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



