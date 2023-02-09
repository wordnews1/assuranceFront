<template>
        <b-overlay :show="show" rounded="sm" >
          <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start">
            <div>
              <a @click="home" style="text-decoration: underline">
                <i class="i-Home-2" ></i>
                <span>{{$t('Assurance')}}</span>
              </a> / {{$t('Nouveau')}}
            </div>
          </div>
          <br/>
          <div>
            <b-form @submit="onSubmit">
              <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                  <b-card-header header-tag="header" class="p-1"  role="tab">
                    <!--b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
                      {{$t('basic_inf')}}</b-button-->
                    <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
                      Assurance</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-row>
                        <b-form-group  label="Début du contrat" label-for="input-1" class="col-md-6">
                          <b-form-input required v-model="insurance.date_debut" class="input" type="date"></b-form-input>
                        </b-form-group>

                        <b-form-group  label="Fin du contrat" label-for="input-1" class="col-md-6">
                          <b-form-input required v-model="insurance.date_fin" class="input" type="date"></b-form-input>
                        </b-form-group>
                      </b-row>
                      <b-row>
                        <b-form-group  label="Prime" label-for="input-1" class="col-md-6">
                          <b-form-input required v-model="insurance.primeAssurance" class="input" type="number"></b-form-input>
                        </b-form-group>

                        <b-form-group  label="Puissance fiscale" label-for="input-1" class="col-md-6">
                          <b-form-input required v-model="insurance.pf" class="input" type="number"></b-form-input>
                        </b-form-group>
                      </b-row>
                      <b-row>
                        <b-form-group
                            class="col-md-6 mb-3"
                            label="Police d'assurance"
                            label-for="input-1"
                        >
                          <b-form-input
                              v-model="insurance.police"
                              type="text"
                              required
                              placeholder="Police d'assurance"
                          ></b-form-input>
                        </b-form-group>
                      </b-row>
                    </b-card-body>
                  </b-collapse>

                </b-card>
              </div>
              <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                  <b-card-header header-tag="header" class="p-1"  role="tab">
                    <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-2 variant="transparent">
                      Client</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-2" invisible accordion="my-accordion2" role="tabpanel">
                    <b-card-body>

                      <b-row>
                        <b-form-group
                            class="col-md-6 mb-3"
                            label="Prénom"
                            label-for="input-1"
                        >
                          <b-form-input
                              v-model="insurance.customer.firstName"
                              type="text"
                              required
                              placeholder="First Name"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            class="col-md-6 mb-3"

                            label="Nom"
                            label-for="input-1"
                        >
                          <b-form-input

                              v-model="insurance.customer.lastName"
                              type="text"
                              required
                              placeholder="Nom"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            class="col-md-6 mb-3"
                            label="Email:"
                            label-for="input-1"
                        >
                          <b-form-input

                              v-model="insurance.customer.email"
                              type="email"
                              placeholder="Email"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            class="col-md-6 mb-3"

                            label="Téléphone"
                            label-for="input-1"
                        >
                          <b-form-input

                              v-model="insurance.customer.phone"
                              type="text"
                              required
                              placeholder="Téléphone"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group

                            label="Carte d'identité national"
                            label-for="input-1"
                            class="col-md-6"
                        >
                          <b-form-input

                              v-model="insurance.customer.cni"
                              type="text"
                              required
                              placeholder="Carte d'identité national"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group  label="Date de naissance" label-for="input-1" class="col-md-6">
                          <b-form-input v-model="insurance.customer.birthdate" class="input" type="date"></b-form-input>
                        </b-form-group>

                        <b-form-group  label="Profession" label-for="input-1" class="col-md-6">
                          <b-form-input v-model="insurance.customer.occupation" class="input" type="text"></b-form-input>
                        </b-form-group>
                      </b-row>
                    </b-card-body>
                  </b-collapse>

                </b-card>
              </div>
              <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                  <b-card-header header-tag="header" class="p-1"  role="tab">
                    <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-3 variant="transparent">
                      Informations sur le véhicule
                    </b-button>
                  </b-card-header>
                  <b-collapse id="accordion-3" invisible accordion="my-accordion3" role="tabpanel">
                    <b-card-body>
                      <div class="panel-body" style="margin: auto; width:60%">
                        <b-row>
                          <b-form-group
                              label="Nom du propriétaire"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <b-form-input
                                autocomplete="off"
                                v-model="souscripteur"
                                type="text"
                                required

                                placeholder="Nom du propriétaire"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Immatriculation"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <AutoComplete @writing="initVariable" msg='assurance' @register="loadcartegrise" :spinner="spinner" :optionsKey="optionsKey"
                                          :optionsKey1="optionsKey1" :isVisiteOk="isVisiteOk" :onSelect="onSelect" ></AutoComplete>

                          </b-form-group>
                        </b-row>

                        <b-row>
                          <b-form-group
                              label="Catégorie du véhicule"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <b-form-input
                                autocomplete="off"
                                v-model="insurance.cat"
                                type="text"
                                required
                                placeholder="Catégorie du véhicule"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Chassis"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <b-form-input
                                autocomplete="off"
                                v-model="insurance.chassis"
                                type="text"
                                required
                                placeholder="Chassis"
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                              label="Marque"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <b-form-input
                                autocomplete="off"
                                v-model="insurance.marque"
                                type="text"
                                required
                                placeholder="Marque"
                            ></b-form-input>
                          </b-form-group>


                          <b-form-group
                              label="Type de véhicule"
                              label-for="input-1"
                              class="col-md-6"
                          >
                            <b-form-input
                                autocomplete="off"
                                v-model="insurance.description"
                                type="text"
                                required
                                placeholder="Type de véhicule"
                            ></b-form-input>
                          </b-form-group>
                        </b-row>
                        <!--br/>
                        <div>
                          Vehicule concernee
                        </div>



                        <div style="margin: auto">
                          <vue-form-generator  :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                        </div>

                        <b-button variant="danger m-1" @click="previous">
                          Annuler
                        </b-button>
                        <b-button variant="success m-1" @click="onSubmit">Enregistrer</b-button-->
                      </div>
                    </b-card-body>
                  </b-collapse>

                </b-card>
              </div>
              <b-col md="12">
                <b-button class="mt-3" variant="primary"  type="submit" >Enregister</b-button>
              </b-col>
            </b-form>
          </div>


        </b-overlay>
