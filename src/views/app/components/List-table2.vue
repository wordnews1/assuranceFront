<template>

    <b-row>
        <b-col md="12" style="position:relative;text-align: right;">

            <b-row>

                <b-col md="9"></b-col>
                <b-col md="3">

                    <b-form-input
                            @input="search"
                            autocomplete="off"
                            type="text"
                            placeholder="search"
                            ref="client"
                            size="sm"
                    ></b-form-input>
                    <br/>

                </b-col>



                <b-col md="12" >

                    <vue-good-table
                            :columns="columns"
                            :line-numbers="true"
                            @on-selected-rows-change="selectionChanged"
                            @on-row-click="changeColor"
                            :row-style-class="rowStyleClassFn"
                            :select-options="{
                                    enabled: true,

                                    disableSelectInfo: true, // disable the select info panel on top
                                    selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                                }"

                            :search-options="{
                                    enabled: false,
                                    placeholder: $t('search')
                                  }"

                            :pagination-options="{
                                    enabled: false,
                                    mode: 'records'
                                  }"

                            styleClass="tableOne vgt-table"
                            :rows="rows"

                    >

                        <div slot="emptystate" style="text-align: center;">

                            <span class="badge badge-dark">Pas de données</span>

                        </div>


                        <template slot="table-row" slot-scope="props">

                          <div v-if="props.column.field == 'insuranceVisa'">
                            <span v-if="props.formattedRow[props.column.field] == 'PENDING'">
                              <span class="badge badge-warning">PENDING</span>
                            </span>
                            <span v-if="props.formattedRow[props.column.field] == 'ACCEPTED'">
                              <span class="badge badge-success">ACCEPTED</span>
                            </span>
                            <span v-if="props.formattedRow[props.column.field] == 'REJECTED'">
                              <span class="badge badge-danger">REJECTED</span>
                            </span>
                          </div>


                          <div v-else>
                              {{props.formattedRow[props.column.field]}}
                          </div>
                        </template>
-->


                    </vue-good-table>

                </b-col>

            </b-row>

            <!--<b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    per-page="10"
                    :aria-controls="rows"
                    align="center"
                    @change="handlePageChange"
            ></b-pagination>-->

            <div style="margin-top: 10px"></div>

            <!--  <pagination
                      :total-pages="11"
                      :total="113"
                      :per-page="10"
                      :current-page="currentPage"
                      @pagechanged="onPageChange"
              />-->

            <div style="margin-top: 10px"></div>


            <b-pagination
                    v-model="currentPage"
                    :total-rows="totalElement"
                    per-page="10"
                    align="center"
                    @change="handlePageChange"
            ></b-pagination>

        </b-col>

    </b-row>

</template>

<script>

    const customStyles = {
        ul: {
            border: '2px solid red'
        },
        li: {
            display: 'inline-block',
            border: '2px dotted green'
        },
        a: {
            color: 'blue'
        }
    };
    const customLabels = {
        first: '<<',
        last: '>>',
        previous: '<',
        next: '>'
    };

    import { getRequestParams  } from '../../../plugins/functions'

    export default {

        display: "ListTable",

        props:{
            searchref:String,
            rows:Array,
            type:String,
            links:Array,
            perPage:Number,
            columns:Array,
            isCLoseMenu:Boolean,
            totalElement:Number,
            totalPage:Number
        },

        components:{},

        data() {

            return {
                customStyles,
                customLabels,
                currentPage:1,
                selectedRow:{},
                forNewClass:"",
                //isCLoseMenu: true,
                rowe:{},
                rowe2:'',
                searchrefs:this.searchref,
                pagesize:10,
                currentpage:1,
                filter:""
            };
        },

        methods: {

            onRowClick(value){
                console.log('onrow',value)
                value.type=this.type
                this.$emit('onRowclick',value)
            },

                changeColor(row){
                this.selectedRow = row;
            },
            search(params){

                this.filter = params
                this.search2(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))

            },
            search2(params){


                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }

                this.timer = setTimeout(() => {

                    this.$emit('searchlistticket',params)

                    /*axios.get(constants.resource_url+'search/'+'ventes',{params: params})
                        .then(customer => {


                            //commit("SETRESULTSEARCH",customer.data.data)
                            console.log('result',customer);
                            this.rowe = customer.data.data.content

                            console.log('result',customer.data.data.page.totalElements);

                            this.currentPage = customer.data.data.page.number
                            this.totalElement = customer.data.data.page.totalElements


                        })

                        .catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);
                            // ...
                        });*/

                }, 1000);



            },

            handlePageChange(value) {

                //console.log('handlepagechange',value);
                //title, page, size
                this.currentPage = value;
                this.$emit('loadpage',value)
            },

            selectionChanged(params){
                this.$emit('selectionChanged',params.selectedRows)

            },
            editProps(data) {
                this.$emit('editProps',data)
                console.log('data',data)
            },

            deleteProps(data) {
                this.$emit('deleteProps',data)
                console.log('data',data)
            },
            rowStyleClassFn(row) {
                return row.newCss ? 'yellow' : '';
            }
        },
        watch: {

        },
        computed: {

            /*totalRows() {
                return this.rows.length
            }*/
            updatedrows: function () {

                console.log('rowe2',this.rowe2)
                return this.rowe2
            },
            paginatedItems() {
                return this.rows.slice(

                    this.currentPage * this.perPage,
                    (this.currentPage + 1) * this.perPage
                );
            },
            totalRows() {
                return this.rows.length;
            },

        }
    };
</script>


<style scoped>

    .mb-30{
        margin-bottom: 10px !important;
    }
    .selectedRow{
        background-color: grey;
    }
    .newVisitClass{
        background-color: #FFEBCD;
    }
    .normal{
        background-color: white;
    }

</style>


