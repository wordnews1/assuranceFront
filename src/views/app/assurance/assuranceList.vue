<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main-content">
      <b-modal id="confirmdelete" scrollable no-close-on-backdrop :title="$t('delete_confirm')" hide-footer>
        <div style="text-align: right">
          <b-button  @click="closeDelete" variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
          <b-button @click="deleteItemConfirm" type="submit" variant="outline-success rights" >{{$t('Confirmer')}}</b-button>

        </div>
      </b-modal>
      <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start">

        <div>
          <a @click="home" style="text-decoration: underline" >
            <i class="i-Home-2" ></i>
            <span>{{$t('Assurance')}}</span>
          </a>
        </div>
      </div>
      <br/>
      <div>
        <b-row>

          <b-col md="11 mb-30">
            <b-card class="card mb-30"
                    header=""
                    header-bg-variant="transparent">
              <b-tabs pills >
                <b-tab title="List">
                  <template slot="title">
                    <i class="i-Newspaper text-15"></i>
                  </template>
                  <!--v-card-title>
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

                          <template v-slot:item.date_fin="{ item }">

                              <span>{{ new Date(item.date_fin).toLocaleString('fr-FR',{ year: 'numeric', month: '2-digit', day: '2-digit' }) }}</span>
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
                                  <<v-dialog
                                          v-model="dialog2"
                                          max-width="750px"
                                  >

                                      <v-card>
                                          <v-card-title>
                                              <span class="headline">{{ formTitle }}</span>
                                          </v-card-title>

                                          <v-card-text>
                                              <v-container>
                                                  <vue-form-generator :schema="schemaEdit" :model="modelEdit" :options="formOptions"></vue-form-generator>
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
                                  </v-dialog>>

                                  <v-dialog
                                          v-model="dialog"
                                          max-width="750px"
                                  >
                                      <template v-slot:activator="{ on, attrs }">
                                              <b-button
                                                        color="primary"
                                                        v-bind="attrs"
                                                        @click="onee"
                                                        class="m-1"
                                                        variant="primary"
                                              >Add</b-button>
                                      </template>

                                      <<v-card>
                                          <v-card-title>
                                              <span class="headline">{{ formTitle }}</span>
                                          </v-card-title>

                                          <v-card-text>
                                              <v-container>

                                                  <vue-form-generator :schema="schema" :model="model" :formOptions="formOptions" ></vue-form-generator>
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
                                      @click="openItem(item)"
                              >
                                  mdi-eye
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
                  </template-->
                  <ListTable :currentPage="currentPage" @loadpage="loadPage"  :rows="desserts.content" :columns="headers" :isCLoseMenu="true" @onRowclick="rowClick"
                             :totalPage="desserts.totalPages" :totalElement="desserts.totalElements" :links="desserts.links"
                             @deleteProps="deleteProps" @editProps="editProps" @selectionChanged="clickRow"></ListTable>

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
                  <ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_hist" :abcis="list_camembert.map(function(a) {return a.name;})" ></ListGraph>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
          <b-col sm="1 mb-1">
            <div>
              <b-row  >
                <b-col md="12">
                  <div class="boxBtn sm-19" @click="onee">
                    <a href="#" class="item item-text-wrap item-button-left  taille">
                      <i class="i-Add icon"></i>
                      <span class="icons">{{$t('Nouveau')}}</span>
                    </a>
                  </div>

                  <div v-if="rowe.length<=1" class="boxBtn mb-20" @click="deleteProps" >
                    <a href="#" class="item item-text-wrap item-button-left  taille">
                      <i class="i-Finger-Print icon"></i>
                      <span class="icons">{{$t('Delete')}}</span>
                    </a>
                  </div>


                </b-col>
              </b-row>
            </div>
          </b-col>
          <!-- form-inputs-rounded -->
        </b-row>
      </div>
    </div>
