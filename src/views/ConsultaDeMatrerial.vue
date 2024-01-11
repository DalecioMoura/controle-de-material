<template>
    <div>
        <Menu />
        <div id="div-form" v-show="!estado">
            <FormPrincipal msg="Consultar Material" :rota="habilitar_componente" @enviaDados="recebeDados"/>
        </div>
        
        <div v-show="estado">
            <ExibirLista :itens="itens" @estado="resetaEstado" texto_botao="Nova Consulta"/>
        </div>
    </div>
</template>

<script>
    import FormPrincipal from '@/components/FormPrincipal.vue';
    import ExibirLista from '@/components/ExibirLista.vue';
    import Menu from '@/components/Menu.vue';
    import router from '@/router';
    export default {
        name: 'ConsultaDeMaterial',
        components: {
            Menu,
            FormPrincipal,
            ExibirLista
        },
        
        data(){
            return {
                atual:router.currentRoute,
                habilitar_componente:'',
                itens:[],
                estado:false
            }
        },

        methods:{
            recebeDados(arg){
                this.itens = arg
                this.estado = true
            },
            resetaEstado(){
                this.estado = false
                
            },
        },
        
        mounted(){
            this.atual = router.currentRoute
            this.habilitar_componente = this.atual.name
        }
        
    }
</script>

<style scoped>
#div-form{
    display: inline-block;
    text-align: right;
}

</style>