</template>



<script>
    import AutoComplete from "./Autocomplete"
    import axios from 'axios'
    import router from "../../../router";
    import store from "../../../store";
    import constants from "../../../plugins/constants"
    import assurance from './assuranceModel';
    import VueFormGenerator from 'vue-form-generator'
    import { mapGetters,mapActions } from "vuex";
    export default {
        data(){
            return{
                numimma:"",
                insurance:{
                  customer:{}
                },
                souscripteur:"",
                optionsKey:"numImmatriculation",
                optionsKey1:"proprietaireVehicule.partenaire.nom",
                name: "assuranceforms",
                spinner: false,
                show: false,
                onSelect: false,
                isVisiteOk: false,
                model: assurance,
                schema : {
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
            }
        },
        components: {
            "vue-form-generator": VueFormGenerator.component,AutoComplete
        },


        computed: {
            ...mapGetters(["GETASSURANCE"]),
        },
        watch:{
            GETASSURANCE: function(value){
                this.cats = value
                console.log('files2',value);
            },
        },
        mounted(){
          this.model={}
        },
        methods:{
            home(){
              this.$router.push({path: '/'})
            },
            initVariable(){
              this.insurance.souscripteur = ""
              this.insurance.chassis = ""
              this.insurance.cat = ""
              this.insurance.marque = ""
              this.insurance.description = ""
              this.souscripteur = ""
            },
            onSubmit(event){
                event.preventDefault()
                this.show = true;
                this.model.souscripteur = store.state.souscripteur
                this.insurance.souscripteur = store.state.souscripteur
                this.model.vehicule = this.$store.state.numimma
                this.insurance.vehicule = this.$store.state.numimma

                var userinfo = JSON.parse(localStorage.getItem('userinfo'))

                this.model.organisation = {id: userinfo.organisationId}
                this.insurance.organisation = {id: userinfo.organisationId}
                console.log("Form submitted!", store.state.numimma);
                console.log('model to post',this.model)
                axios.post(constants.back_end_url+'assurances', this.insurance)
                    .then(assurances => {
                        console.log('variant', assurances.data.data)
                        if (assurances.data.success) {

                            localStorage.setItem("rowes", JSON.stringify(assurances.data.data))
                            console.log("repppppp", localStorage.getItem("rowes"))
                            router.push({name: 'assurancelist'})

                            let routeDatas = router.resolve({
                                name: 'vignette2',
                                params: {rowes: "bonjour"}
                            });
                            window.open(routeDatas.href, '_blank');
                            // this.$router.push({ name: 'vignette1',params:assurances })
                            //objet client qui vient detre ajoute
                            //commit("SETASSURANCE", assurances.data.data)


                        } else {
                            this.makeToast(assurances.data.message, 'error')
                        }
                        this.show = false;
                    })
                    .catch(error =>{
                        this.$swal({
                            title: "Erreur",
                            text: assurances.data.msg,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        })
                        this.sleep(3000)
                        this.$router.go(-1)
                })
            },
            sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            },
            previous(){
              this.$router.go(-1);
            },
            loadcartegrise(data){
              console.log('condition', data == null)
                if(data == null){
                  this.insurance.souscripteur = ""
                  this.insurance.chassis = ""
                  this.insurance.cat = ""
                  this.insurance.marque = ""
                  this.insurance.description = ""
                  this.souscripteur = ""
                  store.state.souscripteur = ""
                }
                else{
                  this.insurance.souscripteur = data.proprietaireVehicule.partenaire.nom
                  this.insurance.chassis = data.vehicule.chassis
                  this.insurance.cat = data.produit.libelle
                  this.insurance.marque = data.vehicule.marqueVehicule.libelle
                  this.insurance.description = data.produit.description
                  this.souscripteur = data.proprietaireVehicule.partenaire.nom
                  store.state.souscripteur = data.proprietaireVehicule.partenaire.nom
                }
                console.log('assurances',data);
                console.log('assurances',data.numImmatriculation);
                store.state.numimma = data.numImmatriculation

                localStorage.setItem("assurances",JSON.stringify(data))




            },

            ...mapActions(["registerAssurance"]),

            makeToast(variant = null,type="info") {
                console.log('Please fill the form correctly',variant)
                this.$toasted.show(variant,{type:type})
            },

            },

    }

</script>

<style scoped>

</style>