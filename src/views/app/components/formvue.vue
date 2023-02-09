<template>
    <b-overlay :show="show" rounded="sm" >
        <div class="panel-body" style="margin: auto; width:60%">
            <div style="margin: auto">
                <vue-form-generator  :schema="schema" :model="model" :options="formOptions" ></vue-form-generator>
                <b-button variant="danger m-1" v-if="cancelButtonn" @click="previous">
                    Annuler
                </b-button>
                <b-button variant="success m-1" v-if="saveButtonn" @click="onSubmit">
                    Enregistrer
                </b-button>
            </div>
        </div>
    </b-overlay>
</template>

<script>
    export default {
        name: "formvue",
        props:{
            cancelButton: Boolean,
            saveButton: Boolean,
            msg:String,
            fillselectUrl:String,
            saveUrl: String,
            schema:Object,
            model:Object,
            formOptions:Object,
            show: false,
            spinner: Boolean,
            onSelect: Boolean,
            dialog2:Boolean,
            defaultItem: Object
        },
        data(){
            return{
                cancelButtonn: this.cancelButton,
                saveButtonn: this.saveButton,
                saveUrll:this.saveUrl,
                modell:this.model,
                fillselectUrll:this.fillselectUrl,
                defaultItem: this.defaultItem
            }
        },
        components: {
            "vue-form-generator": VueFormGenerator.component
        },
        computed:{

        },

        created(){
            axios.get(this.fillselectUrll)
                .then(org => {
                    console.log('select filled data',org.data.data);
                    this.schema.fields.find(this.fillselect).values = org.data.data;
                })
                .catch(function(error) {
                    console.log('organisations_error',error);
                    this.makeToast();
                });
        },
        methods:{

            makeToast(variant = null,type="info") {
                console.log('Please fill the form correctly',variant)
                this.$toasted.show(variant,{type:type})
            },
            fillselect(fields){
                return fields.fillselect === 'x';
            },
            onSubmit(){
                this.show = true;
                axios.post(this.saveUrll, this.modell)
                    .then(assurances => {
                        console.log('variant', assurances.data.data)
                        this.$nextTick(() => {
                            this.modell= Object.assign({}, this.defaultItem)
                        })
                        this.show = false;
                        this.$router.go(-1);
                    })
            },
            previous(){
                this.$nextTick(() => {
                    this.modell = Object.assign({}, this.defaultItem)
                })
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>

</style>