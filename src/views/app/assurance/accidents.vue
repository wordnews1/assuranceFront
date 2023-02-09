<template>

  <div class="main-content">
    <b-modal scrollable no-close-on-backdrop   id="choose" size="lg" hide-footer>


      <b-row  >
        <b-col style="
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  justify-items: center;
">

          <div>
            <div  class="card mb-20">
              <a href="#"  @click="imports()" class="item item-text-wrap item-button-left  taille">
                <i class="i-Add icon"></i> <span class="icons">{{$t('Importer')}}</span>
              </a>
            </div>
          </div>
        </b-col>
        <b-col style="
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  justify-items: center;
">

          <div>
            <div  class="card mb-20">
              <a href="#"  @click="draw()" class="item item-text-wrap item-button-left  taille">
                <i class="i-Add icon"></i> <span class="icons">{{$t('Dessiner')}}</span>
              </a>
            </div>
          </div>
        </b-col>
      </b-row>

    </b-modal>

    <b-overlay :show="openb" rounded="sm" >
     <Signin :rowes="rowe1" @signature="signaturee"> </Signin>
    </b-overlay>

    <b-row>

      <div style="background: white;" >
        <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
          <b-col md="12">

            <div>
              <div  class="card mb-20">
                <a href="#"  @click="addaccident()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Add icon"></i> <span class="icons">{{$t('add')}}</span>
                </a>
              </div>
            </div>
            <div v-if="rowe.length<=1">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="consult()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Folder-Open icon"></i>
                  <span class="icons">{{$t('consultfolder')}}</span>
                </a>
              </div>
            </div>
            <div v-if="rowe.length<=1">
              <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
              <div class="card mb-20">
                <a href="#" @click="edit()"  class="item item-text-wrap item-button-left  taille">
                  <i class="i-File-Edit icon"></i>
                  <span class="icons">{{$t('updatepatient')}}</span>
                </a>
              </div>
            </div>

<!--            <div v-if=" rowe.length<=1 ">
              <div class="card mb-20">
                <a href="#"  @click="associer()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Receipt-3 icon"></i>
                  <span class="icons" >{{$t('associer')}}</span>
                </a>
              </div>
            </div>-->
            <div v-if="rowe.length<=1 && rowe[0].status=='OPENED'">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="addcroquis()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Drag icon"></i>

                  <span class="icons">{{$t('Ajouter Croquis')}}</span>
                </a>
              </div>
            </div>

            <div v-if="rowe.length<=1 && rowe[0].status=='OPENED'">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="openpv(0)" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Receipt icon"></i>
                  <span class="icons">{{$t('Constituer le PV')}}</span>

                </a>
              </div>
            </div>

            <div v-if="rowe.length<=1 && rowe[0].status=='OPENED'">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#" @click="genererpv()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Building   icon"></i>

                  <span class="icons">{{$t('Generer le PV')}}</span>
                </a>
              </div>
            </div>

            <div v-if="rowe.length<=1 && rowe[0].status=='READY'">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="signin(1)" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Close icon"></i>

                  <span class="icons">{{$t('accepter')}}</span>
                </a>
              </div>
            </div>
            <div v-if="rowe.length<=1 && rowe[0].status=='READY'">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="signin(2)" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Close icon"></i>

                  <span class="icons">{{$t('refuser')}}</span>
                </a>
              </div>
            </div>


          </b-col>
        </b-row>
      </div>

      <b-col md="12" class="mb-30" style="margin-top: 3px;max-width: 89%!important">

        <b-card
            class="card   mb-30"
            header=""
            header-bg-variant="transparent">
          <b-tabs pills >
            <b-tab title="" >
              <template slot="title">
                <i class="i-Bar-Chart text-15"> </i>
              </template>
              <!--<ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_hist"></ListGraph>-->

            </b-tab>

            <b-tab title="">

              <template slot="title">
                <i class="i-Split-Four-Square-Window text-15"> </i>
              </template>
              <!-- <ListKanban :rows_kanban="list_kanban" ></ListKanban>-->

            </b-tab>


            <b-tab title="" active>

              <template slot="title">
                <i class="i-Align-Justify-All text-15"> </i>
              </template>

              <b-overlay :show="loadanotherpage" rounded="sm" >

                <ListTable :rows="list" :columns="columns" :isCLoseMenu="true" @onRowclick="rowClick"
                           :totalPage="totalPages_" :totalElement="totalElement" :links="links"
                           @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


              </b-overlay>

            </b-tab>

          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

  </div>

</template>

<script>


