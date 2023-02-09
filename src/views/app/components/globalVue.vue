<template>
    <div class="main-content">
        <b-button v-if="previousButtonn" variant="danger m-1" @click="previous">
            Retour
        </b-button>
        <breadcumb :page="pagenamee" :folder="'Options'" />

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
                            <Datatablelist :dialogDelete="dialogDeletee" :headers="headerss" :desserts="listt" :editButton="editButtonn"
                                           :addButton="addButtonn" :openButton="openButtonn"
                                           :deleteButton="deleteButtonn" @deleteItemConfirm="deleteItemConfirm"
                                            @editItem="editItem" @deleteItem="deleteItem" @openItem="openItem"
                                           @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange"
                            ></Datatablelist>
                        </b-tab>
                        <b-tab title="Kanban">
                            <template slot="title">
                                <i class="i-Split-Four-Square-Window text-15"></i>
                            </template>
                            <ListKanban :rows_kanban="list_kanbann" ></ListKanban>
                        </b-tab>

                        <b-tab title="Graph" >
                            <template slot="title">
                                <i class="i-Bar-Chart text-15"> </i>
                            </template>
                            <ListGraph :name_graph="name_graphh" :datae="list_camembertt" :listhisto="list_histt" :abcis="abciss"></ListGraph>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <!-- form-inputs-rounded -->
        </b-row>
    </div>
</template>

<script>
    import Datatablelist from './datatablelist';
    import ListKanban from './list-kanban'
    import ListGraph from './list-graph'
    export default {
        name: "GlobalVue",
        props:{
            pagename: String,
            name_graph: String,
            previousButton: Boolean,
            dialogDelete: Boolean,
            headers: Array,
            list: String,
            editButton: Boolean,
            addButton: Boolean,
            openButton: Boolean,
            deleteButton: Boolean,
            list_kanban: Array,
            percent_visit: Array,
            list_hist: Array,
            abcis: Array,
            list_camembert: Array

        },
        components: {
            Datatablelist, ListKanban,ListGraph
        },
        methods:{
            handlePageChange(value) {
                this.$emit('handlePageChange')

            },
            handlePageSizeChange(event) {
                this.$emit('handlePageSizeChange')
            },
            previous(){
                this.$emit('previous')
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

        },
        data(){
            return {
                name_graphh: this.name_graph,
                pagenamee: this.pagename,
                headerss: this.headers,
                dialogDeletee:this.dialogDelete,
                listt: this.list,
                previousButtonn: this.previousButton,
                editButtonn: this.editButton,
                addButtonn: this.addButton,
                openButtonn: this.openButton,
                deleteButtonn: this.deleteButton,
                list_kanbann: this.list_kanban,
                percent_visitt: this.percent_visit,
                list_histt: this.list_hist,
                abciss: this.abcis,
                list_camembertt: this.list_camembert
            }
        },
        mounted(){
            console.log('g list global vue',this.list )
            console.log('g listt global vue',this.listt )

        }

    }

</script>

<style scoped>

</style>