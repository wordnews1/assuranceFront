
<template>



  <b-overlay :show="show" rounded="sm">
    <breadcumb :page="'Accident/patients/dossier'" :folder="'Options'" />
    <!--b-form-select
        label="Patient"
        id="patientSelect"
        name="patientSelect"
        v-model="patientId"
        @change="downloadFolder"
    >
      <option value="0">Select patient</option>
      <option  v-for="item in listPatient" :key="item.id" :value="item.id" >
        <span>{{ item.nom +' '+ item.prenom}}</span>
      </option>

    </--b-form-select-->
    <b-overlay :show="openb" rounded="sm" >
      <b-modal id="confirmopenAccount" :title="$t('open_box')" hide-footer>
        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t('open_box')}}</h5>
        </template>
        <template #default="{  }">
          <b-form-input
              v-model="ouvertureAmount"
              type="number"
              :placeholder="$t('Montant_Encaisse')"
          ></b-form-input>
          <p></p>
          <div style="text-align: right">
            <b-button  :disabled="!openb" @click="openBox()" variant="outline-success" style="margin-right: 15px">{{$t('open')}}</b-button>
          </div>
        </template>

      </b-modal>

    </b-overlay>

    <b-form :aria-hidden="show ? 'true' : null" >

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <!--b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('basic_inf')}}</b-button-->
          <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
          Informations basiques</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col md="6">
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('cnis')"
                      label-for="input-1"
                  >

                    <b-form-input disabled
                                  v-model="cni"
                                  type="number"
                                  :placeholder="$t('cni')"
                    ></b-form-input>



                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('Prénom')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="prenom"
                        type="text"
                        :placeholder="$t('Prénom')"
                    ></b-form-input>

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('birthday')"
                      label-for="input-1"
                  >
                    <b-form-datepicker id="example-datepicker" disabled v-model="birthday" class="mb-2"></b-form-datepicker>

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('permi')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="permis"
                        type="number"
                        :placeholder="$t('permis')"
                    ></b-form-input>

                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('Nom')"
                      label-for="input-1"
                  >

                    <b-form-input
                        disabled
                        v-model="nom"
                        type="text"
                        :placeholder="$t('prooftag')"
                    ></b-form-input>



                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('tel')"
                      label-for="input-1"
                  >
                    <b-form-input

                        v-model="phone"
                        disabled
                        type="number"
                        :placeholder="$t('tels')"
                    ></b-form-input>


                  </b-form-group>





                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('passports')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="passport"
                        type="number"
                        :placeholder="$t('passport')"
                    ></b-form-input>

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('Genre')"
                      label-for="input-1"
                  >
                      <b-form-select
                          :label="$t('sexe')"
                          id="sexe"
                          name="personGender"
                          v-model="personGender"
                          disabled>
                          <option value="1">
                            Homme
                          </option>

                          <option value="2">
                            Femme
                          </option>
                          <option value="3">
                            Inconnu
                          </option>
                      </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <!--b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
              {{$t('Soins')}}</b-button-->
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
              Soins</b-button>
          </b-card-header>
          <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-button  v-if=" rowe.length>=1 " @click ="approuverSoin()"  variant="success"
                          style="position: relative; right: 0;margin-right: 10px;">{{$t('Approuver')}}</b-button>
                <b-button  v-if=" rowe.length>=1 " @click ="rejeterSoin()"  variant="danger"
                          style="position: relative; right: 0;margin-right: 10px;">{{$t('Rejeter')}}</b-button>
                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >
                    <ListTable :type="'soins'" :rows="listsoin" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>
                  </b-overlay>
                </b-col>
              </b-row>
              <br/>
            </b-card-body>
          </b-collapse>


        </b-card>
        <p></p>

      </div>
      <p></p>
      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-7 variant="transparent">
              {{$t('Examens')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-button  v-if=" rowe2.length>=1 " @click ="approuverExam()"  variant="success"
                           style="position: relative; right: 0;margin-right: 10px;">{{$t('Approuver')}}</b-button>
                <b-button  v-if=" rowe2.length>=1 " @click ="rejeterExam()"  variant="danger"
                           style="position: relative; right: 0;margin-right: 10px;">{{$t('Rejeter')}}</b-button>
                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'examen'" @onRowclick="onRowclick" :rows="listexamen" :columns="columnexamen" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow2"></ListTable>


                  </b-overlay>
                </b-col>
              </b-row>
              <br/>

            </b-card-body>
          </b-collapse>


        </b-card>
        <p></p>

      </div>
      <p></p>

    </b-form>
  </b-overlay>

</template>

<script>

    import constants from '../../../plugins/constants'
    import ListTable from '../components/List-table2'
    import axios from 'axios'
    import { mapGetters,mapActions } from "vuex";
    export default {

        name:"dossierpatient",
        props:{
           rowes: Number
        },

        components: {
            ListTable
        },
        mounted(){
          console.log('rowe',this.rowes)
          //this.patientAccidentList(this.rowes)
          this.downloadFolder()
        },
        data() {
            return {
              openb:false,
              permis:'',
              persontrauma:"",
              patientId:"",
                listPatient:[],
                optionsKey:"nom",
                optionsKey1:"prenom",
                folder_id:0,
                checkEx2Options : [
                    {item: 'oui', name: 'Oui'},
                    {item: 'non', name: 'Non'}
                ],
                crashacc:'',
                listsoin:[],
                listexamen:[],
                listrauma:[],
                totalPagesoin_:0,
                loadanotherpage:false,
                totalElementsoin:0,
                linksoin:[],
                columnexamen:[
                    {
                        label: "Id",
                        field: "id",
                        hidden: false,
                    },
                    {
                        label: "Name",
                        field: "name",
                        hidden: false,
                    },
                    {
                        label: "Price",
                        field: "price",
                        hidden: false,
                    },
                    {
                        label: "Status",
                        field: "insuranceVisa",
                        hidden: false,
                    }

                ],
                columnoins:[

                    {
                        label: "Id",
                        field: "id",
                        hidden: false,
                    },
                    {
                        label: "Name",
                        field: "name",
                        hidden: false,
                    },
                    {
                        label: "Price",
                        field: "price",
                        hidden: false,
                    },
                    {
                      label: "Status",
                      field: "insuranceVisa",
                      hidden: false,
                    }
                ],
                consumalcohol:'',
                consumdrugs:'',
                personGender:'',
                checkedNames:[],
                poids:'',
                temperature:'',
                tension:'',
                pouls:'',
                rowe:[],
                rowe2:[],

                rout:false,
                content:"",
                submitStatus: null,
                cni:'',
                nom: '',
                prenom: '',
                phone: '',
                status: false,
                birthday:null,
                passport:'',
                permi_de_conduire:'',
                show: false,
                countrys:["Afghanistan","Cameroun"],
                towns:["Douala","Yaounde"]
            }
        },

        methods:{

            ...mapActions(["ListDossierPatient"]),
            patientAccidentList(data){

              this.show = true
            axios.get(constants.accident_end_url+'cares/accident/'+data)
                .then(list => {
                  this.show = false
                  if(list.data.success){
                    this.listPatient = list.data.data
                  }
                })
                .catch(function(error) {
                  console.log('products_error',error);


                });
          },
            downloadFolder(){
              this.show = true
              axios.get(constants.accident_end_url+'cares/folder/'+this.rowes)
                .then(data => {
                  this.show = false
                  if(data.data.success){
                    this.cni = data.data.data.cni!=null?data.data.data.cni:'pas renseigne'
                    this.nom = data.data.data.nom!=null?data.data.data.nom:'pas renseigne'
                    this.prenom = data.data.data.prenom!=null?data.data.data.prenom:'pas renseigne'
                    this.phone = data.data.data.telephone!=null?data.data.data.telephone:'pas renseigne'
                    this.birthday = data.data.data.dateNaiss!=null?data.data.data.dateNaiss:'pas renseigne'
                    this.passport = data.data.data.passport!=null?data.data.data.passport:'pas renseigne'
                    this.permis = data.data.data.permis!=null?data.data.data.permis:'pas renseigne'
                    this.personGender = data.data.data.gender!=null?data.data.data.gender:'pas renseigne'

                    this.poids = data.data.data.poids!=null?data.data.data.poids:'pas renseigne'
                    this.tension = data.data.data.tension!=null?data.data.data.tension:'pas renseigne'
                    this.pouls = data.data.data.pouls!=null?data.data.data.pouls:'pas renseigne'
                    this.temperature = data.data.data.temperature!=null?data.data.data.temperature:'pas renseigne'
                    this.crashacc = data.data.data.crashDate!=null?data.data.data.crashDate:'pas renseigne'
                    this.listsoin = data.data.data.treatments
                    this.listexamen = data.data.data.exams
                    this.listrauma = data.data.data.injuries
                  }
                })
                .catch(function(error) {
                  console.log('products_error',error);
                  this.show = false


                });

          },
            savechange(data) {

                console.log('savechange', data);
            },
            openmodalbox(){
                this.$bvModal.show('confirmopenAccount')
            },
            onRowclick(params){
                this.loadanotherpage = true
                let soin = {
                    care: this.folder_id,
                    item: params.id
                };
                switch(params.type){
                    case 'examen':

                        axios.post(constants.accident_end_url+'cares/remove-exam', soin)
                            .then(response =>{
                                this.listexamen = response.data.data.exams;
                                this.loadanotherpage = false
                                //this.containerClass = 'container';
                                //this.trauma={}
                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        }); break;
                    case 'soins':

                        axios.post(constants.accident_end_url+'cares/remove-treatment', soin)
                            .then(response =>{
                                this.listsoin = response.data.data.treatments;
                                //this.containerClass = 'container';
                                //this.trauma={}
                                this.loadanotherpage = false
                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        });break;
                    case 'trauma':
                        axios.post(constants.accident_end_url+'cares/remove-injury', soin)
                            .then(response =>{
                                this.listrauma = response.data.data.injuries;
                                this.containerClass = 'container';
                                this.trauma={}
                                this.loadanotherpage = false

                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        });break;

                }
                console.log('paramis',params)

            },
            editProps(params){

                console.log('params',params)
            },
            deleteProps(params){

                /* this.$bvModal.show('confirmdelete')
                 this.idd = params.formattedRow.id*/

                console.log('params', params+'params.formattedRow.id');
            },
            deleteprop(){

                //   this.$bvModal.hide('confirmdelete')
                console.log('params','this.idd')

            },
            loadpage(params){
            },
            clickRow(param){
              this.rowe = param
            },
            clickRow2(param){
              this.rowe2 = param
            },
            approuverSoin(){
                this.show =true
                var ids = [];
                for (var i of this.rowe) {
                  ids.push(i.id);
                }
                const t = {
                  items: ids,
                  approuved : true
                }
                axios.post(constants.accident_end_url+'treatments/insurance/decision-treatment', t)
                    .then(response =>{
                      this.listexamen = response.data.data.exams;
                      this.loadanotherpage = false
                      this.downloadFolder()
                      this.makeToast("Successfully approved", 'success')
                    }).catch(function(error) {
                      console.log("error :", error)
                      this.$router.push({name: 'error'})
                });
              },
            rejeterSoin(){
                this.show =true
                var ids = [];
                for (var i of this.rowe) {
                  ids.push(i.id);
                }
                const t = {
                  items: ids,
                  approuved : false
                }
                axios.post(constants.accident_end_url+'treatments/insurance/decision-treatment', t)
                    .then(response =>{
                      this.listexamen = response.data.data.exams;
                      this.loadanotherpage = false
                      this.downloadFolder()
                      this.makeToast("Successfully rejected", 'success')
                    }).catch(function(error) {
                      console.log("error :", error)
                      this.$router.push({name: 'error'})
                });
            },
            approuverExam(){
                var ids = [];
                for (var i of this.rowe2) {
                  ids.push(i.id);
                }
                const t = {
                  items: ids,
                  approuved : true
                }
                axios.post(constants.accident_end_url+'examinations/insurance/decision-examination', t)
                    .then(response =>{
                      this.listexamen = response.data.data.exams;
                      this.loadanotherpage = false
                      this.downloadFolder()
                      this.makeToast("Successfully approved", 'success')
                    }).catch(function(error) {
                      console.log("error :", error)
                      this.$router.push({name: 'error'})
                });
            },
            rejeterExam(){
                var ids = [];
                for (var i of this.rowe2) {
                  ids.push(i.id);
                }
                const t = {
                  items: ids,
                  approuved : false
                }
                axios.post(constants.accident_end_url+'examinations/insurance/decision-examination', t)
                    .then(response =>{
                      this.listexamen = response.data.data.exams;
                      this.loadanotherpage = false
                      this.downloadFolder()
                      this.makeToast("Successfully rejected", 'success')
                    }).catch(function(error) {
                      console.log("error :", error)
                      this.$router.push({name: 'error'})
                });
            },
            selectionChanged(){
                console.log('loadpage','')
            },
            makeToast(variant = null,type="info") {
              this.$toasted.show(variant,{type:type})
            },
            makeToastTwo(variant = null) {
                console.log('Successfully Submitted')

                this.$bvToast.toast("Successfully Submitted", {
                    title: `Variant ${variant || "default"}`,
                    variant: variant,
                    solid: true
                });
            },
        }
    }

</script>
<style scoped>
    .right_header {
        color: #fff;
        margin-left: 30%;
    }

</style>
 