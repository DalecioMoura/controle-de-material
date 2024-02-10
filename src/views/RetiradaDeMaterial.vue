<template>
    <div>
        <Menu />
        <div id="div-form" v-show="!estado">   
            <FormPrincipal msg="Retirada de Material" :rota="habilitar_componente" @enviaDados="recebeDados"/> 
        </div>
        <div v-show="estado">
            <ExibirLista :itens="itens" @estado="estado = false" texto_botao="Nova Requisição"/>
        </div>
    </div>
</template>

<script>
    import FormPrincipal from '@/components/FormPrincipal.vue';
    import Menu from '@/components/Menu.vue';
    import ExibirLista from '@/components/ExibirLista.vue';
    import router from '@/router';
    export default {
        name: 'RetiradaDeMaterial',
        components: {
            FormPrincipal,
            Menu,
            ExibirLista
        },
        data(){
            return {
                rotaAtual: router.currentRoute,
                habilitar_componente:'',
                itens:[],
                estado: false
            }
        },
        methods:{
            recebeDados(arg){
                this.itens = arg
                this.estado = true
            }
        },
        mounted(){
            this.habilitar_componente = this.rotaAtual.name
        }   
    }
</script>

<style scoped>
#div-form{
    display: inline-block;
    text-align: right;
}


</style>