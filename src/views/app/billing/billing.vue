<template>

  <!--  <b-modal scrollable no-close-on-backdrop   id="tests" size="lg" hide-footer>
  <template>-->
  <b-overlay :show="show" rounded="sm">
    <div class="container">
      <div  class="card" id="printMe">

        <div class="card-header">

          <h3  style="display: flex; align-items: center; justify-content: center" class="center">{{$t('Facture')}}</h3><br/>

          <span class="float-left"> <strong>{{$t('num_ticket')}}:</strong>{{new Date().getTime()}}</span><br/>
          <span class="float-left"> <strong>{{$t('Unité de Santé')}}:</strong>{{rowes.hopital}}</span>

          <span class="float-right"> <strong>{{new Date().toLocaleString()}}</strong> </span><br>
          <div>
            <span class="float-right">Patient : <b>{{rowes.nom}}  {{rowes.prenom}}</b></span>
          </div><br>

          <div class="float-right">
            Telephone: {{rowes.telephone}}
          </div><br>
          <div  class="float-right">  Née le:{{rowes.dateNaiss}}</div>

        </div>
        <div class="card-body">
          <div role="tablist">

                  <span style="font-size:20px; display: table;
    margin: 0 auto;" >
                    {{$t('traumatisme')}}</span><br/>

            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

              <div class="table-responsive-sm">
                <table class="table table-bordered">
                  <thead style="background-color: rgba(25,22,22,0.07)">

                  <tr>
                    <th class="center">#</th>
                    <th>{{$t('Désignation')}}</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr class="item" v-if="testtrauma.length===0">
                    <td>{{$t('no_data')}}</td>
                  </tr>
                  <tr class="item" v-else v-for="(item,index) in testtrauma"  :key="index">
                    <td class="center">{{index+1}}</td>
                    <td class="left">{{item.name}} </td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </b-collapse>


          </div>
          <div role="tablist">

               <span style="font-size:20px; display: table;
    margin: 0 auto;" >
                    {{$t('examens')}}</span><br/>

            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">

              <div class="table-responsive-sm">
                <table class="table table-bordered">
                  <thead style="background-color: rgba(25,22,22,0.07)">

                  <tr>
                    <th class="center">#</th>
                    <th>{{$t('Désignation')}}</th>
                    <th>{{$t('Prix')}}</th>
                  </tr>

                  </thead>
                  <tbody>
                  <tr class="item" v-if="examens.length==0">
                    <td>{{$t('no_data')}}</td>
                  </tr>
                  <tr class="item" v-else v-for="(item,index) in examens"  :key="index">
                    <template v-if="item.insuranceVisa=='ACCEPTED'">
                      <td class="center">{{index+1}}</td>
                      <td class="left">{{ item.name }} </td>
                      <td class="left">{{item.price|currencys('CM','XAF')}}</td>
                    </template>


                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-lg-4 col-sm-5">

                </div>

                <div class="col-lg-7 col-sm-7 ml-auto">
                  <table class="table table-clear table-bordered">
                    <tbody>

                    <!--                          <tr>
                                                <td class="left">
                                                  <strong>{{$t('amount_tax')}}</strong>
                                                </td>
                                                <td class="right">12.500 HT</td>
                                              </tr>

                                              <tr>
                                                <td class="left">
                                                  <strong>(19,25%)</strong>
                                                </td>
                                                <td class="right">invoice_tax</td>
                                              </tr>-->

                    <tr>
                      <td class="left">
                        <strong>{{$t('SOUS TOTAL')}}</strong>
                      </td>
                      <td class="right">{{totalexamen|currencys('CM','XAF')}}</td>
                    </tr>


                    </tbody>
                  </table>

                </div>

              </div>

            </b-collapse>

          </div>
          <div role="tablist">

                 <span style="font-size:20px; display: table;
    margin: 0 auto;" >
                    {{$t('soins')}}</span><br/>


            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">

              <div class="table-responsive-sm">
                <table class="table table-bordered">
                  <thead style="background-color: rgba(25,22,22,0.07)">

                  <tr>
                    <th class="center">#</th>
                    <th>{{$t('Désignation')}}</th>
                    <th>{{$t('Prix')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="item" v-if="soins.length==0">
                    <td>{{$t('no_data')}}</td>
                  </tr>
                  <tr class="item" v-else v-for="(item,index) in soins"  :key="index">
                    <template v-if="item.insuranceVisa=='ACCEPTED'">
                      <td class="center">{{index+1}}</td>
                      <td class="left">{{ item.name }} </td>
                      <td class="left">{{item.price|currencys('CM','XAF')}}</td>
                    </template>

                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-lg-4 col-sm-5">

                </div>

                <div class="col-lg-7 col-sm-7 ml-auto">
                  <table class="table table-clear table-bordered">
                    <tbody>

                    <!--                          <tr>
                                                <td class="left">
                                                  <strong>{{$t('amount_tax')}}</strong>
                                                </td>
                                                <td class="right">12.500 HT</td>
                                              </tr>

                                              <tr>
                                                <td class="left">
                                                  <strong>(19,25%)</strong>
                                                </td>
                                                <td class="right">invoice_tax</td>
                                              </tr>-->

                    <tr>
                      <td class="left">
                        <strong>{{$t('SOUS TOTAL')}}</strong>
                      </td>
                      <td class="right">{{totalsoins|currencys('CM','XAF')}}</td>
                    </tr>

                    </tbody>
                  </table>

                </div>

              </div>

            </b-collapse>


          </div>
          <div role="tablist">
            <div class="row">
              <div class="col-lg-4 col-sm-5">

              </div>

              <div class="col-lg-7 col-sm-7 ml-auto">
                <div class="table-responsive-sm">
                  <table class="table table-bordered" style="background-color: rgba(25,22,22,0.07)">
                    <thead>
                    <tr>
                      <td class="left">
                        <strong>{{$t('TTCAmount')}}</strong>
                      </td>
                      <td class="right">{{rowes.amountAccepted|currencys('CM','XAF')}}</td>
                    </tr>
                    </thead>
                  </table>
                </div>
              </div></div></div>
          <br>
        </div>
      </div>
      <p></p>
      <div style="text-align: right">
        <b-button  @click="$router.go(-1)" class="lefts" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
        <!-- <b-button  variant="outline-success" style="margin-right: 15px">Pdf</b-button>-->
        <b-button  variant="outline-success" @click="prints()" style="margin-right: 15px">{{$t('print')}}</b-button>
      </div>

    </div>
  </b-overlay>




  <!-- </template>  </b-modal>-->

</template>

<script>
import moment from 'moment'
import axios from 'axios'
import constants from "../../../plugins/constants"
import { mapGetters,mapActions } from "vuex";
export default {
  name: "billing",
  props: {

    box: Boolean,
    encaissements:Object,
    listproducts:Array,
    field:String,
    encompte:Boolean,
    invoice_tax:Number,
    dates:new Date().toLocaleString(),
    codepays:String,
    devise:String,
    country:String,
    rowes:Object

  },

  data(){
    return {
      examens:[{"id":6,"name":"Scanner","price":25000.0,"number":0,"care":41,"insuranceVisa":"ACCEPTED"}],
      traumatisme:[],
      show:true,
      soins:[],
      totalsoins:0,
      totalexamen:0,
      subtotals:0
    }
  },
  filters:{
    momentes: function (date) {
      return moment(date).format('yyyy-MM-DD HH:mm');
    },
    currencys:function (value,codepays,devise) {

      return new Intl.NumberFormat(codepays, { style: 'currency', currency: devise }).format(value);
    }
  },
  methods:{

    listDossier(item){
      axios.get(constants.accident_end_url+'cares/folder/'+item.id)
          .then(list => {

            console.log('carecare',list.data.data)

            if(list.data.success){
              this.show=false
              let data = list.data.data
              console.log('data',data)
              this.examens = data.exams
              this.traumatisme = data.injuries
              this.soins = data.treatments
              var total = 0;
              console.log('datare',total)
              this.soins.map(function(value, key) {
                console.log('datare',key)
                if(value.insuranceVisa==='ACCEPTED') {
                  total += value.price
                }
              });
              this.totalsoins  = total

              var total1 = 0;
              console.log('datare',total1)

              this.examens.map(function(value, key) {
                console.log('datare',key)
                if(value.insuranceVisa==='ACCEPTED') {
                  total1 += value.price
                }
              });
              this.totalexamen  = total1

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
    prints(){
      this.$htmlToPaper('printMe');
    },
    getTotalSoin(){
      var result=0
      this.soins.forEach(value => {
        if(value.insuranceVisa=='ACCEPTED'){
          result +=value.price
        }
      })
      return result.toString()
    },
    getTotalExam(){
      var result=0
      this.examens.forEach(value => {
        if(value.insuranceVisa=='ACCEPTED'){
          result +=value.price
        }
      })
      return result.toString()
    },
    cancels(){
      this.$emit('cancels');
    }},
  mounted(){
    console.log('listproductys',this.rowes)
    //this.ListDossierPatient(this.rowes[0].id)
    this.listDossier(this.rowes)
  },
  computed: {

    testtrauma() {
      // `this` points to the component instance
      return this.traumatisme
    },

  },
  watch:{

  }

}

</script>
<style scoped>

.lefts{
  position: relative;left: 0;margin-left: 10px;
}

.invoice-box {
  width: 500px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}
.headings {
  background-color: rgba(89, 80, 98, 0.2);
  font-weight: 700;
}


.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
  sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>