</template>
<script>
    import ListKanban from '../components/list-kanban';
    import ListGraph from '../components/list-graph';
    import ListTable from '../components/List-table3';
    import axios from 'axios';
    import assuranceAddFields from './assuranceAddFields';
    import assurancejson from '../../../entities/assurance';
    import VueFormGenerator from 'vue-form-generator';
    import ListdataTable from "../listdataTable";
    import store from "../../../store";
    import constants from "../../../plugins/constants"
    export default {


        data() {

            return{
                percent_visit:'Prime d\'assurance',
                loadanotherpage:false,
                currentPage:0,
                totalElement:0,
                links:[],
                list:[],
                rowe:{},
                rowe1:[],
                list_camembert:[],
                list_hist:[],
                list_kanban:[],
                selectedId:'',
                load:true,
                search: "",
                currentTutorial: null,
                currentIndex: -1,
                id: localStorage.getItem('id'),
                page: 1,
                count: 0,
                pageSize: 10,

                pageSizes: [3, 6, 9],

                dialog: false,
                dialog2: false,
                dialogDelete: false,
                headers: [
                  {
                    label: "Nom",
                    field: "customerLastName",
                    hidden: false
                  },
                  {
                    label: "Prénom",
                    field: "customerFirstName",
                    hidden: false
                  },
                  {
                    label: "Téléphone",
                    field: "customerPhone",
                    hidden: false
                  },
                  {
                    label: "Immatriculation",
                    field: "vehicule",
                    hidden: false
                  },
                  {
                    label: "Prime Assurance",
                    field: "primeAssurance",
                    hidden: false
                  },
                  {
                    label: "Date de Debut",
                    field: "date_debut",
                    hidden: false,
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss',
                    dateOutputFormat: 'dd-MMM-yyyy'
                  },
                  {
                    label: "Date de Fin",
                    field: "date_fin",
                    hidden: false,
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss',
                    dateOutputFormat: 'dd-MMM-yyyy'
                  }

                ],
                model: assurancejson,
                modelEdit: assurancejson,
                schema : assuranceAddFields,
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
                desserts: "",
                organisations: [],
                editedIndex: -1,
                editedItem: assurancejson,
                defaultItem: assurancejson
            }
        },
        components: {
            ListdataTable,ListKanban,ListGraph, ListTable,
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
            home(){
              this.$router.push({path: '/'})
            },
            rowClick(params){
              this.$router.push({name: 'detailsaccident',params: { rowes:params }})
              console.log('loadpage',params)
            },
            loadPage(param){
              console.log('loadpage',param)
              this.currentPage = param
              this.loadanotherpage = true

              const paramss = this.getRequestParams(
                  this.search,
                  param,
                  this.pageSize,
                  this.id
              );

              axios.get(constants.back_end_url + 'assurances',
                  {
                    params: paramss})

                  .then(org => {

                    console.log('organisations',org.data);
                    this.load= false;
                    this.desserts = org.data.data.list;
                    this.list_kanban= org.data.data.kanban
                    this.list_camembert =  org.data.data.graph
                    this.count = org.data.data.list.totalElements

                  })

                  .catch(function(error) {
                    console.log('organisations_error',error);


                  });


            },
            editProps(params){
              console.log('params',params)
            },
            deleteProps(params){
              this.$bvModal.show('confirmdelete')
              this.selectedId = params.formattedRow.id
              console.log('params', params.params.formattedRow.id);
            },
            handlePageChange(value) {
                this.page = value;
                this.initialize();
            },
            handlePageSizeChange(event) {
                this.pageSize = eventbu.target.value;
                this.page = 1;
                this.initialize();
            },

            getRequestParams(search, page, pageSize, id) {

                let params = {};

                if (search) {
                    params["search"] = search;
                }

                if (page) {
                    params["page"] = page - 1;
                }

                if (pageSize) {
                    params["size"] = pageSize;
                }
                if (id) {
                    params["id"] = id;
                }

                return params;
            },
            onee(){
                this.$router.push({name: 'addassurance'})
            },
            clickRow(params) {

              if(params.length>0){
                this.rowe = params
                this.rowe1 = params;
                console.log('parames', params);
              }else{
                this.rowe={}
                this.rowe1=[]
              }
            },
            initialize () {

                const params = this.getRequestParams(
                    this.search,
                    this.page,
                    this.pageSize,
                    this.id
                );

                axios.get(constants.back_end_url + 'assurances',
                    {
                        params: params})

                    .then(org => {

                        console.log('organisations',org.data);
                        this.load= false;
                        this.desserts = org.data.data.list;
                        this.list_kanban= org.data.data.kanban
                        this.list_camembert =  org.data.data.graph
                        this.count = org.data.data.list.page.totalElements

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
               localStorage.setItem("rowes",JSON.stringify(item))
               axios.get(constants.visit_end_url_no_api+ '/public/search/cartegrise/assurance/imma/' + item.vehicule)
                   .then(cg=>{
                       console.log('carte grise en ligne'+ cg.data.data);
                       localStorage.setItem("assurances",JSON.stringify(cg.data.data))
                   })
               let routeDatas = this.$router.resolve({ name: 'vignette2',params:{ rowes:"bonjour" } });

                window.open(routeDatas.href, '_blank');
            },
            makeToast(variant = null,type="info") {
              this.$toasted.show(variant,{type:type})
            },
            deleteItemConfirm ()
            {
                axios.delete(constants.back_end_url +'assurances/'+this.rowe[0].id)

                    .then(assurances => {

                        console.log('variant',assurances.data.data)

                        if(assurances.data.success) {

                            this.desserts.splice(this.editedIndex, 1)
                            this.$bvModal.hide('confirmdelete')
                            this.makeToast("Successfully approved", 'success')
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
<style scoped>
tr:hover{
  cursor: pointer;
}

.taille{
  border-radius: 20px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #e8eaed;
  cursor: pointer;

}
.taille:hover{
  border-radius: 25px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #9fc0e7;
  cursor: pointer;

}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-70%, -100%);
  width: 10px;
  height: 10px;
  display: block;
}

.icons {
  position: relative;
  top: 50%;
  left: 50%;
  height: 50%;
  text-align: center;
  width: 50px;
  font-size: 11px;
  transform: translate(-45%, 10%);
  display: block;
}
.boxBtn{
  width: 90%;
  height: 10%;
  position: relative;
  min-width: 100px;
  min-height: 90px;
  background-color: #ffff;
  display: flex;
}
</style>