import ListTable from '../components/list-table'
import axios from 'axios'
import constants from '../../../plugins/constants'
import Signin from '../visit/signin'
/*
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'*/
import { mapGetters,mapActions } from "vuex";
// import { getRequestParams  } from '../../../plugins/functions'
export default {

  display: "Liste des Patients",
  order: 0,
  props:{
    id:String
  },

  components: {
    ListTable,Signin
  },
  mounted(){

    console.log('fetchvuelistpatient','patient')

    this.FetchVueListaccidents()

  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Patients"
  },

  computed: {
    ...mapGetters(["GetVueKanban","GetVueGraph","GETLISTACCIDENTS","GETFINISHACCIDENTS"]),
  },
  methods: {

    ...mapActions(["FetchVueKanban", "FetchVueGraph", "FetchVueListaccidents","Finish"]),
    signaturee(data){
    this.openb=true
      switch(this.operations){
        case 0: this.finish(data); break;
        case 1: this.acceptorreject(data,this.operations);break;
        case 2: this.acceptorreject(data,this.operations);break;
      }

      this.$bvModal.hide('signin')
    },
    openpv(data){

      this.rowe.indicateur = data
      this.$router.push({name: 'pv',params: { rowes:this.rowe }})

    },
    genererpv(){
      this.$router.push({name: 'genererpv'})
    },
    signin(data){
      /*if(Object.keys(this.rowe).length === 0){
          this.makeToast(this.$t('st_signin_error'),'error')
          return ;
      }

      this.$router.push({name: 'st_signin',params: { rowes:this.rowe }})*/
      this.operations = data

      this.$bvModal.show('signin')
    },
    checkId(obj, id) {

      return obj.map(function(item) { return item.id; }).indexOf(id);

    },
    removelist(contact,indexIds){
      contact.splice(indexIds, 1);
      contact.sort();
    },
    makeToast(variant = null,type) {

      switch (type) {
        case 0: type="error"; break;
        case 1: type="success" ; break;
        case 2: type="info"; break;
        case 3: type="warning"; break;

      }

      this.$toasted.show((variant),{type:type})

    },

      selected(value){

        this.filteredSuggestions = []
        this.valeur = value.item.nom + " "+value.item.prenom
        this.valeur1 = value

        console.log('selected',value)

      },
    addaccident(){

      this.$router.push({name: 'addaccident',params: { rowes:this.rowe }})

    },
    edit(){

      console.log('parames1', this.rowe);
      if(Object.keys(this.rowe).length === 0){
        this.makeToast(this.$t('Select_patient'),'error')
        return ;
      }

      this.$router.push({name: 'editaccident',params: { rowes:this.rowe[0] }})
    },
    draw(){
      this.$router.push({ name: 'croquis',params: { rowes:this.rowe[0] }})
    },
    addcroquis(){

      if(Object.keys(this.rowe).length === 0){
        this.makeToast(this.$t('Select_accident'),'error')
        return ;
      }
      this.$bvModal.show('choose')
    },

    consult(){
      console.log('parames2', this.rowe);
      if(Object.keys(this.rowe).length === 0){
        this.makeToast(this.$t('Select_patient'),'error')
        return ;
      }

      this.$router.push({name: 'detailsaccident',params: { rowes:this.rowe[0] }})

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
    rowClick(params){
      this.$router.push({name: 'detailsaccident',params: { rowes:params }})
      console.log('loadpage',params)
    },

    loadpage(params){

      console.log('loadpage',params)
      this.currentpage = params
      this.loadanotherpage = true

      // this.visiteenattente(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))


    },
    finish(data){

      let datae={}
      console.log('rowe',this.rowe[0])
      this.loadanotherpage=true
      datae.id = this.rowe[0].id
      datae.signature = data

      this.Finish(datae)

    },
    acceptorreject(data1,data){

      this.loadanotherpage=true
      let datae={}
      datae.id = this.rowe[0].id
      datae.signature = data

      if(data===1){
        axios.post(constants.resource_url+'accidents/accept',datae)

            .then(list => {

              console.log('care',list.data)

              if(list.data.success){
                this.openb=false

                this.loadanotherpage=false
                let value = list.data.data

                this.list.splice(this.checkId(this.list,value.id), 1,  value)

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

      }else{

        axios.get(constants.resource_url+'accidents/reject/'+datae.id)

            .then(list => {

              console.log('care',list.data)

              if(list.data.success){

                this.openb=false

                this.loadanotherpage=false
                let value = list.data.data

                this.list.splice(this.checkId(this.list,value.id), 1,  value)

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
      }

    },

  },
  /**/
  data() {

    return {
      operations:0,
      openb:false,
      optionsKey:"nom",
      valeur:'',
      filteredSuggestions:[],
      totalPages_:0,
      loadanotherpage:false,
      totalElement:0,
      links:[],
      list:[],
      rowe:{},
      rowe1:[],
      columns:[
        {
          label: "Id ",
          field: "id",
          hidden: false,
        },
        {
          label: "Officier responsable ",
          field: "officerName",
          hidden: false,
        },
        {
          label: "Gravite des traumatismes ",
          field: "severity",
          hidden: false,
        },
        {
          label: "Place",
          field: "place",
          hidden: false,
        },
        {
          label: "Date Accident",
          field: "crashDate",
          hidden: false,
        },
        {
          label: "Heure Accident",
          field: "crashTime",
          hidden: false,
        },
        {
          label: "Heure Accident",
          field: "roadtype",
          hidden: true,
        },
        {
          label: "Heure Accident",
          field: "roadstate",
          hidden: true,
        },
        {
          label: "Heure Accident",
          field: "crashDate",
          hidden: true,
        },
        {
          label: "Status",
          field: "status",
          hidden: false,
        }
      ]
    }
  },

  watch:{

    GETFINISHACCIDENTS(value){

      this.loadanotherpage=false
      this.openb=false
      console.log('link',value)
      this.list.splice(this.checkId(this.list,value.id), 1,  value)


    },
    GETLISTACCIDENTS(value){

      console.log('link',value)

      this.list = value.content;
      this.links = value.links;
      this.totalElement = value.totalElements;

      this.totalPages_ = value.totalPages;
      this.loadanotherpage = false

      console.log('typelist',this.list)


    },
  }


}
</script>
<style scoped>

.mb-30{
  margin-bottom: 10px !important;
}
tr:hover{
  cursor: pointer;
}

.taille{
  border-radius: 25px;
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

.mb-20{
  margin-bottom:5px;
  border-radius: 25px;
}

</style>