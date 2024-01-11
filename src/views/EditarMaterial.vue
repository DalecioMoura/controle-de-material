<template>  
    <div>
        <Menu />
        <div id="div-form" v-show="!exibirComponente">
            <FormPrincipal msg="Editar Material" :rota="habilitar_componente" :edite="estado" @enviaDados="recebeDados" />
        </div>
        <p>{{ msg }}</p>
        <div v-show="exibirComponente">
            <ExibirLista :itens="itens" @estado="estado = false" texto_botao="Cadastrar outro ítem"/>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue';
import FormPrincipal from '@/components/FormPrincipal.vue';
import ExibirLista from '@/components/ExibirLista.vue';
import router from '@/router';
export default {
    name: 'EditarMaterial',

    data(){
        return {
            rota_atual:router.currentRoute,
            habilitar_componente:'',
            itens:[],
            estado:false,
            exibirComponente:false,
            msg:''
        }
    },

    components: {
        Menu,
        FormPrincipal,
        ExibirLista
    },

    methods: {
        recebeDados(arg){
            this.itens = arg[0]
            this.msg = arg[1]
            this.estado = arg[2]
            this.exibirComponente = arg[3]
            setTimeout(()=>this.msg = '', 3000)
        }
    },

    mounted(){
        this.habilitar_componente = this.rota_atual.name
    }
}
</script>

<style scoped>
#div-form{
    display: inline-block;
}
</style>